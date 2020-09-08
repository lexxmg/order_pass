<?php

//header('Access-Control-Allow-Origin: *');

//header('Content-Type: text/html; charset=UTF-8');
if ( $_SERVER['REMOTE_ADDR'] == '192.168.5.72' ) {
	$read = json_decode(file_get_contents("data.txt"), true);

	for ($i = 0; $i < count($read); $i++) {
		foreach ($read[$i] as $key => $value) {
		 	if ($value == $_GET['firm']) {
		 		$read[$i]["done"] = $_GET['done'];
		 	}
		}
	}

	file_put_contents("data.txt", json_encode($read, JSON_UNESCAPED_UNICODE));
} else {
	echo "err";
}
?>
