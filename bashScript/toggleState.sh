#!/bin/bash
# getting results from REST API
if (( $# < 1 )); then
  echo "Skript toggles the current state of presence."; echo ""
  echo "Usage:"
  echo "    ./toggleState <name> [<address>]"
  echo "Examples:"
  echo "    ./toggleState dogi"
  echo "    ./toggleState dogi 10.12.114.181:3000"
  exit
fi
address="10.12.114.181:3000"
on=$(echo $(curl -s -X GET -H "Content-Type:application/json" http://$address/api/state/get/) | grep -o "$1.*?}" | grep -o 'state.*?}' | grep -o ':".*?"' | grep -o 'on')
old="on";  new="off"
if [ X"$on" == X"" ]; then
  old="off"; new="on"
fi
curl -X PUT -d "{\"state\":\"$new\"}" -H "Content-Type:application/json" "http://$address/api/state/set/$1"
echo "$1's state from '$old' to '$new'"
