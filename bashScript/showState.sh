#!/bin/bash
# getting results from REST API
if (( $# < 1 )); then
  echo "Skript shows the current state of presence."; echo ""
  echo "Usage:"
  echo "    ./toggleState <name> [<address>]"
  echo "Examples:"
  echo "    ./toggleState dogi"
  echo "    ./toggleState dogi 10.12.114.181:3000"
  exit
fi
address="10.12.114.181:3000"
on=$(echo $(curl -s -X GET -H "Content-Type:application/json" http://$address/api/state/get/) | grep -oP "$1.*?}" | grep -oP 'state.*?}' | grep -oP ':".*?"' | grep -o 'on')
if [ X"$on" == X"" ]; then
  echo "$1's state is currently off"
else
  echo "$1's state is currently on"
fi
