function create_axes_example0(base_svg, x_shift, y_shift, x_scale, y_scale, to_rotate)  {
	base_svg.append('g').attr('class', 'leftaxis')
		.attr('transform', 'translate('+x_shift+',0)')
		.call(d3.axisLeft(y_scale))
	base_svg.append('g').attr('class', 'bottomaxis')
		.attr('transform', 'translate(0,'+y_shift+')')
		.call(d3.axisBottom(x_scale))

	if(to_rotate)  {
		base_svg.select('.bottomaxis').selectAll('text')
			.attr('transform', 'translate('+(-x_scale.bandwidth()/2)+',7) rotate(270)').attr('text-anchor', 'end').attr('text-anchor', 'end')
	}
}
