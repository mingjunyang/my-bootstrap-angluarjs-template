'use strict';

angular.module('MingjunYang.I').factory('authInterceptor', ['$rootScope', '$q', '$window',
    function($rootScope, $q, $window) {
        return {
            request: function(config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = $window.sessionStorage.token;
                }
                return config;
            },
            response: function(response) {
                if (response.status === 401) {
                    // handle the case where the user is not authenticated
                }
                return response || $q.when(response);
            }
        };
    }
]);
