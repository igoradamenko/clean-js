angular
  .module('app')
  .directive('companyView', function () {
    return {
      template: require('./company-view.template.jade'),
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
