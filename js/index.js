window.onload = () => {
	displayStores()
}


function initMap() {
  var losAngeles = {lat: 34.063380, lng: -118.358080};
  map = new google.maps.Map(document.getElementById('map'), {
    center: losAngeles,
    zoom: 11,
    mapTypeId: 'roadmap',
  });
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