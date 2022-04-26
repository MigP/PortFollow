<?php
    if(isset($_POST['save'])) {
        extract($_POST);
        include 'database.php';
        include 'functions.php';

        $first_name = sanitise($first_name);
        $last_name = sanitise($last_name);
        $email = sanitise($email);
        $pass = sanitise($pass);

        $sql=mysqli_query($conn,"SELECT * FROM users where email='$email'");
        if (mysqli_num_rows($sql)>0) {
            header ("Location: register.php?duplicate"); 
            exit;
        } else {
            if (isset($_POST['save'])) {
                // Add new entry to users
                $query="INSERT INTO users (first_name, last_name, email, password) VALUES ('$first_name', '$last_name', '$email', '$pass')";
                $sql=mysqli_query($conn,$query) or die ("Could not add to users");
                
                $sql=mysqli_query($conn,"SELECT * FROM users where email='$email'");
                $row  = mysqli_fetch_array($sql);

                if (is_array($row)) {
                    $id = $row['id'];
                    //Add entry to prefs
                    $query="INSERT INTO prefs (personID) VALUES ('$id')";
                    $sql=mysqli_query($conn,$query) or die ("Could not add to prefs");
                } else {
                    // Invalid username
                    echo "Invalid user";
                }

                header ("Location: verification.php?email=".$email);
            }
        }
    }
?>