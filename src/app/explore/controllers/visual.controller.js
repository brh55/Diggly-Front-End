(function() {
  'use strict';

  angular
    .module('digglyFeProto')
    .controller('VisualController', VisualController);

  /** @ngInject */
  function VisualController(DigglyService, ExploreService, $state, $scope) {
    var m = this.model = {
        history: [],
        currentTopic: '',
        data: ''
    };

    $scope.loading = false;

    var a = this.action = {
        /**
         * Updates the history only if it's unique
         * @return {[type]} [description]
         */
        updateHistory: function(topic) {
            ExploreService.setHistory(topic);
            m.history = ExploreService.getHistory();
        },
        /**
         * Retrieves a Diggly topic and update the routes
         * @param  {number} id Wikipedia ID
         * @return {void}
         */
        fetchTopic: function(id) {
            $scope.loading = true;

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

                $scope.loading = false;
            })
            .finally(function() {
                a.updateHistory(m.currentTopic);
            });
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

        /**
         * Wrapper for clear history service
         * @return {void}
         */
        clearHistory: function () {
            ExploreService.clearHistory();
            m.history.length = 0;
        },

        onClick: function(item) {
            a.fetchTopic(item);

            var sessionData = {
              centralNodeID: m.currentTopic.article_id,
              nodeID: item
            };

            // Sukrit, you can switch this to a jQuery event if you please.
            $('body').trigger("visual:clicked-node", sessionData);
        },

        init: function () {
            if ($state.params.id) {
                a.fetchTopic($state.params.id);
            }

            // Use services for scalability
            m.history = ExploreService.getHistory() || [];
        }
    };

    a.init();
  }
})();
