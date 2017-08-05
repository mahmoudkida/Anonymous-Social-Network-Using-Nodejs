function crushListController($localStorage, $state, crushService,$rootScope,$stateParams,$timeout) {

  var ctrl = this;

  ctrl.$onInit = function () {
    crushService.setCrushs().then(function (res) {
      if (res.data.err) {
        alertify.alert(res.data.err.message);
        return false;
      }
      ctrl.crushList = res.data;
      $timeout(function () {
        $(".contact-list li").first().trigger('click');
      },200);
    });

    ctrl.loadMessages = function (crushId) {

        ctrl.selectedCrush = crushId;
        $rootScope.$emit('loadMessages',{'crushId' : crushId});
    };



  };


}
crushListController.$inject = ['$localStorage', '$state', 'crushService','$rootScope','$stateParams','$timeout'];
angular
  .module('components.crush')
  .controller('crushListController', crushListController);
