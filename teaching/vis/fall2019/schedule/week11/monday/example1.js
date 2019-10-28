d3.json('states.json')
	.then(function(data)  {
		state_data = data;
		return d3.json('counties.json')
	}).then(function(data) {
		counties_data = data;
		plot_counties();
	});

function plot_counties()  {
	var svg1 = d3.select('#svg1');
	var x_range_pad = 20, y_range_pad = 20;
	var width = +svg1.attr('width'), height = +svg1.attr('height');

	var path = d3.geoPath();

	state_data.features = state_data.features.filter(state => (state.properties.NAME != 'Hawaii' && state.properties.NAME != 'Alaska' && state.properties.NAME != 'Puerto Rico'));
	valid_state_fps = state_data.features.map(state => state.properties.STATEFP);

	counties_data.features = counties_data.features.filter(county => valid_state_fps.some(state_fp => county.properties.STATEFP==state_fp));

	var projection = d3.geoAlbersUsa().fitSize([width,height], counties_data)
	var geo_generator = d3.geoPath().projection(projection)

	svg1.selectAll('path').data(counties_data.features).enter().append('path')
		.attr("d", d => geo_generator(d))
		.attr('fill', d3.hcl(0,0,90))
		.attr('stroke', d3.hcl(0,0,40))
		.attr('stroke-width', '0.6')
}
