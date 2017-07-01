function callback(Data){
/////////////////////////////////////
var data = Data.data.monthlyVariance;
/////////////////////////////////////

var height=430;
var width=800;
var barHeight=height/12;
var barWidth=width/Math.ceil(data.length/12);
var tooltip=document.getElementById('tooltip');

d3.select('#main')
  .append('svg')
    .attr('width',width+200)
    .attr('height',height+200)
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
var color=d3.scaleQuantile()
    .domain([-7,-5,-3,-1,0,1])
    .range(['#0047b3','#66b3ff','#99ffcc','#ffff66','#ffb366','#ff1a1a'])

map.selectAll('rect')
    .data(data)
  .enter().append('rect')
    .attr('x',function(d){return xPos(d.year)})
    .attr('y',function(d){return barHeight*(d.month-1)})
    .attr('width',barWidth)
    .attr('height',barHeight)
    .style('fill',function(d){return color(d.variance)})
    .on('mouseover',function(d){

        tooltip.style.display="block";
        tooltip.style.top=barHeight*(d.month)+100+'px';
        if(window.innerWidth>1000) tooltip.style.left=parseInt(xPos(d.year),10)+(window.innerWidth-1000)/2+barWidth+100+'px';
        else tooltip.style.left=parseInt(xPos(d.year),10)+100+barWidth+'px';

        tooltip.innerHTML='year: '+d.year+'<br/>Temperature Variance: '+d.variance+'<br/>Temperature: '+(Data.data.baseTemperature+d.variance);

    })
    .on('mouseout',function(){

        tooltip.style.display="none";

    })

}
axios.get('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json').then(callback);