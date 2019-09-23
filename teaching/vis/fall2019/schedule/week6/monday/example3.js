var svg3 = d3.select('#svg3');
var width = svg3.attr('width');
var n_levels = 5;
var height = svg3.attr('height')/n_levels;
svg3.attr('height', height);

var y_band_amount = (y_extent[1]-y_extent[0])/n_levels;
var upper_band = y_extent[0];

var band_data_array = [];
for(var l = 0; l < n_levels; l++)  {
	var band_group = 0, was_a_band = false;
	for(var i = 0; i < data_array.length; i++)  {
		if(data_array[i].y >= upper_band)  {
			var new_datum = {x:data_array[i].x, y:data_array[i].y, band_level:l, band_group:band_group};
			band_data_array.push(new_datum);
			was_a_band = true;
		}
		else if(was_a_band)  {
			was_a_band = false;
			band_group+=1;
		}
	}
	upper_band += y_band_amount;
}

var nested_band_data = d3.nest()
	.key(d => d.band_level)
	.key(d => d.band_group)
	.entries(band_data_array)

var area_scale_x = d3.scaleLinear().domain([x_extent[0],x_extent[1]]).range([range_pad,width-range_pad])
var ordinal_lum = d3.scalePoint().domain(d3.range(n_levels)).range([80,30]);
var ordinal_chroma = d3.scalePoint().domain(d3.range(n_levels)).range([30,80]);

svg3.selectAll('level').data(nested_band_data).enter()
	.selectAll('group').data(d => d.values).enter().append('path')
	.attr('d', d => {
		var band_notch = y_extent[0] + d.values[0].band_level*y_band_amount;
		var area_scale_y = d3.scaleLinear().domain([band_notch,(band_notch+y_band_amount)]).range([height-range_pad,range_pad])

		var band_area = d3.area()
			.x(d => area_scale_x(d.x))
			.y0(d => area_scale_y(band_notch))
			.y1(d => area_scale_y(Math.min(d.y,(band_notch+y_band_amount))))

		return band_area(d.values);
	})
	.attr('fill', d => d3.hcl(330,ordinal_chroma(d.values[0].band_level),ordinal_lum(d.values[0].band_level))).attr('stroke', 'None')
