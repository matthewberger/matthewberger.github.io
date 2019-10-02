function splom_interaction(size, all_data, x_quantitative_scales, y_quantitative_scales)  {
	var brush = d3.brush().extent([[0,0],[size,size]])

	brush.on('start', function(d,i)  {
		d3.selectAll('.splom').selectAll('.selection').attr('style', 'display: none;')
		d3.selectAll('.splom').selectAll('.handle').attr('style', 'display: none;')
	})

	brush.on('brush', function(d,i)  {
		var rect_select = d3.event.selection;
		var x_scale = x_quantitative_scales[d[0]], y_scale = y_quantitative_scales[d[1]];
		var min_data_x = x_scale.invert(rect_select[0][0]), min_data_y = y_scale.invert(rect_select[1][1])
		var max_data_x = x_scale.invert(rect_select[1][0]), max_data_y = y_scale.invert(rect_select[0][1])
		var selected_data = all_data.filter(player => {
			return player[d[0]] >= min_data_x && player[d[1]] >= min_data_y && player[d[0]] <= max_data_x && player[d[1]] <= max_data_y;
		});

		d3.selectAll('.splom').selectAll('.pointselection').data(selected_data, player => player.id).exit()
			.classed('pointselection', false).attr('fill', d3.hcl(20,60,70))
		d3.selectAll('.splom').selectAll('circle').data(selected_data, player => player.id)
			.classed('pointselection', true).attr('fill', d3.hcl(200,60,70))
	});

	d3.selectAll('.splom').call(brush)
}
