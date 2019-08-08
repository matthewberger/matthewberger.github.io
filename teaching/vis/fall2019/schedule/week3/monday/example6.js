var rect_floor = 350

var bar_data = [];
var n_bars = 20;
var num_groups = 4;
for(var i = 0; i < num_groups; i++)  {
	var h = 360.0*(0.5/num_groups+i/(num_groups+1)), c = 40, l = 70;
	var back_fill = d3.hcl(h,c,l);

	var bar_group = [];
	for(var j = 0; j < n_bars; j++)  {
		var bar_height = rect_floor/20+(rect_floor-rect_floor/20)*Math.random();
		bar_group.push(bar_height)
	}

	bar_data.push({'the_bars':bar_group, 'back_fill':back_fill, 'rect_group':i});
}

var bar_width = 500 / ((n_bars)*num_groups);
var group_width = 500 / num_groups;

var svg6 = d3.select('#svg6');
var group_selection = svg6.selectAll('g').data(bar_data, d => d.rect_group).enter().append('g')

svg6.selectAll('g').attr('transform', (d,i) => 'translate('+i*group_width+',0)')
svg6.selectAll('g').append('rect')
	.attr('x', 0).attr('width', group_width).attr('y', 0).attr('height', rect_floor)
	.attr('fill', d => d.back_fill).attr('class', 'backrect')

group_selection.selectAll('newrects').data(d => d.the_bars).enter().append('rect')
	.attr('class', 'barrect')

var do_select_all = false;
if(do_select_all)  {
	svg6.selectAll('.barrect')
		.attr('x', (d,i) => i*bar_width).attr('width', bar_width).attr('y', d => rect_floor-d).attr('height', d => d)
		.attr('fill', '#555')
}
else  {
	svg6.selectAll('g').selectAll('.barrect')
		.attr('x', (d,i) => i*bar_width).attr('width', bar_width).attr('y', d => rect_floor-d).attr('height', d => d)
		.attr('fill', '#555')
}
