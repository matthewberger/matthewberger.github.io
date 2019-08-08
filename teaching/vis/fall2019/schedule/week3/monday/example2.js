var svg_elem = document.getElementById('svg2');
var num_groups = 4;
for(var g = 0; g < num_groups; g++)  {
	var x_offset = 50 + 200*parseInt(g/2);
	var y_offset = g%2 == 0 ? 50 : 200;
	var group_elem = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	group_elem.setAttribute('class','topg');
	var n_circles = 2 + parseInt(5*Math.random());
	var n_rects = 2 + parseInt(5*Math.random());
	var h = 360.0*Math.random(), s = 0.8, l = 0.5;
	var circle_data = [], rect_data = [];
	for(var i = 0; i < n_circles; i++)
		circle_data.push([x_offset+100*Math.random(),y_offset+100*Math.random()]);
	for(var i = 0; i < n_circles; i++)
		rect_data.push([x_offset+100*Math.random(),y_offset+100*Math.random()]);

	var circle_group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	circle_group.setAttribute('class','circleg');
	var rect_group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	rect_group.setAttribute('class','rectg');

	for(var i = 0; i < circle_data.length; i++)  {
		var circle_elem = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
		circle_elem.setAttribute('cx',circle_data[i][0]);
		circle_elem.setAttribute('cy',circle_data[i][1]);
		circle_elem.setAttribute('r',7);
		circle_elem.setAttribute('class','c'+i);
		circle_elem.setAttribute('fill',d3.hsl(h,s,l).toString());
		circle_group.appendChild(circle_elem);
	}
	for(var i = 0; i < rect_data.length; i++)  {
		var rect_elem = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		rect_elem.setAttribute('x',rect_data[i][0]);
		rect_elem.setAttribute('y',rect_data[i][1]);
		rect_elem.setAttribute('width',12);
		rect_elem.setAttribute('height',12);
		rect_elem.setAttribute('class','r'+i);
		rect_elem.setAttribute('fill',d3.hsl(h,s,l).toString());
		rect_group.appendChild(rect_elem);
	}
	group_elem.appendChild(circle_group);
	group_elem.appendChild(rect_group);

	svg_elem.appendChild(group_elem);
}
