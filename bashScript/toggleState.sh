#!/bin/bash
# getting results from REST API
curl -s -o currentStates.txt -X GET -H "Content-Type:application/json" http://10.12.114.181:3000/api/state/get/

# check which name is posted
if [ "$1" == "danny" ]
then
	currentState=$(cat currentStates.txt | jsawk 'return this.danny.state');
fi
if [ $1 == "dogi" ]
then
        currentState=$(cat currentStates.txt | jsawk 'return this.dogi.state');
fi
if [ $1 == "hannes" ]
then
        currentState=$(cat currentStates.txt | jsawk 'return this.hannes.state');
fi
if [ $1 == "ferdi" ]
then
        currentState=$(cat currentStates.txt | jsawk 'return this.ferdi.state');
fi

# check the current state
if [ $currentState == "on" ]
then
	newState="off";
	curl -X PUT -d '{"state":"off"}' -H "Content-Type:application/json" "http://10.12.114.181:3000/api/state/set/$1"
fi
if [ $currentState == "off" ]
then
	newState="on";
	curl -X PUT -d '{"state":"on"}' -H "Content-Type:application/json" "http://10.12.114.181:3000/api/state/set/$1"
fi

echo "$1's state from '$currentState' to '$newState'"
