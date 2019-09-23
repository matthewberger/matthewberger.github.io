var svg2 = d3.select('#svg2');
var range_pad = 5;
var width = svg2.attr('width'), height = svg2.attr('height');

var data_array = d3.range(width).map(d => { return {x:d,y:(3*(d/width) + 1*(d/width)*(d/width) + Math.sin(5*2*Math.PI*(d/width)))} });

var x_extent = d3.extent(data_array, d => d.x);
var y_extent = d3.extent(data_array, d => d.y);

var area_scale_x = d3.scaleLinear().domain([x_extent[0],x_extent[1]]).range([range_pad,width-range_pad])
var area_scale_y = d3.scaleLinear().domain([y_extent[0],y_extent[1]]).range([height-range_pad,range_pad])

var area = d3.area()
	.x(d => area_scale_x(d.x))
	.y0(d => area_scale_y(y_extent[0]))
	.y1(d => area_scale_y(d.y))

svg2.selectAll('empty').data([data_array]).enter().append('path').attr('d', d => area(d))
	.attr('fill', '#888').attr('stroke', 'None')
