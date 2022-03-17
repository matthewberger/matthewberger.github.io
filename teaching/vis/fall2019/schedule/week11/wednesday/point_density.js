d3.csv('seattle.csv').then(function(data)  {
	seattle_data = data
	plot_density();
})

function plot_density()  {
	// these are global layout parameters - width and height of plot, along with some padding to allow for plotting scales
	var svg1 = d3.select('#svg1');
	var width = +svg1.attr('width'), height = +svg1.attr('height');
	var pad = 50;
	var actual_width = width-2*pad, actual_height = height-2*pad;


	// these are spatial layout parameters for the individual plots, which are to be used when constructing scales
	// Note: each plot will already be translated to its appropriate position within the svg element, so you only need to concern yourself
	// with the width/height parameters
	var scatter_x = 0, scatter_y = 0, scatter_width = actual_height/2, scatter_height = actual_height/2;
	var bar_x = 0, bar_y = scatter_height+pad, bar_width = scatter_width, bar_height = actual_height-scatter_height-3*pad;
	var inner_pad = 0.4, outer_pad = 0.2;

	// (optional UG / grad student) these are the layout parameters for the month-temperature plot
	var month_bar_x = scatter_width+pad, month_bar_y = 0, month_bar_width = width - month_bar_x - 3*pad, month_bar_height = scatter_height;

	// IMPORTANT: these are the groups which will contain your marks, accessible by the id name; namely:
	// * wind-temperature scatterplot (`windtemps`)
	// * weather bar plot (`weatherwinds`)
	// * monthly temperature bar plot (`timetemps`)
	svg1.append('g').attr('transform', 'translate('+(pad+scatter_x)+','+(pad+scatter_y)+')').attr('id', 'windtemps')
	svg1.append('g').attr('transform', 'translate('+(pad+bar_x)+','+(pad+bar_y)+')').attr('id', 'weatherwinds')
	svg1.append('g').attr('transform', 'translate('+(pad+month_bar_x)+','+(pad+month_bar_y)+')').attr('id', 'timetemps')

	// data formatting: convert to floats where necessary, and construct time objects
	// the property `date` is a Date object, which you will use for accessing the month of a given date
	var time_parser = d3.timeParse('%Y-%m-%d')
	seattle_data.forEach(d => {
		d.date = time_parser(d.date);
		d.precipitation = +d.precipitation;
		d.temp_low = +d.temp_low;
		d.temp_high = +d.temp_high;
	});

	// TODO: our weather bar plots will be average wind speed, grouped by weather type.
	// Use `nest` for this purpose, grouping by `weather`, and performing a `rollup` to compute the mean
	var data_by_weather = d3.nest()
		.key(d => d.weather)
		.rollup(d => d3.mean(d, d=>d.wind))
		.entries(seattle_data);
	data_by_weather.sort((a,b) => a.value - b.value)

	// (optional UG / grad student) TODO: our month bar plot will show the average of per-day lows and average of per-day highs, grouped by month.
	// Use `nest` for this purpose, grouping by the month -> here, note that for a Date object you can access its month number (in the interval [0,11]) via `getMonth`
	// You will need to return a somewhat more complicated object in your rollup function, computing and returning the average of low temps, and average of high temps
	var data_by_month = d3.nest()
		.key(d => d.date.getMonth())
		.rollup(d_arr => {
			var ave_low_temp = d3.mean(d_arr, d => d.temp_low);
			var ave_high_temp = d3.mean(d_arr, d => d.temp_high);
			return { 'ave_low':ave_low_temp, 'ave_high':ave_high_temp };
		})
		.entries(seattle_data);

	// TODO: setup all of your scales
	// Note: the x scale for your scatterplot can be shared with the weather bar plot, and the y scale for your scatterplot can be shared with the monthly temperature bar plot
	// And don't forget the scale for your circle radii!
	var common_scale_x = d3.scaleLinear().domain([0,d3.max(seattle_data, d => d.wind)]).range([0,scatter_width]).nice()
	var common_scale_y = d3.scaleLinear().domain([d3.min(seattle_data, d => .5*(d.temp_low+d.temp_high)),d3.max(seattle_data, d => .5*(d.temp_low+d.temp_high))]).range([scatter_height,0]).nice()
	var bar_scale_y = d3.scaleBand().domain(data_by_weather.map(d => d.key)).range([bar_height,0]).paddingInner(inner_pad).paddingOuter(outer_pad)

	var size_scale = d3.scaleSqrt().domain(d3.extent(seattle_data, d => d.temp_high-d.temp_low)).range([0.5,7])

	var bandwidth = 30;
	var kde = null, lum_scale = null, chroma_scale = null;
	function compute_kde() {
		kde = seattle_data.map(d => {
			var x = common_scale_x(d.wind);
			var y = common_scale_y(.5*(d.temp_low+d.temp_high));
			return d3.sum(seattle_data, d_i => {
				var x_i = common_scale_x(d_i.wind);
				var y_i = common_scale_y(.5*(d_i.temp_low+d_i.temp_high));
				var sqd_dist = (x-x_i)*(x-x_i) + (y-y_i)*(y-y_i)
				return Math.exp(-sqd_dist/bandwidth);
			})
		});
		lum_scale = d3.scaleLinear().domain(d3.extent(kde)).range([10,100]);
		chroma_scale = d3.scaleLinear().domain(d3.extent(kde)).range([90,3]);
	}
	compute_kde();

	var slider = d3.sliderBottom()
		.min(5).max(60).width(scatter_width).ticks(5).default(30).on('onchange', d => {
			bandwidth = d;
			compute_kde();
			d3.select('#windtemps').selectAll('circle')
				.attr('fill', (d,i) => d3.hcl(0,0,lum_scale(kde[i])))
		});
	d3.select('#windtemps').append('g').attr('transform', 'translate(0,-40)').call(slider);

	// (optional UG / grad student) TODO: setup your scale for months
	// Note: you will need to construct an array where each object is a Date object, containing the ordered months
	// There is a simple way to do this using your nest from above and the built-in `map` function
	var all_months = data_by_month.map(d => new Date(2012,d.key,1));
	var time_scale_x = d3.scaleBand().domain(all_months).range([0,month_bar_width]).paddingInner(inner_pad).paddingOuter(outer_pad);

	// TODO: create the scatterplot, for wind speed (x) and average day temperature (y)
	// First: add a rectangle that fills up the entire spatial range of the plot, with a fill of '#f2f2f2'
	d3.select('#windtemps').append('rect')
		.attr('width', scatter_width)
		.attr('height', scatter_height)
		.attr('fill', '#f2f2f2')
	// Next, perform a data join with `seattle_data`, creating new circles, and appropriately setting their attributes (from the above scales)
	// This means the `cx`, `cy`, and `r` attributes are a function of your data. You should also set the `fill` (color) and `opacity` ([0,1]) attributes to
	// constant values that will help better read the visualization
	d3.select('#windtemps').selectAll('scatter').data(seattle_data).enter().append('circle')
		.attr('cx', d => common_scale_x(d.wind))
		.attr('cy', d => common_scale_y(.5*(d.temp_low+d.temp_high)))
		.attr('r', d => size_scale(d.temp_high-d.temp_low))
		.attr('fill', (d,i) => d3.hcl(0,0,lum_scale(kde[i])))
		.attr('opacity', '1')
	// Plot your scales: a scale on the bottom axis, and a scale on the left axis
	d3.select('#windtemps').append('g').attr('transform', 'translate(0,'+scatter_height+')').call(d3.axisBottom(common_scale_x))
	d3.select('#windtemps').append('g').call(d3.axisLeft(common_scale_y))
	// And last, label your axes
	d3.select('#windtemps').append('text').text('Wind Speed')
		.attr('transform', 'translate('+(scatter_width/2)+','+(scatter_height+35)+')').attr('text-anchor', 'middle')
	d3.select('#windtemps').append('text').text('Temperature')
		.attr('transform', 'translate('+(-35)+','+(scatter_height/2)+') rotate(270)').attr('text-anchor', 'middle')

	// TODO: create the bar plot, for wind speed (x) and weather type (y)
	// First: add a rectangle that fills up the entire spatial range of the plot, with a fill of '#f2f2f2'
	d3.select('#weatherwinds').append('rect')
		.attr('width', bar_width)
		.attr('height', bar_height)
		.attr('fill', '#f2f2f2')
	// Next, perform a data join with the result of your nest, creating new rects, and appropriately setting their attributes (from the above scales)
	d3.select('#weatherwinds').selectAll('bars').data(data_by_weather).enter().append('rect').attr('class', 'bars')
		.attr('x', 0)
		.attr('y', d => bar_scale_y(d.key))
		.attr('height', bar_scale_y.bandwidth())
		.attr('width', d => common_scale_x(d.value))
		.attr('fill', '#555')
	// Plot your scales: a scale on the bottom axis, and a scale on the left axis
	d3.select('#weatherwinds').append('g').attr('transform', 'translate(0,'+bar_height+')').call(d3.axisBottom(common_scale_x))
	d3.select('#weatherwinds').append('g').call(d3.axisLeft(bar_scale_y))
	// And last, label your axes
	d3.select('#weatherwinds').append('text').text('Wind Speed')
		.attr('transform', 'translate('+(bar_width/2)+','+(bar_height+35)+')').attr('text-anchor', 'middle')
	d3.select('#weatherwinds').append('text').text('Weather')
		.attr('transform', 'translate('+(-35)+','+(bar_height/2)+') rotate(270)').attr('text-anchor', 'middle')

	// TODO: create the bar plot, for time (x) and temperature spans (y)
	// First: add a rectangle that fills up the entire spatial range of the plot, with a fill of '#f2f2f2'
	d3.select('#timetemps').append('rect')
		.attr('width', month_bar_width)
		.attr('height', month_bar_height)
		.attr('fill', '#f2f2f2')
	// Next, perform a data join with the result of your nest, creating new rects, and appropriately setting their attributes (from the above scales)
	// Recall: the band scale should be composed of Date objects, so we need to pass in a Date object given the month, with arbitrary year/day
	d3.select('#timetemps').selectAll('months').data(data_by_month).enter().append('rect')
		.attr('x', d => time_scale_x(new Date(2012,d.key,1))).attr('width', time_scale_x.bandwidth())
		.attr('y', d => common_scale_y(d.value.ave_high)).attr('height', d => common_scale_y(d.value.ave_low) - common_scale_y(d.value.ave_high))
		.attr('fill', '#555')
	// Plot your scales: a scale on the bottom axis, and a scale on the left axis
	d3.select('#timetemps').append('g').attr('transform', 'translate(0,'+month_bar_height+')').call(d3.axisBottom(time_scale_x).tickFormat(d3.timeFormat('%b')))
	d3.select('#timetemps').append('g').call(d3.axisLeft(common_scale_y))
	// And last, label your axes
	d3.select('#timetemps').append('text').text('Month')
		.attr('transform', 'translate('+(month_bar_width/2)+','+(month_bar_height+35)+')').attr('text-anchor', 'middle')
	d3.select('#timetemps').append('text').text('Temperature')
		.attr('transform', 'translate('+(-35)+','+(month_bar_height/2)+') rotate(270)').attr('text-anchor', 'middle')
}
