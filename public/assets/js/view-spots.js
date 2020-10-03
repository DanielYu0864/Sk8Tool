$(function() {
    // locations to set latitude and longitude info to object
    // push locations info to the empty array locationsArray

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


});