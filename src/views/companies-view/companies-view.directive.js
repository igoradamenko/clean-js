angular
  .module('app')
  .directive('companiesView', function () {
    return {
      template: require('./companies-view.template.jade'),
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {},
      controller: function () {
      },
      controllerAs: 'c',
      bindToController: true,
    }
  });
