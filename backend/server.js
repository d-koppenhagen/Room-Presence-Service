// Get packages
var express = require('express');
var bodyParser = require('body-parser');


var app = express();
var port = 3000;
var router = express.Router();

app.use(bodyParser.json());


//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
app.use(allowCrossDomain);


var allowedStates = ["on", "off"];


var users = {
	"danny":{
		"username": "danny",
		"pin": 17,
		"state": "on"
	},
	
	"ferdi":{
		"username": "ferdi",
		"pin": 18,
		"state": "on"
	},
	
	"dogi":{
		"username": "dogi",
		"pin": 19,
		"state": "off"
	},
	
	"hannes":{
		"username": "hannes",
		"pin": 20,
		"state": "off"
	}
};


function setState(username, state){
	console.log('set state for ' + username + ': ' + state);
	
	//set in GPIO
	//TODO...

	if(state == "on"){
		users[username].state = "on";

	}else if(state == "off"){
		users[username].state = "off";
	}
}






router.get('/', function(req, res) {
  res.send('This is the L0.13 room presence API');
});

router.get('/state/get', function(req, res) {
	res.send(users);	
});



router.put('/state/set/:id', function(req, res) {
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



// Register all our routes with /api
app.use('/api', router);


// Start the server
app.listen(port);
console.log('Room presence API started on port ' + port);
