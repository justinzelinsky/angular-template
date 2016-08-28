angular.module(appName).factory('HelloWorldService', function() {
  return {
    helloWorld: function() {
      return 'Hello, World';
    }
  };
});
