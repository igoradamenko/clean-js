const API_URL = 'https://api-maps.yandex.ru/2.1/?load=package.full&lang=ru-RU&mode=release&apikey=b84f855a-030f-49d7-ae5d-37b6467bb901'; // плохой ключ

class MapController {
  constructor($scope, $element, $document, $window) {
    this.deps = {
      $scope,
      $element,
      $document,
      $window,
    };

    this.mapNode = $element[0];

    this.init();
  }

  init() {
    const onloadFunctionName = 'mapApiLoaded';

    const script = angular.element('<script>');
    script.attr('src', `${API_URL}&onload=${onloadFunctionName}`);
    this.deps.$document.find('body').append(script);

    this.deps.$window[onloadFunctionName] = () => {
      this.deps.$scope.$apply(() => {
        this.initializeMap();
        this.deps.$window[onloadFunctionName] = null;
      });
    };
  }

  initializeMap() {
    if (this.map || typeof ymaps === 'undefined') return;

    this.map = new ymaps.Map(this.mapNode, {
      center: [55.75222, 37.61556],
      zoom: 13,
      controls: [],
    }, {
      autoFitToViewport: 'always',
      avoidFractionalZoom: false,
    });
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
    $inject: ['$scope', '$element', '$document', '$window'],
  }));
