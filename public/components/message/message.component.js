angular.module('mebo.components').component('message', {
    templateUrl: 'components/message/message.html',
    controller: 'MessageController',
    bindings: {
        message: "="
    }
});