function callback(data){
    /////////////////////////////////////
    var data = data.data.monthlyVariance;
    /////////////////////////////////////

    var height=300;
    var width=1000;
    var barHeight=height/12;
    var barWidth=width/Math.ceil(data.length/12);

    d3.select('#app')
      .append('svg')
        .attr('width',1000)
        .attr('height',500)
      .append('g')
        .attr('width',1000)
        .attr('height',500)

}
axios.get('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json').then(callback);