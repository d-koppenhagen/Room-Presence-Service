<?php
$api = "http://10.12.114.181:3000/api";

if($_GET['user'] AND $_GET['setState']){
	setState($_GET['user'], $_GET['setState']);
	header("Location: index.php");
	exit();
}




//get current state from server
$cur = file_get_contents($api."/state/get");
$cur = json_decode($cur, 1);


function putrequest($url, $body){
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json','Content-Length: ' . strlen($body)));
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
	curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_exec($ch);

	curl_close($ch);
}

function setState($user, $state){
	global $api;	
	putrequest($api."/state/set/".$user, "{\"state\":\"".$state."\"}");	
}



?>
<html>
<head>
<title>L0.13 Presence Palm TX</title>

<meta http-equiv="refresh" content="5; URL=index.php">

<style type="text/css">
<!--
a.btn {
        display: block;
        margin: 20px 20px;
        padding: 20px;
        text-align: center;
        font-weight: bold;
        color: white;
}

a.active {
	background-color: green;
}

a.inactive {
	background-color: red;
}
-->
</style>

</head>
<body>

<?php 
foreach($cur AS $user){
	if($user['state'] == "on"){
		$class = "active";
		$newstate = "off";
	}else if($user['state'] == "off"){
		$class = "inactive";
		$newstate = "on";
	}
?>
	<a class="btn <?php echo $class ?>" href="index.php?user=<?php echo $user['username'] ?>&setState=<?php echo $newstate ?>"><?php echo $user['username'] ?></a>
	
<?php
}
?>


</body>
</html>
