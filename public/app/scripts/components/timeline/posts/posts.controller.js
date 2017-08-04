function postsController($localStorage, $state, timelineService,$rootScope) {

  var ctrl = this;

  function getLatestPosts() {
    timelineService.getPosts().then(function (res) {
      if (res.data.err) {
        alertify.alert(res.data.err.message);
        return false;
      }
      ctrl.posts = res.data;
    });
    timelineService.getPostsOcean().then(function (res) {
      if (res.data.err) {
        alertify.alert(res.data.err.message);
        return false;
      }
      ctrl.postsOcean = res.data;
    });
  }



  ctrl.$onInit = function () {
    getLatestPosts();
  };

  $rootScope.$on('postAdded', function (event, msg) {
    getLatestPosts();
  });


  ctrl.addComment = function(post){
    timelineService.submitComment({comment : post.newComment,isAnonymous : post.isCommentAnonymous},post._id).then(function(res){
      if (res.data.err) {
        alertify.alert(res.data.err.message)
        return false;
      }
      post.comments = res.data;
    });

  }
}
postsController.$inject = ['$localStorage', '$state', 'timelineService','$rootScope'];
angular
  .module('components.timeline')
  .controller('postsController', postsController);
