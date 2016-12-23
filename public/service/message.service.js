(function(){

    angular.module('mebo.service').factory('MessageService', MessageServiceFactory);

    MessageServiceFactory.$inject = ['$q'];

    function MessageServiceFactory($q) {

        var boards = {};

        function post(board, message) {

            if(!_.has(boards, board)) {
                console.log("init board");
                boards[board] = [];
            }

            message.date = Date();
            message.votes = 0;

            boards[board].push(message);

            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        }

        function get(board) {

            if(!_.has(boards, board)) {
                console.log("init board");
                boards[board] = [];
            }

            var deferred = $q.defer();
            deferred.resolve(boards[board]);
            return deferred.promise;
        }

        return {
            post: post,
            get: get
        };
    }
}());