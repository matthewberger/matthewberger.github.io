var svg5 = d3.select('#svg5');
var range_pad = 5, hue_width = 20, cm_start = 40;
var width = svg5.attr('width')-range_pad, height = svg5.attr('height')-range_pad;

var res = 10;
var data_vals = d3.range(res);

var x_scale = d3.scaleBand().domain(data_vals).range([range_pad,width-range_pad]).paddingInner(0.04)
var luminance_scale = d3.scaleLinear().domain([0,res-1]).range([5,95])
var chroma_scale = d3.scaleLinear().domain([0,res-1]).range([120,0])
var hue_scale = d3.scaleLinear().domain([0,3,6,9]).range([0,80,120,160,200])

var hue = 10;
var chroma = 70;

svg5.selectAll('empty').data(data_vals).enter().append('rect')
	.attr('x', d => x_scale(d)).attr('y', d => range_pad)
	.attr('width', x_scale.bandwidth()).attr('height', x_scale.bandwidth())
	.attr('fill', d => d3.hcl(hue_scale(d),50,luminance_scale(d)))
