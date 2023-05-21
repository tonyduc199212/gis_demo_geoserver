import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import TileWMS from 'ol/source/TileWMS.js'
import proj4 from 'proj4';
var EPSG_WGS84 = new proj4.Proj('WGS84');    
var EPSG_900913 = new proj4.Proj('EPSG:900913');
var centerPointWGS84 = [106.66375602870191,10.990190524052558]
var centerPoint900913 = proj4.transform(EPSG_WGS84, EPSG_900913,centerPointWGS84 );
console.log(`source::: ${centerPointWGS84} ::: dest::: ${centerPoint900913.x} ${centerPoint900913.y}`)
const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  target: 'map',
  view: new View({
    center: [centerPoint900913.x, centerPoint900913.y],
    zoom: 15,
  }),
});
const host_geoserver = "http://127.0.0.1:8188/geoserver"

var line_signal = new TileLayer({
    source: new TileWMS({
      url: `{host_geoserver}/geoserver/wms`,
      params: {
        'LAYERS': 'db1:line',
        'TILED': true
      },
      
    }),
    maxZoom: 20,
    minZoom: 5,
});

var polygon_signal = new TileLayer({
    source: new TileWMS({
      url: `http://{host_geoserver}/geoserver/wms`,
      params: {
        'LAYERS': 'db1:polygon',
        'TILED': true
      },
      
    }),
    maxZoom: 20,
    minZoom: 5,
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
