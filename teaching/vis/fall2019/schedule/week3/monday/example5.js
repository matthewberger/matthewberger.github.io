var old_circle_data = [];
for(var i = 0; i < 13; i++)  {
	var datum = {};
	datum.value = [10+30*Math.random(),10+30*Math.random()];
	datum.name = 'circle'+i;
	old_circle_data.push(datum);
}
d3.select('#svg5').selectAll('circle').data(old_circle_data, d => d.name).enter().append('circle')

var new_circle_data = [];
new_circle_data.push({name:'circle10', value:[100+300*Math.random(),100+300*Math.random()]});
new_circle_data.push({name:'circle2', value:[100+300*Math.random(),100+300*Math.random()]});
new_circle_data.push({name:'circle5', value:[100+300*Math.random(),100+300*Math.random()]});
new_circle_data.push({name:'circle20', value:[100+300*Math.random(),100+300*Math.random()]});

var key_data_selection = d3.select('#svg5').selectAll('circle').data(new_circle_data, d => d.name)
