function RootController($rootScope, serverUrl) {
    $rootScope.serviceUrl = {
        register: serverUrl + '/users/register',
        login: serverUrl + '/users/login',
        logout: serverUrl + '/users/logout',
        getPosts: serverUrl + '/posts',
        getUserInfo: serverUrl + '/users/userInfo',
        updateInfo : serverUrl + '/users/updateInfo',
        updatePicture : serverUrl + '/users/updatePicture',
        updatePassword : serverUrl + '/users/updatePassword',
        submitComment : serverUrl + '/posts/{{postId}}/comments'
    };
    $rootScope.imageUrl = "/static/app/images";
}
RootController.$inject = ['$rootScope', 'serverUrl'];
angular
    .module('root')
    .controller('RootController', RootController);
