angular.module('vivirnacoruna.services', [])

.factory('Events', function($http,$rootScope) {

    return {
        today: function(callback){

            var start = new Date();
            start.setHours(0,0,0,0);
            start = start.getTime()*1000;

            var end = new Date();
            end.setHours(23,59,59);
            end = end.getTime()*1000;
            var url = $rootScope.backend + '/interval/'+start+'/'+end;

            $http.get(url).success(callback);
        },

        get: function(id,callback){
            var url = $rootScope.backend + '/event/'+id;

            $http.get(url).success(callback);
        },

        interval: function(start,end,callback){

            var url = $rootScope.backend + '/interval/'+start+'/'+end;

            $http.get(url).success(callback);
        },

        places: function(){
            var url = $rootScope.backend + '/places';

            return $http.get(url);
        }

    }
})

.factory('Location', function($http){
        return {
          getCords : function(address,callback) {
              return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
                  params: {
                      address: address,
                      sensor: false,
                      language: "es",
                      components: 'country:es'
                  }
              }).success(callback);
          }

        }
});

