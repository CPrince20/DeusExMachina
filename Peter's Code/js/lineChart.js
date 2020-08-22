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
        temp = Object.entries(data.filter(item => item.City.toLowerCase() === city.toLowerCase() && item.AvgTemperature > 0).reduce((acc, cur) => {
          if (acc[cur.Year] && acc[cur.Year].AvgTemperature < cur.AvgTemperature ) {
            acc[cur.Year] = cur;
          } else if (!acc[cur.Year]) {
            acc[cur.Year] = cur;
          }
          return acc;
        }, {})).map(item => item[1]);
        break;
      }
      case 'avg': {
        temp = Object.entries(data.filter(item => item.City.toLowerCase() === city.toLowerCase() && item.AvgTemperature > 0).reduce((acc, cur) => {
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
          AvgTemperature: item.sum / item.totalDay
        }))
        console.log(temp)
        break;
      }
    }

    var svg = d3.select(`.${type}`)
      .append(`svg`)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform',
        'translate(' + margin.left + ',' + margin.top + ')');

    var x = d3.scaleTime()
      .domain(d3.extent(temp, function (d) {
        return d.Date;
      }))
      .range([0, width]);

    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([
        0,
        d3.max(temp, function (d) {
          return +d.AvgTemperature;
        })])
      .range([height, 0]);
    svg.append('g')
      .call(d3.axisLeft(y));

    // Add the line
    svg.append('path')
      .datum(temp)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x(function (d) {
          return x(d.Date)
        })
        .y(function (d) {
          return y(d.AvgTemperature)
        }),
      );
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
