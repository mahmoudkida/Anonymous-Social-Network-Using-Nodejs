var posts = {
    templateUrl: '/static/app/scripts/components/timeline/posts/posts.html',
    controller: 'postsController'
};

angular
    .module('components.timeline')
    .component('posts', posts);
