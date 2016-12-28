(function(){

    angular.module('mebo.service').factory('MessageService', MessageServiceFactory);

    MessageServiceFactory.$inject = ['$q', '$http'];

    function MessageServiceFactory($q, $http) {

        var boards = {};

        function post(board, message) {

            return $http.post("/api/boards/" + board + "/messages", message).then(function (result) {

                boards[board].messages.push(result.data);

                return result.data;
            });
        }

        function get(board) {
            return $http.get("/api/boards/" + board).then(function (result) {

                boards[board] = result.data;
                return result.data.messages;
            });
        }

        return {
            post: post,
            get: get
        };
    }
}());