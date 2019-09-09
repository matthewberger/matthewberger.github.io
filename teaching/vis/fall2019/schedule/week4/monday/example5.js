var svg5 = d3.select('#svg5');
var width = svg5.attr('width'), height = svg5.attr('height')

var bar_data = [];
var n_bars = 20;
var num_groups = 4;
for(var i = 0; i < num_groups; i++)  {
	var bar_group = [];
	for(var j = 0; j < n_bars; j++)
		bar_group.push(Math.random());
	bar_data.push({'the_bars':bar_group, 'color_data':i});
}

var bar_group_array = d3.range(num_groups);
var bar_scale_group = d3.scaleBand().domain(bar_group_array).range([0,width]).paddingInner(0.3);
var color_scale = d3.scalePoint().domain(bar_group_array).range([0,360]).padding(0.4);

var bar_x_array = d3.range(n_bars);
var bar_scale_x = d3.scaleBand().domain(bar_x_array).range([0,bar_scale_group.bandwidth()]).paddingInner(0.4);
var bar_scale_y = d3.scaleLinear().domain([0,1]).range([height,0])

var bar_selection = svg5.selectAll('g').data(bar_data).enter().append('g')

svg5.selectAll('g').attr('transform', (d,i) => 'translate('+bar_scale_group(i)+',0)')
svg5.selectAll('g').append('rect')
	.attr('x', 0).attr('width', bar_scale_group.bandwidth()).attr('y', 0).attr('height', height)
	.attr('fill', d => d3.hcl(color_scale(d.color_data), 40, 70))

bar_selection.selectAll('newrects').data(d => d.the_bars).enter().append('rect')
	.attr('class', 'barrect')

svg5.selectAll('g').selectAll('.barrect')
	.attr('x', (d,i) => bar_scale_x(i)).attr('width', bar_scale_x.bandwidth())
	.attr('y', d => bar_scale_y(d)).attr('height', d => bar_scale_y(0)-bar_scale_y(d))
	.attr('fill', '#555')
