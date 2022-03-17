// top axis
svg0.append('g')
	.attr('id', 'topaxis')
	.attr('transform', 'translate('+'0'+','+(range_pad)+')')
	.call(d3.axisTop(scale_x))
// bottom axis
svg0.append('g')
	.attr('id', 'bottomaxis')
	.attr('transform', 'translate('+'0'+','+(svg0.attr('height')-range_pad)+')')
	.call(d3.axisBottom(scale_x))

// left axis
svg0.append('g')
	.attr('id', 'leftaxis')
	.attr('transform', 'translate('+(range_pad)+','+'0'+')')
	.call(d3.axisLeft(scale_y))
// right axis
svg0.append('g')
	.attr('id', 'rightaxis')
	.attr('transform', 'translate('+(svg0.attr('width')-range_pad)+','+'0'+')')
	.call(d3.axisRight(scale_y))
