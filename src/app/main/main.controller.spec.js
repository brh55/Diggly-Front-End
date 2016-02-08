(function() {
  'use strict';

  describe('controllers', function(){
    var vm;
    var $state;

    beforeEach(module('digglyFeProto'));

    beforeEach(inject(function($controller, _$state_) {
       vm = $controller('MainController');
       $state = _$state_;
    }));

    it('should check url params for ID', inject(function($controller) {
        $state.params.id = 2;
        spyOn(vm.action, 'fetchTopic');
        vm.action.init();
        expect(vm.action.fetchTopic).toHaveBeenCalled();
    }));
  });
})();
