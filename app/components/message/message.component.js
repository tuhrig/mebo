angular.module('mebo.components').component('message', {
    templateUrl: 'app/components/message/message.html',
    controller: 'MessageController',
    bindings: {
        message: "="
    }
});