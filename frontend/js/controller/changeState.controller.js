(function() {
  "use strict";
  angular
    .module('presenceService')
    .controller('changeStateCtrl', ['$scope', '$http', '$location',
      function($scope, $http, $location) {
        console.log('open changeStateCtrl...');

        var strBtnOff = "btn-default";
        var strBtnGreen = "btn-success";
        var strBtnRed = "btn-danger";
        var strBtnYellow = "btn-warning";
        var strBtnBlue = "btn-primary";
        var strBtnCustom = "btn-info";

        getData();

        function getData()  {
            /* getting current data */
            // static for GUI test
            /*
            var testData = [{
              "id": "danny",
              "name": "Danny",
              "pin": {
                "r": 15,
                "g": 16,
                "b": 1
              },
              "state": {
                "state": "green",
                "color": {
                  "r": 0,
                  "g": 0,
                  "b": 0
                }
              }
            }, {
              "id": "ferdi",
              "name": "Ferdi",
              "pin": {
                "r": 6,
                "g": 10,
                "b": 11
              },
              "state": {
                "state": "yellow",
                "color": {
                  "r": 10,
                  "g": 40,
                  "b": 100
                }
              }
            }, {
              "id": "dogi",
              "name": "Dogi",
              "pin": {
                "r": 0,
                "g": 2,
                "b": 3
              },
              "state": {
                "state": "custom",
                "color": {
                  "r": 0,
                  "g": 0,
                  "b": 0
                }
              }
            }, {
              "id": "hannes",
              "name": "Hannes",
              "pin": {
                "r": 12,
                "g": 13,
                "b": 14
              },
              "state": {
                "state": "blue",
                "color": {
                  "r": 0,
                  "g": 0,
                  "b": 0
                }
              }
            }];
            response(testData);
            */

            $http.get(rootURL+"/state/get")
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
            r = $("#red").val();
            g = $("#green").val();
            b = $("#blue").val();
          }
          console.log("setting state from", person ,"to", newState);
          var obj = {
            "state": newState,
            "color": {
              "b":b,
              "g":g,
              "r":r
            }

          };
          $http.put(rootURL + "/state/set/" + person, JSON.stringify(obj))
            .success(success)
            .error(function(data, status, headers, config) {
              console.log("Error by getting data", data, status, headers, config);
            });

          function success(data) {
            console.log("changed state successfully! ", data);
            getData();
          }
        }

        $scope.openModal = function (person){
          console.log("open modal");
          $("#customizeStateModal").modal();
          $scope.choosedPerson = person;
        }

        $('#colorpicker .sliders').noUiSlider({
                    start: 127,
                    connect: "lower",
                    orientation: "horizontal",
                    range: {
                        'min': 0,
                        'max': 255
                    },
                    format: wNumb({
                        decimals: 0
                    })
                });

                // Bind the color changing function
                // to the slide event.








      }
    ])
}());
