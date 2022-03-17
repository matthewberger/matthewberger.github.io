var svg8 = d3.select('#svg8');
var width = svg8.attr('width'), height = svg8.attr('height'), pad_range = 40;

var line_data = [];
for(var i = 0; i < 70; i++)
	line_data.push([i,0.3*i + 0.05*i*i - Math.sqrt(i),0.5*i + 0.1*i*i - Math.sqrt(i)]);

var min_line_x = d3.min(line_data, d => d[0]), max_line_x = d3.max(line_data, d => d[0])
var min_line_y = d3.min(line_data, d => d[2]), max_line_y = d3.max(line_data, d => d[2])
var min_x = pad_range, max_x = width-pad_range, min_y = height-pad_range, max_y = pad_range;
var pad_x = (max_line_x-min_line_x)*0.02, pad_y = (max_line_y-min_line_y)*0.02;

var line_scale_x = d3.scaleLinear().domain([min_line_x-pad_x,max_line_x+pad_x]).range([min_x,max_x])
var line_scale_y = d3.scaleLinear().domain([min_line_y-pad_y,max_line_y+pad_y]).range([min_y,max_y])

var area = d3.area()
	.x(d => line_scale_x(d[0]))
	.y0(d => line_scale_y(d[1]))
	.y1(d => line_scale_y(d[2]))

svg8.append('path').datum(line_data)
	.attr('d', d => area(d))
	.attr('fill', '#555')
	.attr('stroke', '#999')
	.attr('stroke-width', '3')

svg8.append('g').attr('transform', 'translate('+pad_range+',0)').call(d3.axisLeft(line_scale_y))
svg8.append('g').attr('transform', 'translate(0,'+(min_y)+')').call(d3.axisBottom(line_scale_x))
