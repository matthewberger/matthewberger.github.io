var svg1 = d3.select('#svg1');
var circle_data = [10,20,30,40,50,60];

var min_circle_r = d3.min(circle_data), max_circle_r = d3.max(circle_data)
var min_x = 0, max_x = svg1.attr('width'), min_y = svg1.attr('height'), max_y = 0;
var min_r = 10.0, max_r = 100.0;

var circle_scale_r_sqrt = d3.scaleSqrt().domain([min_circle_r,max_circle_r]).range([min_r,max_r])
var circle_scale_r_linear = d3.scaleLinear().domain([min_circle_r,max_circle_r]).range([min_r,max_r])

svg1.selectAll('emptycircle').data(circle_data).enter().append('circle')
	.attr('cx', 200)
	.attr('cy', d => circle_scale_r_sqrt(d)+5)
	.attr('r', d => circle_scale_r_sqrt(d))
	.attr('fill', 'None')
	.attr('stroke', '#777')
	.attr('stroke-width', '2')

svg1.selectAll('emptycircle').data(circle_data).enter().append('circle')
	.attr('cx', 520)
	.attr('cy', d => circle_scale_r_linear(d)+5)
	.attr('r', d => circle_scale_r_linear(d))
	.attr('fill', 'None')
	.attr('stroke', '#777')
	.attr('stroke-width', '2')
