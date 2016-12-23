(function () {

    angular.module('mebo.components').controller('MessageController', MessageController);

    MessageController.$inject = [];

    function MessageController() {

        var vm = this;

        vm.voteDown = function () {
            vm.message.votes -= 1;
        };

        vm.voteUp = function () {
            vm.message.votes += 1;
        };

    }
})();