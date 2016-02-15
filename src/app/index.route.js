(function() {
  'use strict';

  angular
    .module('digglyFeProto')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      // Abstract parent state
      .state('explore', {
        url: '/explore/:id',
        templateUrl: 'app/explore/views/layout.html',
        // This is the default child state
        redirectTo: 'explore.visual'
      })
      .state('explore.visual', {
        url: '/visual',
        parent: 'explore',
        templateUrl: 'app/explore/views/visual.html',
        controller: 'VisualController',
        controllerAs: 'visual'
      })
      .state('explore.history', {
        parent: 'explore',
        url: '/history',
        templateUrl: 'app/explore/views/history.html',
        controller: 'HistoryController',
        controllerAs: 'history'
      })
      .state('explore.bookmark', {
        parent: 'explore',
        url: '/bookmark',
        templateUrl: 'app/explore/views/bookmark.html',
        controller: 'BookmarkController',
        controllerAs: 'bookmark'
      })

    // For time being
    $urlRouterProvider.otherwise('/explore/:id');
  }

})();
