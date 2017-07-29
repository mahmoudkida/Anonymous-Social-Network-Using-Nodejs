angular
    .module('common', [
    'ui.router',
    'angular-loading-bar'
  ])
    .run(['$transitions', 'cfpLoadingBar', function ($transitions, cfpLoadingBar) {
        // $transitions.onStart({}, cfpLoadingBar.start);
        //$transitions.onSuccess({}, cfpLoadingBar.complete);
    }]);
