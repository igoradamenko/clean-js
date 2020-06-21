class MapController {
  constructor() {
    this.text = 'Test text';
  }
}

angular
  .module('app')
  .directive('map', () => ({
    template: require('./map.template.jade'),
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {},
    controller: MapController,
    controllerAs: 'c',
    bindToController: true,
  }));
