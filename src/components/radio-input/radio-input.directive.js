class RadioInputController {
  constructor($timeout) {
    this.deps = { $timeout };
  }

  change() {
    if (this.onChange) {
      this.deps.$timeout(() => {
        this.onChange();
      });
    }
  }
}

angular
  .module('app')
  .directive('radioInput', () => ({
    template: require('./radio-input.template.jade'),
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      model: '=',
      name: '@',
      value: '@',
      onChange: '&',
    },
    controller: RadioInputController,
    controllerAs: 'c',
    bindToController: true,
    $inject: ['$timeout'],
  }));
