angular.module('vivirnacoruna', [   'vivirnacoruna.controllers',
                                    'vivirnacoruna.services',
                                    'uiGmapgoogle-maps'
])

.run(function($rootScope){
        $rootScope.backend = "http://vivirnacoruna.es/api/v1";
        //$rootScope.backend = "http://localhost:8080/api/v1";
})

.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
});

