function AuthService($http, $rootScope) {
    this.register = function (registerData) {
        return $http.post($rootScope.serviceUrl.register, registerData)
            .then(function successCallBack(data) {
                return data;
            }, function failureCallBack(data) {
                return data;
            })
    }

    this.login = function (loginData) {
        return $http.post($rootScope.serviceUrl.login, loginData)
            .then(function successCallBack(data) {
                return data;
            }, function failureCallBack(data) {
                return data;
            })
    }


}

AuthService.$inject = ['$http', '$rootScope']
angular
    .module('components.auth')
    .service('AuthService', AuthService);
