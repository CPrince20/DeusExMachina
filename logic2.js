// Function to determine marker size based on value
function markerSize(value) {
    return value * 1000000;
  }
  
  // An array containing all of the information needed to create markers
  var locations = [
    {
      coordinates: [80, -10],
      seventies: {
        name: "Arctic",
        value: 0
      },
      eighties: {
        name: "Arctic",
        value: 0.247
      },
      nineties: {
        name: "Arctic",
        value: 0.613
      },
      twothousands: {
        name: "Arctic",
        value: 1.402
      },
      twentytens: {
        name: "Arctic",
        value: 2.287
      }
    },
    {
      coordinates: [30, -120],
      seventies: {
        name: "North America",
        value: 0
      },
      eighties: {
        name: "North America",
        value: 0.294
      },
      nineties: {
        name: "North America",
        value: 0.489
      },
      twothousands: {
        name: "North America",
        value: 0.825
      },
      twentytens: {
        name: "North America",
        value: 1.156
      }
    },
    {
      coordinates: [40, 20],
      seventies: {
        name: "Europe",
        value: 0
      },
      eighties: {
        name: "Europe",
        value: 0.021
      },
      nineties: {
        name: "Europe",
        value: 0.523
      },
      twothousands: {
        name: "Europe",
        value: 1.05
      },
      twentytens: {
        name: "Europe",
        value: 1.401
      }
    },
    {
      coordinates: [0, -50],
      seventies: {
        name: "South America",
        value: 0.084
      },
      eighties: {
        name: "South America",
        value: 0.344
      },
      nineties: {
        name: "South America",
        value: 0.558
      },
      twothousands: {
        name: "South America",
        value: 0.76
      },
      twentytens: {
        name: "South America",
        value: 1.082
      }
    },
    {
      coordinates: [20, 115],
      seventies: {
        name: "Asia",
        value: 0.06
      },
      eighties: {
        name: "Asia",
        value: 0.326
      },
      nineties: {
        name: "Asia",
        value: 0.684
      },
      twothousands: {
        name: "Asia",
        value: 1.134
      },
      twentytens: {
        name: "Asia",
        value: 1.336
      }
    },
    {
      coordinates: [-30, 115],
      seventies: {
        name: "Australia",
        value: 0.135
      },
      eighties: {
        name: "Australia",
        value: 0.422
      },
      nineties: {
        name: "Australia",
        value: 0.53
      },
      twothousands: {
        name: "Australia",
        value: 0.703
      },
      twentytens: {
        name: "Australia",
        value: 0.946
      }
    },
    {
      coordinates: [-10, 40],
      seventies: {
        name: "Africa",
        value: 0.005
      },
      eighties: {
        name: "Africa",
        value: 0.29
      },
      nineties: {
        name: "Africa",
        value: 0.491
      },
      twothousands: {
        name: "Africa",
        value: 0.819
      },
      twentytens: {
        name: "Africa",
        value: 1.158
      }
    },
    {
      coordinates: [17, -155],
      seventies: {
        name: "Hawaii",
        value: 0
      },
      eighties: {
        name: "Hawaii",
        value: 0.31
      },
      nineties: {
        name: "Hawaii",
        value: 0.171
      },
      twothousands: {
        name: "Hawaii",
        value: 0.184
      },
      twentytens: {
        name: "Hawaii",
        value: 0.561
      }
    },
    {
      coordinates: [-75, -22],
      seventies: {
        name: "Antarctica",
        value: 0.231
      },
      eighties: {
        name: "Antarctica",
        value: 0.28
      },
      nineties: {
        name: "Antarctica",
        value: 0.292
      },
      twothousands: {
        name: "Antarctica",
        value: 0.589
      },
      twentytens: {
        name: "Antarctica",
        value: 0.563
      }
    }
  ];
  
  // Define arrays to hold markers
  var seventiesMarkers = [];
  var eightiesMarkers = [];
  var ninetiesMarkers = [];
  var twothousandsMarkers = [];
  var twentytensMarkers = [];
 
  // Loop through locations and markers
  for (var i = 0; i < locations.length; i++) {
    // Setting the marker radius by passing value into the markerSize function
    seventiesMarkers.push(
      L.circle(locations[i].coordinates, {
        stroke: false,
        fillOpacity: 0.75,
        color: "silver",
        fillColor: "silver",
        radius: markerSize(locations[i].seventies.value)
      })
    );
  
    eightiesMarkers.push(
      L.circle(locations[i].coordinates, {
        stroke: false,
        fillOpacity: 0.75,
        color: "yellow",
        fillColor: "yellow",
        radius: markerSize(locations[i].eighties.value)
      })
    );

    ninetiesMarkers.push(
        L.circle(locations[i].coordinates, {
          stroke: false,
          fillOpacity: 0.75,
          color: "orange",
          fillColor: "orange",
          radius: markerSize(locations[i].nineties.value)
        })
      );

    twothousandsMarkers.push(
        L.circle(locations[i].coordinates, {
          stroke: false,
          fillOpacity: 0.75,
          color: "orangered",
          fillColor: "orangered",
          radius: markerSize(locations[i].twothousands.value)
        })
      );

    twentytensMarkers.push(
        L.circle(locations[i].coordinates, {
          stroke: false,
          fillOpacity: 0.75,
          color: "red",
          fillColor: "red",
          radius: markerSize(locations[i].twentytens.value)
        })
      );
  }
  
  // Create base layers
  
  // Streetmap Layer
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });
  
  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });
  
  var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-v9",
    accessToken: API_KEY
  });
  
  // Create separate layer groups
  var seventies = L.layerGroup(seventiesMarkers);
  var eighties = L.layerGroup(eightiesMarkers);
  var nineties = L.layerGroup(ninetiesMarkers);
  var twothousands = L.layerGroup(twothousandsMarkers);
  var twentytens = L.layerGroup(twentytensMarkers);
  
  
  // Create a baseMaps object
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap,
    "Satellite Map": satellitemap
  };
  
  // Create an overlay object
  var overlayMaps = {
    "2010s": twentytens,
    "2000s": twothousands,
    "1990s": nineties,
    "1980s": eighties,
    "1970s": seventies
  };
  
  // Define a map object
  var myMap = L.map("map", {
    center: [10, -10],
    zoom: 2,
    layers: [satellitemap, twentytens, twothousands, nineties, eighties, seventies]
  });
  

  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
  
