(function () {

    angular.module('mebo.components').controller('MessageCreatorController', MessageCreatorController);

    MessageCreatorController.$inject = ['MessageService', 'BoardService'];

    function MessageCreatorController(MessageService, BoardService) {

        var vm = this;

        vm.post = function () {
            var board = BoardService.getCurrentBoard();
            MessageService.post(board, {
                title: vm.title,
                text: vm.text
            }).then(function () {
                vm.text = "";
            });
        };

        vm.text = "";
    }
})();