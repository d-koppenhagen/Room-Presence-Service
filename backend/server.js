//include packages
var express    = require('express');
var bodyParser = require('body-parser');
var cors       = require('cors');
var url        = require('url');
var app        = express();
var sw         = require('swagger-node-express').createNew(app);

var UserService = require("./UserService.js");
var gpio = require('./gpio');

var port = 3000;




var models = require("./models.js");
var stateController = require("./controllers/stateController.js");



var corsOptions = {
  credentials: true,
  origin: function(origin,callback) {
    if(origin===undefined) {
      callback(null,false);
    } else {
      // change wordnik.com to your allowed domain.
      //var match = origin.match("^(.*)?.swagger.io(\:[0-9]+)?");
      var match = origin.match("^(.*)");
      var allowed = (match!==null && match.length > 0);
      callback(null,allowed);
    }
  }
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cors(corsOptions));


//CORS middleware
/*var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
app.use(allowCrossDomain);*/


//init PWM
gpio.initPwm(UserService.getAllUsers());





sw.addModels(models)
	.addGet(stateController.getState)     // - /state/get
	.addGet(stateController.getStateByUserID) // - /state/get/{userID}
	.addPut(stateController.setStatebyUserID) // - /state/set/{userID}
	
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










/*app.get('/', function(req, res) {
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
*/


// Configures the app's base path and api version.
sw.configureSwaggerPaths("", "/api-docs", "")
sw.configure("http://10.12.114.183:" + port, "1.0.0");



// Start the server
app.listen(port);
console.log("Room presence API started on port " + port);
