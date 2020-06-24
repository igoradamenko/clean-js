class MapService {
  constructor() {
    this.map = null;
  }

  setMap(map) {
    this.map = map;
  }
}

angular
  .module('app')
  .service('mapService', MapService);
