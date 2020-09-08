<?php

//======================================= пишем GET запросы в лог ==================================

header('Access-Control-Allow-Origin: *');
//header('Content-Type: text/html; charset=UTF-8');

$dat = date('Y-m-d H:i');
$read = json_decode(file_get_contents("data.txt"), true);
$read[] = array('dat' => $dat,
  							'firm' => $_POST['firm'],
  							'date' => $_POST['date'],
  							'contract' => $_POST['contract'],
  							'fio' => $_POST['fio'],
  							'post' => $_POST['post'],
                'email' => $_POST['email'],
                'tel' => $_POST['tel'],
                'count' => $_POST['count'],
                'done' => false
					 		  );

file_put_contents("data.txt", json_encode($read, JSON_UNESCAPED_UNICODE));
//echo json_encode($read);
//echo file_get_contents("data.txt");
echo "Заявка получена";
//==================================================================================================

?>
