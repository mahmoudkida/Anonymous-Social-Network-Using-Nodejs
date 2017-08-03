function RootController($rootScope, serverUrl) {
    $rootScope.serviceUrl = {
        register: serverUrl + '/users/register',
        login: serverUrl + '/users/login',
        logout: serverUrl + '/users/logout',
        getPosts: serverUrl + '/posts',
        getUserInfo: serverUrl + '/users/userInfo',
        submitComment : serverUrl + '/{{postId}}/comment'
    }
    $rootScope.imageUrl = "/static/app/images";
}
RootController.$inject = ['$rootScope', 'serverUrl']
angular
    .module('root')
    .controller('RootController', RootController);
