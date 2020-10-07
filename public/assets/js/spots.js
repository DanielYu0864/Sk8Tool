const googleMapApiKey = 'AIzaSyDmZhf4Cy3XVS_6hruDDGNfWfd0Uaxfxp4'; // D

$(function(){

  let latitude;
  let longitude;
  let securityGuards;
  // function success to get the latitude and longitude
  function success(pos) {
      var crd = pos.coords;

      latitude = crd.latitude;
      longitude = crd.longitude;

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
  $('#security-guards-yes').on('click', function(event) {
    event.preventDefault();
    let securityData = $(this).data('security');
    if(securityData === true && securityGuards != true) {
      securityGuards = true;
      console.log('true');
      $('#security').append('<input class="security-when" id="securityWhen" sytle="display-none" placeholder="If yes when?">');

    }

  });
  $('#security-guards-no').on('click', function(event) {
    event.preventDefault();
    let securityData = $(this).data('security');
    if(securityData === false && securityGuards != false) {
      securityGuards = false;
      console.log('false');
      $('#securityWhen').remove();
    }

  });
// when the submit button 'click' will push the data to the database
  $('#submit-spot').on('click', function(event){
    event.preventDefault();

    let newSpot = {
      name: $('#spot-name').val().trim(),
      city: $('#spot-city').val().trim(),
      latitude: latitude,
      longitude: longitude,
      cross_street: $('#cross-streets').val().trim(),
      description: $('#spot-description').val().trim(),
      security_guards: securityGuards,
      security_when: $('#securityWhen').val()
    };


  console.log(newSpot);
  $.ajax('api/spots',{
      type: 'POST',
      data: newSpot
  }).then(function(){
      console.log('Adding new spot');
      location.reload();
  }).catch(err => console.error(err));

  });

});
