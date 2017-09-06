angular
  .module('root', [
    'common',
    'components',
    'angular-jwt',
    'angular-loading-bar',
    'angularMoment',
    'defaultImage',
    'ngStorage',
    'btford.socket-io'
  ])
  //.constant('serverUrl', 'http://localhost:3000')
  .constant('serverUrl', 'https://wshwsh.eu-gb.mybluemix.net')
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
      $httpProvider.interceptors.push(['$q','$state','$localStorage',function($q,$state,$localStorage) {

        return {

          'responseError': function(rejection){

            //var defer = $q.defer();

            if(rejection.status == 401){
              //delete $localStorage['x-access-token'];
              //$state.go('auth.login');
              //console.dir(rejection);
            }

            //defer.reject(rejection);

            //return defer.promise;

          }
        };
      }]);

    }])
  .run(['cfpLoadingBar', '$transitions', function (cfpLoadingBar, $transitions) {
    $transitions.onStart({}, cfpLoadingBar.start);
    $transitions.onSuccess({}, cfpLoadingBar.complete);
  }]).run(['$localStorage', function ($localStorage) {
  //delete $localStorage['x-access-token'];
}])
  .factory('wshwshSocket', ['socketFactory',function (socketFactory) {
  return socketFactory();
}]);

