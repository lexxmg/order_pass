<?php

//======================================= пишем GET запросы в лог ==================================

//header('Access-Control-Allow-Origin: *');
//header('Content-Type: text/html; charset=UTF-8');
if ($_POST['key'] == 'passs') {
  $dat = date('d-m-Y H:i');
  $read = json_decode(file_get_contents("admin/php/data.txt"), true);
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

  file_put_contents("admin/php/data.txt", json_encode($read, JSON_UNESCAPED_UNICODE));
  //echo json_encode($read);
  //echo file_get_contents("data.txt");
  echo "ok";

  $token = "";
  $chat_id = "";

  $arr = array(
    'Фирма: ' => $_POST['firm'],
    'Количество пропусков: ' => $_POST['count']
  );

  foreach($arr as $key => $value) {
    $txt .= "<b>".$key."</b> ".$value."%0A";
  };

  $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

} else {
  echo "err";
}

//==================================================================================================

?>
