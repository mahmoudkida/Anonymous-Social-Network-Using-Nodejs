function friendProfileService($http, $rootScope) {

  this.getFriendsPosts = function (userId) {
    return $http.get($rootScope.serviceUrl.getFriendsPosts.replace('{{userId}}',userId))
      .then(function successCallBack(data) {
        return data;
      }, function failureCallBack(data) {
        return data;
      })
  };

  this.getFriendInfo = function (userId) {
    return $http.get($rootScope.serviceUrl.getFriendInfo.replace('{{userId}}',userId))
      .then(function successCallBack(data) {
        return data;
      }, function failureCallBack(data) {
        return data;
      })
  };
  this.submitComment = function (commentData,postId) {
    return $http.post($rootScope.serviceUrl.submitComment.replace('{{postId}}',postId), commentData)
      .then(function successCallBack(data) {
        return data;
      }, function failureCallBack(data) {
        return data;
      })
  };


  this.submitCrush= function (crushData) {
    return $http.post($rootScope.serviceUrl.crush, crushData)
      .then(function successCallBack(data) {
        return data;
      }, function failureCallBack(data) {
        return data;
      })
  };

}

friendProfileService.$inject = ['$http', '$rootScope'];
angular
  .module('components.friendProfile')
  .service('friendProfileService', friendProfileService);
