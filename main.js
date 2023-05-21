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
const host = "http://127.0.0.1:8188"
// const host_geoserver = "http://10.159.131.28:31808"
const host_geoserver = "http://127.0.0.1:8188"
const fieldType = {
  "name": "Tên",
  "type": "Loại"
}
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
// closer.onclick = function () {
//   overlay.setPosition(undefined);
//   closer.blur();
//   debugger;
//   container.style.display = "none"
//   return false;
// };

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

var view = new View({
  center: [11908728.661193386,1202492.2598778037],
  zoom: 10,
})
const map = new Map({
    overlays: [overlay],
    target: 'map',
    view: view
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
  var  layer_line = new TileLayer({
    source: new TileWMS({
      // url: 'http://10.70.123.74:31808/geoserver/wms',
      url: `${host_geoserver}/geoserver/gis/wms`,
      params: {
        'LAYERS': 'gis:line',
        'TILED': true
      },
      
    }),
    maxZoom: 20,
    minZoom: 0,
  });

  var  layer_polygon = new TileLayer({
    source: new TileWMS({
      // url: 'http://10.70.123.74:31808/geoserver/wms',
      url: `${host_geoserver}/geoserver/gis/wms`,
      params: {
        'LAYERS': 'polygon',
        'TILED': true
      },
      
    }),
    maxZoom: 20,
    minZoom: 0,
  });

  map.addLayer(layer_osm);
  map.addLayer(layer_google);
  map.addLayer( layer_polygon);
  map.addLayer( layer_line);
  layer_google.setVisible(false);
  // array = [ layer_polygon,  layer_line,....]
  document.getElementById("layer1").addEventListener("click", (e)=>{
    // e.preventDefault();
     layer_line.setVisible(document.getElementById("layer1").checked);
  });

  document.getElementById("layer2").addEventListener("click", (e)=>{
    // e.preventDefault();
     layer_polygon.setVisible(document.getElementById("layer2").checked);
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
  // console.log("hello")
  //HIển thị show thẻ div popup bên phải
  // container.style.display = "block"
  const coordinate = evt.coordinate;
  // const hdms = toStringHDMS(toLonLat(coordinate));
  var x = proj4.transform(EPSG_900913, EPSG_WGS84, coordinate);
  const viewResolution = (view.getResolution());
  const url =  layer_line.getSource().getFeatureInfoUrl(
    evt.coordinate,
    viewResolution,
    'EPSG:3857',
    {'INFO_FORMAT': 'application/json'}
  );
  if (url) {
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      let html =""
      // Object.keys(json?.features[0]?.properties)
      for (let key in json?.features[0]?.properties) {
        console.log(key + ": "+ json?.features[0]?.properties[key])
        html += `<p><lable>${fieldType[key]}: </lable>  ${json?.features[0]?.properties[key]}</p>`;
     }
      // let html = `
      // <p><lable>name: </lable>  ${json?.features[0]?.properties.name}</p>
      // <p><lable>type: </lable>  ${json?.features[0]?.properties.type}</p>
      // `

      content.innerHTML = `<p>You clicked here:</p><code> ${html}</code>`;
      // overlay.setPosition(coordinate);
    });
  }
  
  
});
