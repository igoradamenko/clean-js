const API_URL = 'https://api-maps.yandex.ru/2.1/?load=package.full&lang=ru-RU&mode=release&apikey=b84f855a-030f-49d7-ae5d-37b6467bb901'; // плохой ключ

class MapController {
  constructor($scope, $element, $document, $window, $q, mapService, POIService) {
    this.deps = {
      $scope,
      $element,
      $document,
      $window,
      $q,
      mapService,
      POIService,
    };

    this.mapNode = $element[0];
    this.POIs = [];
    this.initCallbacks = [];
    this.inited = false;

    this.deps.mapService.setMapDirective(this);

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
        this.inited = true;
        this.fireInitCallbacks();
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

  clear() {
    if (this.map) this.map.geoObjects.removeAll();
    this.POIs = [];
  }

  getYmaps() {
    if (this.inited) {
      return this.deps.$q.resolve(ymaps);
    }

    const deferred = this.deps.$q.defer();
    this.initCallbacks.push(deferred.resolve);

    return deferred.promise;
  }

  fireInitCallbacks() {
    this.initCallbacks.forEach(cb => cb(ymaps));
  }

  addPOI(location, iconData) {
    return this.deps.POIService.create(location, iconData).then(poi => {
      this.map.geoObjects.add(poi);
      this.POIs.push(poi);
      return poi;
    });
  }

  selectPOIById(id) {
    const poi = this.POIs.find(p => p.properties.get('id') === id);
    if (!poi) return;

    this.selectPOI(poi);
  }

  // центрирование нужно доработать, чтобы карта не двигалась, если точка видна
  // igoradamenko, 24.06.2020

  selectPOI(poi) {
    this.unselectAllPOIs();
    poi.options.set('iconLayout', poi.properties.get('icons').selected);
  }

  unselectAllPOIs() {
    this.POIs.forEach(poi => {
      poi.options.set('iconLayout', poi.properties.get('icons').normal);
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
    $inject: ['$scope', '$element', '$document', '$window', '$q', 'mapService', 'POIService'],
  }));
