'use strict';

//权限控制模块
var permissionList;
angular.element(document).ready(function() {
    $.get('/1/api/api1', function(data) {
        permissionList = data;
        angular.bootstrap(document, ['App']);
    });
});



angular.module('MingjunYang.I', ['ngAnimate', 'ngRoute', 'ngTouch'])

.constant('version', 'v0.1.0')
    .config(function($locationProvider, $routeProvider, $httpProvider) {

        $httpProvider.interceptors.push('authInterceptor');

        $httpProvider.responseInterceptors.push('securityInterceptor');

        $routeProvider
            .when('/', {
                templateUrl: 'views/login.html',
                controller: 'UserCtrl'
            })
            .when('/a', {
                templateUrl: 'views/a.html'
            })
            .when('/b', {
                templateUrl: 'views/b.html'
            })
            .when('/c', {
                templateUrl: 'views/c.html'
            }).when('/withoutlogin', {
                templateUrl: 'views/withoutlogin.html'
            })
            .otherwise({
                redirectTo: '/'
            });
        // use the HTML5 History API
        $locationProvider.html5Mode(true);

    })
    .provider('securityInterceptor', function() {
        //验证
        this.$get = function($location, $q) {
            return function(promise) {
                return promise.then(null, function(response) {
                    if (response.status === 403 || response.status === 401) {
                        $location.path('/withoutlogin');
                    }
                    return $q.reject(response);
                });
            };
        };
    });
