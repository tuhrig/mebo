(function () {

    angular.module('mebo.components').controller('BoardController', BoardController);

    BoardController.$inject = ['$stateParams', 'MessageService'];

    function BoardController($stateParams, MessageService) {

        var vm = this;


        vm.board = $stateParams.board;

        vm.filter = {};
        vm.filter.sortType = 'title';
        vm.filter.sortReverse = false;
        vm.filter.search = '';

        MessageService.get(vm.board).then(function (messages) {
            vm.messages = messages;
        });


    }
})();