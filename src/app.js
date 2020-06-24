/* eslint-disable import/first */

import './components/reset';
import './components/document';

import angular from 'angular';

window.angular = angular;

import 'angular-ui-router';

import 'angular-mocks';
import injectMocks from './app.mocks';

const basePath = BASE_PATH.slice(0, -1);
const homePath = basePath || '/';

angular.module('app', ['ui.router', 'ngMockE2E'])
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
              template: null,
            },
          },
        })

        .state('company', {
          url: `${basePath}/company/{id:int}`,
          views: {
            main: {
              template: '<company-view></company-view>',
            },
          },
        });
    },
  ])
  .run(injectMocks);

require('./layouts/main-layout');

require('./views/company-view');
