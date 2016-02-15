(function() {
  'use strict';

  angular
    .module('digglyFeProto')
    .controller('HistoryController', HistoryController);

  /** @ngInject */
  function HistoryController(ExploreServices, $state, $window) {
    var m = this.model = {
        history: [],
    };

    var a = this.action = {
        init: function() {
            m.history = ExploreServices.getHistory() || '';
        }
    };

    a.init();
  }
})();
