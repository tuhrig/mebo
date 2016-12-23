(function () {

    angular.module('mebo.components').controller('BoardCreatorController', BoardCreatorController);

    BoardCreatorController.$inject = ['$state'];

    function BoardCreatorController($state) {

        var vm = this;

        var url = window.location.href.split("#/")[0];
        vm.boardUrl = url + "#/board/" + randomString();

        console.log(vm);

        vm.createBoard = function () {


            var board = vm.boardUrl.split("#/board/")[1];
            console.log("create board", board);


            $state.go("board", { board: board });
        };



        function randomString()
        {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for( var i=0; i < 8; i++ ) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }
    }
})();