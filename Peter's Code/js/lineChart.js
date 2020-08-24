async function initLineChart() {
  addInputEvent();
  let data;
  var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 1200 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;


//Read the data
  await d3.csv('./city_temperature.csv',
    // When reading the csv, I must format variables:
    function (d) {
      return {
        Region: d.Region,
        Country: d.Country,
        State: d.State,
        City: d.City,
        Month: d.Month,
        Day: d.Day,
        Year: d.Year,
        Date: d3.timeParse('%Y-%m-%d')(`${d.Year}-${d.Month}-${d.Day}`),
        AvgTemperature: d.AvgTemperature,
      }
    },
    function (d) {
      data = d;
    },
  )

  function renderLineChart(city, type) {
    d3.select(`.${type} svg`).remove();
    let temp;
    switch (type) {
      case 'high': {
        temp = Object.entries(data.filter(item => item.City.toLowerCase() === city.toLowerCase() && item.AvgTemperature > 0 && item.Year != 2020).reduce((acc, cur) => {
          if (acc[cur.Year] && acc[cur.Year].AvgTemperature < cur.AvgTemperature ) {
            acc[cur.Year] = cur;
          } else if (!acc[cur.Year]) {
            acc[cur.Year] = cur;
          }
          return acc;
        }, {})).map(item => item[1])
          .map(item => ({
            ...item,
            Date: d3.timeParse('%Y-%m-%d')(`${item.Year}-${1}-${1}`),
          }))
        break;
      }
      case 'avg': {
        temp = Object.entries(data.filter(item => item.City.toLowerCase() === city.toLowerCase() && item.AvgTemperature > 0 && item.Year != 2020).reduce((acc, cur) => {
          if (acc[cur.Year]) {
            acc[cur.Year].sum += Number(cur.AvgTemperature);
            acc[cur.Year].totalDay += 1;
          } else if (!acc[cur.Year]){
            cur.sum = Number(cur.AvgTemperature);
            cur.totalDay = 1;
            acc[cur.Year] = cur;
          }
          return acc;
        }, {}))
          .map(item => item[1])
          .map(item => ({
          ...item,
          Date: d3.timeParse('%Y-%m-%d')(`${item.Year}-${1}-${1}`),
          AvgTemperature: Math.floor(item.sum / item.totalDay)
        }))
        break;
      }
    }

    var svg = d3.select(`.${type}`)
      .append(`svg`)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom + 30)
      .append('g')
      .attr('transform',
        'translate(' + margin.left + ',' + margin.top + ')');

    var x = d3.scaleLinear()
      .domain([
        d3.min(temp, function (d) {
          return +d.Year;
        }),
        d3.max(temp, function (d) {
          return +d.Year;
        })
      ])
      .range([0, width]);

    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x)
        .ticks(d3.max(temp, function (d) {
            return +d.Year;
          }) - d3.min(temp, function (d) {
            return +d.Year;
          }))
        .tickSize(-width)
        .tickFormat(function (d, i) { console.log(d); return d })
      )
      .call(g => g.selectAll(".tick:not(:first-of-type) line")
        .attr("stroke-opacity", 0.5)
        .attr("stroke-dasharray", "2,2"))
      .call(g => g.selectAll(".tick text")
        .attr("x", 4)
        .attr("dy", 16)
        .style('font-size', '16px')
      )



    // Add Y axis
    var y = d3.scaleLinear()
      .domain([
        30,
        d3.max(temp, function (d) {
          return +d.AvgTemperature;
        }) + 10])
      .range([height, 0]);

    svg.append('g')
      .call(d3.axisLeft(y)
        .tickSize(-width)
      )
      .call(g => g.selectAll(".tick:not(:first-of-type) line")
        .attr("stroke-opacity", 0.5)
        .attr("stroke-dasharray", "2,2")
      )
      .call(g => g.selectAll(".tick text")
        .style('font-size', '16px')
      )

    svg.append('path')
      .datum(temp)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2.5)
      .attr('d', d3.line()
        .x(function (d) {
          return x(d.Year)
        })
        .y(function (d) {
          return y(d.AvgTemperature)
        }),
      );

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Temperature");

    svg.append("text")
      .attr("transform",
        "translate(" + (width/2) + " ," +
        (height + margin.top + 30) + ")")
      .style("text-anchor", "middle")
      .text("Date");

    var focus = d3.select(`.${type} svg`)
      .append("g")
      .attr("class", "focus")
      .style("display", "none");

    focus.append("circle")
      .attr("r", 5);

    focus.append("rect")
      .attr("class", "tooltip")
      .attr("width", 150)
      .attr("height", 50)
      .attr("x", 10)
      .attr("y", -22)
      .attr("rx", 4)
      .attr("ry", 4);

    focus.append("text")
      .attr("class", "tooltip-date")
      .attr("x", 18)
      .attr("y", -2);

    focus.append("text")
      .attr("x", 18)
      .attr("y", 18)
      .text("Temperature:");

    focus.append("text")
      .attr("class", "tooltip-temperature")
      .attr("x", 120)
      .attr("y", 18);

    svg.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", function() { focus.style("display", null); })
      .on("mouseout", function() { focus.style("display", "none"); })
      .on("mousemove", mousemove);

    function mousemove() {
      var bisectDate = d3.bisector(function(d) { return d.Year; }).left;

      var x0 = x.invert(d3.mouse(this)[0]),
        i = bisectDate(temp, x0, 1),
        d0 = temp[i - 1],
        d1 = temp[i],
        d = x0 - d0.Year > d1.Year - x0 ? d1 : d0;
      // focus.attr("transform", "translate(" + x(d.Year) + 60  + "," + y(d.AvgTemperature) - 30 + ")");
      focus.attr("transform", `translate(${x(d.Year) + 60}, ${y(d.AvgTemperature) + 10})`);
      focus.select(".tooltip-date").text(d.Year);
      focus.select(".tooltip-temperature").text(d.AvgTemperature);
    }

  }

  function addInputEvent() {
    const input = document.querySelector('.City');
    input.addEventListener('change', function (event) {
      const value = event.target.value;
      renderLineChart(value, 'avg');
      renderLineChart(value, 'high');
    })
  }
}


initLineChart();
