const WOW = require('wowjs');

$('.carousel').carousel({
  interval: 2000
});

function regular_map() {
  var var_location = new google.maps.LatLng(6.553961, 3.366628);

  var var_mapoptions = {
    center: var_location,
    zoom: 12
  };

  var var_map = new google.maps.Map(
    document.getElementById('map-container'),
    var_mapoptions
  );

  var var_marker = new google.maps.Marker({
    position: var_location,
    map: var_map,
    title: 'Epic Tower'
  });
}

google.maps.event.addDomListener(window, 'load', regular_map);

window.wow = new WOW.WOW({
  live: false
});

window.wow.init();
