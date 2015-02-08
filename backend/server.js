//include packages
var express    = require('express');
var bodyParser = require('body-parser');
var gpio       = require('pi-gpio');
var cors       = require('cors');
var app        = express();
var sw         = require('swagger-node-express');

var port = 3000;


var models = require("./models.js");
var stateController = require("./controllers/stateController.js");


sw.setAppHandler(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
app.use(allowCrossDomain);






sw.addModels(models)
	.addGet(stateController.getState)     // - /state/get
	.addGet(stateController.getStateByUserID) // - /state/get/{userID}
	
sw.configureDeclaration("state", {
	description : "Operations about states",
	produces: ["application/json"]
});


// set api info
sw.setApiInfo({
	title: "Room Presence Service",
	description: "This is the room presence API for office L0.13 in HfTL, Leipzig, Germany",
	contact: "mail@ferdinand-malcher.de",
});






function setState(username, state){
	console.log('set state for ' + username + ': ' + state);
	
	if(state == "on"){
		users[username].state = "on";
		setGPIO(users[username].pin, 1);

	}else if(state == "off"){
		users[username].state = "off";
		setGPIO(users[username].pin, 0);
	}
}



function setGPIO(pin, value){
	gpio.open(pin, "output", function(err) {        // Open pin for output
    	gpio.write(pin, value, function() {         // Set pin to value
        	gpio.close(pin);                        // Close pin
    	});
	});
}






app.get('/', function(req, res) {
  res.send('This is the L0.13 room presence API');
});




app.put('/state/set/:id', function(req, res) {
	var state = req.body.state;
	var id = req.params.id;
	
	//error handling
	if(!state) return res.status(400).send();
	if(!users[id]) res.status(400).send();
	if(!(state == "on" || state == "off")) return res.status(400).send();

	//no error, change state
	setState(id, state);
	res.send();
});



// Configures the app's base path and api version.
sw.configureSwaggerPaths("", "/api-docs", "")
sw.configure("http://10.12.114.183:" + port, "1.0.0");



// Start the server
app.listen(port);
console.log("Room presence API started on port " + port);
