var rootURL = "http://srv4.malcher-server.de:3000";
getStates();
setInterval("getStates();",5000);
var currentStates;


$(".big-btn").click(function () {
    changeStateUser = $(this)[0].id.split("_")[1]; // split id to name
    console.log("changing state from: " + changeStateUser);

    var oldState = currentStates[changeStateUser].state;
    console.log("Old state: ",oldState);
    switch(oldState) {
        case "on": setState(changeStateUser, "off");
            break;
        case "off": setState(changeStateUser, "on");
            break;
        default: console.error("not a valid state! - your state is: ", oldState);
    }

    //setState("dogi", "on");
    function setState(username, newState) {
        var obj = {
            "state" : newState
        };
        $.ajax({
          url: rootURL+"/api/state/set/"+username,
          type: "PUT",
          data: JSON.stringify(obj),
          contentType: "application/json",
          success: success,
        });
        function success(data){
            console.log("changed state successfully! ", data);
            getStates();
        }
    }
});


function getStates(){
    $.ajax({
      url: rootURL+"/api/state/get",
      success: response,
    });

    function response(data){
        console.log("received new data: ", data);
        currentStates = data;
        $.each(data, function (key, val){
            // set in initial states for each button
            switch(val.state) {
                case "on": $("#btn_"+val.username).attr("class","btn btn-lg btn-block big-btn btn-success");
                    break;
                case "off": $("#btn_"+val.username).attr("class","btn btn-lg btn-block big-btn btn-danger");
                    break;
                default: // $("#btn_"+element.user).addClass("btn-default");
                    ;
            }
        });
    }
}
