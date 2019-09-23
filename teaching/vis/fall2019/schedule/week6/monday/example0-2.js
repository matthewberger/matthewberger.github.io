d3.json('barley.json')
	.then(function(data)  {
		barley_data = data;
		plot_it_2();
	})

function plot_it_2()  {
	var svg0 = d3.select('#svg0-2');
	var x_range_pad = 100, y_range_pad = 100;
	var height = svg0.attr('height');

	var max_agg = -1e14, min_agg = 1e14;

	var nested_data = d3.nest()
		.key(d => d.variety+'-'+d.site)
		.rollup(d_arr => {
			var mean_value = d3.mean(d_arr, d => d.yield);
			max_agg = Math.max(max_agg,mean_value);
			min_agg = Math.min(min_agg,mean_value);
			return {aggregation:mean_value, variety:d_arr[0].variety, site:d_arr[0].site};
		})
		.entries(barley_data)

	var unique_varieties = d3.set(barley_data, d => d.variety).values(), unique_sites = d3.set(barley_data, d => d.site).values();
	var x_scale = d3.scaleBand().domain(unique_varieties).range([x_range_pad,height]).paddingInner(0.05);
	var y_scale = d3.scaleBand().domain(unique_sites).range([0,height-y_range_pad]).paddingInner(0.05);
	var size_scale = d3.scaleSqrt().domain([min_agg,max_agg]).range([1,.5*x_scale.bandwidth()])

	svg0.selectAll('rows').data(nested_data).enter().append('circle')
		.attr('cx', d => .5*x_scale.bandwidth()+x_scale(d.value.variety))
		.attr('cy', d => .5*y_scale.bandwidth()+y_scale(d.value.site))
		.attr('r', d => size_scale(d.value.aggregation))
		.attr('fill', d => d3.hcl(10,50,60))

	create_axes_example0(svg0,x_range_pad,(height-y_range_pad),x_scale,y_scale,true);

	svg0.select('.leftaxis').selectAll('.tick').append('line')
		.attr('x2', (height-x_range_pad-x_scale.bandwidth()/2)).attr('stroke-width', 0.5).attr('stroke', d3.hcl(10,50,60))
	svg0.select('.bottomaxis').selectAll('.tick').append('line')
		.attr('y2', -(height-y_range_pad-y_scale.bandwidth()/2)).attr('stroke-width', 0.5).attr('stroke', d3.hcl(10,50,60))
}
