(function() {
  'use strict';

  angular
    .module('digglyFeProto')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, DigglyService, $state) {
    var m = this.model = {
        currentTopic: $state.params.id,
        data: ''
    };

    DigglyService.getRelevantTopics(m.currentTopic).then(function(response) {
        // Strip restangular objects and keep data clean
        m.data = response.plain(response);
        console.log(m.data);
    });
  }
})();
