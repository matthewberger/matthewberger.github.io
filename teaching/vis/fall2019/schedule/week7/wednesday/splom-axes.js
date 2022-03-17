function create_axes_example1(base_svg, y_shift, att_scale)  {
	base_svg.append('g').attr('id', 'leftaxis')
		.attr('transform', 'translate(66,0)').call(d3.axisLeft(att_scale))

	d3.select('#leftaxis').selectAll('path').remove()
	d3.select('#leftaxis').selectAll('line').remove()

	base_svg.append('g').attr('id', 'bottomaxis')
		.attr('transform', 'translate(0,'+y_shift+')').call(d3.axisBottom(att_scale))

	d3.select('#bottomaxis').selectAll('path').remove()
	d3.select('#bottomaxis').selectAll('line').remove()
}
