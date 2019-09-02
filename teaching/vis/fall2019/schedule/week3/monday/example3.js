var circle_data = [];
for(var i = 0; i < 13; i++)
	circle_data.push([100+300*Math.random(),50+250*Math.random()]);
var data_selection = d3.select('#svg3').selectAll('circle').data(circle_data)
//var enter_selection = data_selection.enter()
//var created_circles = enter_selection.append('circle')
