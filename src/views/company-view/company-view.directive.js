class CompanyViewDirective {
  constructor($http, $stateParams) {
    this.deps = {
      $http,
      $stateParams,
    };
    this.offices = [];
  }

  $onInit() {
    this.deps.$http({
      method: 'GET',
      url: `/api/companies/${this.deps.$stateParams.id}`,
    }).then(response => {
      this.offices = response.data.result.offices;
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
    $inject: ['$http', '$stateParams'],
  }));
