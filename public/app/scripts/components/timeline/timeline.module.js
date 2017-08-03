angular
    .module('components.timeline', [
    'ui.router',
    'ngStorage',
    'ngAlertify'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('posts', {
      parent: 'app',
      url: '/posts',
      template: '<submit-post></submit-post><posts></posts>'
    });
  }]);
