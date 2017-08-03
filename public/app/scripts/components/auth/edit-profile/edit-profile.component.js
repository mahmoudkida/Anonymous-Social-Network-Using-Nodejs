var editProfile = {
  templateUrl: '/static/app/scripts/components/auth/edit-profile/edit-profile.html',
  controller: 'editProfileController'
};

angular
  .module('components.auth')
  .component('editProfile', editProfile).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('editProfile', {
      parent : 'app',
      url: '/editProfile',
      template: '<edit-profile></edit-profile>'
    })

}]);
