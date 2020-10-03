const googleMapApiKey = "AIzaSyDmZhf4Cy3XVS_6hruDDGNfWfd0Uaxfxp4"; // D

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
    // function success to get the latitude and longitude
    function success(pos) {
        var crd = pos.coords;

        latitude = crd.latitude;
        longitude = crd.longitude;
        $('#current-spot').html(`<p class='latitude'>Latitude: ${latitude}</p><p class='longitude'>Longitude: ${longitude}</p>`);
        //* var latlon = latitude + "," +  longitude;
        //* var img_url = `https://maps.googleapis.com/maps/api/staticmap?center=${latlon}&zoom=14&size=400x300&sensor=false&key=${googleMapApiKey}`;
        //* $('#current-spot').html(`<img src='${img_url}'>`);

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
    //display yes security box if yes 
    $(".security-yes-no").on('click', function(event){
        
        var yesSecurity = $(this).data('security');
        
        if (yesSecurity.checked == true){
            securityWhen.style.display = 'block'; 
        } else {
            securityWhen.style.display = 'none';
        };
    });
    // when the submit button 'click' will push the data to the database
    $('.create-form').on('submit', function(event){
        event.preventDefault();

        var newSpot = {
            name: $('#spot-name').val().trim(),
            city: $('#spot-city').val().trim(),
            latitude: latitude,
            longitude: longitude,
            cross_street: $('#cross-streets').val().trim(),
            description: $('#spot-description').val().trim(),
            security: $('[name=security]:checked').val().trim(),
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
    });

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