const googleMapApiKey = "AIzaSyDmZhf4Cy3XVS_6hruDDGNfWfd0Uaxfxp4"; // D
const openWeatherApiKey = "e93223a6b1823d41860077c8e54b5206"; // D
const city = document.querySelector('.city-input');
let searchCity;
$(function() {
    $('.view-spots').on('click',() => {
      searchCity = city.value.trim();
      const list = $('#spots-template').html();
      let latitude;
      let longitude;
      $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + openWeatherApiKey
        }).then(function(response){
        latitude = response.coord.lat;
        longitude = response.coord.lon;
        $('.main-content').html('<div class="spots-list"></div>'+'<div class="map parkmap" style="width:60%; height:40vw"></div>');
        markerApi(latitude, longitude);
        $('.spots-list').html(list);
        });

    });
    $('.parks-btn').on('click',() =>{
        searchCity = city.value.trim();
        $('.main-content').html('<iframe class ="parkmap" frameborder="0" style="border:0v"></iframe>');
        const mapI = document.querySelector(".parkmap");
        mapI.setAttribute("style", "width:100%; height:40vw");
        mapI.setAttribute("src", `https://www.google.com/maps/embed/v1/search?q=record+skatepark+in+${searchCity}&key=${googleMapApiKey}`);
    });

    $('.shops-btn').on('click',() =>{
        searchCity = city.value.trim();
        $('.main-content').html('<iframe class ="parkmap" frameborder="0" style="border:0v"></iframe>');
        const mapI = document.querySelector(".parkmap");
        mapI.setAttribute("style", "width:100%; height:40vw");
        mapI.setAttribute("src", `https://www.google.com/maps/embed/v1/search?q=record+skateshop+in+${searchCity}&key=${googleMapApiKey}`);
    });


    $('.weather-btn').on('click', () =>{
        searchCity = city.value.trim();
        $('.main-content').html(`
        <table id="forecast-table">
        <tbody id="forecast-body">
            <tr id="forecast-row">

            </tr>
        </tbody>
        </table>
        `);

        getCityWeather(searchCity);

    });

});


function markerApi(latitude, longitude) {
  const locations = {}, locationsArray = [];
  $.ajax('api/spots', {
      mathod: 'GET',
  }).then(
      function(data) {
          let map = new google.maps.Map(document.querySelector('.map'), {
              zoom: 10,
              center: new google.maps.LatLng(latitude , longitude),
              mapTypeId: google.maps.MapTypeId.ROADMAP
            });

          let infowindow = new google.maps.InfoWindow();
          // console.log(data);
          // loop through spots and push locations info to locationsArray
          data.forEach(element => {
              if(element.latitude && element.longitude) {
                  locations.id = element.id;
                  locations.city = element.city;
                  locations.latitude = element.latitude
                  locations.longitude = element.longitude;
                  locationsArray.push(locations);
              }
              return locationsArray;
          });
          console.log(locationsArray);

          for (let marker, i = 0; i < locationsArray.length; i++) {
              marker = new google.maps.Marker({
                  position: new google.maps.LatLng(locationsArray[i].latitude, locationsArray[i].longitude),
                  map: map
              });
              google.maps.event.addListener(marker, 'click', (function(marker, i) {
                  return function() {
                    infowindow.setContent(locationsArray[i].city);
                    infowindow.open(map, marker);
                  }
                })(marker, i));
          }

      }
  );
}

$('.spot-buttons').on('click', function(event) {
    event.preventDefault();
    let id = $(this).data('id')

    $.ajax('/api/spots/' + id, {
        type: 'GET'
    }).then((data) => {

        latitude = data.latitude;
        longitude = data.longitude;
        console.log(latitude, longitude);
        markerApi(latitude, longitude);
    });

});

function getCityWeather(city) {
    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + openWeatherApiKey
        }).then(function(response){


        let latitude = response.coord.lat;
        let longitude = response.coord.lon;

        $.ajax({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + openWeatherApiKey
          }).then(function(response){
            const forecastRow = $("#forecast-row");
            forecastRow.empty();

            for(var i = 1; i < 6; i++){
              const fDate = new Date(response.daily[i].dt * 1000)
              const fTemp = (((response.daily[i].temp.max - 273.15) * (9/5) + 32).toFixed(0));
              const fLowTemp = (((response.daily[i].temp.min - 273.15) * (9/5) + 32).toFixed(0));
              const fHumidity = response.daily[i].humidity;
              const fIcon = response.daily[i].weather[0].icon;

              const data = document.createElement("td");

              const dateHeader = document.createElement("h3");
              dateHeader.innerHTML = fDate.toLocaleDateString()
              data.append(dateHeader)

              const icon = document.createElement("img");
              icon.setAttribute("src","https://openweathermap.org/img/wn/" + fIcon + "@2x.png")
              data.append(icon);

              const tempSpan = document.createElement("div");
              tempSpan.innerHTML = `High Temp: ${fTemp} °`
              data.append(tempSpan);

              const lowTempSpan = document.createElement("div");
              lowTempSpan.innerHTML = `Low Temp: ${fLowTemp}°`
              data.append(lowTempSpan)

              const humiditySpan = document.createElement("div");
              humiditySpan.innerHTML = `Humidity ${fHumidity}%`;
              data.append(humiditySpan);

              forecastRow.append(data);

            }
          });

    });
};

//* function displayWeatherForecast(latitude,longitude){
//   $.ajax({
//     method: "GET",
//     url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + openWeatherApiKey
//   }).then(function(response){
//     const forecastRow = $("#forecast-row");
//     forecastRow.empty();

//     for(var i = 1; i < 6; i++){
//       const fDate = new Date(response.daily[i].dt * 1000)
//       const fTemp = (((response.daily[i].temp.max - 273.15) * (9/5) + 32).toFixed(0));
//       const fLowTemp = (((response.daily[i].temp.min - 273.15) * (9/5) + 32).toFixed(0));
//       const fHumidity = response.daily[i].humidity;
//       const fIcon = response.daily[i].weather[0].icon;

//       const data = document.createElement("td");

//       const dateHeader = document.createElement("h3");
//       dateHeader.innerHTML = fDate.toLocaleDateString()
//       data.append(dateHeader)

//       const icon = document.createElement("img");
//       icon.setAttribute("src","https://openweathermap.org/img/wn/" + fIcon + "@2x.png")
//       data.append(icon);

//       const tempSpan = document.createElement("div");
//       tempSpan.innerHTML = `High Temp: ${fTemp} °`
//       data.append(tempSpan);

//       const lowTempSpan = document.createElement("div");
//       lowTempSpan.innerHTML = `Low Temp: ${fLowTemp}°`
//       data.append(lowTempSpan)

//       const humiditySpan = document.createElement("div");
//       humiditySpan.innerHTML = `Humidity ${fHumidity}%`;
//       data.append(humiditySpan);

//       forecastRow.append(data);

//     }
//   });
//* };


//* function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition, positionError);
//   } else {
//     console.log("Geolocation is not supported by this browser.");
//   }
// }

// function showPosition(position) {
//   // Success, can use position.
//   console.log("Your position is: " + position);
// }

// function positionError(error) {
//   if (error.PERMISSION_DENIED) {
//     console.log("Error: permission denied");
//   } else {
//     // Handle other kinds of errors.
//     console.log("Other kind of error: " + error);
//   }
// }

//* getLocation();
