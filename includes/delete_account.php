<?php
	include 'database.php';
	include 'functions.php';
	if (isset($_GET['email']) && $_GET['code']) {
	    $email = sanitise($_GET["email"]);
	    $code = sanitise($_GET["code"]);

	    $sql=mysqli_query($conn,"SELECT * FROM users where email='$email' && code='$code'");
	    $row  = mysqli_fetch_array($sql);
	    $id = $row['id'];

	    if (is_array($row)) {
	    	// Delete users entry
			$query = "DELETE FROM users WHERE email='$email'";
			if ($conn->query($query) === TRUE) {
				echo "Record deleted successfully from users";
			} else {
				echo "Error deleting record from users: " . $conn->error;
			}

	    	// Delete prefs entry
			$query = "DELETE FROM prefs WHERE personID='$id'";
			if ($conn->query($query) === TRUE) {
				echo "Record deleted successfully from prefs";
			} else {
				echo "Error deleting record from prefs: " . $conn->error;
			}

	    	// Delete assets entry
			$query = "DELETE FROM assets WHERE personID='$id'";
			if ($conn->query($query) === TRUE) {
				echo "Record deleted successfully from assets";
			} else {
				echo "Error deleting record from assets: " . $conn->error;
			}
			header ("Location: ../login.php");
	    } else {
	        // Invalid username
	        header ("Location: ../home.php");
	    }
	}
?>