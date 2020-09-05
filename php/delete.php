<?php

header('Access-Control-Allow-Origin: *');
//header('Content-Type: text/html; charset=UTF-8');

$read = json_decode(file_get_contents("data.txt"), true);

//$read = array_values($read);
// echo count($read);
// print_r($read[2]);

for ($i = 0; $i < count($read); $i++) {
	foreach ($read[$i] as $key => $value) {
	 	if ($value == $_GET['firm']) {
	 		// print_r($read[$i]);
	 		// $read[$i]["contract"] = 'new';
	 		// print_r($read[$i]);
	 		unset($read[$i]);
	 	}
	}
}
$read = array_values($read);

file_put_contents("data.txt", json_encode($read, JSON_UNESCAPED_UNICODE));

?>
