// Function to determine marker size based on population
function markerSize(population) {
    return population * 1000000;
  }
  
  // An array containing all of the information needed to create city and state markers
  var locations = [
    {
      coordinates: [80, -10],
      seventies: {
        name: "Greenland",
        value: 0
      },
      eighties: {
        name: "Greenland",
        value: 0.247
      },
      nineties: {
        name: "Greenland",
        value: 0.613
      },
      twothousands: {
        name: "Greenland",
        value: 1.402
      },
      twentytens: {
        name: "Greenland",
        value: 2.287
      }
    },
    {
      coordinates: [60, -150],
      seventies: {
        name: "Alaska",
        value: 0.002
      },
      eighties: {
        name: "Alaska",
        value: 0.307
      },
      nineties: {
        name: "Alaska",
        value: 0.657
      },
      twothousands: {
        name: "Alaska",
        value: 0.99
      },
      twentytens: {
        name: "Alaska",
        value: 1.17
      }
    },
    {
      coordinates: [30, -80],
      seventies: {
        name: "USA",
        value: 0
      },
      eighties: {
        name: "USA",
        value: 0.046
      },
      nineties: {
        name: "USA",
        value: 0.307
      },
      twothousands: {
        name: "USA",
        value: 0.628
      },
      twentytens: {
        name: "USA",
        value: 0.867
      }
    },
    {
      coordinates: [30, 30],
      seventies: {
        name: "Egypt",
        value: 0
      },
      eighties: {
        name: "Egypt",
        value: 0.046
      },
      nineties: {
        name: "Egypt",
        value: 0.307
      },
      twothousands: {
        name: "Egypt",
        value: 0.628
      },
      twentytens: {
        name: "Egypt",
        value: 0.867
      }
    },
    {
      coordinates: [0, -50],
      seventies: {
        name: "Brazil",
        value: 0.011
      },
      eighties: {
        name: "Brazil",
        value: 0.278
      },
      nineties: {
        name: "Brazil",
        value: 0.383
      },
      twothousands: {
        name: "Brazil",
        value: 0.522
      },
      twentytens: {
        name: "Brazil",
        value: 0.73
      }
    },
    {
      coordinates: [5, 125],
      seventies: {
        name: "Philippines",
        value: 0.011
      },
      eighties: {
        name: "Philippines",
        value: 0.278
      },
      nineties: {
        name: "Philippines",
        value: 0.383
      },
      twothousands: {
        name: "Philippines",
        value: 0.522
      },
      twentytens: {
        name: "Philippines",
        value: 0.73
      }
    },
    {
      coordinates: [-30, 115],
      seventies: {
        name: "Australia",
        value: 0.167
      },
      eighties: {
        name: "Australia",
        value: 0.279
      },
      nineties: {
        name: "Australia",
        value: 0.328
      },
      twothousands: {
        name: "Australia",
        value: 0.504
      },
      twentytens: {
        name: "Australia",
        value: 0.692
      }
    },
    {
      coordinates: [-30, 30],
      seventies: {
        name: "South Africa",
        value: 0.167
      },
      eighties: {
        name: "South Africa",
        value: 0.279
      },
      nineties: {
        name: "South Africa",
        value: 0.328
      },
      twothousands: {
        name: "South Africa",
        value: 0.504
      },
      twentytens: {
        name: "South Africa",
        value: 0.692
      }
    },
    {
      coordinates: [-55, -70],
      seventies: {
        name: "Argentina",
        value: 0.129
      },
      eighties: {
        name: "Argentina",
        value: 0.324
      },
      nineties: {
        name: "Argentina",
        value: 0.29
      },
      twothousands: {
        name: "Argentina",
        value: 0.181
      },
      twentytens: {
        name: "Argentina",
        value: 0.251
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
  
  // Define arrays to hold created city and state markers
  var seventiesMarkers = [];
  var eightiesMarkers = [];
  var ninetiesMarkers = [];
  var twothousandsMarkers = [];
  var twentytensMarkers = [];
 
  // Loop through locations and create city and state markers
  for (var i = 0; i < locations.length; i++) {
    // Setting the marker radius for the state by passing population into the markerSize function
    seventiesMarkers.push(
      L.circle(locations[i].coordinates, {
        stroke: false,
        fillOpacity: 0.75,
        color: "silver",
        fillColor: "silver",
        radius: markerSize(locations[i].seventies.value)
      })
    );
  
    // Setting the marker radius for the city by passing population into the markerSize function
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
  
  // Create two separate layer groups: one for cities and one for states
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
    layers: [streetmap, twentytens, twothousands, nineties, eighties, seventies]
  });
  


  
  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
  
