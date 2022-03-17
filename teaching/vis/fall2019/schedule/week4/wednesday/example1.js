var svg1 = d3.select('#svg1');
var range_pad = 30;
var width = svg1.attr('width')-range_pad, height = svg1.attr('height')-range_pad;

var data_1 = [{},{}];
samples.forEach((sample,i) => {
	g_id = i%2 == 0 ? 0 : 1;
	data_1[g_id]['b'+Math.floor(i/2)] = sample
	data_1[g_id]['group'] = 'g'+(g_id+1);
});

var stacker = d3.stack()
	.keys(id_keys)
var stacked_data = stacker(data_1);

var flattened_stack = d3.merge(stacked_data);
var max_stack = d3.max(flattened_stack, d => d[1]);
var stack_group_scale = d3.scaleBand().domain(group_keys).range([range_pad,width]).paddingInner(0.3).paddingOuter(0.05);
var stack_y_scale = d3.scaleLinear().domain([0,max_stack]).range([height,range_pad]);

svg1.selectAll('empty').data(stacked_data).enter().append('g')

svg1.selectAll('g').selectAll('empty').data(d => d).enter().append('rect')
	.attr('x', d =>	stack_group_scale(d.data.group)).attr('width', stack_group_scale.bandwidth())
	.attr('y', d =>	stack_y_scale(d[1])).attr('height', d => (stack_y_scale(d[0])-stack_y_scale(d[1])))
	.attr('fill', d3.hcl(20,30,70)).attr('stroke', '#000')

svg1.append('g').attr('transform', 'translate('+'0'+','+(height)+')').call(d3.axisBottom(stack_group_scale))
svg1.append('g').attr('transform', 'translate('+(range_pad)+','+'0'+')').call(d3.axisLeft(stack_y_scale))
