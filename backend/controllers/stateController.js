var sw = require("swagger-node-express");
var url = require("url");
var swp = sw.paramTypes;
var UserService = require("../UserService.js");
var swe = sw.errors;


exports.getState = {
	"spec": {
		path: "/state/get",
		method: "GET",
		summary: "Get current states",
		notes: "Returns all users with their current states",
		type: "array",
		items: {
			$ref: "User"
		},
		nickname: "getState"
	},
	"action": function(req, res) {
		var out = UserService.getAllUsers();
		res.send(JSON.stringify(out));
	}
}

exports.getStateByUserID = {
	"spec": {
		path: "/state/get/{userId}",
		method: "GET",
		summary: "Get current state of user",
		notes: "Returns state of the given user",
		type: "State",
		nickname: "getStateByUserID",
		parameters : [swp.path("userId", "ID of user", "string")],
		responseMessages : [swe.invalid("userId"), swe.notFound("user")]
	},
	"action": function(req, res) {
		if (!req.params.userId){
			swe.invalid("userId");
		}

		var state = UserService.getStateByUserID(req.params.userId);
		
		if(state) res.send(JSON.stringify(state)); 
		else swe.notFound("user", res);
	}
};



exports.setStatebyUserID = {
	"spec": {
		path: "/state/set/{userId}",
		method: "PUT",
		summary: "Set new state for user",
		notes: "Set a new state for a user",
		type: "State",
		nickname: "setStateForUserId",
		parameters : [
			swp.path("userId", "ID of user", "string"),
			swp.body("body", "New State object", "State")
		],
		responseMessages : [
			swe.invalid("user"),
			swe.invalid("input"),
			swe.notFound("user"),
			swe.invalid("color for custom state"),
			swe.invalid("state"),
			swe.invalid("undefined error")
		]
	},
	"action": function(req, res) {
	
		var body = req.body;

		
		if(typeof body === "undefined" || typeof body.state === "undefined"){
			swe.invalid("input", res);
		}
		
		try{
			UserService.setStateByUserID(req.params.userId, body);
			res.send(JSON.stringify(body));
		}
		catch(err){
			if(err == "invaliduser") swe.notFound("user", res);
			else if(err == "nocolor") swe.invalid("color for custom state", res);
			else if(err == "invalidstate") swe.invalid("state", res);
			else swe.invalid("undefined error", res);
		}
	}
};


