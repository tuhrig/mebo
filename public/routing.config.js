
angular.module("mebo").config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/home/home.html'
        })
        .state('faq', {
            url: '/faq',
            templateUrl: 'views/faq/faq.html'
        })
        .state('contact', {
            url: '/contact',
            templateUrl: 'views/contact/contact.html'
        })
        .state('board', {
            url: '/board/:board',
            templateUrl: 'views/board/board.html'
        });
});