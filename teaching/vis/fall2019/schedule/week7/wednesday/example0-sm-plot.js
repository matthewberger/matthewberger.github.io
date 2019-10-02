function horizon_graph_plot(selection,d_arr, band_partitioner,area_scale_y,band_area, ordinal_lum,ordinal_chroma)  {
	var nested_band_data = d3.nest()
		.key(d => d.band_level)
		.key(d => d.band_group)
		.entries(d_arr.value)

	selection.selectAll('horizongraph').data(nested_band_data).enter()
		.selectAll('group').data(d => d.values).enter().append('path').attr('class', 'areaplot')
		.attr('d', d => {
			var b_l = d.values[0].band_level;
			var min_band_datum = band_partitioner(b_l), max_band_datum = min_band_datum+band_partitioner.bandwidth();
			area_scale_y.domain([min_band_datum,max_band_datum])

			band_area
				.y0(d => area_scale_y(min_band_datum))
				.y1(d => area_scale_y(Math.min(d.gdp,max_band_datum)))

			return band_area(d.values);
		})
		.attr('fill', d => d3.hcl(140,ordinal_chroma(d.values[0].band_level),ordinal_lum(d.values[0].band_level)))
		.attr('stroke', 'None')
}
