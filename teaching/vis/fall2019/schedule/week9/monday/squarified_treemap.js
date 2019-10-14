d3.json('flare.json')
	.then(function(data)  {
		plot_treemap(data);
	})

function plot_treemap(flare_data)  {
	// process the tree
	process_tree(flare_data, '', 0);
	accumulate_sizes(flare_data);
	divide_space(flare_data);

	var pad = 100;
	var svg_elem = d3.select('#treemap1');
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
}
