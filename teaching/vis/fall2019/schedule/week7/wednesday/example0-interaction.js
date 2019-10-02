function show_tick(svg, scale_x, width, height)  {
	svg.selectAll('.plot').append('rect').attr('class', 'hoverrect')
		.attr('fill', 'None').attr('pointer-events', 'all').attr('width', width).attr('height', height)

	svg.selectAll('.hoverrect').on('mousemove', function(d,i)  {
		var mouse_pos = d3.mouse(this);
		var year = new Date(scale_x.invert(mouse_pos[0]).getFullYear().toString());
		var quantized_pos = scale_x(year);
		svg.selectAll('.linetick').remove()
		svg.selectAll('.plot').append('line').attr('class', 'linetick')
			.attr('fill', 'None').attr('stroke', d3.hcl(40,80,20)).attr('stroke-width', 1.5)
			.attr('x1', quantized_pos).attr('x2', quantized_pos).attr('y1', 0).attr('y2', height)
	})

}
