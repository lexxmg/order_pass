<?php

//header('Access-Control-Allow-Origin: *');

//header('Content-Type: text/html; charset=UTF-8');
if ( $_SERVER['REMOTE_ADDR'] == '185.35.160.71' ) {
	$read = json_decode(file_get_contents("data.txt"), true);

	for ($i = 0; $i < count($read); $i++) {
		if ($read[$i]['firm'] == $_GET['firm'] && $read[$i]['dat'] == $_GET['dat']) {
		 	//$read[$i]["done"] = $_GET['done'];
      echo $read[$i]['email'];
		}
	}

	//file_put_contents("data.txt", json_encode($read, JSON_UNESCAPED_UNICODE));
} else {
	echo "err";
}
?>
