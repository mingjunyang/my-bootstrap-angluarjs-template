'use strict';

angular.module('MingjunYang.I', ['ngAnimate', 'ngRoute', 'ngTouch'])

.constant('version', 'v0.1.0')

.config(function($locationProvider, $routeProvider) {

    $locationProvider.html5Mode(false);

    $routeProvider
        .when('/a', {
            templateUrl: 'views/a.html'
        })
        .when('/b', {
            templateUrl: 'views/b.html'
        })
        .when('/c', {
            templateUrl: 'views/c.html'
        })
        .otherwise({
            redirectTo: '/a'
        });

});
