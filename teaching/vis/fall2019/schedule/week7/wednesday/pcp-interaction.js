function pcp_interaction(svg, attributes, scales, min_y, max_y, nba_data)  {
	var x_pad = 10;
	svg.selectAll('empty').data(attributes).enter().append('g').attr('class', 'handle')
		.attr('transform', d => 'translate('+(scales.x(d))+','+(min_y)+')')

	var pcp_brush = d3.brushY().extent([[-x_pad,0],[x_pad,max_y-min_y]])

	pcp_brush.on('brush', function(att)  {
		var rect_select = d3.event.selection;
		var min_d = scales.y[att].invert(min_y+rect_select[1]);
		var max_d = scales.y[att].invert(min_y+rect_select[0]);

		var brushed_data = nba_data.filter(d => {
			return d[att] >= min_d && d[att] <= max_d;
		});

		var data_join = svg.selectAll('.polyline').data(brushed_data, d => d.Name)

		data_join.attr('stroke', d3.hcl(210,40,60)).attr('stroke-width', 3).attr('stroke-opacity', 0.2)
		data_join.exit().attr('stroke', d3.hcl(30,60,75)).attr('stroke-width', 2).attr('stroke-opacity', 0.12)
	});

	d3.selectAll('.handle').call(pcp_brush)
}
