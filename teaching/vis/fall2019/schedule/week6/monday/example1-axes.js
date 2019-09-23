function create_axes_example1(base_svg, x_shift, y_shift, scale_x, scales_y, selected_atts)  {
	base_svg.selectAll('axes').data(selected_atts).enter().append('g').attr('transform', d => 'translate('+scale_x(d)+',0)').attr('class', 'pcpax')
		.each(function(d,i) {
			d3.select(this).call(d3.axisLeft(scales_y[i]))
		})
	base_svg.selectAll('axestext').data(selected_atts).enter()
		.append('g').attr('transform', d => 'translate('+scale_x(d)+','+(base_svg.attr('height')-(y_shift-15))+')')
		.append('text').text(d => d).attr('text-anchor', 'middle').attr('font-size', 12)
}
