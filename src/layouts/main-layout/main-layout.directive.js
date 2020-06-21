angular
  .module('app')
  .directive('mainLayout', () => ({
    template: require('./main-layout.template.jade'),
    restrict: 'E',
    replace: false,
    transclude: true,
    scope: {},
    controller() {},
    controllerAs: 'c',
    bindToController: true,
  }));
