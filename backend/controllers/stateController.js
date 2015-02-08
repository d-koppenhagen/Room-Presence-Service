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