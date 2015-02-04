angular.module('vivirnacoruna.controllers', [])

.controller('EventsCtrl', function($scope,Events,uiGmapGoogleMapApi,Location,$location) {

        $scope.geolocate = function(){
            navigator.geolocation.getCurrentPosition(function(position){
                $scope.map = { center: { latitude: position.coords.latitude, longitude: position.coords.longitude }, zoom: 15 };
                $scope.$apply();
            });
        };

        $scope.eventos = [];

        function assignCords(index){
            Location.getCords($scope.eventos[index].location,function(location){
                $scope.eventos[index].coords = {
                    latitude : location.results[0].geometry.location.lat,
                    longitude : location.results[0].geometry.location.lng
                }

                $scope.eventos[index].options =
                {
                    labelContent: $scope.eventos[index].post_title,
                    //labelAnchor: "5 0",
                    labelClass: "labels"
                }

                $scope.eventos[index].open=  function(){
                    //console.log($scope.eventos[index]);
                    //$state.go("tab.evento-detail",{eventoId:$scope.eventos[index].ID});
                    //$location.path($scope.eventos[index].guid );
                    window.open($scope.eventos[index].guid);
                    //alert($scope.eventos[index].guid);
                }
            });
        }



        Events.today(function(response){
            $scope.eventos = response;

            for(i=0;i<$scope.eventos.length;i++){
                assignCords(i);
            }

            $scope.filtrados = $scope.eventos;


        });

        uiGmapGoogleMapApi.then(function(maps) {
            $scope.map = { center: { latitude: 43.368712, longitude: -8.40146 }, zoom: 15 };
        });


        $scope.prices =
            [
                {
                    name:   'Todos',
                    class:  "button-light"
                },

                {
                    name:   'Gratuitos',
                    class:  "button-energized"
                },

                {
                    name:   "De pago",
                    class:  "button-positive"
                }
            ];

        $scope.selected_price = 0;
        $scope.changue_price = function(){
            $scope.selected_price = ($scope.selected_price+1) % 3;
        }

        Events.categories(function(categories){
            $scope.categories = categories;
        })

        $scope.$watch('selected_price', function(newValue, oldValue) {


            if(newValue == 0){
                //Todos
                $scope.filtrados = $scope.eventos
            }

            if(newValue == 1){
                //Gratuitos

                $scope.filtrados = [];
                for(i=0;i<$scope.eventos.length;i++){
                    if($scope.eventos[i].price == "de balde"){
                        $scope.filtrados.push($scope.eventos[i]);
                    }
                }
            }

            if(newValue == 2){
                //De Pago

                $scope.filtrados = [];
                for(i=0;i<$scope.eventos.length;i++){
                    if($scope.eventos[i].price != "de balde" && $scope.eventos[i].price != ""){
                        $scope.filtrados.push($scope.eventos[i]);
                    }
                }
            }
        });
});
