(function () {

    angular.module('mebo.components').controller('MessageController', MessageController);

    MessageController.$inject = ['$sce'];

    function MessageController($sce) {

        var vm = this;

        vm.voteDown = function () {
            vm.message.votes -= 1;
        };

        vm.voteUp = function () {
            vm.message.votes += 1;
        };


        vm.textAsHtml = $sce.trustAsHtml(vm.message.text);
    }
})();