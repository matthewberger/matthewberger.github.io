d3.json('states.json')
	.then(function(data)  {
		plot_states(data);
	})

function plot_states(map_data)  {
	var svg0 = d3.select('#svg0');
	var x_range_pad = 20, y_range_pad = 20;
	var width = +svg0.attr('width'), height = +svg0.attr('height');

	var path = d3.geoPath();

	map_data.features = map_data.features.filter(state => (state.properties.NAME != 'Hawaii' && state.properties.NAME != 'Alaska' && state.properties.NAME != 'Puerto Rico'));
	console.log(map_data);

	var projection = d3.geoAlbersUsa().fitSize([width,height], map_data)
	var geo_generator = d3.geoPath().projection(projection)

	svg0.selectAll('path').data(map_data.features).enter().append('path')
		.attr("d", d => geo_generator(d))
		.attr('fill', d3.hcl(0,0,90))
		.attr('stroke', d3.hcl(0,0,40))
		.attr('stroke-width', '0.6')
}
