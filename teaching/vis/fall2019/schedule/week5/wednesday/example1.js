var svg1 = d3.select('#svg1');
var range_pad = 5, hue_width = 20, cm_start = 40;
var width = svg1.attr('width')-range_pad, height = svg1.attr('height')-range_pad;

var ab_values = [];
var res = 20;
for(var a = 0; a < res; a++)  {
	var b_values = [];
	for(var b = 0; b < res; b++)
		b_values.push([a,b]);
	ab_values.push(b_values);
}
var data_vals = d3.range(res);

var l_values = d3.range(res);

var type_scale = d3.scaleBand().domain(['hsl','hcl']).range([cm_start,width]).paddingInner(0.1);
var x_scale = d3.scaleBand().domain(data_vals).range([0,type_scale.bandwidth()]).paddingInner(0.04)
var y_scale = d3.scaleBand().domain(data_vals).range([type_scale.bandwidth(),0]).paddingInner(0.04)

max_l = 100
var l_scale_1 = d3.scaleLinear().domain([0,res-1]).range([0,max_l]);
var s_scale_1 = d3.scaleLinear().domain([0,res-1]).range([0,1]);
var c_scale_1 = d3.scaleLinear().domain([0,res-1]).range([0,100]);

var h_scale_1 = d3.scaleLinear().domain([0,res-1]).range([0,360]);
var cur_h = 30;
var hy_scale = d3.scaleLinear().domain([0,360]).range([height,range_pad]);

svg1.selectAll('empty').data(l_values).enter().append('rect').attr('class', 'hue')
	.attr('x', range_pad).attr('y', d => y_scale(d)).attr('width', hue_width).attr('height', y_scale.bandwidth())
	.attr('fill', d => d3.hcl(h_scale_1(d),40,50))

svg1.selectAll('empty').data(ab_values).enter().selectAll('empty').data(d => d).enter().append('rect').attr('class', 'hs')
	.attr('x', d => type_scale('hsl')+x_scale(d[0])).attr('y', d => y_scale(d[1]))
	.attr('width', x_scale.bandwidth()).attr('height', y_scale.bandwidth())
	.attr('fill', d => d3.hsl(cur_h,s_scale_1(d[1]),l_scale_1(d[0])/100))

svg1.selectAll('empty').data(ab_values).enter().selectAll('empty').data(d => d).enter().append('rect').attr('class', 'hc')
	.attr('x', d => type_scale('hcl')+x_scale(d[0])).attr('y', d => y_scale(d[1]))
	.attr('width', x_scale.bandwidth()).attr('height', y_scale.bandwidth())
	.attr('fill', d => d3.hcl(cur_h,c_scale_1(d[1]),l_scale_1(d[0])))

svg1.append('line').attr('id', 'tick').attr('stroke', '#999').attr('stroke-width', 4.0)
	.attr('x1', range_pad).attr('x2', range_pad+hue_width).attr('y1', hy_scale(cur_h)).attr('y2', hy_scale(cur_h))

svg1.selectAll('.hue').call(d3.drag().on('drag', _ => {
	cur_h = hy_scale.invert(d3.event.y);
	svg1.select('#tick').attr('y1', hy_scale(cur_h)).attr('y2', hy_scale(cur_h))
	svg1.selectAll('.hs').attr('fill', d => d3.hsl(cur_h,s_scale_1(d[1]),l_scale_1(d[0])/max_l))
	svg1.selectAll('.hc').attr('fill', d => d3.hcl(cur_h,c_scale_1(d[1]),l_scale_1(d[0])))
}));
