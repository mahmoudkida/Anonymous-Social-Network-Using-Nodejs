function crushService($http, $rootScope) {
  this.setCrushs= function () {
    return $http.get($rootScope.serviceUrl.crush)
      .then(function successCallBack(data) {
        return data;
      }, function failureCallBack(data) {
        return data;
      })
  };

  this.getCrushsMessages= function (crushId) {
    return $http.get($rootScope.serviceUrl.CrushMessages.replace('{{crushId}}',crushId))
      .then(function successCallBack(data) {
        return data;
      }, function failureCallBack(data) {
        return data;
      })
  };

  this.postCrushsMessages= function (crushId,msgData) {
    return $http.post($rootScope.serviceUrl.CrushMessages.replace('{{crushId}}',crushId),msgData)
      .then(function successCallBack(data) {
        return data;
      }, function failureCallBack(data) {
        return data;
      })
  };


}

crushService.$inject = ['$http', '$rootScope'];
angular
  .module('components.crush')
  .service('crushService', crushService);
