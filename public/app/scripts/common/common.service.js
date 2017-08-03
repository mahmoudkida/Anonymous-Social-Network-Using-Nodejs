function CommonService($http, $rootScope) {
    this.getUserInfo = function () {
        return $http.get($rootScope.serviceUrl.getUserInfo)
            .then(function successCallBack(data) {
                return data;
            }, function failureCallBack(data) {
                return data;
            })
    };
    this.logout = function () {
        return $http.get($rootScope.serviceUrl.logout)
            .then(function successCallBack(data) {
                return data;
            }, function failureCallBack(data) {
                return data;
            })
    }
}

CommonService.$inject = ['$http', '$rootScope']
angular
    .module('common')
    .service('CommonService', CommonService);
