function click_interaction_1(all_circles, hue_scale)  {
	all_circles.on('click', function(d)  {
		d3.select(this).attr('fill', d3.hcl(hue_scale(d.species),40,65))
	});
}
