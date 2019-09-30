d3.json('seattle.json')
  .then(function(data)  {
	  seattle_data = data;
	  plot_example0();
})

function plot_example0() {

	/*
	var svg = d3.select("#svg0"),
		width = +svg.attr("width"),
		height = +svg.attr("height");

	var randomX = d3.randomNormal(width / 2, 80),
		randomY = d3.randomNormal(height / 2, 80),
		data = d3.range(2000).map(function() { return [randomX(), randomY()]; });

	var g = svg.append("g");

	var circle = g.selectAll("circle")
	  .data(data)
	  .enter().append("circle")
		.attr("r", 2.5)
		.attr("transform", function(d) { return "translate(" + d + ")"; });

	svg.append("rect")
		.attr("fill", "none")
		.attr("pointer-events", "all")
		.attr("width", width)
		.attr("height", height)
		.call(d3.zoom()
			.scaleExtent([1, 8])
			.on("zoom", zoom));

	function zoom() {
	  g.attr("transform", d3.event.transform);
	}
	*/

	var svg0 = d3.select('#svg0');
	var width = svg0.attr('width'), height = svg0.attr('height');
	var pad = 100, actual_width = width-2*pad, actual_height = height-2*pad;

	var low_extents = d3.extent(seattle_data, d => d.low), high_extents = d3.extent(seattle_data, d => d.high)
	var x_scale = d3.scaleLinear().domain(low_extents).range([0,actual_width]).nice();
	var y_scale = d3.scaleLinear().domain(high_extents).range([actual_height,0]).nice();
	var r = 5;


	var g_elem = svg0.append('g').attr('transform', 'translate('+pad+','+pad+')').append('g')
	var rect_select = svg0.append('rect')
		.attr('fill', 'None').attr('pointer-events', 'all').attr('width', actual_width).attr('height', actual_height)

	g_elem.append('defs')
      	.append('clipPath')
      	.attr('id', 'clip')
      	.append('rect')
      		.attr('x', 0)
         	.attr('y', 0)
      		.attr('width', actual_width)
      		.attr('height', actual_height);

	g_elem.selectAll('empty').data(seattle_data).enter().append('circle')
		.attr('cx', d => x_scale(d.low)).attr('cy', d => y_scale(d.high))
		.attr('fill', d3.hcl(350,60,60)).attr('r', r).attr('clip-path', 'url(#clip)');

	var all_circs = g_elem.selectAll('circle');

	var zoom = d3.zoom().scaleExtent([1, 10])
		.on('zoom', function() {
			var new_x_scale = d3.event.transform.rescaleX(x_scale)
			var new_y_scale = d3.event.transform.rescaleY(y_scale)
			all_circs.attr('cx', d => new_x_scale(d.low)).attr('cy', d => new_y_scale(d.high))

			/*
			g_elem.attr('transform', d3.event.transform);
			var scale = d3.event.transform.k;
			g_elem.selectAll('circle').attr('r', r/scale);
			*/
		});
	rect_select.call(zoom);
}
