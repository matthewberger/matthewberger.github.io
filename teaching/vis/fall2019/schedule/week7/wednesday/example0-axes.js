function plot_axes(svg, area_scale_x,country_scale,indicator_scale, pad, pad_left)  {
	svg.selectAll('.plot').append('g').attr('class', 'timeaxis')
		.attr('transform', 'translate(0,'+country_scale.bandwidth()+')')
		.call(d3.axisBottom(area_scale_x).ticks(5))

	svg.append('g').attr('id', 'indicatoraxis')
		.attr('transform', 'translate(0,'+(pad)+')')
		.call(d3.axisTop(indicator_scale))
	svg.select('#indicatoraxis').selectAll('path').remove()
	svg.select('#indicatoraxis').selectAll('line').remove()

	svg.append('g').attr('id', 'countryaxis')
		.attr('transform', 'translate('+(pad_left)+',0)')
		.call(d3.axisLeft(country_scale))
	svg.select('#countryaxis').selectAll('path').remove()
	svg.select('#countryaxis').selectAll('line').remove()
}
