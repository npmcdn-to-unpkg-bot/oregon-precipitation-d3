var dataset = []

var tooltip = d3.select('body').append('div')
	.style('position', 'absolute')
	.style('z-index', '10')
	.style('visibility', 'hidden')
	.text('Tooltip');

d3.csv('data/or_precipitation.csv', function(error, data){
//grabbing data from csv
	data.forEach(function(d){
		temp = {
			station: d.STATION,
			annual: parseFloat(d.ANN)
		};
		dataset.push(temp)
	})

//creating color scale
	var annualPrecip = [];
	dataset.forEach(function(d){
		annualPrecip.push(d.annual);
	})
	var color = d3.scaleLinear()
		.domain([d3.min(annualPrecip), d3.max(annualPrecip)])
		.range(['#fff7fb', '#023858']);
	color.nice();

//create vertical axis
	// var yScale = d3.scaleLinear()
	// 	.domain([d3.min(annualPrecip), d3.max(annualPrecip)])
	// 	.range([d3.min(annualPrecip), d3.max(annualPrecip)]);

	//var yAxis = d3.axisLeft(yScale);
//create svg canvas
	var width = 1000,
		height = 500,
		barWidth = width/dataset.length;

	var svg = d3.select('#chart').append('svg')
		.attr('width', width)
		.attr('height', height)
		.append('g');

//drawing elements
	svg.selectAll('rect')
		.data(dataset)
		.enter().append('rect')
			.attr('width', barWidth)
			.attr('height', function(d){
				return d.annual * 4;
			})
			.attr('x', function(d,i){
				return i * (width / dataset.length);
			})
			.attr('y', function(d){
				return height - (d.annual * 4);
			})
			.attr('fill', function(d){
				return color(d.annual);
			})
			.on('mouseover', function(d){
				tooltip.text(d.station + ': ' + d.annual);
				tooltip.style('top', (event.pageY - 25) + 'px').style('left', (event.pageX - 15) + 'px');
				tooltip.style('background-color', 'rgba(0,0,0,0.85)').style('color', '#ffffff');
				tooltip.style('visibility', 'visible');
			})
			.on('mouseout', function(d){
				tooltip.classed('.tooltip', false)
				tooltip.style('visibility', 'hidden');
			});
//drawing axis
	// d3.select('#chart').select('svg').append('g')
	// 	.call(yAxis);
});
