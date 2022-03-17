function click_mean_transition(all_rect_legend, iris_data, iris_aggregated_data, scales)  {
	all_rect_legend.on('click', function(species_type)  {
		var is_classed = d3.select(this).classed('selected');
		d3.select(this).attr('stroke', is_classed ? 'None' : 'black').classed('selected', !is_classed);
		var mean_datum = iris_aggregated_data.filter(d => d.value.species==species_type);

		if(is_classed)  {
			var iris_species = iris_data.filter(d => d.species==species_type);
			var species_all_join = d3.select('#meanplot').selectAll('.'+species_type)
				.data(iris_species, (d,i) => d.species+'-'+i);

			species_all_join.exit()
			  .transition().duration(1200)
				.attr('r', 0)
			  .remove()

			species_all_join.enter().append('circle').attr('class', d => d.species)
				.attr('fill', d => d3.hcl(scales.color(d.species),40,65)).attr('stroke', 'black').attr('stroke-width', 0.5).attr('r', 5)
				.attr('cx', scales.x(mean_datum[0].value.mean_width)).attr('cy', scales.y(mean_datum[0].value.mean_length))
				.attr('opacity', 0)
			  .transition().duration(1200)
				.attr('cx', d => scales.x(d.sepalWidth)).attr('cy', d => scales.y(d.sepalLength))
				.attr('opacity', 1)
		}
		else  {
			var species_mean_join = d3.select('#meanplot').selectAll('.'+species_type)
			  .data(mean_datum, d => d.species+'-mean');

			species_mean_join.exit()
				.transition().duration(1200)
				.attr('cx', d => scales.x(mean_datum[0].value.mean_width)).attr('cy', d => scales.y(mean_datum[0].value.mean_length))
			  .remove()

			species_mean_join.enter().append('circle').attr('class', d => d.value.species)
				.attr('fill', d => d3.hcl(scales.color(d.value.species),40,65)).attr('stroke', 'black').attr('stroke-width', 0.5)
				.attr('cx', scales.x(mean_datum[0].value.mean_width)).attr('cy', scales.y(mean_datum[0].value.mean_length))
				.attr('r', 0)
			  .transition().duration(1200)
				.attr('r', 10)
		}
	});
}
