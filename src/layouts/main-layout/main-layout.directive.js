class MainLayoutDirective {
  constructor($http, $scope, $state) {
    this.deps = { $http, $scope, $state };
    this.companies = [];
    this.currentHref = this.deps.$state.href(this.deps.$state.current.name, this.deps.$state.params);
  }

  $onInit() {
    this.deps.$http({
      method: 'GET',
      url: '/api/companies',
    }).then(response => {
      this.companies = response.data.result.companies
        .map(c => ({
          title: c.title,
          href: this.deps.$state.href('company', { id: c.id }),
        }))
        .concat({
          title: 'Добавить ресторан',
          href: '/add-office',
          separated: true,
        });
      this.updateCurrentCompany();
    }, error => {
      console.error(error);
    });

    this.deps.$scope.$on('$stateChangeSuccess', (event, toState, toStateParams) => {
      this.currentHref = this.deps.$state.href(toState.name, toStateParams);
      this.updateCurrentCompany();
    });
  }

  updateCurrentCompany() {
    this.companies = this.companies.map(c => ({
      ...c,
      current: c.href === this.currentHref,
    }));
  }
}

angular
  .module('app')
  .directive('mainLayout', () => ({
    template: require('./main-layout.template.jade'),
    restrict: 'E',
    replace: false,
    transclude: true,
    scope: {},
    controller: MainLayoutDirective,
    controllerAs: 'c',
    bindToController: true,
    $inject: ['$http', '$scope', '$state'],
  }));
