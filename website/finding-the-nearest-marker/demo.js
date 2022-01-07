
function findNearestMarker(coords) {
  var minDist = 100,
    nearest_text = '*None*',
    markerDist,
    // get all objects added to the map
    objects = map.getObjects(),
    len = map.getObjects().length,
    i;

  // iterate over objects and calculate distance between them
  for (i = 0; i < len; i += 1) {
    markerDist = objects[i].getGeometry().distance(coords);
    if (markerDist < minDist) {
      minDist = markerDist;
      nearest_text = objects[i].getData();
    }
  }

  logEvent('The nearest marker is: ' + nearest_text);
}

function addClickEventListenerToMap(map) {
  // add 'tap' listener
  map.addEventListener('tap', function (evt) {
    var coords =  map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
    findNearestMarker(coords);
  }, false);
}

/**
 * Boilerplate map initialization code starts below:
 */

//Step 1: initialize communication with the platform
// In your own code, replace variable window.apikey with your own apikey
var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map
var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map,{
  center: {lat: 51.4484851, lng:7.0761201},
  zoom: 16,
  pixelRatio: window.devicePixelRatio || 1
});
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Step 4: create custom logging facilities
var logContainer = document.createElement('ul');
logContainer.className ='log';
logContainer.innerHTML = '<li class="log-entry">Try clicking on the map</li>';
map.getElement().appendChild(logContainer);

// Helper for logging events
function logEvent(str) {
  var entry = document.createElement('li');
  entry.className = 'log-entry';
  entry.textContent = str;
  logContainer.insertBefore(entry, logContainer.firstChild);
}

// Set up five markers.
var coords = [{ lat:51.4484851, lng:7.0761201},
  { lat: 51.4558745999999, lng: 7.0775884 },
  { lat: 51.4471966999999, lng: 7.09298639999999 },
  { lat: 51.4619787, lng: 7.0788934},
  { lat:51.4531942, lng: 7.10497109999999},

  { lat:51.451643, lng: 7.0999598},
  { lat:51.4620669, lng: 7.0789234},

  { lat:51.4296544, lng: 7.075921},
  { lat:51.4297645, lng: 7.07536349999999},
  { lat:51.4368483999999, lng:7.10359629999999},
  { lat:51.4677653, lng:7.08131949999999},
  { lat:51.4293485, lng:7.0749952},

  //12
  { lat:51.4677653, lng:7.08131949999999},
   { lat:51.4293485, lng:7.0749952},
    { lat:51.4471775999999, lng:7.04608079999999},
  { lat:51.46434, lng:7.10131},
  { lat:51.4472455, lng:7.0457732},
  { lat:51.4485399999999, lng:7.07738},
  { lat:51.4629864, lng:7.0787751},
  { lat:51.4668005, lng:7.08019559999999},
 { lat:51.4464542, lng:7.082926},
{ lat:51.4484851, lng:7.0761201},
  { lat:51.4471966999999, lng:7.09298639999999},
  { lat:51.4296544, lng:7.075921},
  { lat:51.4297645, lng:7.07536349999999},
  { lat:51.4293485, lng:7.0749952},

  //26
   { lat:51.4368483999999, lng:7.10359629999999},
   { lat:51.4484738, lng:7.0753344},
   { lat:51.451643, lng:7.0999598},
   { lat:51.4531942, lng:7.10497109999999},
   { lat:51.4485399999999, lng:7.07738},
   { lat:51.4558745999999, lng:7.0775884},
   { lat:51.4464542, lng:7.082926},
   { lat:51.44802319999999, lng:7.07625009999999},
   { lat:51.4350468999999, lng:7.11195849999999},
   { lat:51.4482225, lng:7.0757603},
   { lat:51.44848, lng:7.07611799999999},
   { lat:51.43475, lng:7.03400339999999},
   { lat:51.4347293, lng:7.0340859},
   { lat:51.4259052, lng:7.04382029999999},
   { lat:51.4296544, lng:7.075921},

   //41
   { lat:51.4293485, lng: 7.0749952},
    { lat:51.4297645, lng: 7.07536349999999},
    { lat:51.4471775999999, lng: 7.04608079999999}, 
  { lat:51.4472455, lng: 7.0457732},   
  { lat:51.4418248, lng:  7.03011}, 
  { lat:51.4214139999999, lng:  7.0261515}, 
  { lat:51.4450202, lng:  7.03267009999999}, 
  { lat: 51.4392858, lng:  7.0236573}, 
  { lat: 51.4366487999999, lng:  7.0337327}, 
  { lat: 51.4487438, lng:  7.03665139999999},




  { lat:51.4484738, lng: 7.0753344}];

//Create the svg mark-up
var svgMarkup = '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">' +
    '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" height="22" />' +
    '<text x="12" y="18" font-size="12pt" font-family="Arial" font-weight="bold" ' +
    'text-anchor="middle" fill="white">${REPLACE}</text></svg>';

coords.forEach(function (value, index) {
  var myIcon = new H.map.Icon(svgMarkup.replace('${REPLACE}', index + 1), {
    anchor: {x: 12, y: 12}
  }),
  marker = new H.map.Marker(value,  {
    icon: myIcon,
    volatility: true
  });
  // add custom data to the marker
  marker.setData(index + 1);

  // set draggable attribute on the marker so it can recieve drag events
  marker.draggable = true;
  map.addObject(marker);
});



// function extra

function testDelegation(map) {

  var circle = new H.map.Circle(
    new H.geo.Point(51.4484738,7.0753344), //center
    250, // Radius in meters
    {
      style: {
        fillColor: 'rgba(0, 221, 255, 0.66)',
      }
    }
  );

}


// simple D'n"D implementation for markers"'
map.addEventListener('dragstart', function(ev) {
  var target = ev.target;
  if (target instanceof H.map.Marker) {
    behavior.disable();
  }
}, false);

map.addEventListener('drag', function(ev) {
  var target = ev.target,
      pointer = ev.currentPointer;
  if (target instanceof H.map.Marker) {
    target.setGeometry(map.screenToGeo(pointer.viewportX, pointer.viewportY));
  }
}, false);

map.addEventListener('dragend', function(ev) {
  var target = ev.target;
  if (target instanceof H.map.Marker) {
    behavior.enable();
  }
}, false);

// Add the click event listener.
addClickEventListenerToMap(map);


testDelegation(map);
