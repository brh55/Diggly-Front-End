(function() {
  'use strict';

  angular
    .module('digglyFeProto')
    .directive('digglyVisual', digglyVisual);

  /** @ngInject */
  function digglyVisual(d3Service) {
    var directive = {
      restrict: 'EA',
      scope: {},
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {
            // D3 Code here after it's been loaded dynamically
            var svg = d3.select(element[0])
            .append("svg");
        });
      }
    };

    return directive;
  }

})();
