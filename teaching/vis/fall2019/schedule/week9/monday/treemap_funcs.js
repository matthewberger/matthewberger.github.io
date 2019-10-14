var global_pad_scale = 0.0; 

// compute depths, concatenate package names, leaf determination
function process_tree(node, concat_names, depth)  {
	node.full_name = depth==0 ? node.name : concat_names+'.'+node.name;
	node.depth = depth+1;
	if(node.depth == 1)
		node.box = {ll:[0,0], ur:[1,1]};

	if('children' in node)  {
		node.is_leaf = false;
		node.value = 0;
		for(var c = 0; c < node.children.length; c++)  {
			node.children[c].parent = node;
			process_tree(node.children[c], node.full_name, node.depth);
		}
	}
	else  {
		node.is_leaf = true;
		node.value = +node.value;
		node.children = [];
	}
}

// accumulate sizes
function accumulate_sizes(node)  {
	if(node.is_leaf)
		return node.value;
	for(var c = 0; c < node.children.length; c++)
		node.value += accumulate_sizes(node.children[c]);
	node.children.sort(function(a,b) {
		return b.value-a.value;
	});
	return node.value;
}

// gather all nodes into an array
function gather_all_nodes(node, node_array)  {
	node_array.push(node);
	for(var c = 0; c < node.children.length; c++)
		gather_all_nodes(node.children[c],node_array);
}

// compute max depth of tree
function max_depth(node)  {
	if(node.is_leaf)
		return node.depth;
	return d3.max(node.children, d => max_depth(d));
}

function grab_nodes_by_name(node, node_names)  {
	node_names.push(node);
	if(node.depth > 1)
		grab_nodes_by_name(node.parent,node_names);
}

// the main squarify algorithm
function squarify(container, nodes)  {
	// largest side of container
	var container_width = container.ur[0] - container.ll[0];
	var container_height = container.ur[1] - container.ll[1];
	var s_d = 0;
	if(container_height > container_width)
		s_d = 1;
	var container_min = container.ll[s_d], container_max = container.ur[s_d];

	// target rect areas
	var total_value = d3.sum(nodes, d => d.value);
	var target_areas = [];
	nodes.forEach(d => { target_areas.push((d.value/total_value)*container_width*container_height); });

	// add first rect in `nodes` to the beginning of the longest side (s_d)
	if(s_d == 0)  {
		var x_pos = container.ll[0]+target_areas[0]/container_height;
		var stacked_areas = [{ll:[container.ll[0],container.ll[1]],ur:[x_pos,container.ur[1]]}];
	}
	else  {
		var y_pos = container.ll[1]+target_areas[1]/container_width;
		var stacked_areas = [{ll:[container.ll[0],container.ll[1]],ur:[container.ur[0],y_pos]}];
	}

	function compute_ar(width,height)  { return width > height ? width/height : height/width; }

	var num_stacked_rects = 1;
	var current_ar = compute_ar(stacked_areas[0].ur[0]-stacked_areas[0].ll[0], stacked_areas[0].ur[1]-stacked_areas[0].ll[1]);
	for(var i = 1; i < nodes.length; i++)  {
		// grab next rect, hypothetically stack it on top of existing rects - 1) figure out total area from stacking
		var total_area = 0;
		for(var j = 0; j <= i; j++)
			total_area += target_areas[j];
		// 2) compute common width/height for each rect to get per-stacked rect areas
		var stacked_widths = [], stacked_heights = [];
		for(var j = 0; j <= i; j++)  {
			if(s_d == 0)  {
				stacked_widths.push(total_area/container_height);
				stacked_heights.push(target_areas[j]/stacked_widths[0]);
			}
			else  {
				stacked_heights.push(total_area/container_width);
				stacked_widths.push(target_areas[j]/stacked_heights[0]);
			}
		}

		// 3) compute the aspect ratios for each stacked rect, grab the minimum as the worst
		var worst_ar = -1;
		for(var j = 0; j <= i; j++)  {
			var next_ar = compute_ar(stacked_widths[j],stacked_heights[j]);
			worst_ar = next_ar > worst_ar ? next_ar : worst_ar;
		}

		// 4) if the worst aspect ratio resulting from stacking exceeds the current aspect ratio, then we are done -> move on to the next rectangle
		if(worst_ar > current_ar)
			break;

		// 5) otherwise, set the current aspect ratio to the worst one, and proceed...
		current_ar = worst_ar;
		num_stacked_rects++;
	}

	// layout the stacked rects - figure out total area, and individual widths and heights for each box, and geometry for each box as well
	var total_area = 0;
	for(var j = 0; j < num_stacked_rects; j++)
		total_area += target_areas[j];
	var stacked_widths = [], stacked_heights = [];
	var cur_stack = container.ll[1-s_d];
	console.log('n nodes? '+nodes.length);
	for(var j = 0; j < num_stacked_rects; j++)  {
		if(s_d == 0)  {
			var stacked_width = total_area/container_height;
			var stacked_height = target_areas[j]/stacked_width;
			var pad = stacked_width < stacked_height ? global_pad_scale*stacked_width : global_pad_scale*stacked_height;
			nodes[j].box = {ll:[container.ll[0]+pad,cur_stack+pad],ur:[container.ll[0]+stacked_width-pad,cur_stack+stacked_height-pad]};
			cur_stack += stacked_height;
		}
		else  {
			var stacked_height = total_area/container_width;
			var stacked_width = target_areas[j]/stacked_height;
			var pad = stacked_width < stacked_height ? global_pad_scale*stacked_width : global_pad_scale*stacked_height;
			nodes[j].box = {ll:[cur_stack+pad,container.ll[1]+pad],ur:[cur_stack+stacked_width-pad,container.ll[1]+stacked_height-pad]};
			cur_stack += stacked_width;
		}
	}

	if(num_stacked_rects < nodes.length)  {
		var remaining_nodes = [];
		for(var j = num_stacked_rects; j < nodes.length; j++)
			remaining_nodes.push(nodes[j]);
		if(s_d == 0)
			var new_contained_box = {ll:[container.ll[0]+total_area/container_height,container.ll[1]],ur:[container.ur[0],container.ur[1]]};
		else
			var new_contained_box = {ll:[container.ll[0],container.ll[1]+total_area/container_width],ur:[container.ur[0],container.ur[1]]};
		if(remaining_nodes.length > 0) {
			console.log('remaining? '+remaining_nodes.length)
			squarify(new_contained_box,remaining_nodes);
		}
	}
	else
		console.log('nothing remaining!')
}

// tree map algorithm
function divide_space(node)  {
	if(node.is_leaf)
		return;

	// contained box
	var box = node.box;
	var contained_box = {ll:[0,0],ur:[1,1]};
	for(var i = 0; i < 2; i++)  {
		contained_box.ll[i] = node.box.ll[i];
		contained_box.ur[i] = node.box.ur[i];
	}

	// do squarify
	console.log('children size: '+node.children.length);
	squarify(contained_box, node.children);

	// recurse
	for(var c = 0; c < node.children.length; c++)  {
		divide_space(node.children[c]);
	}
}
