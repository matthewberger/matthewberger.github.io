d3.csv('nba_players.csv')
	.then(function(data)  {
		nba_data = data;
		selected_atts = ['Age','Block','Steal','Assist','Two Points','Three Points']
		d3.shuffle(selected_atts)
		nba_data.forEach((d,i) => {
			selected_atts.forEach(att => {
				d[att] = +d[att];
			})
			d.id = i;
		})
		plot_nba();
	})

function plot_nba()  {
	var svgsplom = d3.select('#svgsplom');
	var x_range_pad = 40, y_range_pad = 90;
	var width = svgsplom.attr('width'), height = svgsplom.attr('height');

	var att_scale = d3.scaleBand().domain(selected_atts).range([y_range_pad,height-x_range_pad]).paddingInner(0.2);
	var plot_height = att_scale.bandwidth();
	var x_quantitative_scales = {}, y_quantitative_scales = {};
	selected_atts.forEach((att,i) =>  {
		var extent = d3.extent(nba_data, d => d[att]);
		x_quantitative_scales[att] = d3.scaleLinear().domain([extent[0],extent[1]]).range([0,plot_height]);
		y_quantitative_scales[att] = d3.scaleLinear().domain([extent[0],extent[1]]).range([plot_height,0]);
	});

	svgsplom.selectAll('cols').data(selected_atts).enter().append('g')
		.attr('transform', d => 'translate('+att_scale(d)+',0)')
		.selectAll('rows').data((d,i) => {
			var unique_rows = selected_atts.filter((_,j) => i <= j);
			return unique_rows.map(d_new => [d,d_new]);
		})
		.enter().append('g')
		.attr('transform', d => 'translate(0,'+att_scale(d[1])+')').attr('class', 'splom')
		.selectAll('points').data(d => nba_data, d => d.id).enter().append('circle')
		.attr('r', 1.75).attr('fill', d3.hcl(20,60,70))

	svgsplom.selectAll('.splom').each(function(att)  {
		var scale_x = x_quantitative_scales[att[0]], scale_y = y_quantitative_scales[att[1]];
		d3.select(this).selectAll('circle')
			.attr('cx', d => scale_x(d[att[0]])).attr('cy', d => scale_y(d[att[1]]))
		d3.select(this).append('g').attr('transform', 'translate(0,0)').call(d3.axisLeft(scale_y).ticks(4))
		d3.select(this).append('g').attr('transform', 'translate(0,'+plot_height+')').call(d3.axisBottom(scale_x).ticks(4))
	})

	create_axes_example1(svgsplom,(height-x_range_pad+20),att_scale)
	splom_interaction(plot_height, nba_data, x_quantitative_scales, y_quantitative_scales);
}
