angular
  .module('app')
  .directive('mainLayout', function () {
    return {
      template: require('./main-layout.template.jade'),
      restrict: 'E',
      replace: false,
      transclude: true,
      scope: {},
      controller: function () {
      },
      controllerAs: 'c',
      bindToController: true,
    }
  });
