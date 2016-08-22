'use strict';
const appName = 'app';

angular.module(appName, ['ui.router']).config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/helloworld.html',
      controller: 'HelloWorldCtrl'
    });

  $urlRouterProvider.otherwise('/');

}).run(function($rootScope) {
  window.r = $rootScope;
});
