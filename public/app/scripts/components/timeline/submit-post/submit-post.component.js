var submitPost = {
    templateUrl: '/static/app/scripts/components/timeline/submit-post/submit-post.html',
    controller: 'submitpostController'
};

angular
    .module('components.timeline')
    .component('submitPost', submitPost);
