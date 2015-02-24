#!/bin/bash
# check if params are available
if (( $# < 1 )); then
  echo "Skript toggles the current state of presence."; echo ""
  echo "Usage:"
  echo "    ./toggleState <name> [<address>]"
  echo "Examples:"
  echo "    ./toggleState dogi"
  echo "    ./toggleState dogi 10.12.114.183:3000"
  exit
fi
# set address or read it from param
address="10.12.114.183:3000"
if [ X"$2" != X"" ]; then
  two=$(echo $2 | grep -oE "([0-9]{1,3}\.){,3}([0-9]{1,3}):[0-9]{1,5}")
  echo $two
  if [ X"" != "$two" ]; then
    address="$2"
  fi
fi
# get state of user set in param
state=$(echo $(curl -s -X GET -H "Content-Type:application/json" http://$address/state/get/\?api_key\=$apikey) | grep -o "$1[^}]*}" | grep -o 'state[^}]*}' | grep -o ':".*"' | grep -o 'o[^\"]*')
new="off"
if [ X"$state" == X"off" ]; then
  new="on"
fi
curl -X PUT -d "{\"state\":\"$new\"}" -H "Content-Type:application/json" "http://$address/state/set/$1\?api_key\=$apikey"
echo "$1's state from '$state' to '$new'"
