function RootController($rootScope, serverUrl,$window,$localStorage) {
    $rootScope.serviceUrl = {
        register: serverUrl + '/users/register',
        login: serverUrl + '/users/login',
        logout: serverUrl + '/users/logout',
        getUsersList : serverUrl + '/users/getUsersList',
        getPosts: serverUrl + '/posts',
        getFriendsPosts: serverUrl + '/posts/{{userId}}',
        getPostsOcean : serverUrl + '/posts/postsOcean',
        getUserInfo: serverUrl + '/users/userInfo',
        getFriendInfo: serverUrl + '/users/userInfo/{{userId}}',
        updateInfo : serverUrl + '/users/updateInfo',
        updatePicture : serverUrl + '/users/updatePicture',
        updatePassword : serverUrl + '/users/updatePassword',
        submitComment : serverUrl + '/posts/{{postId}}/comments',
        crush : serverUrl + '/crushs'
    };
    $rootScope.imageUrl = "/static/app/images";
  $window.onbeforeunload = function () {
    delete  $localStorage['x-access-token'];
  }
}
RootController.$inject = ['$rootScope', 'serverUrl','$window','$localStorage'];
angular
    .module('root')
    .controller('RootController', RootController);
