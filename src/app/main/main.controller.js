(function() {
  'use strict';

  angular
    .module('digglyFeProto')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(DigglyService, $state, $scope) {
    var m = this.model = {
        history: [],
        currentTopic: '',
        data: ''
    };

    var a = this.action = {
        updateHistory: function() {
            $scope.$apply(function() {
                m.history.push(m.currentTopic);
                // Clean for any duplicates
                m.history = _.uniq(m.history);
            });

            console.log(m.currentTopic);
        },
        fetchTopic: function(id) {
            DigglyService.getRelevantTopics(id).then(function(response) {
                // Strip restangular objects and keep data clean
                m.data = response.plain(response);
                // set current topic
                m.currentTopic = _.omit(m.data, 'linked_topics');
            });
        },
        setCurrentTopic: function () {

        },
        onClick: function(item) {
            a.updateHistory();
            a.fetchTopic(item);
        },
        init: function () {
            if ($state.params.id) a.fetchTopic($state.params.id);
        }
    }

    a.init();
  }
})();
