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
    if(isset($_POST['lang'])) {
        extract($_POST);

		$lang = $_POST['lang'];
		$email = sanitise($_SESSION["email"]);

	    $sql=mysqli_query($conn,"SELECT * FROM users WHERE email = '$email'");
	    $row  = mysqli_fetch_array($sql);

	    $id = $row['id'];

		$query = "UPDATE prefs SET language='$lang' WHERE personID = '$id'";
		
		if ($conn->query($query) === TRUE) {
		    echo "New record updated successfully";
                    $_SESSION["visitorlang"] = $lang;
		} else {
		    echo "Error: " . $query . "<br>" . $conn->error;
		}
	} elseif(isset($_POST['curr'])) {
        extract($_POST);

		$curr = sanitise($_POST['curr']);
		$email = sanitise($_SESSION["email"]);

	    $sql=mysqli_query($conn,"SELECT * FROM users WHERE email = '$email'");
	    $row  = mysqli_fetch_array($sql);

	    $id = $row['id'];

		$query = "UPDATE prefs SET currency='$curr' WHERE personID = '$id'";

		if ($conn->query($query) === TRUE) {
		    echo "New record updated successfully";
		} else {
		    echo "Error: " . $query . "<br>" . $conn->error;
		}
	} elseif(isset($_POST['time'])) {
        extract($_POST);

		$time = sanitise($_POST['time']);
		$email = sanitise($_SESSION["email"]);

	    $sql=mysqli_query($conn,"SELECT * FROM users WHERE email = '$email'");
	    $row  = mysqli_fetch_array($sql);

	    $id = $row['id'];

		$query = "UPDATE prefs SET timezone='$time' WHERE personID = '$id'";

		if ($conn->query($query) === TRUE) {
		    echo "New record updated successfully";
		} else {
		    echo "Error: " . $query . "<br>" . $conn->error;
		}
	} elseif(isset($_POST['fname']) && isset($_POST['lname'])) {
        extract($_POST);

		$fname = sanitise($_POST['fname']);
		$lname = sanitise($_POST['lname']);
		$email = sanitise($_SESSION["email"]);

		$query = "UPDATE users SET first_name='$fname' WHERE email = '$email'";

		if ($conn->query($query) === TRUE) {
		    echo "New record updated successfully";
                    $_SESSION["first_name"] = $fname;
		} else {
		    echo "Error: " . $query . "<br>" . $conn->error;
		}

		$query2 = "UPDATE users SET last_name='$lname' WHERE email = '$email'";

		if ($conn->query($query2) === TRUE) {
		    echo "New record updated successfully";
                    $_SESSION["last_name"] = $lname;
		} else {
		    echo "Error: " . $query2 . "<br>" . $conn->error;
		}
	} elseif(isset($_POST['delacc'])) {

		$email = sanitise($_SESSION["email"]);

	    $sql=mysqli_query($conn,"SELECT * FROM users WHERE email = '$email'");
	    $row  = mysqli_fetch_array($sql);

	    $code = $row['code'];

		// Send email with reset instructions
			$to=$email;
			$from = "contact@miguelpinto.dx.am";
			$link= "http://portfollow.miguelpinto.dx.am/includes/delete_account.php?email=".$email."&code=".$code;
		    if ($visitorlang = "en") {
				$message = "Delete account";
				$subject="PortFollow - Delete account - DO NOT REPLY";
				$body="Please click on the link below to delete your account.\n\n".$link;
				$headers = "From:".$from;
		    } elseif ($visitorlang = "fr") {
				$message = "Supprimer le compte";
				$subject="PortFollow - Supprimer le compte - NE PAS RÉPONDRE";
				$body="Veuillez cliquer sur le lien ci-dessous pour supprimer votre compte.\n\n".$link;
				$headers = "De:".$from;
		    } elseif ($visitorlang = "es") {
				$message = "Eliminar cuenta";
				$subject="PortFollow - Eliminar cuenta - NO RESPONDER";
				$body="Haga clic en el enlace a continuación para eliminar su cuenta.\n\n".$link;
				$headers = "Desde:".$from;
		    } elseif ($visitorlang = "de_DE") {
				$message = "Konto löschen";
				$subject="PortFollow - Konto löschen - ANTWORTEN SIE NICHT";
				$body="Bitte klicken Sie auf den unten stehenden Link, um Ihr Konto zu löschen.\n\n".$link;
				$headers = "Aus:".$from;
		    } elseif ($visitorlang = "br") {
				$message = "Apagar conta";
				$subject="PortFollow - Apagar conta - NÃO RESPONDA";
				$body="Por favor, clique no link abaixo para excluir sua conta.\n\n".$link;
				$headers = "De:".$from;
		    } elseif ($visitorlang = "ru") {
				$message = "Удалить аккаунт";
				$subject="PortFollow - Удалить аккаунт - НЕ ОТВЕЧАЙ";
				$body="Пожалуйста, нажмите на ссылку ниже, чтобы удалить свою учетную запись.\n\n".$link;
				$headers = "От:".$from;
		    }

		mail($to,$subject,$body,$headers);
	} elseif(isset($_POST['del']) && isset($_POST['id'])) {
                extract($_POST);

		$transaction_id = sanitise($_POST['id']);
		$del = sanitise($_POST['del']);
		$email = sanitise($_SESSION["email"]);

	    $sql=mysqli_query($conn,"SELECT * FROM users WHERE email = '$email'");
	    $row  = mysqli_fetch_array($sql);

	    $person_id = $row['id'];

		if ($del == '1') {
	    	// Delete transaction entry from assets
			$query = "DELETE FROM assets WHERE id='$transaction_id' AND personID='$person_id'";
			if ($conn->query($query) === TRUE) {
				echo "Record deleted successfully from assets";
			} else {
				echo "Error deleting record from assets: " . $conn->error;
			}
		} elseif ($del == '2') {
	    	// Delete all transaction entries from assets
			$query = "DELETE FROM assets WHERE personID='$person_id'";
			if ($conn->query($query) === TRUE) {
				echo "Records deleted successfully from assets";
			} else {
				echo "Error deleting records from assets: " . $conn->error;
			}
		} elseif ($del == '3') {
			$asset = sanitise($_POST['asset']);
			$amount = sanitise($_POST['amount']);
			$value = sanitise($_POST['value']);
			$type = sanitise($_POST['type']);

	    	// Update transaction in assets
	    	$query = "UPDATE assets SET amount='$amount', value_eur='$value', type='$type' WHERE id='$transaction_id' AND personID='$person_id'";

			if ($conn->query($query) === TRUE) {
				echo "Records updated successfully in assets";
			} else {
				echo "Error updating records in assets: " . $conn->error;
			}
		} elseif ($del == '4') {
			$asset = sanitise($_POST['asset']);
			$amount = sanitise($_POST['amount']);
			$value = sanitise($_POST['value']);
			$type = sanitise($_POST['type']);

	    	// Insert new transaction entry in assets
	    	$query = "INSERT INTO assets (asset, amount, value_eur, personID, type) VALUES ('$asset', '$amount', '$value', '$person_id', '$type')";

			if ($conn->query($query) === TRUE) {
				echo "Record created successfully in assets";
			} else {
				echo "Error creating record in assets: " . $conn->error;
			}
		}
	} elseif(isset($_POST['get_data'])) {
		$email = sanitise($_SESSION["email"]);

		$usersQuery=mysqli_query($conn,"SELECT * FROM users WHERE email = '$email'");
		$usersRow  = mysqli_fetch_array($usersQuery);

		$id = $usersRow['id'];
		$assetsQuery=mysqli_query($conn,"SELECT * FROM assets WHERE personID = '$id'");

		if ($assetsQuery->num_rows > 0) {
			echo "<div id='assets'>";
			while($assetsRow = $assetsQuery->fetch_assoc()) {
				echo "<div>";
				echo $assetsRow["id"];
				echo "</div>";
				echo "<div>";
				echo $assetsRow["asset"];
				echo "</div>";
				echo "<div>";
				echo $assetsRow["amount"];
				echo "</div>";
				echo "<div>";
				echo $assetsRow["value_eur"];
				echo "</div>";
				echo "<div>";
				echo $assetsRow["type"];
				echo "</div>";
			}
			echo "</div>";
		}
	} elseif(isset($_POST['assetlist'])) {
                extract($_POST);

                $assetlist = sanitise($_POST['assetlist']);
		$email = sanitise($_SESSION["email"]);

	    $sql=mysqli_query($conn,"SELECT * FROM users WHERE email = '$email'");
	    $row  = mysqli_fetch_array($sql);

	    $id = $row['id'];

		$query = "UPDATE prefs SET assets_visible='$assetlist' WHERE personID = '$id'";

		if ($conn->query($query) === TRUE) {
		    echo "Record updated successfully";
		} else {
		    echo "Error: " . $query . "<br>" . $conn->error;
		}
	} elseif(isset($_POST['visitlang'])) {
                extract($_POST);

                $_SESSION["visitorlang"] = sanitise($_POST['visitlang']);
	}
?>
