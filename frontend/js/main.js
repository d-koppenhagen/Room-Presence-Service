var rootURL = "http://srv4.malcher-server.de:3000";
//getStates();
var currentStates;


$(".big-btn").click(function () {
    changeStateUser = $(this)[0].id.split("_")[1];
    console.log("changing state from: " + changeStateUser);

    var oldState = currentStates[changeStateUser].state;
    switch(oldstate) {
        case "on": setState(changeStateUser, "off");
            break;
        case "off": setState(changeStateUser, "on");
            break;
        default: console.log("not a valid state! - your state is: ", oldState);
    }

    function setState(username, newState) {
        $.ajax({
          url: rootURL+"",
          success: success,
        });

        function success(data){
            console.log("changed state successfully! ",data);
        }
    }
});




function getStates(){
    $.ajax({
      url: rootURL+"/api/state/get",
      success: response,
    });

    function response(data){
        currentStates = data;
        for (element in data){
            // set in initial states for each button
            switch(element.state) {
                case "on": $("#btn_"+element.user).addClass("btn-success");
                    break;
                case "off": $("#btn_"+element.user).addClass("btn-danger");
                    break;
                default: $("#btn_"+element.user).addClass("btn-default");
                    ;
            }
        }
    }
}
