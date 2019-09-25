d3.json('wdi.json')
	.then(function(data)  {
		wdi_data = data;
		wdi_data.forEach(d => {
			d.year = new Date(d.year.toString())
		})
		plot_sm();
	})

function plot_sm()  {
	var svg0 = d3.select('#svg0');
	var width = svg0.attr('width'), height = svg0.attr('height'), range_pad_left = 66, range_pad = 40;
	var n_levels = 5;

	var countries = Array.from(new Set(wdi_data.map(d => d.country))), indicators = Array.from(new Set(wdi_data.map(d => d.indicator)));
	var gdp_extent = d3.extent(wdi_data, d => d.gdp), year_extent = d3.extent(wdi_data, d => d.year)
	var band_partitioner = d3.scaleBand().domain(d3.range(n_levels)).range(gdp_extent)

	var nested_time_series = d3.nest()
		.key(d => d.country)
		.key(d => d.indicator)
		.rollup(d => horizon_graph_process(d,n_levels,band_partitioner))
		.entries(wdi_data);

	var country_scale = d3.scaleBand().domain(countries).range([range_pad,height-range_pad]).paddingInner(0.25)
	var indicator_scale = d3.scaleBand().domain(indicators).range([range_pad_left,width-range_pad_left]).paddingInner(0.1)
	var area_scale_x = d3.scaleTime().domain([year_extent[0],year_extent[1]]).range([0,indicator_scale.bandwidth()])

	var ordinal_lum = d3.scalePoint().domain(d3.range(n_levels)).range([80,15]);
	var ordinal_chroma = d3.scalePoint().domain(d3.range(n_levels)).range([30,80]);

	var band_area = d3.area().x(d => area_scale_x(d.year))
	var area_scale_y = d3.scaleLinear().range([country_scale.bandwidth(),0])

	svg0.selectAll('countries').data(nested_time_series).enter().append('g')
		.attr('transform', d => 'translate(0,'+country_scale(d.key)+')')
		.selectAll('indicators').data(d => d.values).enter().append('g').attr('class', 'plot')
		.attr('transform', d => 'translate('+indicator_scale(d.key)+',0)')
		.each(function(d_arr,i)  {
			horizon_graph_plot(d3.select(this),d_arr, band_partitioner,area_scale_y,band_area ,ordinal_lum,ordinal_chroma);
		})
	plot_axes(svg0, area_scale_x,country_scale,indicator_scale, range_pad, range_pad_left);
}
