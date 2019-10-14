d3.json('flare.json')
	.then(function(data)  {
		plot_treemap_padding(data);
	})

function plot_treemap_padding(flare_data)  {
	// process the tree
	process_tree(flare_data, '', 0);
	accumulate_sizes(flare_data);
	divide_space(flare_data);

	var pad = 100;
	var svg_elem = d3.select('#treemap3');
	var width = svg_elem.attr('width'), height = svg_elem.attr('height');

	// setup scales
	var x_scale = d3.scaleLinear().domain([0,1]).range([pad,width-pad]);
	var y_scale = d3.scaleLinear().domain([0,1]).range([pad,height-pad]);
	var font_scale = d3.scaleSqrt().domain([max_depth(flare_data),1]).range([10,80]);
	var font_opacity = d3.scaleLinear().domain([max_depth(flare_data),1]).range([1,0.1]);

	// get all nodes: we process them as a flattened array (could alternatively do this as a hierarchy..)
	var all_nodes = [];
	gather_all_nodes(flare_data,all_nodes);

	// data join on nodes, use their computed boxes from the treemap algorithm for positioning
	svg_elem.selectAll('rect').data(all_nodes, d => d.full_name).enter().append('rect')
		.attr('x', d => x_scale(d.box.ll[0])).attr('y', d => y_scale(d.box.ll[1]))
		.attr('width', d => x_scale(d.box.ur[0])-x_scale(d.box.ll[0])).attr('height', d => y_scale(d.box.ur[1])-y_scale(d.box.ll[1]))
		.attr('fill', '#ffffff').attr('stroke', '#999999').attr('stroke-width', d => 0.7);

	// data join for the text, style appropriately
	svg_elem.selectAll('text').data(all_nodes, d => d.full_name).enter().append('text')
		.attr('x', d => 0.5*(x_scale(d.box.ll[0]) + x_scale(d.box.ur[0])))
		.attr('y', d => 0.5*(y_scale(d.box.ll[1]) + y_scale(d.box.ur[1])))
		.attr('pointer-events', 'none')
		.attr('font-size', d => font_scale(d.depth))
		.attr('opacity', d => font_opacity(d.depth))
		.attr('text-anchor', 'middle')
		.attr('alignment-baseline', 'middle')

	svg_elem.selectAll('text').data([all_nodes[0]]).text(d => d.name);

	// when we hover over a node, we show its text label and the text labels of all of its parents
	svg_elem.selectAll('rect').on('mouseover', (d) =>  {
		var hovered_nodes = [];
		grab_nodes_by_name(d, hovered_nodes);

		var text_selection = svg_elem.selectAll('text').data(hovered_nodes, d => d.full_name)
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
	svg_elem.on('wheel', function(d)  {
		d3.event.preventDefault();
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
		svg_elem.selectAll('rect')
			.attr('x', d => x_scale(d.box.ll[0])).attr('y', d => y_scale(d.box.ll[1]))
			.attr('width', d => x_scale(d.box.ur[0])-x_scale(d.box.ll[0])).attr('height', d => y_scale(d.box.ur[1])-y_scale(d.box.ll[1]))
		svg_elem.selectAll('text')
			.attr('x', d => 0.5*(x_scale(d.box.ll[0]) + x_scale(d.box.ur[0])))
			.attr('y', d => 0.5*(y_scale(d.box.ll[1]) + y_scale(d.box.ur[1])))
	});
}
