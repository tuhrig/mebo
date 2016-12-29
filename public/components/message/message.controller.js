(function () {

    angular.module('mebo.components').controller('MessageController', MessageController);

    MessageController.$inject = ['$sce', 'BoardService', 'MessageService'];

    function MessageController($sce, BoardService, MessageService) {

        var vm = this;

        vm.voteDown = function () {
            vm.message.votes -= 1;
        };

        vm.voteUp = function () {
            vm.message.votes += 1;
        };

        vm.edit = function () {

            vm.editMode = true;
        };

        vm.put = function () {
            var board = BoardService.getCurrentBoard();
            MessageService.put(board, vm.message.id, {
                text: vm.message.text
            }).then(function (result) {

                vm.message = result;
                vm.editMode = false;

                vm.textAsHtml = $sce.trustAsHtml(vm.message.text);
            });
        };

        vm.cancel = function () {
            vm.editMode = false;
        };

        vm.textAsHtml = $sce.trustAsHtml(vm.message.text);
    }
})();