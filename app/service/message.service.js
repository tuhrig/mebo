(function(){

    angular.module('mebo.service').factory('MessageService', MessageServiceFactory);

    MessageServiceFactory.$inject = ['$q'];

    function MessageServiceFactory($q) {

        var messages = [
            {
                title: "Message No. 1",
                text: "Cool! I'm the first message which appears on this board. I have some text. Not more. But this is cool. Because I'm the first one.",
                votes: 5
            },
            {
                title: "This is a test",
                text: "Teeeeeeeeest!",
                votes: 0
            },
            {
                title: "How does this work",
                text: "Empty.",
                votes: 1
            }
        ];

        function post(board, message) {

            messages.push(message);

            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        }

        function get(board) {
            var deferred = $q.defer();
            deferred.resolve(messages);
            return deferred.promise;
        }

        return {
            post: post,
            get: get
        };
    }
}());