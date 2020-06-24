class CompanyViewDirective {
  constructor($http, $stateParams, mapService) {
    this.deps = {
      $http,
      $stateParams,
      mapService,
    };
    this.offices = [];
  }

  $onInit() {
    this.deps.$http({
      method: 'GET',
      url: `/api/companies/${this.deps.$stateParams.id}`,
    }).then(response => {
      this.offices = response.data.result.offices;
      this.offices.forEach(office => {
        this.deps.mapService.addPOI(office.coords, { id: office.id });
      });
    }, error => {
      console.error(error);
    });
  }

  selectOffice() {
    console.log('Select office click');
  }
}

angular
  .module('app')
  .directive('companyView', () => ({
    template: require('./company-view.template.jade'),
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {},
    controller: CompanyViewDirective,
    controllerAs: 'c',
    bindToController: true,
    $inject: ['$http', '$stateParams', 'mapService'],
  }));
