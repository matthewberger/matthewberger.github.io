var svg4 = d3.select('#svg4');
var range_pad = 5, hue_width = 20, cm_start = 40;
var width = svg4.attr('width')-range_pad, height = svg4.attr('height')-range_pad;

var res = 10;
var data_vals = [];
for(var i = 0; i < res; i++)  {
	for(var j = 0; j < res; j++)
		data_vals.push({'l':i,'h':j});
}

var x_scale = d3.scaleBand().domain(d3.range(res)).range([range_pad,width-range_pad]).paddingInner(0.04)
var y_scale = d3.scaleBand().domain(d3.range(res)).range([range_pad,height-range_pad]).paddingInner(0.04)
var luminance_scale = d3.scaleLinear().domain([0,res-1]).range([0,98])
var hue_scale = d3.scaleLinear().domain([0,res]).range([0,360])
var chroma_scale = d3.scaleLinear().domain([0,res-1]).range([120,0])

var hue = 10;
var chroma = 70;

svg4.selectAll('empty').data(data_vals).enter().append('rect')
	.attr('x', d => x_scale(d.l)).attr('y', d => y_scale(d.h))
	.attr('width', x_scale.bandwidth()).attr('height', x_scale.bandwidth())
	.attr('fill', d => d3.hcl(hue_scale(d.h),chroma_scale(d.l),luminance_scale(d.l)))
