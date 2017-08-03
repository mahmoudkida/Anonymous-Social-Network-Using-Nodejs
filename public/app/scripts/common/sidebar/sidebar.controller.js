function sidebarController(CommonService, $localStorage,$rootScope) {
  var ctrl = this;

  function getUserInfo() {
    CommonService.getUserInfo().then(function (res) {
      if (res.data.err) {
        alertify.alert(res.data.err.message)
        return false;
      }
      ctrl.userData = res.data[0];
    });
  }

  ctrl.$onInit = function () {
    getUserInfo();
  };
  $rootScope.$on('profileUpdated', function () {
    getUserInfo();
  });
  ctrl.logout = function () {
    CommonService.logout().then(function (res) {
      if (res.data.err) {
        alertify.alert(res.data.err.message)
        return false;
      }
      else {
        delete  $localStorage['x-access-token'];
      }
    }, function (res) {
      if (res.data.err) {
        alertify.alert(res.data.err.message)
        return false;
      }
    });
  }

}
sidebarController.$inject = ['CommonService', '$localStorage','$rootScope'];
angular
  .module('common')
  .controller('sidebarController', sidebarController);
