d3.json('cars.json')
	.then(function(data)  {
		cars = data;
		plot_it();
	})

function plot_it()  {
	var svg10 = d3.select('#svg10');
	var width = 240, height = svg10.attr('height'), pad_range = 60;

	var all_weights = [];
	var nester = d3.nest()
		.key(car_d => car_d.Origin)
		.rollup(car_d => {
			var mean_weight = d3.mean(car_d, d => d.Weight_in_lbs);
			all_weights.push(mean_weight);
			return mean_weight;
		});

	var nested_data = nester.entries(cars);
	console.log(nested_data);

	var all_origins = d3.set(cars, d => d.Origin).values();
	var max_weight = d3.max(all_weights);

	var origin_band = d3.scaleBand().domain(all_origins).range([pad_range,width-pad_range]).paddingInner(0.1).paddingOuter(0.1);
	var weight_linear = d3.scaleLinear().domain([0,max_weight]).range([height-pad_range,pad_range]);

	svg10.selectAll('g').data(nested_data).enter().append('rect')
		.attr('x', d => origin_band(d.key)).attr('width', origin_band.bandwidth())
		.attr('y', d => weight_linear(d.value)).attr('height', d => weight_linear(0)-weight_linear(d.value))
		.attr('fill', '#777')

	svg10.append('g')
		.attr('transform', 'translate('+'0'+','+(height-pad_range)+')')
		.call(d3.axisBottom(origin_band))

	svg10.append('g')
		.attr('transform', 'translate('+(pad_range)+','+'0'+')')
		.call(d3.axisLeft(weight_linear))

	svg10.append('text').text('Origin')
		.attr('transform', 'translate('+(width/2)+','+(weight_linear(0)+40)+')').attr('text-anchor', 'middle')
	svg10.append('text').text('Weight')
		.attr('transform', 'translate('+(15)+','+(height/2)+') rotate(270)').attr('text-anchor', 'middle')
}
