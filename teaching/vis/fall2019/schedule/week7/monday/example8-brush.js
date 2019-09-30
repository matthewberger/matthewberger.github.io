function mouse_brush_8(plot_group, hue_scale, width,height)  {
	var brush = d3.brush().extent([[0,0],[width,height]])

	brush.on('brush', function()  {
		var rect_select = d3.event.selection;
		var all_circs = plot_group.selectAll('circle')
		all_circs.attr('fill', d => d3.hcl(hue_scale(d.species),0,30))
		all_circs
			.filter(function()  {
				var r = +d3.select(this).attr('r');
				var visual_x = +d3.select(this).attr('cx'), visual_y = +d3.select(this).attr('cy');
				return (visual_x+r) >= rect_select[0][0] && (visual_x-r) <= rect_select[1][0] &&
					   (visual_y+r) >= rect_select[0][1] && (visual_y-r) <= rect_select[1][1];
			})
			.attr('fill', d => d3.hcl(hue_scale(d.species),40,65))
	});

	plot_group.call(brush)
}
