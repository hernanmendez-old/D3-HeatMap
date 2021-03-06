function callback(Data){
/////////////////////////////////////
var data = Data.data.monthlyVariance;
/////////////////////////////////////
//some variables
var height=430;
var width=800;
var barHeight=height/12;
var barWidth=width/Math.ceil(data.length/12);
var tooltip=document.getElementById('tooltip');

//setting the initial svg
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

//some vars
var axes=d3.select('.axes');
var map=d3.select('.map');
//function to determine the position relative to x
var xPos=d3.scaleLinear()
    .domain([data[0].year,data[data.length-1].year])
    .range([0,width-barWidth])
//function to determine the color of the rect
var color=d3.scaleQuantile()
    .domain([-7,-5,-3,-1,0,1])
    .range(['#0047b3','#66b3ff','#99ffcc','#ffff66','#ffb366','#ff1a1a'])
//setting the rects
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

    //line in the bottom
    axes.append('line')
        .attr('x1',99)
        .attr('x2',899)
        .attr('y1',530)
        .attr('y2',530)
    
    //setting the months
    var months=['January','February','March','April','May','June','July','August','September','October','November','December'];
    axes.append('g').selectAll('text').data(months)
      .enter().append('text')
        .style('text-anchor','end')
        .attr('y',function(d,i){return barHeight*i+barHeight/2+100})
        .attr('x',98)
        .style('fill','black')
        .text(function(d){return d})


    //setting the years
    var years=[1760,1770,1780,1790,1800,1810,1820,1830,1840,1850,1860,1870,1880,1890,1900,1910,1920,1930,1940,1950,1960,1970,1980,1990,2000,2010]
    axes.append('g').attr('id','years').selectAll('text').data(years)
      .enter().append('text')
        .style('text-anchor','middle')
        .style('font-size','13px')
        .style('fill','black')
        .attr('x',function(d){return xPos(d)+100})
        .attr('y',550)
        .text(function(d){return d})
    axes.select('#years').selectAll('line').data(years)
      .enter().append('line')
        .attr('x1',function(d){return xPos(d)+100})
        .attr('x2',function(d){return xPos(d)+100})
        .attr('y1',531)
        .attr('y2',540)
    axes.append('text')
        .style('text-anchor','middle')
        .style('font-size','20px')
        .style('fill','black')
        .text('Monthly Global Land-Surface Temperature 1753-2015')
        .attr('x',(width+200)/2)
        .attr('y',40)

    axes.append('text')
        .style('text-anchor','middle')
        .style('font-size','12px')
        .style('fill','black')
        .text('Temperatures are in Celsius and reported as anomalies relative to the Jan 1951-Dec 1980 average.')
        .attr('x',(width+200)/2)
        .attr('y',60)

    axes.append('text')
        .style('text-anchor','middle')
        .style('font-size','12px')
        .style('fill','black')
        .text('Estimated Jan 1951-Dec 1980 absolute temperature 8.66 +/- 0.07')
        .attr('x',(width+200)/2)
        .attr('y',74) 
}
axios.get('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json').then(callback);