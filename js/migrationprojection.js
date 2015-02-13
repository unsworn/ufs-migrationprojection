angular.module("migrationprojection", [])

.controller("SlideshowCtrl", function($http, $interval) {
  var self = this;
  var delay = 5000; // set slideshow interval here

  function onSuccess(csvData, status, headers, config) {
    // Convert CSV to JSON.
    var jsonData = Papa.parse(csvData, {header: true});
    self.entries = jsonData.data;

    console.log('entries after http', self.entries);
  }
  // Load CSV data.
  $http.get('data/projection.csv')
    .success(onSuccess);

  self.index = 1;

  function test() {
    console.log('test');
  }

  self.next = function() {
    self.index++;

    if(self.index > self.entries.length) {
      self.index = 1;
    }

    console.log('index', self.index);
  };
  
  // Start slideshow
  $interval(self.next, delay);
});
