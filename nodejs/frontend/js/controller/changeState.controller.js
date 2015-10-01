(function() {
  "use strict";
  angular
    .module('presenceService')
    .controller('changeStateCtrl', ['$scope', '$http', '$location','$interval',
      function($scope, $http, $location, $interval) {
        console.log('open changeStateCtrl...');

        var strBtnOff = "btn-default";
        var strBtnGreen = "btn-success";
        var strBtnRed = "btn-danger";
        var strBtnYellow = "btn-warning";
        var strBtnBlue = "btn-primary";
        var strBtnCustom = "btn-info";

        getData();
        $interval(getData,2000);

        function getData()  {
          $http.get(rootURL + "/state/get?api_key=" + apikey)
            .success(response)
            .error(function(data, status, headers, config) {
              console.log("Error by getting data", data, status, headers, config);
            });

          function response(data) {
            console.log("received new data: ", data);


            angular.forEach(data, function(value, key) {
              switch (value.state.state) {
                case "green":
                  data[key]["btnClass"] = strBtnGreen;
                  break;
                case "yellow":
                  data[key]["btnClass"] = strBtnYellow;
                  break;
                case "red":
                  data[key]["btnClass"] = strBtnRed;
                  break;
                case "blue":
                  data[key]["btnClass"] = strBtnCustom;
                  break;
                case "custom":
                  data[key]["btnClass"] = strBtnBlue;
                  break;
                case "off":
                  data[key]["btnClass"] = strBtnOff;
                  break;
                default: // $("#btn_"+element.user).addClass("btn-default");
                  ;
              }
            });

            $scope.persons = data;
            console.log("added classes:", data);
          }
        }

        /* toggeling states */
        $scope.nextState = function(person, currentState) {
          var newState = "";
          switch (currentState) {
            case "off":
              newState = "red"
              break;
            case "red":
              newState = "yellow"
              break;
            case "yellow":
              newState = "green"
              break;
            case "green":
              newState = "blue"
              break;
            case "blue":
              newState = "off"
              break;
            default: // $("#btn_"+element.user).addClass("btn-default");
              ;
          }
          setState(person, newState);
        }
        $scope.setNewState = function(person, currentState) {
            setState(person, currentState);
          }
          /* set new state */
        function setState(person, newState) {
          var r, g, b;
          if (newState == "custom") {
            var customRGBvalue = hexToRgb( $("#color").val() );
            console.log("custom color: ", customRGBvalue);
            r = customRGBvalue.r
            g = customRGBvalue.g
            b = customRGBvalue.b
          }



          console.log("setting state from", person, "to", newState);
          var obj = {
            "state": newState,
            "color": {
              "b": b,
              "g": g,
              "r": r
            }

          };
          $http.put(rootURL + "/state/set/" + person + "?api_key=" + apikey, JSON.stringify(obj))
            .success(success)
            .error(function(data, status, headers, config) {
              console.log("Error by getting data", data, status, headers, config);
            });

          function success(data) {
            console.log("changed state successfully! ", data);
            getData();
          }
        }

        $scope.openModal = function(person) {
          console.log("open modal");
          $("#customizeStateModal").modal();
          $scope.choosedPerson = person;
        }

        $('#colorpicker').farbtastic('#color');



        function hexToRgb(hex) {
          var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
          } : null;
        }

      }
    ])
}());
