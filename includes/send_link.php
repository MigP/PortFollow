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
  if (isset($_POST['submit_email']) && $_POST['email']) {
    $email = $_POST['email'];
    $sql=mysqli_query($conn,"SELECT * FROM users where email='$email'");
    $row  = mysqli_fetch_array($sql);
    if (is_array($row)) {
      // Send email with reset instructions
      $code = $row['code'];
      $link= "http://exchange.miguelpinto.dx.am/includes/reset.php?id=".$email."&code=".$code;
      if ($visitorlang = "en") {
        $message = "Password reset";
        $subject="PortFollow - Password reset - DO NOT REPLY";
        $body="Please click on the link below to reset your password.\n\n".$link;
        $headers = "From:".$from;
      } elseif ($visitorlang = "fr") {
        $message = "Réinitialisation du mot de passe";
        $subject="PortFollow - Réinitialisation du mot de passe - NE PAS RÉPONDRE";
        $body="Veuillez cliquer sur le lien ci-dessous pour réinitialiser votre mot de passe.\n\n".$link;
        $headers = "De:".$from;
      } elseif ($visitorlang = "es") {
        $message = "Restablecimiento de contraseña";
        $subject="PortFollow - Restablecimiento de contraseña - NO RESPONDER";
        $body="Por favor, haga clic en el enlace de abajo para restablecer su contraseña.\n\n".$link;
        $headers = "Desde:".$from;
      } elseif ($visitorlang = "de_DE") {
        $message = "Passwort zurücksetzen";
        $subject="PortFollow - Passwort zurücksetzen - ANTWORTEN SIE NICHT";
        $body="Bitte klicken Sie auf den unten stehenden Link, um Ihr Passwort zurückzusetzen.\n\n".$link;
        $headers = "Aus:".$from;
      } elseif ($visitorlang = "br") {
        $message = "Redefinição de senha";
        $subject="PortFollow - Redefinição de senha - NÃO RESPONDA";
        $body="Por favor, clique no link abaixo para redefinir sua senha.\n\n".$link;
        $headers = "De:".$from;
      } elseif ($visitorlang = "ru") {
        $message = "Сброс пароля";
        $subject="PortFollow - Сброс пароля - НЕ ОТВЕЧАЙ";
        $body="Пожалуйста, нажмите на ссылку ниже, чтобы сбросить пароль.\n\n".$link;
        $headers = "От:".$from;
      }
      $to=$email;
      $from = "contact@miguelpinto.dx.am";
      mail($to,$subject,$body,$headers);
    } else {
        // Invalid username
        header ("Location: reset_pass.php?invalid");
    } 
?>