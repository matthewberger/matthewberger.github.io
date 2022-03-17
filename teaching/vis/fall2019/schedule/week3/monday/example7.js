/*
var new_bar_data = [];
var rect_floor = 350;
var new_rect_floor = 125;
var n_bars = 20;
var num_new_groups = 4;
for(var i = 2; i < num_new_groups; i++)  {
	var h = 360.0*(0.5/num_groups+i/(num_groups+1)), c = 50, l = 90;
	var back_fill = d3.hcl(h,c,l);

	var bar_group = [];
	for(var j = 0; j < n_bars; j++)  {
		var bar_height = new_rect_floor/20+(new_rect_floor-new_rect_floor/20)*Math.random();
		bar_group.push(bar_height)
	}

	new_bar_data.push({'the_bars':bar_group, 'back_fill':back_fill, 'rect_group':i});
}

var group_selection = svg6.selectAll('g').data(new_bar_data, d => d.rect_group)
group_selection.select('.backrect')

group_selection.selectAll('.backrect')
	.attr('fill', d => d.back_fill)

group_selection.selectAll('.barrect').data(d => d.the_bars)
	.attr('y', d => rect_floor-d).attr('height', d => d)
*/
