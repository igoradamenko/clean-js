import SmoothScrollY from 'helpers/smooth-scroll-y';

class CompanyViewDirective {
  constructor($element, $http, $scope, $stateParams, $window, mapService) {
    this.deps = {
      $element,
      $http,
      $scope,
      $stateParams,
      $window,
      mapService,
    };

    this.offices = [];
    this.selectedOfficeId = null;
    this.scrollableNode = $element[0].parentNode;
    this.scroller = new SmoothScrollY(this.scrollableNode);
  }

  $onInit() {
    this.deps.mapService.clear();

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

    this.keyupHandler = this.onKeydown.bind(this);
    this.deps.$window.addEventListener('keydown', this.keyupHandler);
  }

  $onDestroy() {
    this.deps.$window.removeEventListener('keydown', this.keyupHandler);
  }

  selectOffice(office) {
    this.deps.mapService.selectPOIById(office.id);
    this.selectedOfficeId = office.id;
  }

  onKeydown(event) {
    event.stopPropagation();
    event.preventDefault();

    const UP = 38;
    const DOWN = 40;

    if (event.keyCode !== UP && event.keyCode !== DOWN) return;

    const direction = (event.keyCode === UP) ? 1 : -1;

    let curItemIndex;
    if (!this.selectedOfficeId) {
      curItemIndex = direction;
    } else {
      curItemIndex = this.offices.findIndex(o => o.id === this.selectedOfficeId);
    }

    if (!this.offices[curItemIndex - direction]) return;

    curItemIndex -= direction;

    this.deps.$scope.$applyAsync(() => {
      this.selectOffice(this.offices[curItemIndex], false);
      this.scrollToOfficeById(this.offices[curItemIndex].id);
    });
  }

  scrollToOfficeById(id, force) {
    const elemIdSelector = `#office${id}`;
    const elemNode = document.querySelector(elemIdSelector);

    if (!elemNode) return;

    const top = !force && elemNode.offsetTop <= this.scrollableNode.clientHeight / 2 ? 0 : elemNode.offsetTop;
    this.scroller.scroll(top);
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
    $inject: ['$element', '$http', '$scope', '$stateParams', '$window', 'mapService'],
  }));
