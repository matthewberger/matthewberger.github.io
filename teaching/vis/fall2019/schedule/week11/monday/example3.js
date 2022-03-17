d3.json('states.json')
	.then(function(data)  {
		plot_hovering_states(data);
	})

function plot_hovering_states(map_data)  {
	var svg3 = d3.select('#svg3');
	var x_range_pad = 20, y_range_pad = 20;
	var width = +svg3.attr('width'), height = +svg3.attr('height');

	var path = d3.geoPath();

	map_data.features = map_data.features.filter(state => (state.properties.NAME != 'Hawaii' && state.properties.NAME != 'Alaska' && state.properties.NAME != 'Puerto Rico'));
	console.log(map_data);

	var projection = d3.geoAlbersUsa().fitSize([width,height], map_data)
	var geo_generator = d3.geoPath().projection(projection)

	svg3.selectAll('path').data(map_data.features).enter().append('path')
		.attr("d", d => geo_generator(d))
		.attr('fill', d3.hcl(0,0,90))
		.attr('stroke', d3.hcl(0,0,40))
		.attr('stroke-width', '0.6')

	svg3.selectAll('path').on('mouseover', function(d)  {
		d3.select(this).attr('fill', d3.hcl(350, 60, 50));
	});
	svg3.selectAll('path').on('mouseout', function(d)  {
		d3.select(this).attr('fill', d3.hcl(0,0,90));
	});
}
