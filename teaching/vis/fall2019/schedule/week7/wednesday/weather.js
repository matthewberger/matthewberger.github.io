d3.csv('seattle.csv')
	.then(function(data)  {
		seattle_data = data;
		var time_parser = d3.timeParse('%Y-%m-%d')
		seattle_data.forEach((d,i) => {
			d.date = time_parser(d.date);
			d.temp_low = +d.temp_low;
			d.temp_high = +d.temp_high;
			d.wind = +d.wind;
			d.key = i;
		});
		plot_weather();
	})

function plot_weather()  {
	var svg_elem = d3.select('#svgweather');
	var width = svg_elem.attr('width'), height = svg_elem.attr('height'), pad = 60;
	var weather_width = (width-2*pad)/2;
	var weather_height = height-2*pad;

	svg_elem.append('g').attr('transform', 'translate('+(pad)+','+(pad)+')').attr('id', 'windtemps')
	svg_elem.append('g').attr('transform', 'translate('+(2*pad+weather_width)+','+(pad)+')').attr('id', 'timetemps')

	var nester = d3.nest()
		.key(d => d.date.getMonth())
		.rollup(d_arr => {
			var ave_low_temp = d3.mean(d_arr, d => d.temp_low);
			var ave_high_temp = d3.mean(d_arr, d => d.temp_high);
			return { 'ave_low':ave_low_temp, 'ave_high':ave_high_temp };
		})

	var data_by_month = nester.entries(seattle_data);

	var common_scale_x = d3.scaleLinear().domain([0,d3.max(seattle_data, d => d.wind)]).range([0,weather_width]).nice()
	var common_scale_y = d3.scaleLinear().domain([d3.min(seattle_data, d => .5*(d.temp_low+d.temp_high)),d3.max(seattle_data, d => .5*(d.temp_low+d.temp_high))]).range([weather_height,0]).nice()
	var size_scale = d3.scaleSqrt().domain(d3.extent(seattle_data, d => d.temp_high-d.temp_low)).range([0.5,7])

	var all_months = data_by_month.map(d => new Date(2012,d.key,1));
	var time_scale_x = d3.scaleBand().domain(all_months).range([0,weather_width]).paddingInner(0.2).paddingOuter(0.1);

	svg_elem.select('#windtemps').append('rect').attr('width', weather_width).attr('height', weather_height).attr('fill', '#f2f2f2')

	svg_elem.select('#windtemps').append('g').attr('id', 'circleplot').selectAll('scatter').data(seattle_data, d => d.key).enter().append('circle')
		.attr('cx', d => common_scale_x(d.wind))
		.attr('cy', d => common_scale_y(.5*(d.temp_low+d.temp_high)))
		.attr('r', d => size_scale(d.temp_high-d.temp_low))
		.attr('fill', '#222')
		.attr('opacity', '0.12')

	svg_elem.select('#windtemps').append('g').attr('transform', 'translate(0,'+weather_height+')').call(d3.axisBottom(common_scale_x))
	svg_elem.select('#windtemps').append('g').call(d3.axisLeft(common_scale_y))

	svg_elem.select('#windtemps').append('text').text('Wind Speed')
		.attr('transform', 'translate('+(weather_width/2)+','+(weather_height+35)+')').attr('text-anchor', 'middle')
	svg_elem.select('#windtemps').append('text').text('Temperature')
		.attr('transform', 'translate('+(-35)+','+(weather_height/2)+') rotate(270)').attr('text-anchor', 'middle')

	svg_elem.select('#timetemps').append('rect')
		.attr('width', weather_width)
		.attr('height', weather_height)
		.attr('fill', '#f2f2f2')

	svg_elem.select('#timetemps').selectAll('months').data(data_by_month, d => d.key).enter().append('rect').attr('class', 'bar')
		.attr('x', d => time_scale_x(new Date(2012,d.key,1))).attr('width', time_scale_x.bandwidth())
		.attr('y', d => common_scale_y(d.value.ave_high)).attr('height', d => common_scale_y(d.value.ave_low) - common_scale_y(d.value.ave_high))
		.attr('fill', '#555')

	svg_elem.select('#timetemps').append('g').attr('transform', 'translate(0,'+weather_height+')').call(d3.axisBottom(time_scale_x).tickFormat(d3.timeFormat('%b')))
	svg_elem.select('#timetemps').append('g').call(d3.axisLeft(common_scale_y))

	svg_elem.select('#timetemps').append('text').text('Month')
		.attr('transform', 'translate('+(weather_width/2)+','+(weather_height+35)+')').attr('text-anchor', 'middle')
	svg_elem.select('#timetemps').append('text').text('Temperature')
		.attr('transform', 'translate('+(-35)+','+(weather_height/2)+') rotate(270)').attr('text-anchor', 'middle')

	weather_interaction(svg_elem, seattle_data, {'x':common_scale_x, 'y':common_scale_y, 'size':size_scale, 'time':time_scale_x}, nester)
}
