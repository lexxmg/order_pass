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
  $mailAdmin->Username   = 'propusk.stalco@gmail.com';
  $mailAdmin->Password   = 's';
  $mailAdmin->Port = 587;
  $mailAdmin->SMTPSecure = 'tls';
  $mailAdmin->setFrom("propusk.stalco@gmail.com", "ПРОПУСК"); // От кого отправлять
	//$mailAdmin->addReplyTo("lexx.mg@gmail.com", "Имя lexx"); // Кому отвечать

	$read = json_decode(file_get_contents("data.txt"), true);

	for ($i = 0; $i < count($read); $i++) {
		if ($read[$i]['firm'] == $_GET['firm']) {
			//echo $read[$i]['email'];

			try {
				$mailAdmin->addAddress($read[$i]['email'], $read[$i]['fio']);
		    $mailAdmin->isHTML(true);//HTML формат
		    $mailAdmin->Subject = "Пропуска заблокированы";
		    $mailAdmin->Body    = "Уважаемый арендатор!<br><br>
		    											 Ваши пропуска были заблокированы по инициативе арендодателя.<br>
		    											 Приносим свои извинения за предоставленные неудобства.<br>
															 По вопросу разблокировки обратитесь к Байрамовой Галине Олеговне,<br>
															 лично или по телефону <a style='text-decoration: none' href='tel:84952340752'>+7(495) 234-07-52</a> (доб. 1046).<br><br>

		    											 <b>По возникшим вопросам обращайтесь:</b><br>
                               Тел:<a style='margin-left: 5px; text-decoration: none' href='tel:84996415641'>+7(499) 641-5-641</a>,
                               		 <a style='margin-left: 5px; text-decoration: none' href='tel:84996415601'>+7(499) 641-56-01</a><br>
                               e-mail:<a style='margin-left: 5px; text-decoration: none' href='mailto:propusk.stalco@gmail.com'>propusk.stalco@gmail.com</a>";

				$mailAdmin->AltBody = "Пропуска заблокированы"; //Альтернативное сообщение
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
