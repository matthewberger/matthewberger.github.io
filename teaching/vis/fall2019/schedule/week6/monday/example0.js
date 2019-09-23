d3.json('barley.json')
	.then(function(data)  {
		barley_data = data;
		plot_it();
	})

function plot_it()  {
	var svg0 = d3.select('#svg0');
	var range_pad = 5;
	var height = svg0.attr('height');

	var max_agg = -1e14, min_agg = 1e14;
	var nested_data = d3.nest()
		.key(d => d.variety)
		.key(d => d.site)
		.rollup(d_arr => {
			var mean_value = d3.mean(d_arr, d => d.yield);
			max_agg = Math.max(max_agg,mean_value);
			min_agg = Math.min(min_agg,mean_value);
			return {aggregation:mean_value, variety:d_arr[0].variety, site:d_arr[0].site};
		})
		.entries(barley_data)

	var unique_varieties = Array.from(new Set(barley_data.map(d => d.variety))), unique_sites = Array.from(new Set(barley_data.map(d => d.site)));
	var x_scale = d3.scaleBand().domain(unique_varieties).range([range_pad,height-range_pad]).padding(0.05);
	var y_scale = d3.scaleBand().domain(unique_sites).range([range_pad,height-range_pad]).padding(0.05);
	var lum_scale = d3.scaleLinear().domain([min_agg,max_agg]).range([20,90]);
	var chroma_scale = d3.scaleLinear().domain([min_agg,max_agg]).range([90,20]);

	svg0.selectAll('rows').data(nested_data).enter()
		.selectAll('cols').data(d => d.values).enter().append('rect')
		.attr('x', d => x_scale(d.value.variety)).attr('y', d => y_scale(d.value.site))
		.attr('width', x_scale.bandwidth()).attr('height', y_scale.bandwidth())
		.attr('fill', d => d3.hcl(40,chroma_scale(d.value.aggregation),lum_scale(d.value.aggregation)))
}
