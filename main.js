import Map from 'ol/Map.js';
import Overlay from 'ol/Overlay.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import XYZ from 'ol/source/XYZ.js';
import {toLonLat} from 'ol/proj.js';
import {toStringHDMS} from 'ol/coordinate.js';
import TileWMS from 'ol/source/TileWMS.js';
import OSM from 'ol/source/OSM.js';
import {$,jQuery} from 'jquery';
import proj4 from 'proj4';
window.$ = $;
window.jQuery = jQuery;
/**
 * Elements that make up the popup.
 */
const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');
var EPSG_WGS84 = new proj4.Proj('WGS84');    
var EPSG_900913 = new proj4.Proj('EPSG:900913');
/**
 * Create an overlay to anchor the popup to the map.
 */
const overlay = new Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 1000000,
    },
  },
});

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

const key = 'Get your own API key at https://www.maptiler.com/cloud/';
const attributions =
  '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

/**
 * Create the map.
 */
// var map = new ol.Map({
//     target: 'map',
//     view: new ol.View({
//       center: ol.proj.fromLonLat([107.121338,10.448773]), // tọa độ trung tâm của bản đồ (theo hệ tọa độ WGS84)
//       zoom: 14 // mức độ phóng ban đầu
//     })
//   });
const map = new Map({
    overlays: [overlay],
    target: 'map',
    view: new View({
      center: [11908728.661193386,1202492.2598778037],
    //   center: [0,0],
      zoom: 10,
    }),
  });

  var layer_osm = new TileLayer({
    source: new OSM() // sử dụng OpenStreetMap làm nguồn dữ liệu bản đồ
  });
  var layer_google = new TileLayer({
    source: new XYZ({
        url:'https://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      }), // sử dụng OpenStreetMap làm nguồn dữ liệu bản đồ
  });
  //https://mt0.google.com/vt/lyrs=m&x=819&y=483&z=10
  var layer_signal = new TileLayer({
    source: new TileWMS({
      // url: 'http://10.70.123.74:31808/geoserver/wms',
      url: 'http://10.159.131.28:31808/geoserver/wms',
      params: {
        'LAYERS': 'db1:line',
        'TILED': true
      },
      
    }),
    maxZoom: 20,
    minZoom: 13,
  });

  var layer_tuyen = new TileLayer({
    source: new TileWMS({
      // url: 'http://10.70.123.74:31808/geoserver/wms',
      url: 'http://10.159.131.28:31808/geoserver/wms',
      params: {
        'LAYERS': 'db1:polygon',
        'TILED': true
      },
      
    }),
    maxZoom: 20,
    minZoom: 13,
  });

  map.addLayer(layer_osm);
  map.addLayer(layer_google);
  map.addLayer(layer_tuyen);
  map.addLayer(layer_signal);
  layer_google.setVisible(false);
  // array = [layer_tuyen, layer_signal,....]
  document.getElementById("layer1").addEventListener("click", (e)=>{
    // e.preventDefault();
    layer_signal.setVisible(document.getElementById("layer1").checked);
  });

  document.getElementById("layer2").addEventListener("click", (e)=>{
    // e.preventDefault();
    layer_tuyen.setVisible(document.getElementById("layer2").checked);
  });
  document.getElementById("layer0").addEventListener("click", (e)=>{
    // e.preventDefault();
    if(document.getElementById("layer0").checked){
        layer_osm.setVisible(true);
        layer_google.setVisible(false);
    }else{
        layer_osm.setVisible(false);
        layer_google.setVisible(true);
    }

  });


/**
 * Add a click handler to the map to render the popup.
 */
map.on('singleclick', function (evt) {
  const coordinate = evt.coordinate;
  // const hdms = toStringHDMS(toLonLat(coordinate));
  var x = proj4.transform(EPSG_900913, EPSG_WGS84, coordinate);
  // console.log(x)
  // let bbox = `${x.x},${x.y},${x.x},${x.y}`
  // let url = "http://10.159.131.28:31808/geoserver/db1/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=application/json&QUERY_LAYERS={layer}&LAYERS={layer}&INFO_FORMAT=application/json&FEATURE_COUNT=50&X=50&Y=50&SRS=EPSG%3A4326&STYLES=&WIDTH=101&HEIGHT=101&BBOX={bbox}"
  // let _url = url.replaceAll("{layer}","db1:polygon").replaceAll("{bbox}",bbox)
  // // window.$.get(_url,(data)=>{console.log(data)})
  // fetch(_url)
  // .then((response) => response.json())
  // .then((json) => console.log(json));
  content.innerHTML = `<p>You clicked here:</p><code> ${x.x}, ${x.y}  </code>`;
  overlay.setPosition(coordinate);
});
