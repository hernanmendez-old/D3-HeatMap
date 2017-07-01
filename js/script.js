function callback(data){
/////////////////////////////////////
var data = data.data.monthlyVariance;
/////////////////////////////////////

var height=300;
var width=800;
var barHeight=height/12;
var barWidth=width/Math.ceil(data.length/12);

d3.select('#main')
  .append('svg')
    .attr('width',1000)
    .attr('height',500)
  .append('g')
    .attr('width',width)
    .attr('height',height)
    .attr('class','map')
    .attr('transform','translate(100,100)');

d3.select('svg')
  .append('g')
    .attr('class','axes');

var axes=d3.select('.axes');
var map=d3.select('.map');
var xPos=d3.scaleLinear()
    .domain([data[0].year,data[data.length-1].year])
    .range([0,width-barWidth])

map.selectAll('rect')
    .data(data)
  .enter().append('rect')
    .attr('x',function(d){return xPos(d.year)})
    .attr('y',function(d){return barHeight*(d.month-1)})
    .attr('width',barWidth)
    .attr('height',barHeight)
    .style('fill','black')
}
axios.get('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json').then(callback);