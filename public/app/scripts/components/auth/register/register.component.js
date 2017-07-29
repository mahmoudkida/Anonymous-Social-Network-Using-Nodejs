var register = {
    templateUrl: '/static/app/scripts/components/auth/register/register.html',
    controller: 'RegisterController'
};

angular
    .module('components.auth')
    .component('register', register)
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('auth.register', {
                url: '/register',
                template: '<register></register>'
            });
  }]);
