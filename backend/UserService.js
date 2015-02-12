var users = {
	"danny":{
		"id": "danny",
		"name": "Danny",
		"pin": 7,
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
		"pin": 11,
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
		"pin": 13,
		"state": {
			"state": "off",
			"color": {
				"r": 0,
				"g": 0,
				"b": 0
			}
		}
	},
	
	"hannes":{
		"id": "hannes",
		"name": "Hannes",
		"pin": 15,
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



