d3.csv('nba_players.csv')
	.then(function(data)  {
		nba_data = data;
		selected_atts = ['Age','Block','Steal','Assist','Two Points','Three Points']
		d3.shuffle(selected_atts)
		nba_data.forEach(d => {
			selected_atts.forEach(att => {
				d[att] = +d[att];
			})
		})
		plot_pcp();
	})

function plot_pcp()  {
	var svg_elem = d3.select('#svgpcp');
	var x_range_pad = 40, y_range_pad = 20;
	var width = svg_elem.attr('width'), height = svg_elem.attr('height');

	var pcp_scale_x = d3.scalePoint().domain(selected_atts).range([x_range_pad,width-x_range_pad]);
	var pcp_scale_y = {};
	selected_atts.forEach(att => {
		var extent = d3.extent(nba_data, d => d[att]);
		pcp_scale_y[att] = d3.scaleLinear().domain([extent[0],extent[1]]).range([height-y_range_pad,y_range_pad])
	});

	var line = d3.line()
		.x(d => pcp_scale_x(d.att))
		.y(d => pcp_scale_y[d.att](d.value))

	svg_elem.selectAll('empty').data(nba_data, d => d.Name).enter().append('path').attr('class', 'polyline')
		.attr('d', d => {
			var poly_line = selected_atts.map((a,i) => { return {att:a,value:d[a]}; })
			return line(poly_line)
		})
		.attr('fill', 'None').attr('stroke', d3.hcl(30,60,75)).attr('stroke-width', 2).attr('stroke-opacity', 0.12)

	create_pcp_axes(svg_elem,x_range_pad,y_range_pad,pcp_scale_x,pcp_scale_y,selected_atts);

	pcp_interaction(svg_elem, selected_atts, {'x':pcp_scale_x, 'y':pcp_scale_y}, y_range_pad,height-y_range_pad, nba_data);
}
