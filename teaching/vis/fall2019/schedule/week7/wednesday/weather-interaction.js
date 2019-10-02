function weather_interaction(svg, seattle_data, scales, nester)  {
	var brush = d3.brush().extent([[0,0],[scales.x.range()[1],scales.y.range()[0]]])

	brush.on('brush', function()  {
		svg.select('#windtemps').selectAll('circle').attr('fill', '#222').attr('opacity', 0.12)

		var rect_select = d3.event.selection;
		var brushed_data = seattle_data.filter(d => {
			var r = scales.size(d.temp_high-d.temp_low);
			var visual_x = scales.x(d.wind), visual_y = scales.y(.5*(d.temp_low+d.temp_high));
			return (visual_x+r) >= rect_select[0][0] && (visual_x-r) <= rect_select[1][0] &&
				   (visual_y+r) >= rect_select[0][1] && (visual_y-r) <= rect_select[1][1];
		});

		svg.select('#windtemps').selectAll('circle')
		  .data(brushed_data, d => d.key).attr('fill', d3.hcl(100,50,67)).attr('opacity', 0.4)

		var data_by_month = nester.entries(brushed_data);
		var data_join = svg.select('#timetemps').selectAll('.bar').data(data_by_month, d => d.key)

		data_join.exit().remove()

		data_join = data_join.enter().append('rect')
			.attr('fill', d3.hcl(100,50,67)).attr('class', 'bar')
		  .merge(data_join)
			.attr('x', d => scales.time(new Date(2012,d.key,1))).attr('width', scales.time.bandwidth())
			.attr('y', d => scales.y(d.value.ave_high)).attr('height', d => scales.y(d.value.ave_low) - scales.y(d.value.ave_high))
	});

	svg.select('#circleplot').call(brush)
}
