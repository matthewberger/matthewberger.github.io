function click_interaction_3(all_rect_legend, all_circles, hue_scale)  {
	all_rect_legend.on('click', function(species_type)  {
		var is_classed = d3.select(this).classed('selected');
		var fill_color = is_classed ? d3.hcl(0,0,30) : d3.hcl(hue_scale(species_type),40,65)

		all_circles.filter(d => d.species==species_type).attr('fill', fill_color)
		d3.select(this).attr('stroke', is_classed ? 'None' : 'black').classed('selected', !is_classed);
	});
}
