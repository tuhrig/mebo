(function () {

    angular.module('mebo.components').controller('MessageCreatorController', MessageCreatorController);

    MessageCreatorController.$inject = ['MessageService'];

    function MessageCreatorController(MessageService) {

        var vm = this;

        vm.post = function () {

            console.log(vm)

            MessageService.post({
                title: vm.title,
                text: vm.text
            });
        };


        vm.title = "";
        vm.text = "";
    }
})();