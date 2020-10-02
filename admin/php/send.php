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
  $mailAdmin->Username   = 'test@gmail.com';
  $mailAdmin->Password   = 'pass';
  $mailAdmin->Port = 587;
  $mailAdmin->setFrom("test@gmail.com", "ТЕЛЕКОМПРОЕКТ"); // От кого отправлять
	$mailAdmin->addReplyTo("test@gmail.com", "Имя lexx"); // Кому отвечать

	$read = json_decode(file_get_contents("data.txt"), true);

	for ($i = 0; $i < count($read); $i++) {
		if ($read[$i]['firm'] == $_GET['firm'] && $read[$i]['dat'] == $_GET['dat']) {
      echo $read[$i]['email'];

			try {
				$mailAdmin->addAddress($read[$i]['email'], $read[$i]['fio']);
		    $mailAdmin->isHTML(true);//HTML формат
		    $mailAdmin->Subject = "Пропуска готовы";
		    $mailAdmin->Body    = "Пропуска, в колличестве {$read[$i]['count']} шт.<br>
																готовы";

				$mailAdmin->AltBody = "Альтернативное содержание сообщения";
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
