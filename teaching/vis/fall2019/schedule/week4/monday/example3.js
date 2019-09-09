var svg3 = d3.select('#svg3');
var width = svg3.attr('width'), height = svg3.attr('height')

var circle_data = [];
for(var i = 0; i < 20; i++)
	circle_data.push([10+30*Math.random(),10+30*Math.random()]);
var radius = 8;

var min_circle_x = d3.min(circle_data, d => d[0]), max_circle_x = d3.max(circle_data, d => d[0])
var min_circle_y = d3.min(circle_data, d => d[1]), max_circle_y = d3.max(circle_data, d => d[1])
var min_x = 0, max_x = width, min_y = height, max_y = 0;

var circle_scale_x = d3.scaleLinear().domain([min_circle_x,max_circle_x]).range([min_x+radius,max_x-radius])
var circle_scale_y = d3.scaleLinear().domain([min_circle_y,max_circle_y]).range([min_y-radius,max_y+radius])
var fill_scale = d3.scaleLinear().domain([min_circle_x,max_circle_x]).range(['red','green'])

svg3.selectAll('circle').data(circle_data).enter().append('circle')
	.attr('cx', d => circle_scale_x(d[0]))
	.attr('cy', d => circle_scale_y(d[1]))
	.attr('r', radius)
	.attr('fill', d => fill_scale(d[0]))
