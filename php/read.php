<?php

$read = json_decode(file_get_contents("data.txt"), true);

foreach ($read as $val) {
	foreach ($val as $key => $value) {
		echo $key;
		echo " = ";
		echo $value;
		echo " | ";
	}
	echo "<br>";
}

?>
