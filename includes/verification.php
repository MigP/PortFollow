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
	if(isset($_GET["email"])) {
        $email = sanitise($_GET["email"]);
		$code=substr(md5(mt_rand()),0,15);

	    // Store code in users
        $query="UPDATE users SET code = '$code' WHERE email = '$email'";
        $sql=mysqli_query($conn,$query) or die ("Could not add code to users");

		// Send email with link
		$link= "http://exchange.miguelpinto.dx.am/includes/verification.php?id=".$email."&code=".$code;
	    if ($visitorlang = "en") {
	    	$message = "Your Activation Code is ".$code;
	    	$subject="PortFollow - Activation code - DO NOT REPLY";
			$body="Your Activation Code is ".$code."\nPlease click on the link below to activate your account.\n\n".$link;
			$headers = "From:".$from;
	    } elseif ($visitorlang = "fr") {
	    	$message = "Votre code d'activation est ".$code;
	    	$subject="PortFollow - Code d'activation - NE PAS RÉPONDRE";
			$body="Votre code d'activation est ".$code."\nVeuillez cliquer sur le lien ci-dessous pour activer votre compte.\n\n".$link;
			$headers = "De:".$from;
	    } elseif ($visitorlang = "es") {
	    	$message = "Su código de activación es ".$code;
	    	$subject="PortFollow - Código de activación - NO RESPONDER";
			$body="Su código de activación es ".$code."\nPor favor, haga clic en el enlace de abajo para activar su cuenta.\n\n".$link;
			$headers = "Desde:".$from;
	    } elseif ($visitorlang = "de_DE") {
	    	$message = "Ihr Aktivierungscode ist ".$code;
	    	$subject="PortFollow - Aktivierungscode - ANTWORTEN SIE NICHT";
			$body="Ihr Aktivierungscode ist ".$code."\nBitte klicken Sie auf den unten stehenden Link, um Ihr Konto zu aktivieren.\n\n".$link;
			$headers = "Aus:".$from;
	    } elseif ($visitorlang = "br") {
	    	$message = "O seu código de ativação é ".$code;
	    	$subject="PortFollow - Código de ativação - NÃO RESPONDA";
			$body="O seu código de ativação é ".$code."\nClique no link abaixo para ativar sua conta.\n\n".$link;
			$headers = "De:".$from;
	    } elseif ($visitorlang = "ru") {
	    	$message = "Ваш код активации ".$code;
	    	$subject="PortFollow - Код активации - НЕ ОТВЕЧАЙ";
			$body="Ваш код активации ".$code."\nПожалуйста, нажмите на ссылку ниже, чтобы активировать свою учетную запись.\n\n".$link;
			$headers = "От:".$from;
	    }
		$to=$email;
		$from = "contact@miguelpinto.dx.am";
		mail($to,$subject,$body,$headers);
	} else {
		if(isset($_GET["id"]) && isset($_GET["code"])) {
	        // Fetch Db info
	        $email = sanitise($_GET["id"]);
	        $codeSent = sanitise($_GET["code"]);
		    $sql=mysqli_query($conn,"SELECT * FROM users WHERE email = '$email'");
		    $row  = mysqli_fetch_array($sql);
		    if (is_array($row)) {
		    	$code = $row['code'];

		    	// Compare codes
		    	if ($codeSent === $code) {
		    		// Store verified in Db
					$verified="1";
			        $query="UPDATE users SET verified = '1' WHERE email = '$email'";
			        $sql=mysqli_query($conn,$query) or die ("Could not update verified in users");

		    		header ("Location: ../login.php?verified");
		    	} else {
		    		header ("Location: register.php?unverified");
		    	}
		    } else {
		        // Invalid username
		        echo "Invalid username";
		    }
		}
	}
?>