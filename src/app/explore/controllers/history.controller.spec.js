(function() {
  'use strict';

  describe('HistoryController', function(){
    var vm;
    var $state;
    var $rootScope;
    var $scope;
    var ExploreService;
    var $window;

    beforeEach(module('digglyFeProto'));

    beforeEach(inject(function($controller, _$state_, $rootScope, _$window_, _ExploreService_) {
       $scope = $rootScope.$new();
       ExploreService = _ExploreService_;
       vm = $controller('HistoryController', {
          $scope: $scope
       });
       $state = _$state_;
       $window = _$window_;
    }));

    beforeEach(function() {
      $window.__history__ = ['testItem', 'testItem2'];
    });

    it('should populate model history', function() {
      spyOn(ExploreService, 'getHistory').and.callThrough();
      vm.action.init();
      expect(ExploreService.getHistory).toHaveBeenCalled();
      expect(vm.model.history).toEqual(['testItem', 'testItem2']);
    });
  });
})();
