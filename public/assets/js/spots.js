const googleMapApiKey = 'AIzaSyDmZhf4Cy3XVS_6hruDDGNfWfd0Uaxfxp4'; // D

$(function(){
  //*creat-form is from activity code. need to rename
  //*function initMap(latitude, longitude) {
  //*     const myLatLng = { lat: latitude, lng: longitude };
  //*     const map = new google.maps.Map($('#current-spot'), {
  //*       zoom: 4,
  //*       center: myLatLng,
  //*     });
  //*     new google.maps.Marker({
  //*       position: myLatLng,
  //*       map,
  //*       title: "Hello World!",
  //*     });
  //* }
  let latitude;
  let longitude;
  let securityGuards;
  // function success to get the latitude and longitude
  function success(pos) {
      var crd = pos.coords;

      latitude = crd.latitude;
      longitude = crd.longitude;
      // $('#current-spot').html(`<p class='latitude'>Latitude: ${latitude}</p><p class='longitude'>Longitude: ${longitude}</p>`);
      //* var latlon = latitude + "," +  longitude;
      //* var img_url = `https://maps.googleapis.com/maps/api/staticmap?center=${latlon}&zoom=14&size=400x300&sensor=false&key=${googleMapApiKey}`;
      //* $('#current-spot').html(`<img src='${img_url}'>`);
  // display yes security when input box if yes
  console.log('Your current position is:');
  console.info(crd);
  console.log(`Latitude : ${latitude}`);
  console.log(`Longitude: ${longitude}`);
  return latitude, longitude;
  }
  // when the get current location button 'click' will get the user location
  $('#use-current-location').on('click', (event) => {
    event.preventDefault();


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
  });
//display yes security when input box if yes
  $('#security-guards').on('click', function(event) {
    event.preventDefault();
    let securityData = $(this).data('security');
    if(securityData === true && securityGuards != true) {
        securityGuards = true;
        console.log('true');
        $('#security').append('<input class="security-when" id="securityWhen" sytle="display-none" placeholder="If yes when?">');

      } else if(securityData === false && securityGuards != false){
        securityGuards = false;
        console.log('false');
        $('#securityWhen').remove();
    }
  });
// when the submit button 'click' will push the data to the database
  $('#submit-spot').on('click', function(event){
    event.preventDefault();

    var newSpot = {
      name: $('#spot-name').val().trim(),
      city: $('#spot-city').val().trim(),
      latitude: latitude,
      longitude: longitude,
      cross_street: $('#cross-streets').val().trim(),
      description: $('#spot-description').val().trim(),
      security_guards: securityGuards,
      security_when: $('#securityWhen').val().trim()
  };
  console.log(newSpot);
  $.ajax('api/spots',{
      type: 'POST',
      data: newSpot
  }).then(function(){
      console.log('Adding new spot');
      location.reload();
  });
  // const dateBanner = document.getElementById('current-date')
    //     dateBanner.textContenet = moment().format('dddd,MMM, Do YYYY');
    // const currentDate = getTodaysDate(currentDate);
    // const currentDateKey = getKeyFromDate(currentDate);


    // function getTodaysDate(){
    //     return moment().startOf("day")
    // }
    // getTodaysDate();




    //this doesn't exist yet but I am coding it incase we want to add it
    // $('.delete-spot').on('click', function(event){
    //     var id = $(this).data('id');

    //     $.ajax('/api/spots' + id, {
    //         type: 'DELETE'
    //     }).then(function(){
    //         console.log('Spot deleted', id);
    //         location.reload();
    //     });
    // });
  });

});
