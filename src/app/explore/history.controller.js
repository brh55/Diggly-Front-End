(function() {
  'use strict';

  angular
    .module('digglyFeProto')
    .controller('HistoryController', HistoryController);

  /** @ngInject */
  function HistoryController($state, $scope) {
    var m = this.model = {
        history: [],
    };

    var a = this.action = {
        init: function() {
            console.log($state.params);
            m.history = $state.params.history || '';
        }
    };

    a.init();
  }
})();
