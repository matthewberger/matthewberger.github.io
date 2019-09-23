d3.json('barley.json')
	.then(function(data)  {
		barley_data = data;
		plot_it_3();
	})

function plot_it_3()  {
	var svg0 = d3.select('#svg0-3');
	var x_range_pad = 100, y_range_pad = 100;
	var height = svg0.attr('height');

	var max_agg = -1e14, min_agg = 1e14;
	var nested_data = d3.nest()
		.key(d => d.variety)
		.key(d => d.site)
		.key(d => d.year)
		.rollup(d_arr => {
			var mean_value = d3.mean(d_arr, d => d.yield);
			max_agg = Math.max(max_agg,mean_value);
			min_agg = Math.min(min_agg,mean_value);
			return mean_value;
		})
		.entries(barley_data)

	var variety_nest = d3.nest()
		.key(d => d.variety)
		.rollup(d_arr => d3.mean(d_arr, d => d.yield))
		.entries(barley_data)
	variety_nest.sort((a,b) => a.value-b.value);
	var unique_varieties = variety_nest.map(d => d.key);

	var site_nest = d3.nest()
		.key(d => d.site)
		.rollup(d_arr => d3.mean(d_arr, d => d.yield))
		.entries(barley_data)
	site_nest.sort((a,b) => a.value-b.value);
	var unique_sites = site_nest.map(d => d.key);

	var unique_years = d3.set(barley_data, d => d.year).values()
	var x_scale = d3.scaleBand().domain(unique_varieties).range([x_range_pad,2*height]).paddingInner(0.15).paddingOuter(0.05);
	var y_scale = d3.scaleBand().domain(unique_sites).range([0,height-y_range_pad]).paddingInner(0.15).paddingOuter(0.05);
	var x_1_scale = d3.scaleBand().domain(unique_years).range([0,x_scale.bandwidth()]).paddingInner(0.05);
	var lum_scale = d3.scaleLinear().domain([min_agg,max_agg]).range([10,90]);
	var chroma_scale = d3.scaleLinear().domain([min_agg,max_agg]).range([110,10]);

	svg0.selectAll('cols').data(nested_data).enter()
		.append('g').attr('transform', d => 'translate('+x_scale(d.key)+',0)')
		.selectAll('rows').data(d => d.values).enter()
		.append('g').attr('transform', d => 'translate(0,'+y_scale(d.key)+')')
		.selectAll('groups').data(d => d.values).enter().append('rect')
		.attr('x', d => x_1_scale(d.key)).attr('width', x_1_scale.bandwidth()).attr('height', y_scale.bandwidth())
		.attr('fill', d => d3.hcl(10,chroma_scale(d.value),lum_scale(d.value)))

	create_axes_example0(svg0,x_range_pad,(height-y_range_pad),x_scale,y_scale,false);
}
