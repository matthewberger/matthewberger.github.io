var svg0 = d3.select('#svg0');
var circle_data = [];
for(var i = 0; i < 20; i++)
	circle_data.push([10+3000*Math.random(),10+3000*Math.random()]);
var radius = 8;

var min_circle_x = d3.min(circle_data, d => d[0]), max_circle_x = d3.max(circle_data, d => d[0])
var min_circle_y = d3.min(circle_data, d => d[1]), max_circle_y = d3.max(circle_data, d => d[1])
var min_x = 0, max_x = svg0.attr('width'), min_y = svg0.attr('height'), max_y = 0;
var pad_x = (max_circle_x-min_circle_x)*0.05, pad_y = (max_circle_y-min_circle_y)*0.05;
var range_pad = 40;

var scale_x = d3.scaleLinear().domain([min_circle_x-pad_x,max_circle_x+pad_x]).range([min_x+range_pad,max_x-range_pad]).nice()
var scale_y = d3.scaleLinear().domain([min_circle_y-pad_y,max_circle_y+pad_y]).range([min_y-range_pad,max_y+range_pad]).nice()

svg0.selectAll('circle').data(circle_data).enter().append('circle')
	.attr('cx', d => scale_x(d[0]))
	.attr('cy', d => scale_y(d[1]))
	.attr('r', radius)
	.attr('fill', '#777')
