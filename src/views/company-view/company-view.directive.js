const STATUS_TEXTS = ['нет данных об очередях', 'очередей почти нет', 'есть очереди', 'большие очереди', 'ресторан перегружен'];
const STATUS_COLORS = ['#ddd', '#2aaf3b', '#ecba00', '#ec2c00', '#8e1a00'];

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

      this.offices = this.offices.reduce((acc, office) => {
        const status = getStatusByIndex(office.index);
        return acc.concat({
          ...office,
          status: STATUS_TEXTS[status],
          color: STATUS_COLORS[status],
        });
      }, []);
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

    if (event.keyCode === UP || event.keyCode === DOWN) {
      const direction = event.keyCode - 39;

      let curItemIndex;
      if (!this.selectedOfficeId) {
        curItemIndex = direction;
      } else {
        curItemIndex = this.offices.findIndex(o => o.id === this.selectedOfficeId);
      }

      if (this.offices[curItemIndex - direction]) {
        curItemIndex -= direction;

        this.deps.$scope.$applyAsync(() => {
          this.selectOffice(this.offices[curItemIndex], false);
          this.scroll(this.offices[curItemIndex].id);
        });
      }
    }
  }

  scroll(id, force) {
    const elemIdSelector = `#office${id}`;
    const elemNode = document.querySelector(elemIdSelector);

    if (elemNode) {
      const top = !force && elemNode.offsetTop <= this.scrollableNode.clientHeight / 2 ? 0 : elemNode.offsetTop;
      this.scrollableNode.scrollTo({ top, left: 0, behavior: 'smooth' });
    }
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

function getStatusByIndex(index) {
  switch (true) {
    case typeof index === 'undefined':
      return 0;
    case index < 30:
      return 1;
    case index < 60:
      return 2;
    case index < 90:
      return 3;
    default:
      return 4;
  }
}
