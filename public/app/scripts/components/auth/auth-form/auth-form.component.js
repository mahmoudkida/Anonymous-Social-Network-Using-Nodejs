var authForm = {
    bindings: {
        user: '<',
        button: '@',
        message: '@',
        onSubmit: '&'
    },
    templateUrl: '/static/app/scripts/components/auth/auth-form/auth-form.html',
    controller: 'AuthFormController'
};

angular
    .module('components.auth')
    .component('authForm', authForm);
