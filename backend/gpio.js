var wpi = require('wiring-pi');
wpi.setup('wpi');

exports.initPwm = function(users){
	var user;
	var range = 100;
	
	for(i in users){
		user = users[i];
		
		//set all pins to their color values
		for(c in user.pin){
			wpi.softPwmCreate(user.pin[c], user.state.color[c], range);
		}
		
	}
	
	return;
}


exports.setColor = function(color, pin){
	for(i in color){
		//normalize to 100
		var value = parseInt((color[i] / 255) * 100);
		
		//set to pin
		wpi.softPwmWrite(pin[i], value);
		
		//DEBUG
		console.log("set pin " + pin[i] + " to value " + value);		
		
	}
	
	return;	
}

