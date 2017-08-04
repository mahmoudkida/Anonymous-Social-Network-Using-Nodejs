var friendPosts = {
  templateUrl: '/static/app/scripts/components/friend-profile/friend-posts/friend-posts.html',
  controller: 'friendPostsController'
};

angular
  .module('components.friendProfile')
  .component('friendPosts', friendPosts);
