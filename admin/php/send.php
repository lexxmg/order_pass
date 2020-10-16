<?php
//header('Access-Control-Allow-Origin: *');


if ( $_SERVER['REMOTE_ADDR'] == '185.35.160.71' ) {
	require '../../PHPMailer/PHPMailerAutoload.php';

	$mailAdmin = new PHPMailer;

	//$mailAdmin->setFrom('propusk@stalco.ru', 'Mailer');
	$mailAdmin->isSMTP();
	$mailAdmin->CharSet = "UTF-8";
	//$mailAdmin->SMTPDebug = SMTP::DEBUG_SERVER;
  $mailAdmin->Host = 'smtp.gmail.com';
  $mailAdmin->SMTPAuth   = true;
  $mailAdmin->Username   = '@gmail.com';
  $mailAdmin->Password   = 's';
  $mailAdmin->Port = 587;
  $mailAdmin->SMTPSecure = 'tls';
  $mailAdmin->setFrom("propusk.stalco@gmail.com", "ПРОПУСК"); // От кого отправлять
	//$mailAdmin->addReplyTo("lexx.mg@gmail.com", "Имя lexx"); // Кому отвечать

	$read = json_decode(file_get_contents("data.txt"), true);

	for ($i = 0; $i < count($read); $i++) {
		if ($read[$i]['firm'] == $_GET['firm'] && $read[$i]['dat'] == $_GET['dat']) {
			//echo $read[$i]['email'];

			try {
				$mailAdmin->addAddress($read[$i]['email'], $read[$i]['fio']);
		    $mailAdmin->isHTML(true);//HTML формат
		    $mailAdmin->Subject = "Пропуска готовы";
		    $mailAdmin->Body    = "Уважаемый арендатор!<br><br>
		    											 Заявка на электронные карты-пропуска в количестве {$read[$i]['count']} шт. исполнена.<br>
		    											 Забрать пропуска можете в секретариате администрации.<br><br>
		    											 <b>Для электронных карт-пропусков требуется активация.</b><br>
		    											 Отправить заявку на активацию, блокировку, замену карты-пропуска можно на сайте:<br>
		    											 <a href='http://propusk.stalco.ru' target='_blank'>www.propusk.stalco.ru</a><br><br>
		    											 <b>По возникшим вопросам обращайтесь:</b><br>
                               Тел:<a style='margin-left: 5px; text-decoration: none' href='tel:84996415641'>+7(499) 641-5-641</a>,
                               		 <a style='margin-left: 5px; text-decoration: none' href='tel:84996415601'>+7(499) 641-56-01</a><br>
                               e-mail:<a style='margin-left: 5px; text-decoration: none' href='mailto:propusk.stalco@gmail.com'>propusk.stalco@gmail.com</a>";

				$mailAdmin->AltBody = "Пропуска, в колличестве {$read[$i]['count']} шт. готовы"; //Альтернативное сообщение
		    $mailAdmin->send();

				echo "Сообщение отправлено";
		  } catch (Exception $e) {
		    echo "Ошибка отправки: {$mailAdmin->ErrorInfo}";
		  }
		}
	}
} else {
	echo "err";
}
?>
