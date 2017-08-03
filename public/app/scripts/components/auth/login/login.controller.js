function LoginController(AuthService, $state, $localStorage, $http, alertify) {
    var ctrl = this;
    ctrl.$onInit = function () {
        ctrl.error = null;
        ctrl.user = {
            username: '',
            password: ''
        };
    };
    ctrl.loginUser = function (event) {
        return AuthService
            .login(ctrl.user)
            .then(function (res) {
                if (res.data.err) {
                    alertify.alert(res.data.err.message)
                    return false;
                }
                if(res.data.token){
                  $localStorage['x-access-token'] = res.data.token;
                  //$http.defaults.headers.common['x-access-token'] = $localStorage['x-access-token'];

                  $state.go('posts');
                }

            }, function (res) {
                if (res.data.err) {
                    alertify.alert(res.data.err.message)
                }
                ctrl.error = res.data.message;
            });
    };
}

LoginController.$inject = ['AuthService', '$state', '$localStorage', '$http', 'alertify'];

angular
    .module('components.auth')
    .controller('LoginController', LoginController);
