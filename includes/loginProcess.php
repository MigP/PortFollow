<?php
    session_start();
    if(isset($_POST['save'])) {
        extract($_POST);
        include 'database.php';
        include 'functions.php';

        $email = sanitise($_POST['email']);
        $pass = sanitise($_POST['pass']);
        
        $sql=mysqli_query($conn,"SELECT * FROM users where email='$email' and password='$pass'");
        $row  = mysqli_fetch_array($sql);
        if(is_array($row)) {
            // Check verification status
            $verified = $row['verified'];
            if ($verified == "1") {
                // Retrievd users data
                $_SESSION["first_name"] = $row['first_name'];
                $_SESSION["last_name"] = $row['last_name'];
                $_SESSION["email"] = $row['email'];
                $_SESSION["personID"] = $row['id'];
                header("Location: ../home.php");
            } else {
                header ("Location: register.php?unverified");
            }
        } else {
            // Invalid username
            echo "Invalid username";
        }
    } else {
        // Invalid email or password
        header("Location: ../login.php?invalid");
    }
?>