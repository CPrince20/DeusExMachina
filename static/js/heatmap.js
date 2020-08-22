// let baseLayer = L.tileLayer(
//     'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a>'
//     }
// )

// let cfg = {
//     "radius": 40,
//     "useLocalExtrema": true,
//     valueField: 'Anomalies'
// };
// let heatmapLayer = new HeatmapOverlay(cfg);

// let min = Math.min(...2010s.map(value=> 2010s.value))
// let max = Math.max(...2010s.map(value => 2010s.value))

// let HeatMap = new L.Map('map', {
//     center: new L.LatLng(39.275, -76.613),
//     zoom: 15,
//     layers: [baseLayer, heatmapLayer]
// })

// heatmapLayer.setData({
//     min: min,
//     max: max,
//     data: Anomalies
// });

