class AddOfficeViewDirective {
  constructor($http, $state, mapService) {
    this.deps = {
      $http,
      $state,
      mapService,
    };

    this.companies = [];
    this.address = '';
    this.company = '';
    this.coords = '';
  }

  $onInit() {
    this.deps.mapService.clear();

    this.deps.$http({
      method: 'GET',
      url: '/api/companies',
    }).then(response => {
      this.companies = response.data.result.companies;
      this.company = this.companies[0].id.toString();
    }, error => {
      console.error(error);
    });
  }

  onAddressChange() {
    this.isAddressInvalid = false;
  }

  onCoordsChange() {
    this.areCoordsInvalid = false;
  }

  onSave() {
    if (!this.address) {
      this.isAddressInvalid = true;
    }

    if (!coordsStringToArray(this.coords, false)) {
      this.areCoordsInvalid = true;
    }

    if (this.isAddressInvalid || this.areCoordsInvalid) return;

    this.deps.$http({
      method: 'POST',
      url: `/api/companies/${this.company}/office`,
      data: {
        address: this.address,
        coords: coordsStringToArray(this.coords, true).reverse(),
      },
    }).then(() => {
      this.deps.$state.go('company', { id: this.company });
    }, error => {
      console.error(error);
    });
  }
}

angular
  .module('app')
  .directive('addOfficeView', () => ({
    template: require('./add-office-view.template.jade'),
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {},
    controller: AddOfficeViewDirective,
    controllerAs: 'c',
    bindToController: true,
    $inject: ['$http', '$state', 'mapService'],
  }));

function coordsStringToArray(coordsString, dontValidate) {
  const coordsArray = coordsString.split(',').map(x => +x.trim());

  if (!dontValidate) {
    if (!(coordsArray[0] > 55.143833 && coordsArray[0] < 56.021388
      && coordsArray[1] > 36.803250 && coordsArray[1] < 37.967777)) return null;
  }

  return coordsArray;
}
