(function() {
  'use strict';

  describe('HistoryController', function(){
    var vm;
    var $state;
    var $rootScope;
    var $scope;

    beforeEach(module('digglyFeProto'));

    beforeEach(inject(function($controller, _$state_, _$rootScope_) {
       $scope = _$rootScope_.new();
       vm = $controller('HistoryController', {
          scope: $scope
       });
       $state = _$state_;
    }));

    it('should check url params for ID', function() {
        $state.params.id = 2;
        spyOn(vm.action, 'fetchTopic');
        vm.action.init();
        expect(vm.action.fetchTopic).toHaveBeenCalled();
    });
  });
})();
