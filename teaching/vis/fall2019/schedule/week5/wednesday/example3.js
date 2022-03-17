var svg3 = d3.select('#svg3');
var range_pad = 5, hue_width = 20, cm_start = 40;
var width = svg3.attr('width')-range_pad, height = svg3.attr('height')-range_pad;

var res = 10;
var data_vals = d3.range(res);

var x_scale = d3.scaleBand().domain(data_vals).range([range_pad,width-range_pad]).paddingInner(0.04)
var luminance_scale = d3.scaleLinear().domain([0,res-1]).range([0,100])

var hue = 10;
var chroma = 70;

svg3.selectAll('empty').data(data_vals).enter().append('rect')
	.attr('x', d => x_scale(d)).attr('y', d => range_pad)
	.attr('width', x_scale.bandwidth()).attr('height', x_scale.bandwidth())
	.attr('fill', d => d3.hcl(hue,chroma,luminance_scale(d)))
