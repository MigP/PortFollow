<?php
    $url='localhost';
    $username='root';
    $password='valdinho74';
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $conn=mysqli_connect($url,$username,$password,"exchange");
    if(!$conn){
        die('Could not Connect My Sql:' .mysql_error());
    }
?>