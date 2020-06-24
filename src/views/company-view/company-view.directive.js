class CompanyViewDirective {
  constructor($http) {
    this.deps = {
      $http,
    };
  }

  $onInit() {
    this.deps.$http({
      method: 'GET',
      url: '/api/companies',
    }).then(response => {
      console.log(response.data.result.status, response.data.result.companies);
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
    $inject: ['$http'],
  }));
