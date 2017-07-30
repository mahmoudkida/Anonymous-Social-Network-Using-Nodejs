function RootController($rootScope, serverUrl) {
    $rootScope.serviceUrl = {
        register: serverUrl + '/users/register',
        login: serverUrl + 'users/login'
    }
}
RootController.$inject = ['$rootScope', 'serverUrl']
angular
    .module('root')
    .controller('RootController', RootController);
