(function() {
  'use strict';

  angular
    .module('digglyFeProto')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, DigglyService, toastr) {
    var vm = this;

    DigglyService.getAllTopics();
  }
})();
