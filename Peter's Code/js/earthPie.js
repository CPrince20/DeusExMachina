function init() {

    const topHoldersArray =
      {
        "1":{"name":"lineChart","amount":"60","url":"./lineChart.html"},
        "2":{"name":"name2","amount":"60","url":"https://www.google.com/"},
        "3":{"name":"name3","amount":"60","url":"https://www.google.com/"},
        "4":{"name":"name4","amount":"60","url":"https://www.google.com/"}
      };
  
    const data = d3.entries(topHoldersArray);
  
    const width = 270;
    const height = 270;
    const thickness = 60;
  
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory20);
  
    const svg = d3.select("#topHoldersChart")
      .append('svg')
      .attr('class', 'pie')
      .attr('width', width)
      .attr('height', height)
      .style('position', 'fixed')
      .style('z-index', '99')
      .style('left', '50%')
      .style('transform', 'translateX(-50%) ')
  
  
  
    const g = svg.append('g')
      .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');
  
    const arc = d3.arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius);
  
    const pie = d3.pie()
      .startAngle(-90 * Math.PI/180)
      .endAngle(-90 * Math.PI/180 + 2*Math.PI)
      .value(function(d) { return d.value.amount; })
      .padAngle(.01)
      .sort(null);
  
    const inner = g.selectAll('path')
      .data(pie(data))
      .enter()
      .append("g")
      .on("click", function(d) {
        console.log(d)
        window.open(d.data.value.url);
      })
  
    inner.append('path')
      .attr("id", function(d,i) { return "textArc_" + i; })
      .attr('d', arc)
      .attr('fill', (d,i) => color(i))
      .on("mouseover", function(d) {
        d3.select(this)
          .style("cursor", "pointer")
          .style("fill", "grey");
      })
      .on("mouseout", function(d) {
        d3.select(this)
          .style("cursor", "none")
          .style("fill", color(this._current));
      })
      .each(function(d, i) { this._current = i; });
  
    inner.append('text')
      .attr("x","70")
      .attr("dy","25")
      .append("textPath")
      .attr("xlink:href",function(d,i){return "#textArc_"+i;})
      .attr("transform",function(d){return "translate("+arc.centroid(d)+")";})
      .attr("dy", -13)
      // .attr("startOffset", "50%")
      // .attr('stroke','white')
      .attr('fill','white')
      .style("text-anchor","middle")
      .style("cursor", "pointer")
      .text(function(d, i) {
        console.log(d)
        return d.data.value.name
      })
  
  
  
  
    g.append('defs')
      .append('pattern')
      .attr('id', 'image')
      .attr('x', '-110')
      .attr('y', '-110')
      .attr('patternUnits', 'userSpaceOnUse')
      .attr('height', '200')
      .attr('width', '200')
      .append('svg:image')
      .attr('xlink:href', './earth.png')
      .attr('x', '0')
      .attr('y', '0')
      .attr('height', '220')
      .attr('width', '220')
  
    g.append('circle')
      .attr('r', "90")
      .attr('cx', "0")
      .attr('cy', "0")
      .style('fill', 'url("#image")')
      .style('cursor', 'pointer')
      .on('click', function () {
        window.open('/')
      })
  
    svg
      .attr('height', 290)
      .append('text')
      .text('the title')
      .attr('x', 100)
      .attr('y', 290)
      .style('font-size', 20)
  }
  init();