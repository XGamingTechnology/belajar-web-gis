let mymap;
let lyrOSM;
let mrkCurrentLocation;
let popZocalo;
let popExample;

mymap = L.map("mapdiv", { center: [19.4, -99.2], zoom: 13 });
lyrOSM = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png");
mymap.addLayer(lyrOSM);

popZocalo = L.popup({ maxWidth: 200, keepInView: true });
popZocalo.setLatLng([19.43262, -99.13325]);
popZocalo.setContent("<h2>Zocalo</h2><img src='img/zocalo.jpg' width='200px'>");

popExample = L.popup();
popExample.setLatLng([19.4132, -99.1859]);
popExample.setContent($("#side-bar")[0]);
popExample.openOn(mymap);

mymap.on("click", function (e) {
  if (e.originalEvent.shiftKey) {
    alert(mymap.getZoom());
  } else {
    alert(e.latlng.toString());
  }
});

mymap.on("contextmenu", function (e) {
  var dtCurrentTime = new Date();
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

function LatLngToArrayString(ll) {
  console.log(ll);
  return "[" + ll.lat.toFixed(5) + ", " + ll.lng.toFixed(5) + "]";
}
