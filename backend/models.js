exports.models = {
	"State": {
		"id": "State",
		"required": ["state"],
		"properties": {
			"state": {
				"type": "string",
				"description": "Identifier of the presence state"
			},
			"color": {
				"type": "RGBColor",
				"description": "Color for custom state"
			}
		}
	},
	"RGBColor": {
		"id": "RGBColor",
		"required": ["r", "g", "b"],
		"properties": {
			"r": {
				"type": "integer",
				"format": "int64",
				"description": "Red value",
				"minimum": 0,
				"maximum": 255
			},
			"g": {
				"type": "integer",
				"format": "int64",
				"description": "Red value",
				"minimum": 0,
				"maximum": 255
			},
			"b": {
				"type": "integer",
				"format": "int64",
				"description": "Red value",
				"minimum": 0,
				"maximum": 255
			}
		}
	},
	
	"User": {
		"id": "User",
		"required": ["id", "name", "pin", "state"],
		"properties": {
			"id": {
				"type": "string",
				"description": "user ID"
			},
			"name": {
				"type": "string",
				"description": "full name"
			},
			"pin": {
				"type": "integer",
				"format": "int64",
				"description": "GPIO pin for this user"
			},
			"state": {
				"type": "string",
				"description": "user's state"
			},
		}
	}
}