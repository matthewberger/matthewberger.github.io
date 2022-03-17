d3.json('lesmis-graph.json')
	.then(function(data)  {
		layout_graph(data);
	})

function compute_adjaceny_matrix(all_nodes, all_edges)  {
	var adjacency_mat = [];
	for(var i = 0; i < all_nodes.length; i++)  {
		mat_row = [];
		for(var j = 0; j < all_nodes.length; j++)
			mat_row.push(0);
		adjacency_mat.push(mat_row);
	}
	all_edges.forEach(function(d)  {
		var src_id = d[0];
		var dst_id = d[1];
		var value = d[2];
		adjacency_mat[src_id][dst_id] = value;
		adjacency_mat[dst_id][src_id] = value;
	});
	return adjacency_mat;
}

function compute_forces(node_positions, adjacency_mat, k)  {
	function attractive_force(d)  { return d*d/k; }
	function repulsive_force(d)  { return k*k/d; }

	for(var i = 0; i < node_positions.length; i++)
		node_positions[i].disp = [0,0];

	for(var i = 0; i < node_positions.length; i++)  {
		for(var j = 0; j < i; j++)  {
			if(adjacency_mat[i][j]==0)  { // repulsive force
				var disp_i = [node_positions[i].pos[0]-node_positions[j].pos[0], node_positions[i].pos[1]-node_positions[j].pos[1]];
				var disp_mag = Math.sqrt(disp_i[0]*disp_i[0] + disp_i[1]*disp_i[1]);
				if(disp_mag < 1e-3)
					disp_mag = 1e-3;
				var repulsive_scale = repulsive_force(disp_mag)/disp_mag;
				for(var a = 0; a < 2; a++)  {
					node_positions[i].disp[a] += repulsive_scale*disp_i[a];
					node_positions[j].disp[a] -= repulsive_scale*disp_i[a];
				}
			}
			else  { // attractive force
				var disp_i = [node_positions[j].pos[0]-node_positions[i].pos[0], node_positions[j].pos[1]-node_positions[i].pos[1]];
				/*
				for(var a = 0; a < 2; a++)
					disp_i[a] *= adjacency_mat[i][j];
					*/
				var disp_mag = Math.sqrt(disp_i[0]*disp_i[0] + disp_i[1]*disp_i[1]);
				if(disp_mag < 1e-3)
					disp_mag = 1e-3;
				var attractive_scale = attractive_force(disp_mag)/disp_mag;
				for(var a = 0; a < 2; a++)  {
					node_positions[i].disp[a] += attractive_scale*disp_i[a];
					node_positions[j].disp[a] -= attractive_scale*disp_i[a];
				}
			}
		}
	}
}

function advect_nodes(node_positions, eta)  {
	for(var i = 0; i < node_positions.length; i++)  {
		var disp = node_positions[i].disp;
		var disp_mag = Math.sqrt(disp[0]*disp[0]+disp[1]*disp[1]);
		var dir = [disp[0]/disp_mag,disp[1]/disp_mag];
		var step_size = Math.min(disp_mag,eta);
		var new_pos = [node_positions[i].pos[0]+dir[0]*step_size, node_positions[i].pos[1]+dir[1]*step_size];
		node_positions[i].pos[0] = Math.max(0, Math.min(1, new_pos[0]));
		node_positions[i].pos[1] = Math.max(0, Math.min(1, new_pos[1]));
	}
}

