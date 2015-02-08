var sw = require("swagger-node-express");
var url = require("url");
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
		path: "/state/get/{userID}",
		method: "GET",
		summary: "Get current state of user",
		notes: "Returns state of the given user",
		type: "State",
		nickname: "getStateByUserID",
		parameters : [sw.pathParam("userID", "ID of user", "string")],
		responseMessages : [swe.invalid("userID"), swe.notFound("user")]
	},
	"action": function(req, res) {
		if (!req.params.userID){
			throw swe.invalid("userID");
		}
		var id = req.params.userID;
		console.log(id);
		var state = UserService.getStateByUserID(id);

		if(state) res.send(JSON.stringify(state));
		else throw swe.notFound("user", res);
	}
}