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

  addPOI(location, iconData) {
    return this.mapDirective.addPOI(location, iconData);
  }
}

angular
  .module('app')
  .service('mapService', MapService);
