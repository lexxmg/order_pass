<?php

//header('Access-Control-Allow-Origin: *');

// $read = json_decode(file_get_contents("data.txt"), true);

// foreach ($read as $val) {
// 	foreach ($val as $key => $value) {
// 		echo $key;
// 		echo " = ";
// 		echo $value;
// 		echo " | ";
// 	}
// 	echo "<br>";
// }
if ( $_SERVER['REMOTE_ADDR'] == '192.168.5.72' ) {
  echo file_get_contents("data.txt");
} else {
  echo "err";
}

?>
