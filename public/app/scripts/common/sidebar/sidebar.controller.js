function sidebarController(CommonService,$localStorage) {
    var ctrl = this;
    CommonService.getUserInfo().then(function (res) {
        ctrl.userDat = res.data;
    });
    ctrl.logout = function () {
        CommonService.logout().then(function (res) {
            if (res.data.err) {
                alertify.alert(res.data.err.message)
                return false;
            }
            else{
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
sidebarController.$inject = ['CommonService','$localStorage'];
angular
    .module('common')
    .controller('sidebarController', sidebarController);
