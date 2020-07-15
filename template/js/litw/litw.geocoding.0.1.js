(function( exports ) {
    "use strict";

    var version = 0.1,
    lastLocations = {},

    geocodeAddress = function( address, callback_location ) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode(
            {
              address: address
            }, function(results, status){
                var location_result = {
                    typed_address : address,
                    status : status
                }
                if (status === "OK") {
                    location_result.geolocation = {
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    };

                    location_result.georesult = {
                        formatted_address : results[0].formatted_address,
                        google_place_id : results[0].place_id,
                        google_types : results[0].types
                    };
                }
                lastLocations[address] = location_result;
                callback_location(location_result);
            }
        );
    },

    setMarkedMap = function( location, divID ) {
        var map = new google.maps.Map(document.getElementById(divID), {zoom:8});
        map.setCenter(location);
        var marker = new google.maps.Marker({
            map: map,
            position: location
        });
    },

    getResolvedLocation = function( address ) {
        return lastLocations[address];
    }

    exports.geocoding = {};
    exports.geocoding.geocodeAddress = geocodeAddress;
    exports.geocoding.setMarkedMap = setMarkedMap;
    exports.geocoding.getResolvedLocation = getResolvedLocation;

})( window.LITW = window.LITW || {} );