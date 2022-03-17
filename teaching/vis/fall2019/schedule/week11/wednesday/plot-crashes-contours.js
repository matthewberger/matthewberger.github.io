d3.json('tn.json').then(function(data_1)  {
	d3.csv('car-crashes.csv').then(function(data_2)  {
		tn_counties = data_1;
		car_crashes = data_2;
		plot_contours();
	})
})

function plot_contours()  {
	var path = d3.geoPath();

	var svg0 = d3.select('#svg0');
	var width = +svg0.attr('width'), height = +svg0.attr('height');

	tn_counties.features = tn_counties.features.filter(county => county.properties.COUNTYFP=='037');

	var all_incidents = [];
	car_crashes.forEach(function(d)  {
		all_incidents.push([d.longitude,d.latitude]);
	})

	var projection = d3.geoAzimuthalEqualArea().rotate([90,0]).fitSize([width,height], tn_counties)
	var geo_generator = d3.geoPath().projection(projection)

	var projected_incidents = all_incidents.map(d => projection(d));

	var incident_density = d3.contourDensity().x(d => d[0]).y(d => d[1])
		.size([1.5*width,1.5*height])
		.bandwidth([5])
		.cellSize([2])
		.thresholds(100)
		(projected_incidents);

	var lum_scale = d3.scaleLinear().domain(d3.extent(incident_density, d => d.value)).range([10,100]);
	var chroma_scale = d3.scaleLinear().domain(d3.extent(incident_density, d => d.value)).range([90,3]);

	svg0.selectAll('countysubs').data(tn_counties.features).enter().append('path')
		.attr("d", geo_generator)
		.attr('fill', '#eee')
		.attr('fill-opacity', '1.0')
		.attr('stroke', '#555')
		.attr('stroke-width', '0.4')

	svg0.selectAll('circle').data(projected_incidents).enter().append('circle')
		.attr('fill', '#bbb')
		.attr('cx', d => d[0])
		.attr('cy', d => d[1])
		.attr('r', 2)
		.attr('fill-opacity', '0.4')

	svg0.selectAll('densities').data(incident_density).enter().append('path')
		.attr('d', d3.geoPath())
		.attr('fill', d => d3.hcl(0,chroma_scale(d.value),lum_scale(d.value)))
		.attr('stroke', 'none')
}
