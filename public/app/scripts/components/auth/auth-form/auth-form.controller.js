function AuthFormController($localStorage, $state) {
    if ($localStorage['x-access-token']) {
        $state.go('posts');
    }
    var ctrl = this;
    ctrl.$onChanges = function (changes) {
        if (changes.user) {
            ctrl.user = angular.copy(ctrl.user);
        }
    };
    ctrl.submitForm = function () {
        ctrl.onSubmit({
            $event: {
                user: ctrl.user
            }
        });
    };
}
AuthFormController.$inject = ['$localStorage', '$state'];
angular
    .module('components.auth')
    .controller('AuthFormController', AuthFormController);
