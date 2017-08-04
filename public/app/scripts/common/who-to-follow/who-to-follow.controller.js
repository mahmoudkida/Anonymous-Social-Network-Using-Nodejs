function whoToFollowController(CommonService) {
    var ctrl = this;
  ctrl.$onInit = function () {
    CommonService.getUsersList().then(function (res) {

      ctrl.usersList = res.data;
    });
  }

}
whoToFollowController.$inject = ['CommonService'];
angular
    .module('common')
    .controller('whoToFollowController', whoToFollowController);
