function editProfileController(AuthService,alertify,Upload,$rootScope) {
    var ctrl = this;
  function getUserInfo() {
    AuthService.getUserInfo().then(function (res) {
      if (res.data.err) {
        alertify.alert(res.data.err.message);
        return false;
      }
      ctrl.user = res.data[0];
    });
  }

  ctrl.$onInit = function () {
    getUserInfo();
  };
  $rootScope.$on('profileUpdated', function () {
    getUserInfo();
  });

  ctrl.updateInfo = function () {
    AuthService.updateInfo(ctrl.user).then(function (res) {
      if (res.data.err) {
        alertify.alert(res.data.err.message);
        return false;
      }
      alertify.success('Updated Successfully');
      ctrl.user = {};
      ctrl.user = res.data;
      $rootScope.$emit('profileUpdated');
    });
  };
  ctrl.updatePicture = function (file) {
    file.upload = Upload.upload({
      url: $rootScope.serviceUrl.updatePicture,
      data: { file: file}
    });

    file.upload.then(function (response) {
        file.result = response.data;
      $rootScope.$emit('profileUpdated');
    });
  };
  ctrl.updatePassword = function () {
    AuthService.updatePassword({newPassword : ctrl.oldPassword , oldPassword : ctrl.oldPassword}).then(function (res) {
      if (res.data.err) {
        alertify.alert(res.data.err.message);
        return false;
      }
    });
  }
}
editProfileController.$inject = ['AuthService','alertify','Upload','$rootScope'];
angular
    .module('components.auth')
    .controller('editProfileController', editProfileController);
