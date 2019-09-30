d3.json('iris.json')
  .then(function(data)  {
	  iris_data = data;
	  plot_example3();
})

function plot_example3() {
	var svg_elem = d3.select('#svg3');
	var pad = 50;
	var width = svg_elem.attr('width'), height = svg_elem.attr('height');
	var actual_width = height-2*pad, actual_height = height-2*pad;

	var sepal_width_extent = d3.extent(iris_data, d => d.sepalWidth);
	var sepal_length_extent = d3.extent(iris_data, d => d.sepalLength);
	var x_data_pad = 0.03*(sepal_width_extent[1]-sepal_width_extent[0]), y_data_pad = 0.03*(sepal_length_extent[1]-sepal_length_extent[0]);
	var x_scale = d3.scaleLinear()
		.domain([sepal_width_extent[0]-x_data_pad,sepal_width_extent[1]+x_data_pad])
		.range([0,actual_width]).nice();
	var y_scale = d3.scaleLinear()
		.domain([sepal_length_extent[0]-y_data_pad,sepal_length_extent[1]+y_data_pad])
		.range([actual_height,0]).nice();

	var unique_species = d3.set(iris_data, d => d.species).values();
	var hue_scale = d3.scalePoint().domain(unique_species).range([0,360]).padding(0.5);

	var plot_group = svg_elem.append('g').attr('transform', 'translate('+pad+','+pad+')')
	plot_group.selectAll('empty').data(iris_data).enter().append('circle')
		.attr('cx', d => x_scale(d.sepalWidth)).attr('cy', d => y_scale(d.sepalLength))
		.attr('fill', d => d3.hcl(hue_scale(d.species),0,30)).attr('stroke', 'black').attr('stroke-width', 0.5).attr('r', 5)

	plot_group.append('g').attr('transform', 'translate('+0+','+0+')').call(d3.axisLeft(y_scale));
	plot_group.append('g').attr('transform', 'translate('+0+','+(actual_height)+')').call(d3.axisBottom(x_scale));

	plot_group.append('text').text('Sepal Width')
		.attr('transform', 'translate('+(actual_width/2)+','+(actual_height+40)+')').attr('text-anchor', 'middle')
	plot_group.append('text').text('Sepal Length')
		.attr('transform', 'translate('+(-35)+','+(actual_height/2)+') rotate(270)').attr('text-anchor', 'middle')

	var legend_scale = d3.scaleBand().domain(unique_species).range([80,0]).paddingInner(0.1);
	var species_legend_group = svg_elem.append('g').attr('transform', 'translate('+(pad+actual_width+15)+','+pad+')')
	var species_enter = species_legend_group.selectAll('empty').data(unique_species).enter();
	species_enter.append('rect')
		.attr('y', d => legend_scale(d)).attr('width', legend_scale.bandwidth()).attr('height', legend_scale.bandwidth())
		.attr('fill', d => d3.hcl(hue_scale(d),40,65))
	species_enter.append('text')
		.attr('x', (4+legend_scale.bandwidth())).attr('y', d => legend_scale(d)+legend_scale.bandwidth()/2)
		.text(d => d).attr('alignment-baseline', 'middle')

	click_interaction_3(species_legend_group.selectAll('rect'),plot_group.selectAll('circle'),hue_scale);
}
