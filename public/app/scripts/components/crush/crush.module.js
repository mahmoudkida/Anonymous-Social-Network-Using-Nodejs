angular
  .module('components.crush', [
    'ui.router',
    'ngStorage',
    'ngAlertify'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('crush', {
      parent: 'app',
      url: '/crush',
      templateUrl: '/static/app/scripts/components/crush/crush-page.html'
    });
    $stateProvider.state('crushMessage', {
      parent: 'app',
      url: '/crush/:crushId',
      templateUrl: '/static/app/scripts/components/crush/crush-page.html'
    });
  }]);
