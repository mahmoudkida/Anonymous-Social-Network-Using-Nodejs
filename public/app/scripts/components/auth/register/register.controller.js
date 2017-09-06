function RegisterController(AuthService, $state, $localStorage, $http, alertify) {
    var ctrl = this;
    ctrl.$onInit = function () {
        ctrl.error = null;
        ctrl.user = {
            username: '',
            email: '',
            password: ''
        };
    };
    ctrl.createUser = function () {
        return AuthService
            .register(ctrl.user)
            .then(function (res) {
                if (res.data.err) {
                    alertify.alert(res.data.err.message)
                    return false;
                }

                if(res.data.token){
                  $localStorage['x-access-token'] = res.data.token;
                  $http.defaults.headers.common['x-access-token'] = $localStorage['x-access-token'];

                  $state.go('posts');
                }

            }, function (res) {
                if (res.data.err) {
                    alertify.alert(res.data.err.message);
                    return false;
                }
                ctrl.error = res.data.err.message;
            });
    };
}
RegisterController.$inject = ['AuthService', '$state', '$localStorage', '$http', 'alertify']
angular
    .module('components.auth')
    .controller('RegisterController', RegisterController);
