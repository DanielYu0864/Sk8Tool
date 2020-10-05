const googleMapApiKey = 'AIzaSyDmZhf4Cy3XVS_6hruDDGNfWfd0Uaxfxp4'; // D
const openWeatherApiKey = 'e93223a6b1823d41860077c8e54b5206'; // D
const city = document.querySelector('.city-input');

let searchCity;
$(() => {
  // view all the spots from database in input city
  $('#current-time').html(moment().format('MMMM Do YYYY, h:mm a'));
  $('#view-spots').on('click', () => {
    searchCity = city.value.trim();
    const list = $('#spots-template').html();
    let latitude;
    let longitude;
    $.ajax({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${openWeatherApiKey}`
    }).then((response) => {
      latitude = response.coord.lat;
      longitude = response.coord.lon;
      $('#main-content').html('<div class="spots-list" id="spots-list"></div>' + '<div class="map parkmap" style="width:60%; height:40vw"></div>');
      markerApi(latitude, longitude);
      $('#spots-list').html(list);
    });
  });
  // search all skate park in the input city
  $('#parks-btn').on('click', () => {
    searchCity = city.value.trim();
    $('#main-content').html('<iframe class ="parkmap map" id="parkmap" frameborder="0" style="border:0px; margin:0px"></iframe>');
    const mapI = document.querySelector('#parkmap');
    mapI.setAttribute('style', 'width:95%; height:40vw');
    mapI.setAttribute('src', `https://www.google.com/maps/embed/v1/search?q=record+skatepark+in+${searchCity}&key=${googleMapApiKey}`);
  });
  // search all the skate shop in the input city
  $('#shops-btn').on('click', () => {
    searchCity = city.value.trim();
    $('#main-content').html('<iframe class ="parkmap map" id="parkmap" frameborder="0" style="border:0px; margin:0px"></iframe>');
    const mapI = document.querySelector('#parkmap');
    mapI.setAttribute('style', 'width:95%; height:40vw');
    mapI.setAttribute('src', `https://www.google.com/maps/embed/v1/search?q=record+skateshop+in+${searchCity}&key=${googleMapApiKey}`);
  });
  // display the weather info for the input city
  $('#weather-btn').on('click', () => {
    searchCity = city.value.trim();
    $('#main-content').html(`
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
// create the spot markers in the map
function markerApi(latitude, longitude) {
  const locations = {}; const
    locationsArray = [];
  $.ajax('api/spots', {
    mathod: 'GET'
  }).then(
    (data) => {
      const map = new google.maps.Map(document.querySelector('.map'), {
        zoom: 10,
        center: new google.maps.LatLng(latitude, longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      const infowindow = new google.maps.InfoWindow();
      // console.log(data);
      // loop through spots and push locations info to locationsArray
      data.forEach((element) => {
        if (element.latitude && element.longitude) {
          locations.id = element.id;
          locations.city = element.city;
          locations.latitude = element.latitude;
          locations.longitude = element.longitude;
          locationsArray.push(locations);
        }
        return locationsArray;
      });
      console.log(locationsArray);

      for (let marker, i = 0; i < locationsArray.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locationsArray[i].latitude, locationsArray[i].longitude),
          map
        });
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
          return function () {
            infowindow.setContent(locationsArray[i].city);
            infowindow.open(map, marker);
          };
        }(marker, i)));
      }
    },
  );
}
// the button will center the marker on the map
// eslint-disable-next-line no-undef
$('.spot-buttons').on('click', function (event) {
  event.preventDefault();
  const id = $(this).data('id');

  $.ajax(`/api/spots/${id}`, {
    type: 'GET',
  }).then((data) => {
    let { latitude } = data;
    let { longitude } = data;
    const { city } = data;
    console.log(city);
    if (data.latitude && data.latitude) {
      markerApi(latitude, longitude);
    } else {
      $.ajax({
        method: 'GET',
        url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}`,
      }).then((response) => {
        latitude = response.coord.lat;
        longitude = response.coord.lon;
        markerApi(latitude, longitude);
      });
    }
  });
});

// function to get the city weather info
function getCityWeather(city) {
  $.ajax({
    method: 'GET',
    url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}`
  }).then((response) => {
    const latitude = response.coord.lat;
    const longitude = response.coord.lon;

    $.ajax({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${openWeatherApiKey}`
    }).then((response) => {
      const forecastRow = $('#forecast-row');
      forecastRow.empty();

      for (let i = 1; i < 6; i++) {
        const fDate = new Date(response.daily[i].dt * 1000);
        const fTemp = (((response.daily[i].temp.max - 273.15) * (9 / 5) + 32).toFixed(0));
        const fLowTemp = (((response.daily[i].temp.min - 273.15) * (9 / 5) + 32).toFixed(0));
        const fHumidity = response.daily[i].humidity;
        const fIcon = response.daily[i].weather[0].icon;

        const data = document.createElement('td');

        const dateHeader = document.createElement('h3');
        dateHeader.innerHTML = fDate.toLocaleDateString();
        data.append(dateHeader);

        const icon = document.createElement('img');
        icon.setAttribute('src', `https://openweathermap.org/img/wn/${fIcon}@2x.png`);
        data.append(icon);

        const tempSpan = document.createElement('div');
        tempSpan.innerHTML = `High Temp: ${fTemp} °`;
        data.append(tempSpan);

        const lowTempSpan = document.createElement('div');
        lowTempSpan.innerHTML = `Low Temp: ${fLowTemp}°`;
        data.append(lowTempSpan);

        const humiditySpan = document.createElement('div');
        humiditySpan.innerHTML = `Humidity ${fHumidity}%`;
        data.append(humiditySpan);

        forecastRow.append(data);
      }
    });
  });
}

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
