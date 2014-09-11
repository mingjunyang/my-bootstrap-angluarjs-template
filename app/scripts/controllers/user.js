 'use strict';

 angular.module('MingjunYang.I')
     .controller('UserCtrl', ['$scope', '$http', '$window',
         function($scope, $http, $window) {
             $scope.user = {
                 username: 'john.doe',
                 password: 'foobar'
             };
             $scope.message = '';
             $scope.submit = function() {
                 $http
                     .post('/api/authenticate', $scope.user)
                     .success(function(data, status, headers, config) {
                         $window.sessionStorage.token = data.token;
                         $scope.message = 'Welcome';
                     })
                     .error(function(data, status, headers, config) {
                         // Erase the token if the user fails to log in
                         delete $window.sessionStorage.token;

                         // Handle login errors here
                         $scope.message = 'Error: Invalid user or password';
                     });
             };
         }
     ]);
