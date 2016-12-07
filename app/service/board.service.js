(function(){

    angular.module('mebo.service').factory('BoardService', BoardServiceFactory);

    BoardServiceFactory.$inject = ['$window'];

    function BoardServiceFactory($window) {

        function getCurrentBoard() {
            var hash = $window.location.hash;
            return hash.split("/")[2];
        }

        return {
            getCurrentBoard: getCurrentBoard
        };
    }
}());