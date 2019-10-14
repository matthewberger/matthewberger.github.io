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

// tree map algorithm
function divide_space(node)  {
	if(node.is_leaf)
		return;

	// contained box
	var box = node.box;
	var contained_box = {ll:[0,0],ur:[1,1]};
	for(var i = 0; i < 2; i++)  {
		contained_box.ll[i] = box.ll[i];
		contained_box.ur[i] = box.ur[i];
	}

	// select a dimension in which to divide
	var x_range = contained_box.ur[0] - contained_box.ll[0];
	var y_range = contained_box.ur[1] - contained_box.ll[1];
	var s_d = 0;
	if(y_range > x_range)
		s_d = 1;
	var box_min = contained_box.ll[s_d], box_max = contained_box.ur[s_d];

	// for each child, use its value to determine where to split (unordered..)
	var prior_child_pos = box_min;
	for(var c = 0; c < node.children.length; c++)  {
		perc = node.children[c].value / node.value
		child_length = perc*(box_max-box_min);
		var c_min = prior_child_pos, c_max = prior_child_pos+child_length;
		node.children[c].box = {ll:[contained_box.ll[0],contained_box.ll[1]], ur:[contained_box.ur[0],contained_box.ur[1]]};
		node.children[c].box.ll[s_d] = c_min;
		node.children[c].box.ur[s_d] = c_max;

		// pad child boundary to emphasize hierarchy
		var box_width = node.children[c].box.ur[0] - node.children[c].box.ll[0]
		var box_height = node.children[c].box.ur[1] - node.children[c].box.ll[1]
		var pad = box_width < box_height ? global_pad_scale*box_width : global_pad_scale*box_height;
		node.children[c].box.ll[0] += pad;
		node.children[c].box.ll[1] += pad;
		node.children[c].box.ur[0] -= pad;
		node.children[c].box.ur[1] -= pad;

		prior_child_pos += child_length;
	}

	// recurse
	for(var c = 0; c < node.children.length; c++)
		divide_space(node.children[c]);
}

function plot_it()  {
	// process the tree
	process_tree(flare_data, '', 0);
	accumulate_sizes(flare_data);
	global_boundary_perc = 1.0;
	divide_space(flare_data);

	var width = 700, height = 700;
	var pad = 100;
	d3.select('body').append('svg').attr('width',width).attr('height',height);

	// setup scales
	var x_scale = d3.scaleLinear().domain([0,1]).range([pad,width-pad]);
	var y_scale = d3.scaleLinear().domain([0,1]).range([pad,height-pad]);
	var font_scale = d3.scaleSqrt().domain([max_depth(flare_data),1]).range([10,80]);
	var font_opacity = d3.scaleLinear().domain([max_depth(flare_data),1]).range([1,0.1]);

	// get all nodes: we process them as a flattened array (could alternatively do this as a hierarchy..)
	var all_nodes = [];
	gather_all_nodes(flare_data,all_nodes);

	// data join on nodes, use their computed boxes from the treemap algorithm for positioning
	d3.select('svg').selectAll('rect').data(all_nodes, d => d.full_name).enter().append('rect')
		.attr('x', d => x_scale(d.box.ll[0])).attr('y', d => y_scale(d.box.ll[1]))
		.attr('width', d => x_scale(d.box.ur[0])-x_scale(d.box.ll[0])).attr('height', d => y_scale(d.box.ur[1])-y_scale(d.box.ll[1]))
		.attr('fill', '#ffffff').attr('stroke', '#999999').attr('stroke-width', 0.7);

	// data join for the text, style appropriately
	d3.select('svg').selectAll('text').data(all_nodes, d => d.full_name).enter().append('text')
		.attr('x', d => 0.5*(x_scale(d.box.ll[0]) + x_scale(d.box.ur[0])))
		.attr('y', d => 0.5*(y_scale(d.box.ll[1]) + y_scale(d.box.ur[1])))
		.attr('pointer-events', 'none')
		.text(d => d.name)
		.attr('font-size', d => font_scale(d.depth))
		.attr('opacity', d => font_opacity(d.depth))
		.attr('text-anchor', 'middle')
		.attr('alignment-baseline', 'middle')

	// when we hover over a node, we show its text label and the text labels of all of its parents
	d3.selectAll('rect').on('mouseover', (d) =>  {
		var hovered_nodes = [];
		grab_nodes_by_name(d, hovered_nodes);

		var text_selection = d3.select('svg').selectAll('text').data(hovered_nodes, d => d.full_name)
		text_selection.exit().remove();
		text_selection.enter().append('text')
			.attr('x', d => 0.5*(x_scale(d.box.ll[0]) + x_scale(d.box.ur[0])))
			.attr('y', d => 0.5*(y_scale(d.box.ll[1]) + y_scale(d.box.ur[1])))
			.attr('pointer-events', 'none')
			.text(d => d.name)
			.attr('font-size', d => font_scale(d.depth))
			.attr('opacity', d => font_opacity(d.depth))
			.attr('text-anchor', 'middle')
			.attr('alignment-baseline', 'middle')
	});

	// increase/decrease the padding -> also update geometry of rectangles that results from this
	d3.select('svg').on('wheel', function(d)  {
		if(d3.event.wheelDelta < 0)  {
			global_pad_scale -= 0.006;
			if(global_pad_scale < 0)
				global_pad_scale = 0;
			divide_space(flare_data);
		}
		else  {
			global_pad_scale += 0.006;
			if(global_pad_scale > 0.1)
				global_pad_scale = 0.1;
			divide_space(flare_data);
		}
		d3.selectAll('rect')
			.attr('x', d => x_scale(d.box.ll[0])).attr('y', d => y_scale(d.box.ll[1]))
			.attr('width', d => x_scale(d.box.ur[0])-x_scale(d.box.ll[0])).attr('height', d => y_scale(d.box.ur[1])-y_scale(d.box.ll[1]))
		d3.selectAll('text')
			.attr('x', d => 0.5*(x_scale(d.box.ll[0]) + x_scale(d.box.ur[0])))
			.attr('y', d => 0.5*(y_scale(d.box.ll[1]) + y_scale(d.box.ur[1])))
	});
}
