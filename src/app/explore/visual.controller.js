(function() {
  'use strict';

  angular
    .module('digglyFeProto')
    .controller('VisualController', VisualController);

  /** @ngInject */
  function VisualController(DigglyService, ExploreServices, $state, $scope, $window) {
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
                console.log(m.history);
            });
        },
        fetchTopic: function(id) {
            DigglyService.getRelevantTopics(id).then(function(response) {
                // Strip restangular objects and keep data clean
                m.data = response.plain(response);
                // set current topic
                m.currentTopic = _.omit(m.data, 'linked_topics');
                // change location url, but don't reload to preserve model
                $state.go($state.current, {
                    id: id
                }, {
                    location: true,
                    notify: false,
                    reload: false
                });
            });
        },
        onClick: function(item) {
            a.updateHistory();
            a.fetchTopic(item);
        },
        init: function () {
            if ($state.params.id) a.fetchTopic($state.params.id);

            // Use services for scalability
            m.history = ExploreServices.getHistory() || [];
        }
    }

    a.init();
  }
})();
