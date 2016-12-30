(function(){

    angular.module('mebo.service').factory('httpRequestInterceptor', function ($q) {
        return {
            'responseError': function(rejection) {
                console.log("Show error popover");
                return $q.reject(rejection);
            }
        };
    });

    angular.module('mebo.service').config( function ($httpProvider) {
        $httpProvider.interceptors.push('httpRequestInterceptor');
    });
}());