#!/bin/bash
# getting results from REST API
apikey="hGzftDrTxckj6745vuDgT"
if (( $# < 1 )); then
  echo "Skript shows the current state of presence."; echo ""
  echo "Usage:"
  echo "    ./toggleState <name> [<address>]"
  echo "Examples:"
  echo "    ./toggleState hannes"
  echo "    ./toggleState hannes 10.12.114.183:3000"
  exit
fi
# set address or read it from param
address="10.12.114.183:3000"
if [ X"$2" != X"" ]; then
  two=$(echo $2 | grep -oE "([0-9]{1,3}\.){,3}([0-9]{1,3}):[0-9]{1,5}")
  if [ X"" != "$two" ]; then
    address="$2"
  fi
fi
# check if custom state is set
state=$(curl -s -X GET -H "Content-Type:application/json" $address/state/get\?api_key\=hGzftDrTxckj6745vuDgT | sed -e 's/[{}]/''/g' | awk -v k="text" '{n=split($0,a,","); for (i=1; i<=n; i++) print a[i]}' | grep $1 -A 8 | grep -e ":\"state.*" |grep custom)
if [ X"$state" != "" ]; then # not a custom state?
  # print color
  curl -s -X GET -H "Content-Type:application/json" $address/state/get\?api_key\=hGzftDrTxckj6745vuDgT | sed -e 's/[{}]/''/g' | awk -v k="text" '{n=split($0,a,","); for (i=1; i<=n; i++) print a[i]}' | grep $1 -A 8 | grep -e ":\"state.*" -o | grep '":".*' -o | grep "\w*" -o
else
  # print rgb-values
  curl -s -X GET -H "Content-Type:application/json" $address/state/get\?api_key\=hGzftDrTxckj6745vuDgT | sed -e 's/[{}]/''/g' | awk -v k="text" '{n=split($0,a,","); for (i=1; i<=n; i++) print a[i]}' | grep $1 -A 8 | grep color -A 4 | grep '"\w".*' -o
fi
