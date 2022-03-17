var svg0 = d3.select('#svg0');
var range_pad = 20;
var width = svg0.attr('width')-range_pad, height = svg0.attr('height')-range_pad;

var samples = d3.range(10).map(d => 10*Math.pow(10,d/12))
d3.shuffle(samples);
var data = samples.map((d,i) => i%2==0 ? {'h':d,'id':'b'+Math.floor(i/2),'group':'g1'} : {'h':d,'id':'b'+Math.floor(i/2),'group':'g2'});

var nested_data = d3.nest()
	.key(d => d.group)
	.entries(data)

var group_keys = nested_data.map(d => d.key);
var id_keys = d3.set(data, d => d.id).values();
id_keys.sort()
var group_scale = d3.scaleBand().domain(group_keys).range([range_pad,width]).paddingInner(0.3);
var x_scale = d3.scaleBand().domain(id_keys).range([0,group_scale.bandwidth()]).padding(0.1);
var y_scale = d3.scaleLinear().domain([0,d3.max(data, d => d.h)]).range([height,range_pad]);

svg0.selectAll('empty').data(nested_data).enter().append('g')
	.attr('transform', d => 'translate('+group_scale(d.key)+',0)')

svg0.selectAll('g').selectAll('empty').data(d => d.values).enter().append('rect')
	.attr('x', d =>	x_scale(d.id)).attr('width', x_scale.bandwidth())
	.attr('y', d =>	y_scale(d.h)).attr('height', d => (y_scale(0)-y_scale(d.h)))
	.attr('fill', d3.hcl(20,30,70)).attr('stroke', '#000')

svg0.append('g').attr('transform', 'translate('+'0'+','+(height)+')').call(d3.axisBottom(group_scale))
svg0.append('g').attr('transform', 'translate('+(range_pad)+','+'0'+')').call(d3.axisLeft(y_scale))
