
var app = angular.module('songsApp', []);

app.filter("filterall",function($filter) {

  return function(arr,t){ 
    (t?t.split(/,+/):[]).forEach(function(v){ 
      arr = $filter('filter')(arr,v); 
    });
    return arr;
  };

});

app.filter("tagFilter", function ($filter) {
  
  return function(inputArray = "", searchText = "") {
    var searchTerms = (searchText).toLowerCase().split(/\s+/);
    var result = inputArray;
    searchTerms.forEach(function(searchTerm) {
        result = $filter('filter')(result, searchTerm);
    });

    return result;
  };  
});

app.controller('songCtrl', function($scope, $http) {
  
  $http.get("data2.json").then(function (response) {
    var list = Object.values(response.data)[0];
    var vars = [];
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1);
    hashes = hashes.split('&');
    hashes = decodeURIComponent(hashes);
    hashes = hashes.split(',');
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars[hash[0]] = hash[1];
    }
    console.log(vars);
    console.log(list);
    
    for (var j = 0; j < list.length; j++) {
      if(list[j]["singer"] == vars["s"]) {
        for (var k = 0; k < list[j]["songs"].length; k++) {
          if(list[j]["songs"][k]["t"] == vars["t"]) {
            $scope.singer = list[j]["singer"];
            $scope.song = list[j]["songs"][k];
            console.log($scope.song);
          }
        }
      }
    }

  });

});

app.controller('songsCtrl', function($scope, $http) {

$http.get("data2.json").then(function (response) {
  $scope.list = Object.values(response.data)[0];
  list = $scope.list;
  console.log($scope.list);
});

});