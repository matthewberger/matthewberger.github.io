d3.json('states.json')
	.then(function(data)  {
		plot_states_with_trajectories(data);
	})

function plot_states_with_trajectories(map_data)  {
	var svg2 = d3.select('#svg2');
	var x_range_pad = 20, y_range_pad = 20;
	var width = +svg2.attr('width'), height = +svg2.attr('height');

	var path = d3.geoPath();

	map_data.features = map_data.features.filter(state => (state.properties.NAME != 'Hawaii' && state.properties.NAME != 'Alaska' && state.properties.NAME != 'Puerto Rico'));
	console.log(map_data);

	var projection = d3.geoAlbersUsa().fitSize([width,height], map_data)
	var geo_generator = d3.geoPath().projection(projection)

	svg2.selectAll('path').data(map_data.features).enter().append('path')
		.attr("d", d => geo_generator(d))
		.attr('fill', d3.hcl(0,0,90))
		.attr('stroke', d3.hcl(0,0,40))
		.attr('stroke-width', '0.6')

	var trajectory = d3.range(-90,-80,0.1).map(d => [d,36.146]);
	var mapped_trajectory = trajectory.map(d => projection(d));
	var trajectory_line = d3.line()
		.x(d => d[0])
		.y(d => d[1])

	svg2.append('path').datum(mapped_trajectory)
		.attr("d", d => trajectory_line(d))
		.attr('fill', 'None')
		.attr('stroke', d3.hcl(120,70,40))
		.attr('stroke-width', '2')
}
