class POIService {
  constructor($q, $compile, $timeout, $rootScope, mapService) {
    this.deps = {
      $q,
      $compile,
      $timeout,
      $rootScope,
      mapService,
    };
  }

  create(location, iconData) {
    return this.getIcons(iconData)
      .then(icons => this.deps.mapService.getYmaps().then(ymaps => new ymaps.Placemark(
        location.reverse(),
        {
          id: iconData.id,
          icons, // объект со строками, которые можно использовать в iconLayout
        },
        {
          iconLayout: icons.normal,
        },
      )));
  }

  getIcons(params) {
    const deferred = this.deps.$q.defer();
    const icon = angular.copy(params);
    const selectedIcon = angular.copy(icon);

    selectedIcon.selected = true;

    this.deps.$q.all([
      this.getIcon(this.unfoldPOI(icon)),
      this.getIcon(this.unfoldPOI(selectedIcon)),
    ]).then(([normal, selected]) => {
      deferred.resolve({
        normal,
        selected,
      });
    });

    return deferred.promise;
  }

  getIcon(html) {
    const deferred = this.deps.$q.defer();

    this.compileDirective(html).then($element => {
      this.createLayoutClass($element[0].outerHTML).then(deferred.resolve);
    });

    return deferred.promise;
  }

  createLayoutClass(html, params) {
    return this.deps.mapService.getYmaps()
      .then(ymaps => ymaps.templateLayoutFactory.createClass(html, params));
  }

  compileDirective(sourceHtml) {
    const scope = this.deps.$rootScope.$new(true);
    const $element = this.deps.$compile(sourceHtml)(scope);

    return this.deps.$timeout(() => $element);
  }

  unfoldPOI(attributes = {}) {
    const attrsString = Object.keys(attributes).map(key => `${key}="${attributes[key]}"`).join(' ');
    return `<poi ${attrsString}></poi>`;
  }
}

angular
  .module('app')
  .service('POIService', ['$q', '$compile', '$timeout', '$rootScope', 'mapService', POIService]);
