var svg0 = d3.select('#svg0');
var range_pad = 5, lum_width = 20, cm_start = 40;
var width = svg0.attr('width')-range_pad, height = svg0.attr('height')-range_pad;

var ab_values = [];
var res = 15;
for(var a = 0; a < res; a++)  {
	var b_values = [];
	for(var b = 0; b < res; b++)
		b_values.push([a,b]);
	ab_values.push(b_values);
}
var data_vals = d3.range(res);

var l_values = d3.range(res);

var type_scale = d3.scaleBand().domain(['lab','hsl','hcl']).range([cm_start,width]).paddingInner(0.1);
var x_scale = d3.scaleBand().domain(data_vals).range([0,type_scale.bandwidth()]).paddingInner(0.08)
var y_scale = d3.scaleBand().domain(data_vals).range([type_scale.bandwidth(),0]).paddingInner(0.08)

var a_scale = d3.scaleLinear().domain([0,res-1]).range([-120,120]);
var b_scale = d3.scaleLinear().domain([0,res-1]).range([-120,120]);

var h_scale = d3.scaleLinear().domain([0,res-1]).range([0,360]);
var s_scale = d3.scaleLinear().domain([0,res-1]).range([0,1]);

var c_scale = d3.scaleLinear().domain([0,res-1]).range([0,120]);

var cur_l = 50, max_l = 100;
var l_scale = d3.scaleLinear().domain([0,res-1]).range([0,max_l]);
var ly_scale = d3.scaleLinear().domain([0,max_l]).range([height,range_pad]);

svg0.selectAll('empty').data(ab_values).enter().selectAll('empty').data(d => d).enter().append('rect').attr('class', 'ab')
	.attr('x', d => type_scale('lab')+x_scale(d[0])).attr('y', d => y_scale(d[1]))
	.attr('width', x_scale.bandwidth()).attr('height', y_scale.bandwidth())
	.attr('fill', d => d3.lab(cur_l,a_scale(d[0]),b_scale(d[1])))

svg0.selectAll('empty').data(l_values).enter().append('rect').attr('class', 'lum')
	.attr('x', range_pad).attr('y', d => y_scale(d)).attr('width', lum_width).attr('height', y_scale.bandwidth())
	.attr('fill', d => d3.lab(l_scale(d),0,0))

svg0.selectAll('empty').data(ab_values).enter().selectAll('empty').data(d => d).enter().append('rect').attr('class', 'hs')
	.attr('x', d => type_scale('hsl')+x_scale(d[0])).attr('y', d => y_scale(d[1]))
	.attr('width', x_scale.bandwidth()).attr('height', y_scale.bandwidth())
	.attr('fill', d => d3.hsl(h_scale(d[0]),s_scale(d[1]),cur_l/100))

svg0.selectAll('empty').data(ab_values).enter().selectAll('empty').data(d => d).enter().append('rect').attr('class', 'hc')
	.attr('x', d => type_scale('hcl')+x_scale(d[0])).attr('y', d => y_scale(d[1]))
	.attr('width', x_scale.bandwidth()).attr('height', y_scale.bandwidth())
	.attr('fill', d => d3.hcl(h_scale(d[0]),c_scale(d[1]),cur_l))

svg0.append('line').attr('id', 'tick').attr('stroke', d3.lab(50,80,-30)).attr('stroke-width', 4.0)
	.attr('x1', range_pad).attr('x2', range_pad+lum_width).attr('y1', ly_scale(cur_l)).attr('y2', ly_scale(cur_l))

svg0.selectAll('.lum').call(d3.drag().on('drag', _ => {
	cur_l = ly_scale.invert(d3.event.y);
	svg0.select('#tick').attr('y1', ly_scale(cur_l)).attr('y2', ly_scale(cur_l))
	svg0.selectAll('.ab').attr('fill', d => d3.lab(cur_l,a_scale(d[0]),b_scale(d[1])))
	svg0.selectAll('.hs').attr('fill', d => d3.hsl(h_scale(d[0]),s_scale(d[1]),cur_l/100))
	svg0.selectAll('.hc').attr('fill', d => d3.hcl(h_scale(d[0]),c_scale(d[1]),cur_l))
}));
