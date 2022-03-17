var svg7 = d3.select('#svg7');
var width = svg7.attr('width'), height = svg7.attr('height'), pad_range = 40;

var line_data = [];
for(var i = 0; i < 70; i++)
	line_data.push([i,0.5*i + 0.1*i*i - Math.sqrt(i)]);

var min_line_x = d3.min(line_data, d => d[0]), max_line_x = d3.max(line_data, d => d[0])
var min_line_y = d3.min(line_data, d => d[1]), max_line_y = d3.max(line_data, d => d[1])
var min_x = pad_range, max_x = width-pad_range, min_y = height-pad_range, max_y = pad_range;
var pad_x = (max_line_x-min_line_x)*0.02, pad_y = (max_line_y-min_line_y)*0.02;

var line_scale_x = d3.scaleLinear().domain([min_line_x-pad_x,max_line_x+pad_x]).range([min_x,max_x])
var line_scale_y = d3.scaleLinear().domain([min_line_y-pad_y,max_line_y+pad_y]).range([min_y,max_y])

var line = d3.line()
	.x(d => line_scale_x(d[0]))
	.y(d => line_scale_y(d[1]))

svg7.append('path').datum(line_data)
//svg7.selectAll('path').data([line_data]).enter().append('path')
	.attr('d', d => line(d))
	.attr('fill', 'none')
	.attr('stroke', '#777777')
	.attr('stroke-width', '3')

svg7.append('g').attr('transform', 'translate('+pad_range+',0)').call(d3.axisLeft(line_scale_y))
svg7.append('g').attr('transform', 'translate(0,'+(min_y)+')').call(d3.axisBottom(line_scale_x))
