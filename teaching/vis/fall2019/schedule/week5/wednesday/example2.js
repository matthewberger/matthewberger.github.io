var svg2 = d3.select('#svg2');
var range_pad = 5, hue_width = 20, cm_start = 40;
var width = svg2.attr('width')-range_pad, height = svg2.attr('height')-range_pad;

var xy_values = [];
var res = 7;
for(var x = 0; x < res; x++)  {
	var b_values = [];
	for(var y = 0; y < res; y++)
		b_values.push([x,y]);
	xy_values.push(b_values);
}
var data_vals = d3.range(res);

var l_values = d3.range(res);

var type_scale = d3.scaleBand().domain(['hsl','hcl']).range([cm_start,width]).paddingInner(0.1);
var x_scale = d3.scaleBand().domain(data_vals).range([range_pad,height-range_pad]).paddingInner(0.04)
var y_scale = d3.scaleBand().domain(data_vals).range([height-range_pad,range_pad]).paddingInner(0.04)
var x_unit_scale = d3.scaleLinear().domain([0,res-1]).range([0,1])
var y_unit_scale = d3.scaleLinear().domain([0,res-1]).range([0,1])

var x_hue = 75, y_hue = x_hue+180;

svg2.selectAll('empty').data(xy_values).enter().selectAll('empty').data(d => d).enter().append('rect').attr('class', 'hs')
	.attr('x', d => x_scale(d[0])).attr('y', d => y_scale(d[1]))
	.attr('width', x_scale.bandwidth()).attr('height', y_scale.bandwidth())
	.attr('fill', d => {
		var x_unit = x_unit_scale(d[0]), y_unit = y_unit_scale(d[1]);
		var normalized_sum = x_unit+y_unit;
		var selected_hue = x_unit > y_unit ? x_hue : y_hue;
		var chroma = Math.abs(x_unit-y_unit)*140;
		var luminance = ((normalized_sum/2.0))*100;
		return d3.hcl(selected_hue,chroma,luminance);
	})
