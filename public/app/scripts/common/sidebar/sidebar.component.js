var sidebar = {
    templateUrl: '/static/app/scripts/common/sidebar/sidebar.html',
    controller: 'sidebarController'
};

angular
    .module('common')
    .component('sidebar', sidebar)
