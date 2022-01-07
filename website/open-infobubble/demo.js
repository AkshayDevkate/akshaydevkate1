/**
 * Creates a new marker and adds it to a group
 * @param {H.map.Group} group       The group holding the new marker
 * @param {H.geo.Point} coordinate  The location of the marker
 * @param {String} html             Data associated with the marker
 */
function addMarkerToGroup(group, coordinate, html) {
  var marker = new H.map.Marker(coordinate);
  // add custom data to the marker
  marker.setData(html);
  group.addObject(marker);
}

/**
 * Add two markers showing the position of Liverpool and Manchester City football clubs.
 * Clicking on a marker opens an infobubble which holds HTML content related to the marker.
 * @param  {H.Map} map      A HERE Map instance within the application
 */



 //borbeck - 51.4752, 6.9484  : 84.046   ATM : 
//AltenEssen - 51.4824, 7.0038 :  58.202  ATM :
//Essen-west - 51.4534, 6.9815 : 98,703   ATM :
//Stadt Mitte - 51.5267, 6.9244 : 67,780  ATM :
//KaternBerg - Essen  -51.4956, 7.0474 : 52,414 ATM :
//Steele - 51.4486, 7.0793  :  71,077
//Ruttensheid - 51.4296, 7.0039  :  54.204
//Werden- Essen - 51.3884, 7.0030 : 50,790
// Ruhr- halbinsel - 51.4149, 7.1083 : 51,929


function addInfoBubble(map) {
  var group = new H.map.Group();

  map.addObject(group);

  // add 'tap' event listener, that opens info bubble, to the group
  group.addEventListener('tap', function (evt) {
    // event target is the marker itself, group is a parent event target
    // for all objects that it contains
    var bubble =  new H.ui.InfoBubble(evt.target.getGeometry(), {
      // read custom data
      content: evt.target.getData()
    });
    // show info bubble
    ui.addBubble(bubble);
  }, false);

  addMarkerToGroup(group, {lat:51.4752, lng:6.9484},
    '<div><a href="http://www.mcfc.co.uk" target="_blank">Borbeck</a>' +
    '</div><div >Number of ATMs:23 <br>Population:  84.046</div>');

  addMarkerToGroup(group, {lat:51.4824, lng:7.0038},
    '<div><a href="http://www.mcfc.co.uk" target="_blank">Alten Essen</a>' +
    '</div><div >Number of ATMs:27 <br>Population:  58.202</div>');


addMarkerToGroup(group, {lat:51.4534, lng: 6.9815},
    '<div><a href="http://www.mcfc.co.uk" target="_blank">Essen West</a>' +
    '</div><div >Number of ATMs: 51 <br>Population: 98,703 </div>');


addMarkerToGroup(group, {lat:51.4504, lng: 7.0129},
    '<div><a href="http://www.mcfc.co.uk" target="_blank">Stadt Mitte</a>' +
    '</div><div >Number of ATMs: 45<br>Population:  67,780</div>');


addMarkerToGroup(group, {lat:51.4956, lng:7.0474},
    '<div><a href="http://www.mcfc.co.uk" target="_blank">KaternBerg-Essen</a>' +
    '</div><div >Number of ATMs: 71<br>Population: 52,414</div>');

  addMarkerToGroup(group, {lat:51.4486, lng:7.0793},
    '<div><a href="/Users/akshaydevkate/Desktop/Big Data Consulting Project/WEbsite/Test 1/maps-api-for-javascript-examples-master/finding-the-nearest-marker/demo.html" target="_blank">Steele Essen</a>' +
    '</div><div >Number of ATMs: 49 <br>Population: 71,077</div>');

  addMarkerToGroup(group, {lat:51.4296, lng:7.0039},
    '<div><a href="http://www.mcfc.co.uk" target="_blank">Ruttenscheid</a>' +
    '</div><div >Number of ATMs: 49<br>Population: 54,204</div>');

   addMarkerToGroup(group, {lat:51.3884, lng: 7.0030},
    '<div><a href="http://www.mcfc.co.uk" target="_blank">Werden Essen</a>' +
    '</div><div >Number of ATMs: 18<br>Population: 50,790</div>');

   addMarkerToGroup(group, {lat:51.4149, lng: 7.1083},
    '<div><a href="http://www.mcfc.co.uk" target="_blank">Ruhr Halbinsel</a>' +
    '</div><div >Number of ATMs: 28<br>Population: 51,929</div>');

}

/**
 * Boilerplate map initialization code starts below:
 */

// initialize communication with the platform
// In your own code, replace variable window.apikey with your own apikey
var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

// initialize a map - this map is centered over Europe
var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map,{
  center: {lat: 51.4149, lng: 7.1083},
  zoom: 7,
  pixelRatio: window.devicePixelRatio || 1
});
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// create default UI with layers provided by the platform
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Now use the map as required...
addInfoBubble(map);