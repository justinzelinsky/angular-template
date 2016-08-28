angular.module(appName).controller('HelloWorldCtrl', function($scope, HelloWorldService) {
  $scope.message = HelloWorldService.helloWorld();
});
