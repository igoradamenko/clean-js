class MapService {
  constructor() {
    this.mapDirective = null;
  }

  setMapDirective(mapDirective) {
    this.mapDirective = mapDirective;
  }

  getYmaps() {
    return this.mapDirective.getYmaps();
  }
}

angular
  .module('app')
  .service('mapService', MapService);
