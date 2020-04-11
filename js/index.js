window.onload = () => {
	displayStores()
}

  var map;
  var markers = [];
  var infoWindow;
  var locationSelect;

function initMap() {
  var losAngeles = {lat: 34.063380, lng: -118.358080};
  map = new google.maps.Map(document.getElementById('map'), {
    center: losAngeles,
    zoom: 11,
    mapTypeId: 'roadmap',
    styles:  [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e45d5d"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
]


  });
  showStoresMarkers()
}


function displayStores(){
	var storesHtml = ''
	// i used var [index, store] to get the index num 
	// i should use entries with the array when you're loooping over it
	for (var [index,store] of stores.entries()){
		var storeName = store.name
		var storePhoneNumber = store.phoneNumber
		storesHtml += `
		<div class="stores-list"> 
			<div class="store-address-number">
				<div class="store-address">${storeName} <br>${store.address.city}, ${store.address.countrySubdivisionCode} ${store.address.postalCode}</div>
				<div class="store-circle">${index + 1}</div>
			</div>
			<div class="store-phone-number">${store.phoneNumber}</div>
		</div>
		` 
	}
	document.querySelector(".stores-list-container").innerHTML = storesHtml
}


function showStoresMarkers() {
 // 1- loooping over the stores
 // 2- call the function createMarker inside it
 // 3- pass wiht it the name and the address and latitude and longitude with it
 // 4- in ordre to get the latitude and longitude we need to use the google maps api function
 // i used bounds to make the map fit with my screen
var bounds = new google.maps.LatLngBounds();
infoWindow = new google.maps.InfoWindow();

for (var [index,store] of stores.entries()){
		var latlng = new google.maps.LatLng(
		  store['coordinates']['latitude'],
		  store['coordinates']['longitude'])
		var name = store.name 
		var address = store['addressLines'][0]
		bounds.extend(latlng);
		createMarker(latlng, name, address, index+1)
		}
    map.fitBounds(bounds);
}



function createMarker(latlng, name, address, index) {
  var html = "<b>" + name + "</b> <br/>" + address;
  console.log(html)
  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    label: index.toString()
  });
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  markers.push(marker);
}