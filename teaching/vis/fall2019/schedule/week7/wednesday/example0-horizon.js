function horizon_graph_process(data,n_levels,band_partitioner)  {
	var band_data_array = [];
	for(var l = 0; l < n_levels; l++)  {
		var band_group = 0, was_a_band = false;
		for(var i = 0; i < data.length; i++)  {
			if(data[i].gdp >= band_partitioner(l))  {
				var new_datum = {year:data[i].year, gdp:data[i].gdp, country:data[i].country, indicator:data[i].indicator, band_level:l, band_group:band_group};
				band_data_array.push(new_datum);
				was_a_band = true;
			}
			else if(was_a_band)  {
				was_a_band = false;
				band_group+=1;
			}
		}
	}
	return band_data_array;
}
