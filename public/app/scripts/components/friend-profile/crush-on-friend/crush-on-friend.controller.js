function crushOnFriendController($localStorage, $state, friendProfileService,$rootScope,$stateParams) {

  var ctrl = this;

  ctrl.$onInit = function () {


  };
  ctrl.sendAnonymousCrush = function () {
    debugger;
    friendProfileService.submitCrush({
      from: $rootScope.userData._id,
      to:$stateParams.userId,
      msg : {
        from : $rootScope.userData._id,
        message : ctrl.anonymousMessage
      }

    }).then(function (res) {
      if (res.data.err) {
        alertify.alert(res.data.err.message);
        return false;
      }
      else{
        $rootScope.$emit('crushSent')
      }
    });

  }


}
crushOnFriendController.$inject = ['$localStorage', '$state', 'friendProfileService','$rootScope','$stateParams'];
angular
  .module('components.friendProfile')
  .controller('crushOnFriendController', crushOnFriendController);
