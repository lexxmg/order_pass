<?php

//header('Access-Control-Allow-Origin: *');
//header('Content-Type: text/html; charset=UTF-8');
if ( $_SERVER['REMOTE_ADDR'] == '185.35.160.71' ) {

	$read = json_decode(file_get_contents("data.txt"), true);

	//$read = array_values($read);
	// echo count($read);
	// print_r($read[2]);

	for ($i = 0; $i < count($read); $i++) {
	 	if ($read[$i]['firm'] == $_GET['firm'] && $read[$i]['dat'] == $_GET['dat']) {
	 		// print_r($read[$i]);
	 		// $read[$i]["contract"] = 'new';
	 		// print_r($read[$i]);
	 		unset($read[$i]);
	 	}
	}
	$read = array_values($read);

	file_put_contents("data.txt", json_encode($read, JSON_UNESCAPED_UNICODE));
} else {
	echo "err";
}
?>
