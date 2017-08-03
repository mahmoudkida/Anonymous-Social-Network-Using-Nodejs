function AppController($localStorage, $state) {
    var ctrl = this;

    if (!$localStorage['x-access-token']) {
        $state.go('login');
    }
}
AppController.$inject = ['$localStorage', '$state'];
angular
    .module('common')
    .controller('AppController', AppController);
