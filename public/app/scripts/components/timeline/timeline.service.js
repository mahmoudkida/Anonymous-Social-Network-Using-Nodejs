function timelineService($http, $rootScope) {
    this.getPosts = function () {
        return $http.get($rootScope.serviceUrl.getPosts)
            .then(function successCallBack(data) {
                return data;
            }, function failureCallBack(data) {
                return data;
            })
    };
  this.getPostsOcean = function () {
    return $http.get($rootScope.serviceUrl.getPostsOcean)
      .then(function successCallBack(data) {
        return data;
      }, function failureCallBack(data) {
        return data;
      })
  };
    this.submitPost = function (postData) {
        return $http.post($rootScope.serviceUrl.getPosts, postData)
            .then(function successCallBack(data) {
                return data;
            }, function failureCallBack(data) {
                return data;
            })
    };
  this.getComments = function (postId) {
    return $http.get($rootScope.serviceUrl.submitComment.replace('{{postId}}',postId))
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
  }

}

timelineService.$inject = ['$http', '$rootScope']
angular
    .module('components.timeline')
    .service('timelineService', timelineService);
