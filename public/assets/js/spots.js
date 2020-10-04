const googleMapApiKey = 'AIzaSyDmZhf4Cy3XVS_6hruDDGNfWfd0Uaxfxp4'; // D

$(() => {
  let latitude;
  let longitude;
  let securityGuards;
  // function success to get the latitude and longitude
  function success(pos) {
    const crd = pos.coords;

    latitude = crd.latitude;
    longitude = crd.longitude;

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
      console.log('Geolocation is not supported by this browser.');
    }
  });
  // display yes security when input box if yes
  $('#security-guards').on('click', function (event) {
    event.preventDefault();
    const securityData = $(this).data('security');
    if (securityData === true && securityGuards != true) {
      securityGuards = true;
      console.log('true');
      $('#security').append('<input class="security-when" id="securityWhen" sytle="display-none" placeholder="If yes when?">');
    } else if (securityData === false && securityGuards != false) {
      securityGuards = false;
      console.log('false');
      $('#securityWhen').remove();
    }
  });
  // when the submit button 'click' will push the data to the database
  $('.submit-spot').on('click', (event) => {
    event.preventDefault();

    const newSpot = {
      name: $('#spot-name').val().trim(),
      city: $('#spot-city').val().trim(),
      latitude,
      longitude,
      cross_street: $('#cross-streets').val().trim(),
      description: $('#spot-description').val().trim(),
      security_guards: securityGuards,
      security_when: $('#securityWhen').val().trim(),
    };
    console.log(newSpot);
    $.ajax('api/spots', {
      type: 'POST',
      data: newSpot,
    }).then(() => {
      console.log('Adding new spot');
      location.reload();
    });
  });

  // this doesn't exist yet but I am coding it incase we want to add it
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
