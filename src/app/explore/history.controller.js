(function() {
  'use strict';

  angular
    .module('digglyFeProto')
    .controller('HistoryController', HistoryController);

  /** @ngInject */
  function HistoryController(ExploreService, $state, $window) {
    var m = this.model = {
        history: [],
    };

    var a = this.action = {
        init: function() {
            m.history = ExploreService.getHistory() || '';
        }
    };

    a.init();
  }
})();