function layout_graph(graph_data)  {
	var nodes = graph_data.nodes
	var edges = graph_data.edges

	var node_positions = [];
	nodes.forEach(function(d)  {
		node_positions.push({pos:[Math.random(),Math.random()],disp:[0,0]});
	});

	var pad = 60;
	var svg_elem = d3.select('#fgh');
	var width = svg_elem.attr('width'), height = svg_elem.attr('height');

	var x_scale = d3.scaleLinear().domain([0,1]).range([pad,width-pad])
	var y_scale = d3.scaleLinear().domain([0,1]).range([height-pad,pad])

	svg_elem.selectAll('edges').data(edges).enter().append('line').attr('class', 'edge')
		.attr('x1', d => x_scale(node_positions[d[0]].pos[0])).attr('x2', d => x_scale(node_positions[d[1]].pos[0]))
		.attr('y1', d => y_scale(node_positions[d[0]].pos[1])).attr('y2', d => y_scale(node_positions[d[1]].pos[1]))
		.attr('stroke', 'black').attr('stroke-width', 1.25).attr('fill', 'none')

	svg_elem.selectAll('nodes').data(node_positions).enter().append('circle').attr('class', 'node')
		.attr('cx', d => x_scale(d.pos[0])).attr('cy', d => y_scale(d.pos[1])).attr('r', 5).attr('fill', d3.hcl(0,0,40)).attr('stroke', d3.hcl(0,0,20)).attr('stroke-width', 1.25)

	var update_button = document.createElement('button');
	update_button.innerHTML = 'Update'
	update_button.id = 'rectupdate'
	var body = document.getElementsByTagName('div')[0];
	body.appendChild(update_button);

	var text_region = document.createElement('input');
	text_region.innerHTML = 'Stiffness'
	text_region.id = 'stiff'
	text_region.value = 0.7;
	body.appendChild(text_region);

	var n_nodes = nodes.length, n_edges = edges.length;
	var adjacency_mat = compute_adjaceny_matrix(nodes,edges);

	var k_scale = 0.7;
	var k = k_scale*Math.sqrt(1/n_nodes);
	var eta = 1e-1;
	var decay = 0.92;
	var key_iter = 0;

	document.getElementById('rectupdate').addEventListener('click', d => {
		k_scale = document.getElementById('stiff').value;
		k = k_scale*Math.sqrt(1/n_nodes);
		if(key_iter%2 == 0)  {
			compute_forces(node_positions, adjacency_mat, k);
			var disp_selection = d3.select('svg').selectAll('disp').data(node_positions).enter()
			var disp_mags = node_positions.map(d => Math.sqrt(d.disp[0]*d.disp[0]+d.disp[1]*d.disp[1]));
			var r_scale = d3.scaleSqrt().domain([d3.min(disp_mags,d=>d),d3.max(disp_mags,d=>d)]).range([2,10]);
			disp_selection.append('line').attr('class', 'dispedge')
				.attr('x1', d => x_scale(d.pos[0])).attr('y1', d => y_scale(d.pos[1]))
				.attr('x2', function(d)  {
					var disp_mag = Math.sqrt(d.disp[0]*d.disp[0] + d.disp[1]*d.disp[1]);
					var disp_x = d.pos[0]+d.disp[0]*(0.075/disp_mag);
					return x_scale(disp_x);
				})
				.attr('y2', function(d)  {
					var disp_mag = Math.sqrt(d.disp[0]*d.disp[0] + d.disp[1]*d.disp[1]);
					var disp_y = d.pos[1]+d.disp[1]*(0.075/disp_mag);
					return y_scale(disp_y);
				})
				.attr('fill', 'none').attr('stroke', d3.hcl(0,20,60)).attr('opacity', 1.0).attr('stroke-width', 2.5);
			disp_selection.append('circle').attr('class', 'dispnode')
				.attr('cx', function(d)  {
					var disp_mag = Math.sqrt(d.disp[0]*d.disp[0] + d.disp[1]*d.disp[1]);
					var disp_x = d.pos[0]+d.disp[0]*(0.075/disp_mag);
					return x_scale(disp_x);
				})
				.attr('cy', function(d)  {
					var disp_mag = Math.sqrt(d.disp[0]*d.disp[0] + d.disp[1]*d.disp[1]);
					var disp_y = d.pos[1]+d.disp[1]*(0.075/disp_mag);
					return y_scale(disp_y);
				})
				.attr('r', function(d)  {
					var disp_mag = Math.sqrt(d.disp[0]*d.disp[0] + d.disp[1]*d.disp[1]);
					return r_scale(disp_mag);
				})
				.attr('fill', d3.hcl(0,20,60)).attr('stroke', 'rgb(48,48,0)').attr('opacity', 1.0)
		}
		else if(key_iter%2 == 1)  {
			advect_nodes(node_positions, eta);
			eta *= decay;

			d3.selectAll('.dispedge').transition(d3.transition(1500)).attr('opacity', 0.0).remove()
			d3.selectAll('.dispnode').transition(d3.transition(1500)).attr('opacity', 0.0).remove()
			d3.selectAll('.node').data(node_positions).transition(d3.transition(2500))
				.attr('cx', d => x_scale(d.pos[0])).attr('cy', d => y_scale(d.pos[1]))

			d3.selectAll('.edge').transition(d3.transition(1500))
				.attr('x1', d => x_scale(node_positions[d[0]].pos[0])).attr('x2', d => x_scale(node_positions[d[1]].pos[0]))
				.attr('y1', d => y_scale(node_positions[d[0]].pos[1])).attr('y2', d => y_scale(node_positions[d[1]].pos[1]))
		}
		key_iter+=1;
	});
}
