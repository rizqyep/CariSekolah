$(document).ready(function () {
  $("#table-result").hide();
});
var map;
var service;
var infowindow;
var magelang;

function initMap() {
  magelang = new google.maps.LatLng(-7.47056, 110.21778);

  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map"), {
    center: magelang,
    zoom: 15
  });
}

$("#cari").click(function () {
  event.preventDefault();
  var address = document.getElementById("keyword").value;
  var request = {
    location: magelang,
    radius: "500",
    query: address
  };
  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      $("#table-result").show();
      document.getElementById("result").innerHTML = "";
      for (let i = 0; i < results.length; i++) {
        console.log(results[i].geometry.location);
        var request_details = {
          placeId: results[i].place_id,
          fields: ["name", "rating", "formatted_phone_number", "geometry"]
        };
        var service2;
        service2 = new google.maps.places.PlacesService(map);
        var details = service2.getDetails(request_details, callback);

        function callback(place, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            $("#phonenumber" + i).html(place.formatted_phone_number);
          }
        }
        document.getElementById("result").innerHTML += `
        <tr>
            <td>
            ${results[i].name}
            </td>
            <td>
            ${results[i].formatted_address}
            </td>
            <td>
                ${results[i].geometry.location.long}
            </td>
            <td>
            ${results[i].geometry.location.lat}
            </td>
            <td id ='phonenumber${i}'>
            
            </td>
            
        </tr>
        `;
      }
    }
  });
});
