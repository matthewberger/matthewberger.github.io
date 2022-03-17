var data = [];
for(var i = 0; i < 13; i++)
	data.push([100+300*Math.random(),100+300*Math.random()]);
var svg_elem = document.getElementById('svg1');
for(var i = 0; i < data.length; i++)  {
	var circle_elem = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
	circle_elem.setAttribute('cx',data[i][0]);
	circle_elem.setAttribute('cy',data[i][1]);
	circle_elem.setAttribute('r',10);
	svg_elem.appendChild(circle_elem);
}
