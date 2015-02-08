var users = {
	"danny":{
		"id": "danny",
		"name": "Danny",
		"pin": 7,
		"state": "off"
	},
	
	"ferdi":{
		"id": "ferdi",
		"name": "Ferdi",
		"pin": 11,
		"state": "off"
	},
	
	"dogi":{
		"id": "dogi",
		"name": "Dogi",
		"pin": 13,
		"state": "off"
	},
	
	"hannes":{
		"id": "hannes",
		"name": "Hannes",
		"pin": 15,
		"state": "off"
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