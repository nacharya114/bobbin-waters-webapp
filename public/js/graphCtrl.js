var graphCtrl = angular.module('graphCtrl', ['loginService', 'reportService']);
graphCtrl.controller('graphCtrl', function($scope, $location, $window, loginService, reportService){
    var container = document.getElementById('graph');
    var items = [
          {x: '2014-06-11', y: 10},
          {x: '2014-06-12', y: 25},
          {x: '2014-06-13', y: 30},
          {x: '2014-06-14', y: 10},
          {x: '2014-06-15', y: 15},
          {x: '2014-06-16', y: 30}
    ];

      var dataset = new vis.DataSet(items);
      var options = {
          start: '2014-06-10',
          end: '2014-06-18'
      };


      reportService.getLocationsforQuality().then((data)=> {
        $scope.locations = data;
      });

      $scope.loc = {};
      $scope.years = [2016];

      $scope.makeGraph = function() {
        reportService.getQualityReports().then((response)=>{
            var itemList = new Array();
            console.log(response);
            for (var i = 0; i < response.length; i++) {
                var rep = response[i];
                //console.log(rep);

                if (rep.latitude == $scope.loc.lat && rep.longitude == $scope.loc.lon) {
                    console.log("im in here");
                    var obj;
                    if ($scope.opt == "chem") {
                        obj = {x : rep.date, y: rep.chem};
                    } else {
                        obj = {x : rep.date, y: rep.virus};
                    }
                    itemList.push(obj);
                }
            }
            var dataset2 = new vis.DataSet(itemList);
            var option = {
                start: '2016-10-01',
                end: '2016-12-30'
            }

            var Graph2d = new vis.Graph2d(container, dataset2, option)
        });
      }

      //var Graph2d = new vis.Graph2d(container, dataset, options);
});