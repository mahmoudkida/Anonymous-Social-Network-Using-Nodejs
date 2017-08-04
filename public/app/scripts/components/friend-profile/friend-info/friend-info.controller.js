function friendInfoController($localStorage, $state, friendProfileService,$rootScope,$stateParams) {

  var ctrl = this;

  ctrl.$onInit = function () {

    friendProfileService.getFriendInfo($stateParams.userId).then(function (res) {
      if (res.data.err) {
        alertify.alert(res.data.err.message);
        return false;
      }
      ctrl.user = res.data[0];
    });
  };

  $rootScope.$on('crushSent',function () {
    $('#crushOnFriend').modal('hide')

  });


}
friendInfoController.$inject = ['$localStorage', '$state', 'friendProfileService','$rootScope','$stateParams'];
angular
  .module('components.friendProfile')
  .controller('friendInfoController', friendInfoController);
