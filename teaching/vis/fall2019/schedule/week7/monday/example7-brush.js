function mouse_brush_7(plot_group, hue_scale, width,height)  {
	var brush = d3.brushX().extent([[0,0],[width,height]])

	brush.on('brush', function()  {
		var rect_select = d3.event.selection;
		plot_group.selectAll('circle')
			.filter(function()  {
				var r = +d3.select(this).attr('r');
				var visual_x = +d3.select(this).attr('cx');
				return (visual_x+r) >= rect_select[0] && (visual_x-r) <= rect_select[1];
			})
			.attr('fill', d => d3.hcl(hue_scale(d.species),40,65))
	});

	plot_group.call(brush)
}
