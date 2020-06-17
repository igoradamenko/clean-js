import angular from 'angular';

window.angular = angular;

import 'angular-ui-router';

const basePath = BASE_PATH.slice(0, -1);
const homePath = basePath || '/';

angular.module('app', ['ui.router'])
  .constant('settings', {})
  .config(['$compileProvider', '$stateProvider', '$locationProvider',
    ($compileProvider, $stateProvider, $locationProvider) => {
      $compileProvider.commentDirectivesEnabled(false);
      $compileProvider.cssClassDirectivesEnabled(false);

      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false,
      });

      $stateProvider
        .state('companies', {
          url: homePath,
          views: {
            main: {
              template: '<companies-view></companies-view>',
            },
          },
        })

        .state('company', {
          url: `${basePath}/company`,
          views: {
            main: {
              template: '<company-view></company-view>',
            },
          },
        });
    },
  ])
  .run();

require('./layouts/main-layout');

require('./views/companies-view');
require('./views/company-view');
