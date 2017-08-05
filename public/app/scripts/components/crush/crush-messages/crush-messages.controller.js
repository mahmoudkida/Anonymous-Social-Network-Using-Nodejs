function crushMessageController($localStorage, $state, crushService,$rootScope,$stateParams) {

  var ctrl = this;

  $rootScope.$on('loadMessages',function (event,crushId) {

    ctrl.crushId = crushId.crushId;
    crushService.getCrushsMessages(ctrl.crushId).then(function (res) {
      if (res.data.err) {
        alertify.alert(res.data.err.message);
        return false;
      }
      ctrl.messageList = res.data;
    })

  });


  ctrl.$onInit = function () {


  };

  ctrl.submitMessage = function () {
    crushService.postCrushsMessages(ctrl.crushId,{message:ctrl.newMessage}).then(function (res) {
      if (res.data.err) {
        alertify.alert(res.data.err.message);
        return false;
      }
      ctrl.newMessage = '';
      $rootScope.$emit('loadMessages',{'crushId' : ctrl.crushId});
    });
  };


}
crushMessageController.$inject = ['$localStorage', '$state', 'crushService','$rootScope','$stateParams'];
angular
  .module('components.crush')
  .controller('crushMessageController', crushMessageController);
