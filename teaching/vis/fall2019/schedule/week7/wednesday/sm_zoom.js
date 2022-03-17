function sm_zoom(plot_groups, axis_groups, scales, band_partitioner, band_area)  {
	var min_year = scales.x.domain()[0].getFullYear(), max_year = scales.x.domain()[1].getFullYear();
	var year_scale = d3.scaleQuantize().domain([-4,4]).range([-3,-2,-1,0,1,2,3]);
	var rect_selection = plot_groups.append('rect')
		.attr('fill', 'None').attr('pointer-events', 'all').attr('width', scales.x.range()[1]).attr('height', scales.y.range()[0])

	d3.select('#svgzoom').append('clipPath').attr('id', 'clip')
		.append('rect').attr('width', scales.x.range()[1]).attr('height', scales.y.range()[0])
	plot_groups.selectAll('.areaplot').attr('clip-path', 'url(#clip)');

	rect_selection.on('wheel', function()  {
		d3.event.preventDefault();
		var delta_y = d3.event.deltaY;
		var mouse_pos = d3.mouse(this);

		var previous_x_domain = scales.x.domain();
		var start_year = previous_x_domain[0].getFullYear(), end_year = previous_x_domain[1].getFullYear();
		var start_data = scales.x.invert(mouse_pos[0]).getFullYear(), end_data = scales.x.invert(mouse_pos[0]-delta_y).getFullYear();
		var data_diff = end_data-start_data;

		var start_alpha = (start_data-start_year)/(end_year-start_year), end_alpha = (1-start_alpha);
		var start_year_increment = year_scale(data_diff*start_alpha), end_year_increment = year_scale(data_diff*end_alpha);
		var new_year_min = new Date(Math.max(min_year,start_year-start_year_increment),0);
		var new_year_max = new Date(Math.min(max_year,end_year+end_year_increment),0);

		scales.x.domain([new_year_min,new_year_max])

		plot_groups.selectAll('.areaplot')
			.attr('d', d => {
				var b_l = d.values[0].band_level;
				var min_band_datum = band_partitioner(b_l), max_band_datum = min_band_datum+band_partitioner.bandwidth();
				scales.y.domain([min_band_datum,max_band_datum])

				band_area
					.y0(d => scales.y(min_band_datum))
					.y1(d => scales.y(Math.min(d.gdp,max_band_datum)))

				return band_area(d.values);
			})

		axis_groups.call(d3.axisBottom(scales.x).ticks(5));
	});
}
