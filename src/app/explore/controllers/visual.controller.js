(function() {
  'use strict';

  angular
    .module('digglyFeProto')
    .controller('VisualController', VisualController);

  /** @ngInject */
  function VisualController(DigglyService, ExploreService, $state, $scope, $window) {
    var m = this.model = {
        history: [],
        currentTopic: '',
        data: ''
    };

    // Should be a better way to pass around to other views
    $scope.history = m.history;

    var a = this.action = {
        updateHistory: function() {
            $scope.$apply(function() {
                m.history.unshift(m.currentTopic);
                // Clean for any duplicates
                m.history = _.uniq(m.history);
                $window.__history__ = m.history;
            });
        },
        fetchTopic: function(id) {
            DigglyService.getRelevantTopics(id).then(function(response) {
                // Strip restangular objects and keep data clean
                m.data = response.plain(response);
                // set current topic
                m.currentTopic = _.omit(m.data, 'linked_topics');
                // change location url, but don't reload to preserve model
                $state.go('explore.visual', {
                    id: id
                }, {
                    location: true,
                    notify: false,
                    reload: false
                });
            })
            .finally(function() {
                // TODO: Wrap and find to move apply outside
                m.history.unshift(m.currentTopic);
                // Clean for any duplicates
                m.history = _.uniq(m.history);
                $window.__history__ = m.history;
            })
        },
        /**
         * Add bookmark wrapper for the service
         * Adapter if API changes, changes will be reflected everywhere
         *
         * @param {object} item Item to be bookmarked
         */
        addBookmark: function (item) {
            ExploreService.addBookmark(item);
        },
        onClick: function(item) {
            a.updateHistory();
            a.fetchTopic(item);
            // Sukrit, you can switch this to a jQuery event if you please.
            $('body').trigger("D3:Click", item);
        },
        init: function () {
            if ($state.params.id) a.fetchTopic($state.params.id);

            // Use services for scalability
            m.history = ExploreService.getHistory() || [];
            // Initialize bookmark or get them;
            $window.__bookmarks__ = ExploreService.getBookmarks() || [];
        }
    }

    a.init();
  }
})();
