angular.module('vivirnacoruna.controllers', [])

.controller('EventsCtrl', function($scope,Events,uiGmapGoogleMapApi,Location,$location) {

        $scope.places = [];

        function assignCords(index){
            Location.getCords($scope.places[index].address,function(location){

                $scope.places[index].coords = {
                    latitude : location.results[0].geometry.location.lat,
                    longitude : location.results[0].geometry.location.lng
                };

            });
        }

        Events.places().success(function(places){
            $scope.places = places;

            for(i=0;i<$scope.places.length;i++){
                assignCords(i);
                sleep(10);
            }
        });

        uiGmapGoogleMapApi.then(function(maps) {
            $scope.map = { center: { latitude: 43.368712, longitude: -8.40146 }, zoom: 15 };
        });

        function sleep(milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds){
                    break;
                }
            }
        }


});
