var svg3 = d3.select('#svg3');
var width = svg3.attr('width');
var n_levels = 4;
var height = svg3.attr('height')/n_levels;
svg3.attr('height', height);

var band_partitioner = d3.scaleBand().domain(d3.range(n_levels)).range(y_extent)

var band_data_array = [];
for(var l = 0; l < n_levels; l++)  {
	var band_group = 0, was_a_band = false;
	for(var i = 0; i < data_array.length; i++)  {
		if(data_array[i].y >= band_partitioner(l))  {
			var new_datum = {x:data_array[i].x, y:data_array[i].y, band_level:l, band_group:band_group};
			band_data_array.push(new_datum);
			was_a_band = true;
		}
		else if(was_a_band)  {
			was_a_band = false;
			band_group+=1;
		}
	}
}

var nested_band_data = d3.nest()
	.key(d => d.band_level)
	.key(d => d.band_group)
	.entries(band_data_array)

var area_scale_x = d3.scaleLinear().domain([x_extent[0],x_extent[1]]).range([range_pad,width-range_pad])
var ordinal_lum = d3.scalePoint().domain(d3.range(n_levels)).range([80,30]);
var ordinal_chroma = d3.scalePoint().domain(d3.range(n_levels)).range([30,80]);

var band_area = d3.area().x(d => area_scale_x(d.x))
var area_scale_y = d3.scaleLinear().range([height-range_pad,range_pad])

svg3.selectAll('level').data(nested_band_data).enter()
	.selectAll('group').data(d => d.values).enter().append('path')
	.attr('d', d => {
		var b_l = d.values[0].band_level;
		var min_band_datum = band_partitioner(b_l), max_band_datum = min_band_datum+band_partitioner.bandwidth();
		area_scale_y.domain([min_band_datum,max_band_datum])

		band_area
			.y0(d => area_scale_y(min_band_datum))
			.y1(d => area_scale_y(Math.min(d.y,max_band_datum)))

		return band_area(d.values);
	})
	.attr('fill', d => d3.hcl(330,ordinal_chroma(d.values[0].band_level),ordinal_lum(d.values[0].band_level))).attr('stroke', 'None')
