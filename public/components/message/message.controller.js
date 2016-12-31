(function () {

    angular.module('mebo.components').controller('MessageController', MessageController);

    MessageController.$inject = ['$sce', 'BoardService', 'MessageService'];

    function MessageController($sce, BoardService, MessageService) {

        var vm = this;

        vm.readMode = true;
        vm.editMode = false;
        vm.deleteMode = false;
        vm.deadMode = false;

        vm.voteDown = function () {
            vm.message.votes -= 1;
            updateVotes();
        };

        vm.voteUp = function () {
            vm.message.votes += 1;
            updateVotes();
        };

        function updateVotes() {
            var board = BoardService.getCurrentBoard();
            MessageService.put(board, vm.message.id, {
                votes: vm.message.votes
            })
        }

        vm.activateReadMode = function() {
            vm.readMode = true;
            vm.editMode = false;
            vm.deleteMode = false;
            vm.deadMode = false;
        };

        vm.activateEditMode = function () {
            vm.readMode = false;
            vm.editMode = true;
            vm.deleteMode = false;
            vm.deadMode = false;
        };

        vm.activateDeleteMode = function () {
            vm.readMode = false;
            vm.editMode = false;
            vm.deleteMode = true;
            vm.deadMode = false;
        };

        vm.activateDeadMode = function () {
            vm.readMode = false;
            vm.editMode = false;
            vm.deleteMode = false;
            vm.deadMode = true;
        };

        vm.edit = function () {
            var board = BoardService.getCurrentBoard();
            MessageService.put(board, vm.message.id, {
                text: vm.message.text
            }).then(function (result) {

                vm.message = result;
                vm.textAsHtml = $sce.trustAsHtml(vm.message.text);

                vm.activateReadMode();
            });
        };

        vm.delete = function () {
            var board = BoardService.getCurrentBoard();
            MessageService.delete(board, vm.message.id).then(function() {
                vm.message = null;
                vm.activateDeadMode();
            });
        };

        vm.textAsHtml = $sce.trustAsHtml(vm.message.text);
    }
})();