import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import TileWMS from 'ol/source/TileWMS.js';
import proj4 from 'proj4';
var EPSG_WGS84 = new proj4.Proj('WGS84');    
var EPSG_900913 = new proj4.Proj('EPSG:900913');
var centerPointWGS84 = [106.66381357038252,10.990159444951493 ]
var centerPoint900913 = proj4.transform(EPSG_WGS84, EPSG_900913,centerPointWGS84 );
const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  target: 'map',
  view: new View({
    center: [centerPoint900913.x, centerPoint900913.y],
    zoom: 14,
  }),
});

var line_signal = new TileLayer({
    source: new TileWMS({
      url: 'http://10.159.131.28:31808/geoserver/wms',
      params: {
        'LAYERS': 'db1:line',
        'TILED': true
      },
      
    }),
    maxZoom: 20,
    minZoom: 16,
});

var polygon_signal = new TileLayer({
    source: new TileWMS({
      url: 'http://10.159.131.28:31808/geoserver/wms',
      params: {
        'LAYERS': 'db1:polygon',
        'TILED': true
      },
    }),
    maxZoom: 20,
    minZoom: 13,
});
  map.addLayer(line_signal)
  map.addLayer(polygon_signal)
document.getElementById('zoom-out').onclick = function () {
  const view = map.getView();
  const zoom = view.getZoom();
  view.setZoom(zoom - 1);
};

document.getElementById('zoom-in').onclick = function () {
  const view = map.getView();
  const zoom = view.getZoom();
  view.setZoom(zoom + 1);
};


// var firstProjection = 'PROJCS["NAD83 / Massachusetts Mainland",GEOGCS["NAD83",DATUM["North_American_Datum_1983",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],AUTHORITY["EPSG","6269"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4269"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Lambert_Conformal_Conic_2SP"],PARAMETER["standard_parallel_1",42.68333333333333],PARAMETER["standard_parallel_2",41.71666666666667],PARAMETER["latitude_of_origin",41],PARAMETER["central_meridian",-71.5],PARAMETER["false_easting",200000],PARAMETER["false_northing",750000],AUTHORITY["EPSG","26986"],AXIS["X",EAST],AXIS["Y",NORTH]]';
//[11873774.559141861, 1230992.0687554067]

// var x = 
// console.log(x)
