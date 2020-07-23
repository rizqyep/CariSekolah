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
        console.log(results[i]);
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
            <td>
            ${results[i].geometry.location.long}
            </td>
            
        </tr>
        `;
      }
    }
  });
});
