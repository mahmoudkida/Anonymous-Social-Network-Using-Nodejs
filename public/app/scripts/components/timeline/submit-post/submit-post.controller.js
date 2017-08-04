function submitpostController(timelineService,$rootScope) {
    var ctrl = this;
    ctrl.submitPost = function () {
        timelineService.submitPost({
            text: ctrl.postText,
            type: 'post',
            isAnonymous : ctrl.isAnonymous
        }).then(function (res) {
            if (res.data.err) {
                alertify.alert(res.data.err.message);
                return false;
            }
            else{
              $rootScope.$emit('postAdded')
            }
        });
    }

}
submitpostController.$inject = ['timelineService','$rootScope'];

angular
    .module('components.timeline')
    .controller('submitpostController', submitpostController);
