function mouse_interaction_axis(all_circles, axis_group, scales, rect_elem)  {
	rect_elem.on('wheel', function(d)  {
		d3.event.preventDefault();
		var delta_y = d3.event.deltaY;
		var mouse_pos = d3.mouse(this);

		var start_data = {}, end_data = {};
		start_data.x = scales.x.invert(mouse_pos[0]);
		end_data.x = scales.x.invert(mouse_pos[0]-delta_y);
		start_data.y = scales.y.invert(mouse_pos[1]);
		end_data.y = scales.y.invert(mouse_pos[1]+delta_y);

		var previous_x_domain = scales.x.domain(), previous_y_domain = scales.y.domain();
		var mouse_alpha_x = (start_data.x-previous_x_domain[0])/(previous_x_domain[1]-previous_x_domain[0]);
		var mouse_alpha_y = (start_data.y-previous_y_domain[0])/(previous_y_domain[1]-previous_y_domain[0]);

		scales.x.domain([previous_x_domain[0] - mouse_alpha_x*(end_data.x-start_data.x), previous_x_domain[1] + (1-mouse_alpha_x)*(end_data.x-start_data.x)]);
		scales.y.domain([previous_y_domain[0] - mouse_alpha_y*(end_data.y-start_data.y), previous_y_domain[1] + (1-mouse_alpha_y)*(end_data.y-start_data.y)]);

		all_circles.attr('cx', d => scales.x(d.sepalWidth))
		all_circles.attr('cy', d => scales.y(d.sepalLength))
		axis_group.xaxis.call(d3.axisBottom(scales.x));
		axis_group.yaxis.call(d3.axisLeft(scales.y));
	});
}
