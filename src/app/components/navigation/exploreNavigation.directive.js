(function() {
    'use strict';

    angular
        .module('digglyFeProto')
        .directive('exploreNavigation', exploreNavigation);

    /** @ngInject */
    function exploreNavigation () {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/navigation/nav.html'
        };

        return directive;
    }
})();
