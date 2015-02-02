(function(){
    "use strict";
	angular
		.module('presenceService')
        .controller('changeStateCtrl', ['$scope','$http','$location',
            function($scope, $http, $location) {
            console.log('open changeStateCtrl...');

            var strBtnGreen = "btn btn-lg btn-block big-btn btn-success";
            var strBtnRed = "btn btn-lg btn-block big-btn btn-danger";

            getData();
            function getData() {
                /* getting current data */
                $http.get(rootURL+"/api/state/get")
                    .success(response)
                    .error(function(data, status, headers, config) {
                    console.log("Error by getting data", data, status, headers, config);
                });
                function response(data){
                    console.log("received new data: ", data);
                    angular.forEach(data, function(value, key) {
                        switch(value.state) {
                            case "on": data[key]["btnClass"] = strBtnGreen;
                                break;
                            case "off": data[key]["btnClass"] = strBtnRed;
                                break;
                            default: // $("#btn_"+element.user).addClass("btn-default");
                                ;
                        }
                    });
                    $scope.persons = data;
                    console.log("added classes:",data);
                }
            }
            /* set new state */
            $scope.toggleState = function (person, currentState){
                var newState = "";
                switch(currentState) {
                    case "on": newState = "off";
                        break;
                    case "off": newState = "on";
                        break;
                    default: // $("#btn_"+element.user).addClass("btn-default");
                        ;
                }

                var obj = {
                    "state" : newState
                };
                $http.put(rootURL+"/api/state/set/"+person, JSON.stringify(obj) )
                    .success(success)
                    .error(function(data, status, headers, config) {
                    console.log("Error by getting data", data, status, headers, config);
                });

                function success(data){
                    console.log("changed state successfully! ", data);
                    getData();
                }
            }
        }])
        .filter('capitalize', function() {
            return function(input, all) {
                return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
            }
        });
}());
