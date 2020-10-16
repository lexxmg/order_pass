<?php
require 'PHPMailer/PHPMailerAutoload.php';

$mailAdmin = new PHPMailer;
$mailUser = new PHPMailer;

$mailAdmin->setFrom('propusk@stalco.ru', 'Mailer');
$mailAdmin->addAddress('4996415641@mail.ru', 'User');
//$mailAdmin->clearAddresses();
//$mailAdminer->AddBCC('lexx.mg@yandex.ru'); //Добавляет адрес кому отправится скрытая копия
//$mailAdmin->addAddress('lexx.mg@yandex.ru', 'User');

$mailUser->isSMTP();
$mailUser->CharSet = "UTF-8";
//$mailAdmin->SMTPDebug = SMTP::DEBUG_SERVER;
$mailUser->Host = 'smtp.gmail.com';
$mailUser->SMTPAuth   = true;
$mailUser->Username   = '@gmail.com';
$mailUser->Password   = 's';
$mailUser->Port = 587;
$mailUser->SMTPSecure = 'tls';
$mailUser->setFrom("propusk.stalco@gmail.com", "ПРОПУСК"); // От кого отправлять

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

  //____________Отправка почты_________________________________________________
    try {
      $mailAdmin->CharSet = "UTF-8";
      //$mailAdmin->SMTPDebug = SMTP::DEBUG_SERVER;
      //$mailAdmin->isSMTP();
      $mailAdmin->isHTML(true);//HTML формат
      $mailAdmin->Subject = "Новый пропуск";
      $mailAdmin->Body    = "Название компании: {$_POST['firm']}<br>
                             Колличество пропусков: {$_POST['count']}<br><br>
                             <b>Кнтакты:</b><br>
                             ФИО: {$_POST['fio']}<br>
                             Должность: {$_POST['post']}<br>
                             Email: {$_POST['email']}<br>
                             Телефон: {$_POST['tel']}";
      $mailAdmin->AltBody = "Альтернативное содержание сообщения";
      $mailAdmin->send();
      //echo "Сообщение отправлено";


    } catch (Exception $e) {
      //echo "Ошибка отправки: {$mailAdmin->ErrorInfo}";
    }

    try {
          $mailUser->addAddress($_POST['email'], $_POST['fio']);
          $mailUser->isHTML(true);//HTML формат
          $mailUser->Subject = "Заявка получена";
          $mailUser->Body    = "Уважаемый арендатор!<br><br>
                                 Ваша заявка на электронные карты-пропуска в количестве {$_POST['count']} шт. принята.<br>
                                 Информация о готовности пропусков поступит на Ваш адрес электронной почты.<br><br>
                                 <b>По возникшим вопросам обращайтесь:</b><br>
                                 Тел:<a style='margin-left: 5px; text-decoration: none' href='tel:84996415641'>+7(499) 641-5-641</a>,
                                 		 <a style='margin-left: 5px; text-decoration: none' href='tel:84996415601'>+7(499) 641-56-01</a><br>
                                 e-mail:<a style='margin-left: 5px; text-decoration: none' href='mailto:propusk.stalco@gmail.com'>propusk.stalco@gmail.com</a>";

          $mailUser->AltBody = "Ваша заявка на электронные карты-пропуска в количестве {$_POST['count']} шт. принята."; //Альтернативное сообщение
          $mailUser->send();

          //echo "Сообщение отправлено";
        } catch (Exception $e) {
          //echo "Ошибка отправки: {$mailAdmin->ErrorInfo}";
        }
  //____________________________________________________________________________


} else {
  echo "err";
}

//==================================================================================================

?>
