function horizon_graph_process(data,n_levels,min_gdp,gdp_band)  {
	var band_data_array = [];
	var upper_band = min_gdp;
	for(var l = 0; l < n_levels; l++)  {
		var band_group = 0, was_a_band = false;
		for(var i = 0; i < data.length; i++)  {
			if(data[i].gdp >= upper_band)  {
				var new_datum = {year:data[i].year, gdp:data[i].gdp, country:data[i].country, indicator:data[i].indicator, band_level:l, band_group:band_group};
				band_data_array.push(new_datum);
				was_a_band = true;
			}
			else if(was_a_band)  {
				was_a_band = false;
				band_group+=1;
			}
		}
		upper_band += gdp_band;
	}
	return band_data_array;
}

