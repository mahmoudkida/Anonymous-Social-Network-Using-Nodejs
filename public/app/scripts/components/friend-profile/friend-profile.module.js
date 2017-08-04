angular
  .module('components.friendProfile', [
    'ui.router',
    'ngStorage',
    'ngAlertify'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('friendProfile', {
      parent: 'app',
      url: '/friendProfile/:userId',
      template: '<friend-info></friend-info><friend-posts></friend-posts>'
    });
  }]);
