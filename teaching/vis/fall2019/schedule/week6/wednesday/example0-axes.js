function plot_axes(svg0, area_scale_x,country_scale,indicator_scale, pad, pad_left)  {
	d3.selectAll('.plot').append('g')
		.attr('transform', 'translate(0,'+country_scale.bandwidth()+')')
		.call(d3.axisBottom(area_scale_x).ticks(5))

	svg0.append('g').attr('id', 'indicatoraxis')
		.attr('transform', 'translate(0,'+(pad)+')')
		.call(d3.axisTop(indicator_scale))
	d3.select('#indicatoraxis').selectAll('path').remove()
	d3.select('#indicatoraxis').selectAll('line').remove()

	svg0.append('g').attr('id', 'countryaxis')
		.attr('transform', 'translate('+(pad_left)+',0)')
		.call(d3.axisLeft(country_scale))
	d3.select('#countryaxis').selectAll('path').remove()
	d3.select('#countryaxis').selectAll('line').remove()
}
