function mouse_interaction_5(all_circles, hue_scale)  {
	all_circles.on('mouseover', function(d)  {
		d3.select(this).attr('fill', d3.hcl(hue_scale(d.species),40,65))
	});
	all_circles.on('mouseout', function(d)  {
		d3.select(this).attr('fill', d3.hcl(hue_scale(d.species),0,30))
	});
}
