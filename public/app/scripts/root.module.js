angular
  .module('root', [
    'common',
    'components',
    'angular-jwt',
    'angular-loading-bar',
    'angularMoment',
    'defaultImage'
  ])
  .constant('serverUrl', 'http://localhost:3005')
  .config(['$httpProvider', 'jwtInterceptorProvider', '$localStorageProvider',
    function ($httpProvider, jwtInterceptorProvider, $localStorageProvider) {
      //$httpProvider.defaults.headers.common['x-access-token'] = $localStorage['x-access-token'];
      // jwtInterceptorProvider.tokenGetter = function () {
      //
      //     if ($localStorageProvider.get('x-access-token')) {
      //         //return $localStorageProvider.get('x-access-token');
      //       $httpProvider.defaults.headers.common['x-access-token'] = $localStorageProvider.get('x-access-token');
      //     }
      // }
      //$httpProvider.interceptors.push('jwtInterceptor');
      $httpProvider.defaults.headers.common['x-access-token'] = $localStorageProvider.get('x-access-token');
    }])
  .run(['cfpLoadingBar', '$transitions', function (cfpLoadingBar, $transitions) {
    $transitions.onStart({}, cfpLoadingBar.start);
    $transitions.onSuccess({}, cfpLoadingBar.complete);
  }]);
