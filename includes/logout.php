<?php
    session_start();
    unset($_SESSION["email"]);
    unset($_SESSION["first_name"]);
    unset($_SESSION["last_name"]);
    unset($_SESSION["personID"]);
    header("Location:../login.php");
?>