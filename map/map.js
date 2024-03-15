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
let ctlLayers;
let ctlDraw;
let ctlStyle;
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

mrkMuseo = L.marker([19.42596, -99.1862], { draggable: true });
mrkMuseo.bindTooltip("Anthropology Museum");

plyParks = L.polygon(
  [
    [
      [
        [19.4068, -99.2015],
        [19.4166, -99.1803],
        [19.4299, -99.1825],
        [19.4191, -99.2056],
      ],
      [
        [19.4216, -99.1853],
        [19.4217, -99.1843],
        [19.4241, -99.1848],
        [19.4245, -99.1872],
      ],
    ],
    [
      [
        [19.4042, -99.1895],
        [19.405, -99.1884],
        [19.4076, -99.1898],
        [19.4055, -99.1909],
      ],
    ],
  ],
  { color: "red", fillColor: "yellow", fillOpacity: 0.8 }
);

plnBikeRoute = L.polyline(
  [
    [
      [19.4138, -99.1876],
      [19.4167, -99.188],
      [19.4165, -99.1873],
      [19.4214, -99.1872],
      [19.4215, -99.1841],
      [19.4258, -99.1843],
      [19.4259, -99.1852],
    ],
    [
      [19.4215, -99.1865],
      [19.4251, -99.1881],
      [19.4246, -99.1843],
    ],
  ],
  { color: "purple" }
);

fgpChapultepec = L.featureGroup([plnBikeRoute, plyParks]).addTo(mymap);
fgpDrawnItems = new L.FeatureGroup();
fgpDrawnItems.addTo(mymap);

objOverlays = {
  "Chapultepec Image": lyrChapultepec,
  "Chapultepec Vectors": fgpChapultepec,
  "Drawn Items": fgpDrawnItems,
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

ctlStyle = L.control.styleEditor({ position: "topright" }).addTo(mymap);

ctlDraw = new L.Control.Draw({
  draw: {
    circle: false,
  },
  edit: {
    featureGroup: fgpDrawnItems,
  },
});
ctlDraw.addTo(mymap);

mymap.on("draw:created", function (e) {
  console.log(e);
  fgpDrawnItems.addLayer(e.layer);
  alert(JSON.stringify(e.layer.toGeoJSON()));
});

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

popZocalo = L.popup({ maxWidth: 200, keepInView: true });
popZocalo.setLatLng([19.43262, -99.13325]);
popZocalo.setContent("<h2>Zocalo</h2><img src='img/zocalo.jpg' width='200px'>");

mrkMuseo = L.marker([19.42596, -99.1862], { draggable: true }).addTo(mymap);
mrkMuseo.bindTooltip("Anthroology Museum");

plnBikeRoute = L.polyline(
  [
    [
      [19.4138, -99.1876],
      [19.4167, -99.188],
      [19.4165, -99.1873],
      [19.4214, -99.1872],
      [19.4215, -99.1841],
      [19.4258, -99.1843],
      [19.4259, -99.1852],
    ],
    [
      [19.4215, -99.1865],
      [19.4251, -99.1881],
      [19.4246, -99.1843],
    ],
  ],
  { color: "red" }
).addTo(mymap);

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

mrkMuseo.on("dragend", function () {
  mrkMuseo.setTooltipContent("Current Location: " + mrkMuseo.getLatLng().toString() + "<br>" + "Distance to Anthropology Museum: " + mrkMuseo.getLatLng().distanceTo([19.42596, -99.1862]).toFixed(0));
});

$("#btnLocate").click(function () {
  mymap.locate();
});

$("#btnZocalo").click(function () {
  mymap.setView([19.43262, -99.13325], 17);
  mymap.openPopup(popZocalo);
});

$("#btnMuseo").click(function () {
  mymap.setView([19.42596, -99.1862], 17);
  mrkMuseo.setLatLng([19.42596, -99.1862]);
  mrkMuseo.setTooltipContent("Anthropology Museum");
});

$("#btnBikeRoute").click(function () {
  mymap.fitBounds(plnBikeRoute.getBounds());
});

$("#sldOpacity").on("change", function () {
  $("#image-opacity").html(this.value);
  lyrChapultepec.setOpacity(this.value);
});

$("#btnColor").click(function () {
  fgpChapultepec.setStyle({ color: "purple", fillColor: "green", fillOpacity: 0.8 });
});

$("#btnAddMuseo").click(function () {
  if (fgpChapultepec.hasLayer(mrkMuseo)) {
    fgpChapultepec.removeLayer(mrkMuseo);
    $("#btnAddMuseo").html("Add Museo To Chapultepec Vectors");
  } else {
    fgpChapultepec.addLayer(mrkMuseo);
    $("#btnAddMuseo").html("Remove Museo From Chapultepec Vectors");
  }
});
function LatLngToArrayString(ll) {
  console.log(ll);
  return "[" + ll.lat.toFixed(5) + ", " + ll.lng.toFixed(5) + "]";
}
