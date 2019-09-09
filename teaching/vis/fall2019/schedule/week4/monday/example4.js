var svg4 = d3.select('#svg4');
var width = svg4.attr('width'), height = svg4.attr('height')

var circle_data = [];
for(var i = 0; i < 70; i++)
	circle_data.push([i,0.5*i + 0.1*i*i - Math.sqrt(i)]);
var radius = 4;

var min_circle_x = d3.min(circle_data, d => d[0]), max_circle_x = d3.max(circle_data, d => d[0])
var min_circle_y = d3.min(circle_data, d => d[1]), max_circle_y = d3.max(circle_data, d => d[1])
var min_x = 0, max_x = width, min_y = height, max_y = 0;

var circle_scale_x = d3.scaleLinear().domain([min_circle_x,max_circle_x]).range([min_x+radius,max_x-radius])
var circle_scale_y = d3.scaleLinear().domain([min_circle_y,max_circle_y]).range([min_y-radius,max_y+radius])

var x_range = circle_scale_x.range();
var num_discrete = 8;
var discrete_range = d3.range(x_range[0],x_range[1],(x_range[1]-x_range[0])/num_discrete);
var circle_scale_x_quantized = d3.scaleQuantize().domain([min_circle_x,max_circle_x]).range(discrete_range)

svg4.selectAll('circle').data(circle_data).enter().append('circle')
	.attr('cx', d => circle_scale_x_quantized(d[0]))
	.attr('cy', d => circle_scale_y(d[1]))
	.attr('r', radius)
	.attr('fill', '#777777')
