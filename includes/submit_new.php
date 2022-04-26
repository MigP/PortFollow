<?php
 	session_start();
 	include 'database.php';
 	include 'functions.php';
	if(isset($_SESSION["visitorlang"])) {
		$visitorlang = sanitise($_SESSION['visitorlang']);
	} else {
		$_SESSION['visitorlang'] = "en";
		$visitorlang = "en";
	}
	if(isset($_POST['pass']) && $_POST['save'] && $_POST['email'] && $_POST['code']) {
		$email=$_POST['email'];
		$code=$_POST['code'];
		$pass=$_POST['pass'];
	    $sql=mysqli_query($conn,"SELECT * FROM users where email='$email' AND code='$code'");
	    $row  = mysqli_fetch_array($sql);
	    if (is_array($row)) {
			// Update password
	        $query="UPDATE users SET password = '$pass' WHERE email = '$email'";
	        $sql=mysqli_query($conn,$query) or die ("Could not alter password in users");

			// Send notification email
			$link= "http://exchange.miguelpinto.dx.am/includes/reset_pass.php";
		    if ($visitorlang = "en") {
		    	$message = "Your password has been changed";
		    	$subject="PortFollow - Your password has been changed - DO NOT REPLY";
				$body="Your password has been changed.\nIf that wasn't you please click on the link below to change your password.\n\n".$link;
				$headers = "From:".$from;
		    } elseif ($visitorlang = "fr") {
		    	$message = "Votre mot de passe a été changé";
		    	$subject="PortFollow - Votre mot de passe a été changé - NE PAS RÉPONDRE";
				$body="Votre mot de passe a été changé.\nSi ce n'était pas vous, veuillez cliquer sur le lien ci-dessous pour changer votre mot de passe.\n\n".$link;
				$headers = "De:".$from;
		    } elseif ($visitorlang = "es") {
		    	$message = "Su contraseña ha sido cambiada";
		    	$subject="PortFollow - Su contraseña ha sido cambiada - NO RESPONDER";
				$body="Su contraseña ha sido cambiada.\nSi no fue así, haga clic en el siguiente enlace para cambiar su contraseña.\n\n".$link;
				$headers = "Desde:".$from;
		    } elseif ($visitorlang = "de_DE") {
		    	$message = "Ihr Passwort wurde geändert";
		    	$subject="PortFollow - Ihr Passwort wurde geändert - ANTWORTEN SIE NICHT";
				$body="Ihr Passwort wurde geändert.\nWenn Sie das nicht waren, klicken Sie bitte auf den Link unten, um Ihr Passwort zu ändern.\n\n".$link;
				$headers = "Aus:".$from;
		    } elseif ($visitorlang = "br") {
		    	$message = "A sua senha foi mudada";
		    	$subject="PortFollow - A sua senha foi mudada - NÃO RESPONDA";
				$body="A sua senha foi mudada.\nSe não foi você, clique no link abaixo para alterar sua senha.\n\n".$link;
				$headers = "De:".$from;
		    } elseif ($visitorlang = "ru") {
		    	$message = "Ваш пароль был изменен";
		    	$subject="PortFollow - Ваш пароль был изменен - НЕ ОТВЕЧАЙ";
				$body="Ваш пароль был изменен.\nЕсли это были не вы, нажмите на ссылку ниже, чтобы изменить свой пароль.\n\n".$link;
				$headers = "От:".$from;
		    }
			$to=$email;
			$from = "contact@miguelpinto.dx.am";
			mail($to,$subject,$body,$headers);
			header ("Location: ../login.php?updated");
	    } else {
	      // Invalid credentials
	      header ("Location: reset_pass.php?error");
	    } 
	}
?>

