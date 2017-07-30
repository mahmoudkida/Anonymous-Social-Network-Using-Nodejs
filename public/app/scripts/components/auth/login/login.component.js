var login = {
    templateUrl: '/static/app/scripts/components/auth/login/login.html',
    controller: 'LoginController'
};

angular
    .module('components.auth')
    .component('login', login)
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('auth', {
                redirectTo: 'auth.login',
                url: '/auth',
                template: '<div ui-view></div>'
            })
            .state('auth.login', {
                url: '/login',
                template: '<auth-form></auth-form>'
            });
        $urlRouterProvider.otherwise('/auth/login');
  }]);
