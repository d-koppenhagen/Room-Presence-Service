#!/bin/bash
# getting results from REST API
if (( $# < 1 )); then
  echo "Skript shows the current state of presence."; echo ""
  echo "Usage:"
  echo "    ./toggleState <name> [<address>]"
  echo "Examples:"
  echo "    ./toggleState dogi"
  echo "    ./toggleState dogi 10.12.114.183:3000"
  exit
fi
address="10.12.114.183:3000"
state=$(echo $(curl -s -X GET -H "Content-Type:application/json" http://$address/state/get\?api_key\=$apikey) | grep -o "$1[^}]*}" | grep -o 'state[^}]*}' | grep -o ':".*"' | grep -o 'o[^\"]*')
echo "$1's state is currently $state"
