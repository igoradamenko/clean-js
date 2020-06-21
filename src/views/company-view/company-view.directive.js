angular
  .module('app')
  .directive('companyView', () => ({
    template: require('./company-view.template.jade'),
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {},
    controller() {},
    controllerAs: 'c',
    bindToController: true,
  }));
