class TextInputController {
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
  .directive('textInput', () => ({
    template: require('./text-input.template.jade'),
    restrict: 'E',
    replace: true,
    transclude: false,
    scope: {
      model: '=',
      onChange: '&',
      invalid: '<?',
    },
    controller: TextInputController,
    controllerAs: 'c',
    bindToController: true,
    $inject: ['$timeout'],
  }));
