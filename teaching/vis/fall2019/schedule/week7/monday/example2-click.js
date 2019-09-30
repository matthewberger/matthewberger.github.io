function click_interaction_2(all_circles, hue_scale)  {
	all_circles.on('click', function(d)  {
		var is_classed = d3.select(this).classed('selected');
		var fill_color = is_classed ? d3.hcl(0,0,30) : d3.hcl(hue_scale(d.species),40,65)
		d3.select(this).attr('fill', fill_color).classed('selected', !is_classed);
	});
}
