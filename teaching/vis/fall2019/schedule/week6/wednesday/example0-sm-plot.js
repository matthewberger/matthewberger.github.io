function horizon_graph_plot(selection, d_arr, min_gdp,band_amount, plot_height, scale_x,ordinal_lum,ordinal_chroma)  {
	var nested_band_data = d3.nest()
		.key(d => d.band_level)
		.key(d => d.band_group)
		.entries(d_arr.value)

	selection.selectAll('horizongraph').data(nested_band_data).enter()
		.selectAll('group').data(d => d.values).enter().append('path')
		.attr('d', d => {
			var band_notch = min_gdp + d.values[0].band_level*band_amount;
			var area_scale_y = d3.scaleLinear().domain([band_notch,(band_notch+band_amount)]).range([plot_height,0])

			var band_area = d3.area()
				.x(d => scale_x(d.year))
				.y0(d => area_scale_y(band_notch))
				.y1(d => area_scale_y(Math.min(d.gdp,(band_notch+band_amount))))

			return band_area(d.values);
		})
		.attr('fill', d => d3.hcl(140,ordinal_chroma(d.values[0].band_level),ordinal_lum(d.values[0].band_level)))
		.attr('stroke', 'None')
}
