(function() {
  'use strict';

  angular
    .module('digglyFeProto')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, DigglyService, $state) {
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
        },
        fetchTopic: function(id) {
            console.log('hi');
            DigglyService.getRelevantTopics(id).then(function(response) {
                // Strip restangular objects and keep data clean
                m.data = response.plain(response);
                console.log(m.data);
            });
        },
        init: function () {
            if ($state.params.id) a.fetchTopic($state.params.id);
        }
    }

    a.init();
  }
})();
