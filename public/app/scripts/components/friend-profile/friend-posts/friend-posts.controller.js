function friendPostsController($localStorage, $state, friendProfileService,$rootScope,$stateParams) {

  var ctrl = this;

  ctrl.$onInit = function () {

    friendProfileService.getFriendsPosts($stateParams.userId).then(function (res) {
      if (res.data.err) {
        alertify.alert(res.data.err.message);
        return false;
      }
      ctrl.posts = res.data;
    });
  }

  ctrl.addComment = function(post){
    friendProfileService.submitComment({comment : post.newComment,isAnonymous : post.isCommentAnonymous},post._id).then(function(res){
      if (res.data.err) {
        alertify.alert(res.data.err.message)
        return false;
      }
      post.comments = res.data;
    });

  }

}
friendPostsController.$inject = ['$localStorage', '$state', 'friendProfileService','$rootScope','$stateParams'];
angular
  .module('components.friendProfile')
  .controller('friendPostsController', friendPostsController);
