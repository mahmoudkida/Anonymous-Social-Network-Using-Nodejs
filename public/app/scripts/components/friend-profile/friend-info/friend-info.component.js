var friendInfo = {
  templateUrl: '/static/app/scripts/components/friend-profile/friend-info/friend-info.html',
  controller: 'friendInfoController'
};

angular
  .module('components.friendProfile')
  .component('friendInfo', friendInfo);
