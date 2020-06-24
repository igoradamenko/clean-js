angular
  .module('app')
  .directive('poi', () => ({
    template: require('./poi.template.jade'),
    restrict: 'E',
    replace: true,
    transclude: false,
    scope: {},
    controller() {},
    controllerAs: 'c',
    bindToController: {
      selected: '<?',
    },
  }));
