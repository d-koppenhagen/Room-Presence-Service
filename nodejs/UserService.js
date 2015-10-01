var gpio = require('./gpio');

var users = {

	"hannes":{
		"id": "hannes",
		"name": "Hannes",
		"pin": {
			"r": 6,
			"g": 10,
			"b": 11
		},
		"state": {
			"state": "off",
			"color": {
				"r": 0,
				"g": 0,
				"b": 0
			}
		}
	},
	
	"dogi":{
		"id": "dogi",
		"name": "Dogi",
		"pin": {
			"r": 15,
			"g": 16,
			"b": 1
		},
		"state": {
			"state": "off",
			"color": {
				"r": 0,
				"g": 0,
				"b": 0
			}
		}
	},	
	
	"danny":{
		"id": "danny",
		"name": "Danny",
		"pin": {
			"r": 12,
			"g": 13,
			"b": 14
		},
		"state": {
			"state": "off",
			"color": {
				"r": 0,
				"g": 0,
				"b": 0
			}
		}
	},
	
	"ferdi":{
		"id": "ferdi",
		"name": "Ferdi",
		"pin": {
			"r": 0,
			"g": 2,
			"b": 3
		},
		"state": {
			"state": "off",
			"color": {
				"r": 0,
				"g": 0,
				"b": 0
			}
		}
	}
};






//predefined states
var states = {
	"on": {
		"r": 255, "g": 255, "b": 255	
	},
	"off": {
		"r": 0, "g": 0, "b": 0	
	},
	"red": {
		"r": 255, "g": 0, "b": 0	
	},
	"green": {
		"r": 127, "g": 255, "b": 0	
	},
	"blue": {
		"r": 0, "g": 0, "b": 255	
	},
	"brightblue": {
		"r": 0, "g": 168, "b": 179	
	},
	"pink": {
		"r": 255, "g": 0, "b": 61	
	},
	"yellow": {
		"r": 255, "g": 55, "b": 0	
	},
	"custom": {
		"r": 0, "g": 0, "b": 0	
	},
}






exports.getAllUsers = function(){
	var out = [];
	for(key in users){
		var user = users[key];
		
		out.push(user);
	}
	
	return out;
}



exports.getStateByUserID = function(id){
	//if(users.hasOwnProperty(id)){	
	if(users[id]){
		return users[id].state;
	}else{
		return null;
	}
}



exports.setStateByUserID = function(id, state){
	//DEBUG
	console.log('set state for ' + id + ': ' + state.state);

	//unknown user ID
	if(!users[id]){
		throw "invaliduser";
	}
	
	//custom state but color is missing
	if(state.state == "custom" && !state.color){
		throw "nocolor";
	}
	
	//unkown state
	if(!states[state.state]){
		throw "invalidstate"
	}
	
	//////////////////	
	
	
	//overwrite color with predefined value if not custom
	if(state.state == "custom"){
		//parse values as integer
		for(i in state.color){
			state.color[i] = parseInt(state.color[i]);
		}	
	}else{
		state.color = states[state.state];
	}
	
	
	//apply new values to user database
	users[id].state = state;
	
	
	//set color on pins
	gpio.setColor(state.color, users[id].pin);

	return;
	
}















