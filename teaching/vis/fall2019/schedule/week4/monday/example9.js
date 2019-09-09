var svg9 = d3.select('#svg9');
var width = svg9.attr('width'), height = svg9.attr('height'), pad_range = 40;

var edges = [];
var nodes = [];
var max_depth = 4;
var depth_inds = [];
for(var i = 0; i < max_depth; i++)
	depth_inds.push(i);
var depth_band = d3.scaleBand().domain(depth_inds).range([pad_range,width-pad_range])

function generate_nodes(depth, parent_ind, parent_lower, parent_upper)  {
	if(depth == max_depth)
		return;
	if(depth < 2)
		var n_nodes = 2 + Math.floor(Math.random() * 2);
	else
		var n_nodes = 2 + Math.floor(Math.random() * 3);
	var node_inds = [];
	for(var i = 0; i < n_nodes; i++)
		node_inds.push(i);
	var scale_band = d3.scaleBand().domain(node_inds).range([parent_lower,parent_upper])
	for(var i = 0; i < n_nodes; i++)  {
		var n_x = depth_band(depth)+depth_band.bandwidth()/2;
		var n_y = scale_band(i)+scale_band.bandwidth()/2;

		var node_pos = [n_x,n_y];
		nodes.push(node_pos);
		var node_ind = nodes.length-1;
		edges.push({
			source: parent_ind,
			target: node_ind
		});

		var n_y_lower = scale_band(i);
		var n_y_upper = scale_band(i)+scale_band.bandwidth();
		if((depth+1) < max_depth)
			generate_nodes(depth+1, node_ind, n_y_lower, n_y_upper)
	}
}

nodes.push([pad_range,height/2.0]);
generate_nodes(0, 0, height-pad_range, pad_range);
var horizontal_link = d3.linkHorizontal()
	.x(d => nodes[d][0])
	.y(d => nodes[d][1])

svg9.selectAll('edges').data(edges).enter().append('path')
	.attr('d', d => horizontal_link(d))
	.attr('fill', 'none').attr('stroke', '#666666')

svg9.selectAll('nodes').data(nodes).enter().append('circle')
	.attr('cx', d => d[0]).attr('cy', d => d[1]).attr('r', 3).attr('stroke-width', '1')
	.attr('fill', '#999999').attr('stroke', '#444444')
