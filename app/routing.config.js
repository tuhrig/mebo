
angular.module("mebo").config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'app/views/home/home.html'
        })
        .state('faq', {
            url: '/faq',
            templateUrl: 'app/views/faq/faq.html'
        })
        .state('contact', {
            url: '/contact',
            templateUrl: 'app/views/contact/contact.html'
        })
        .state('board', {
            url: '/board/:board',
            templateUrl: 'app/views/board/board.html'
        });
});