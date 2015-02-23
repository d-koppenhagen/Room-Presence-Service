//include packages
var express    = require('express');
var bodyParser = require('body-parser');
var cors       = require('cors');
var url        = require('url');
var app        = express();
var sw         = require('swagger-node-express').createNew(app);
var config     = require('./config');

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



//init PWM
gpio.initPwm(UserService.getAllUsers());




//API key needed
sw.addValidator(
	function validate(req, path){
		var apiKey = req.headers["api_key"];
		if(!apiKey){
        	apiKey = url.parse(req.url,true).query["api_key"];
		}
		
		if(apiKey == config.apikey) {
			return true; 
		}
		
		return false;
	}
);





sw.addModels(models)
	.addGet(stateController.getState)         // - /state/get
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










app.get('/', function(req, res) {
  res.send('This is the L0.13 room presence API');
});




// Configures the app's base path and api version.
sw.configureSwaggerPaths("", "/api-docs", "")
sw.configure("http://10.12.114.183:" + port, "1.0.0");



// Start the server
app.listen(port);
console.log("Room presence API started on port " + port);
