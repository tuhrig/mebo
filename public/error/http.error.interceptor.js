(function(){

    angular.module('mebo.error').factory('httpRequestInterceptor', function ($q) {
        return {
            'responseError': function(rejection) {
                $('#errorModal').modal('show');
                return $q.reject(rejection);
            }
        };
    });

    angular.module('mebo.error').config( function ($httpProvider) {
        $httpProvider.interceptors.push('httpRequestInterceptor');
    });
}());