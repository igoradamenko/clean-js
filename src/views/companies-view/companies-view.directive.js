angular
  .module('app')
  .directive('companiesView', () => ({
    template: require('./companies-view.template.jade'),
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {},
    controller() {},
    controllerAs: 'c',
    bindToController: true,
  }));
