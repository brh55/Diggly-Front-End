(function() {
  'use strict';

  angular
    .module('digglyFeProto')
    .controller('HistoryController', HistoryController);

  /** @ngInject */
  function HistoryController(ExploreService) {
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
