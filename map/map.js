let mymap;
let lyrOSM;
let mrkCurrentLocation;
let popZocalo;
let ctlAttribute;
let ctlScale;
let ctlPan;
let ctlZoomslider;
let ctlMouseposition;
let ctlMeasure;
let ctlEasybutton;
let ctlSidebar;
let ctlSearch;
let objBasemaps;
let objOverlays;

mymap = L.map("mapdiv", { center: [19.4, -99.2], zoom: 13, zoomControl: false, attributionControl: false });

lyrOSM = L.tileLayer.provider("OpenStreetMap.Mapnik");
lyrTopo = L.tileLayer.provider("OpenTopoMap");
lyrImagery = L.tileLayer.provider("Esri.WorldImagery");
lyrOutdoors = L.tileLayer.provider("Thunderforest.Outdoors");
lyrWatercolor = L.tileLayer.provider("Stamen.Watercolor");
mymap.addLayer(lyrOSM);

lyrChapultepec = L.imageOverlay(
  "img/chapultepec.png",
  [
    [19.42993, -99.20843],
    [19.40621, -99.17453],
  ],
  { opacity: 0.5 }
).addTo(mymap);

objBasemaps = {
  "Open Street Maps": lyrOSM,
  "Topo Map": lyrTopo,
  Imagery: lyrImagery,
  Outdoors: lyrOutdoors,
  Watercolor: lyrWatercolor,
};

objOverlays = {
  "Chapultepec Image": lyrChapultepec,
};

ctlLayers = L.control.layers(objBasemaps, objOverlays).addTo(mymap);

ctlPan = L.control.pan().addTo(mymap);
ctlZoomslider = L.control.zoomslider({ position: "topright" }).addTo(mymap);

ctlMeasure = L.control.polylineMeasure().addTo(mymap);
ctlSidebar = L.control.sidebar("side-bar").addTo(mymap);

ctlEasybutton = L.easyButton("glyphicon-transfer", function () {
  ctlSidebar.toggle();
}).addTo(mymap);

ctlSearch = L.Control.openCageSearch({ key: "3c38d15e76c02545181b07d3f8cfccf0", limit: 10 }).addTo(mymap);

ctlAttribute = L.control.attribution({ position: "bottomleft" }).addTo(mymap);
ctlAttribute.addAttribution("OSM");
ctlAttribute.addAttribution('&copy; <a href="http://millermountain.com">Miller Mountain LLC</a>');

ctlScale = L.control.scale({ position: "bottomleft", metric: false, maxWidth: 200 }).addTo(mymap);
ctlMouseposition = L.control.mousePosition().addTo(mymap);

popZocalo = L.popup({ maxWidth: 200, keepInView: true });
popZocalo.setLatLng([19.43262, -99.13325]);
popZocalo.setContent("<h2>Zocalo</h2><img src='img/zocalo.jpg' width='200px'>");

// mymap.on("click", function (e) {
//   if (e.originalEvent.shiftKey) {
//     alert(mymap.getZoom());
//   } else {
//     alert(e.latlng.toString());
//   }
// });

mymap.on("contextmenu", function (e) {
  let dtCurrentTime = new Date();
  L.marker(e.latlng)
    .addTo(mymap)
    .bindPopup(e.latlng.toString() + "<br>" + dtCurrentTime.toString());
});

mymap.on("keypress", function (e) {
  if (e.originalEvent.key == "l") {
    mymap.locate();
  }
});

mymap.on("locationfound", function (e) {
  console.log(e);
  if (mrkCurrentLocation) {
    mrkCurrentLocation.remove();
  }
  mrkCurrentLocation = L.circle(e.latlng, { radius: e.accuracy / 2 }).addTo(mymap);
  mymap.setView(e.latlng, 14);
});

mymap.on("locationerror", function (e) {
  console.log(e);
  alert("Location was not found");
});

mymap.on("zoomend", function () {
  $("#zoom-level").html(mymap.getZoom());
});

mymap.on("moveend", function () {
  $("#map-center").html(LatLngToArrayString(mymap.getCenter()));
});

mymap.on("mousemove", function (e) {
  $("#mouse-location").html(LatLngToArrayString(e.latlng));
});

$("#btnLocate").click(function () {
  mymap.locate();
});

$("#btnZocalo").click(function () {
  mymap.setView([19.43262, -99.13325], 17);
  mymap.openPopup(popZocalo);
});

$("#sldOpacity").on("change", function () {
  $("#image-opacity").html(this.value);
  lyrChapultepec.setOpacity(this.value);
});

function LatLngToArrayString(ll) {
  console.log(ll);
  return "[" + ll.lat.toFixed(5) + ", " + ll.lng.toFixed(5) + "]";
}
