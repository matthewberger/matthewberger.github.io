var old_circle_data = [];
for(var i = 0; i < 13; i++)
	old_circle_data.push([10+30*Math.random(),10+30*Math.random()]);
d3.select('#svg4').selectAll('circle').data(old_circle_data).enter().append('circle')

var new_circle_data = [];
for(var i = 0; i < 13; i++)
	new_circle_data.push([100+300*Math.random(),100+300*Math.random()]);
var new_data_selection = d3.select('#svg4').selectAll('circle').data(new_circle_data)
