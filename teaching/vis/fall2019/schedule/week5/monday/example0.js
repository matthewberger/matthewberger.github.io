var svg0 = d3.select('#svg0');
var range_pad = 5;
var width = svg0.attr('width')-range_pad, height = svg0.attr('height')-range_pad;

var data = ['a','b'];
var square_scale = d3.scaleBand().domain(['a','b']).range([range_pad,width]).paddingOuter(0.15).paddingInner(0.3);
var reference_width = square_scale.bandwidth();
var thresh = 0.8, thresh_positive_step = 0.01, thresh_negative_step = 0.03;;
var exp_width = Math.sqrt(thresh)*reference_width;

var all_widths = {'a':reference_width , 'b':exp_width};
var left_width = reference_width, right_width = exp_width;

var perturb_amount = 0.4*square_scale.step()*square_scale.paddingInner();

svg0.append('rect').attr('width', svg0.attr('width')).attr('height', svg0.attr('height')).attr('fill', 'None').attr('stroke', '#000')
svg0.selectAll('empty').data(data, d => d).enter().append('rect').attr('class', 'stimulii')
	.attr('x', d => 2*(Math.random()-.5)*perturb_amount+square_scale(d)).attr('y', d => 1*(Math.random()-0)*perturb_amount + range_pad)
	.attr('width', d => all_widths[d]).attr('height', d => all_widths[d])
	.attr('fill', d3.hcl(220,26,60))

var left_button = document.createElement('button');
left_button.innerHTML = 'Left'
left_button.id = 'rectleft'
var body = document.getElementsByTagName('div')[0];
body.appendChild(left_button);

var right_button = document.createElement('button');
right_button.innerHTML = 'Right'
right_button.id = 'rectright'
var body = document.getElementsByTagName('div')[0];
body.appendChild(right_button);

document.getElementById('rectleft').addEventListener('click', d => {
	console.log('left width: '+left_width+' ; right width: '+right_width);
	// if we clicked left, and the left rectangle is greater, then increase thresh - otherwise decrease thresh
	if(left_width > right_width)  {
		var width_jnd = Math.abs(reference_width-exp_width);
		var area_jnd = Math.abs(reference_width*reference_width-exp_width*exp_width);
		thresh += thresh_positive_step;
		console.log('[left] correct! area JND: '+area_jnd+' ; width JND: '+width_jnd + ' ; threshold: '+thresh);
	}
	else  {
		thresh -= thresh_negative_step;
		console.log('incorrect!')
	}

	exp_width = Math.sqrt(thresh)*reference_width;
	all_widths['b'] = exp_width;

	var shuffled_data = ['a','b'];
	d3.shuffle(shuffled_data);
	left_width = all_widths[shuffled_data[0]], right_width = all_widths[shuffled_data[1]];
	var square_scale = d3.scaleBand().domain(shuffled_data).range([range_pad,width]).paddingOuter(0.15).paddingInner(0.3);

	all_sizes = [reference_width, exp_width];
	svg0.selectAll('.stimulii')
		.attr('x', d => 2*(Math.random()-.5)*perturb_amount+square_scale(d)).attr('y', d => 1*(Math.random()-0)*perturb_amount + range_pad)
		.attr('width', (d,i) => all_sizes[i]).attr('height', (d,i) => all_sizes[i])
		.attr('fill', d3.hcl(220,26,60))
});

document.getElementById('rectright').addEventListener('click', d => {
	console.log('left width: '+left_width+' ; right width: '+right_width);
	// if we clicked right, and the right rectangle is greater, then increase thresh - otherwise decrease thresh
	if(right_width > left_width)  {
		var width_jnd = Math.abs(reference_width-exp_width);
		var area_jnd = Math.abs(reference_width*reference_width-exp_width*exp_width);
		thresh += thresh_positive_step;
		console.log('[right] correct! area JND: '+area_jnd+' ; width JND: '+width_jnd + ' ; threshold: '+thresh);
	}
	else  {
		console.log('[right] incorrect!');
		thresh -= thresh_negative_step;
	}

	exp_width = Math.sqrt(thresh)*reference_width;
	all_widths['b'] = exp_width;

	var shuffled_data = ['a','b'];
	d3.shuffle(shuffled_data);
	left_width = all_widths[shuffled_data[0]], right_width = all_widths[shuffled_data[1]];
	var square_scale = d3.scaleBand().domain(shuffled_data).range([range_pad,width]).paddingOuter(0.15).paddingInner(0.3);

	var perturb_amount = 0.5*square_scale.step()*square_scale.paddingInner();
	exp_width = Math.sqrt(thresh)*reference_width;
	all_sizes = [reference_width, exp_width];
	svg0.selectAll('.stimulii')
		.attr('x', d => 2*(Math.random()-.5)*perturb_amount+square_scale(d)).attr('y', d => 1*(Math.random()-0)*perturb_amount + range_pad)
		.attr('width', (d,i) => all_sizes[i]).attr('height', (d,i) => all_sizes[i])
		.attr('fill', d3.hcl(220,26,60))
});
