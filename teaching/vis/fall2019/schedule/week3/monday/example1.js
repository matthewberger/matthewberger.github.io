var svg_elem = document.getElementById('svg1');
var num_groups = 4;
for(var g = 0; g < num_groups; g++)  {
	var x_offset = 50 + 200*parseInt(g/2);
	var y_offset = g%2 == 0 ? 50 : 200;
	var group_elem = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	group_elem.setAttribute('class','topg');
	var n_circles = 5 + parseInt(10*Math.random());
	var h = 360.0*Math.random(), s = 0.8, l = 0.5;
	var data = [];
	for(var i = 0; i < n_circles; i++)
		data.push([x_offset+100*Math.random(),y_offset+100*Math.random()]);
	for(var i = 0; i < data.length; i++)  {
		var circle_elem = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
		circle_elem.setAttribute('cx',data[i][0]);
		circle_elem.setAttribute('cy',data[i][1]);
		circle_elem.setAttribute('r',7);
		circle_elem.setAttribute('class','c'+i);
		circle_elem.setAttribute('fill',d3.hsl(h,s,l).toString());
		group_elem.appendChild(circle_elem);
	}
	svg_elem.appendChild(group_elem);
}
