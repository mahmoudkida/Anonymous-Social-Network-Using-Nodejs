var app = {
    templateUrl: '/static/app/scripts/common/common.html',
    controller: 'AppController'
};

angular
    .module('common')
    .component('app', app)
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('app', {
                url: '/app',
                template: '<app></app>'
            })
    }]);
