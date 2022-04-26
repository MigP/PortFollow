<?php
  session_start();
  include 'database.php';
  include 'functions.php';
  if(isset($_GET['email']) && isset($_GET['code'])) {
    if($_GET['email'] && $_GET['code']) {
      $email=$_GET['email'];
      $code=$_GET['code'];
      $sql=mysqli_query($conn,"SELECT * FROM users where email='$email' AND code='$code'");
      $row  = mysqli_fetch_array($sql);
      if (is_array($row)) {
        // Form for password reset

      } else {
        // Invalid credentials
        header ("Location: reset_pass.php?error");
      } 
    }
    if(isset($_SESSION["visitorlang"])) {
      $visitorlang = sanitise($_SESSION['visitorlang']);
    } else {
      $_SESSION['visitorlang'] = "en";
      $visitorlang = "en";
    }
  } else {
        // Invalid credentials
        header ("Location: reset_pass.php?error");
      }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <link id="favicon" rel="shortcut icon" href="../images/logo.png">
  <link href="../css/bootstrap.min.css" rel="stylesheet">
  <link href="../css/styles.css" rel="stylesheet">
  <meta charset="utf-8">
  <meta name="description" content="Easily keep track of your portfolio of commodities">
  <meta name="author" content="Miguel Pinto">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PortFollow</title>
  <script src="../js/jquery-3.6.0.min.js"></script>
  <script src="../js/knockout-3.5.1.js"></script>  
  <script src="../js/funcs.js"></script>
  <script type="text/javascript">
    $(document).ready(function() {
      var visitorLang = document.getElementById('hidden').innerHTML;
      preferences[0] = visitorLang;
      document.getElementById('visitorlan-sel').value = visitorLang;
      $('#visitorlan-sel').change(function(){
        $vl = document.getElementById('visitorlan-sel').value;
        $.ajax({
          type: "POST",
          url: 'update_db.php',
          data: {visitlang: $vl},
          success: function () {
            location.reload();
          }
        });
      })

      // Initialise Ko ViewModel
        ko.applyBindings(new AppViewModel());
        });
  </script>
</head>
<body class="d-flex align-items-center">
  <div class="lang-sel">
    <div>
      <label name='language' id='language' class='lang-label' data-bind='text: changeTheLanguage'></label>
    </div>
    <div>
      <select id = 'visitorlan-sel' style='height: 2em'>
        <option value='en'>English</option>
        <option value='fr'>Français</option>
        <option value='es'>Español</option>
        <option value='de_DE'>Deutsch</option>
        <option value='br'>Português</option>
        <option value='ru'>Русский</option>
      </select>
    </div>
  </div>
  <div class="login_forms container p-4">
    <div class="row" style="margin: auto;">
      <div class="col">
        <form action="submit_new.php" method="post" enctype="multipart/form-data" onsubmit="return validateReset();">
          <div class="hint-text" data-bind="text: pwReset"></div>
          <p class="hint-text" data-bind="text: enterYourNewPassword"></p>
          <div class="form-group">
            <img src="../images/icons/lock.svg" data-bind="attr: {alt: password}" width="25" height="25" style="margin-right: 5px;">
            <input type="password" class="form-control" name='pass' data-bind="attr: {placeholder: constrainedPassword}" required="required" minlength="8" maxlength="50" id="pass" onChange="formSubmitSafetyValidator(this)" onKeyup="formSubmitSafetyValidator(this)">
          </div>
          <p class="hint-text" data-bind="text: confirmPassword"></p>
          <div class="form-group">
            <img src="../images/icons/lock.svg" data-bind="attr: {alt: confirmPassword}" width="25" height="25" style="margin-right: 5px;">
            <input type="password" class="form-control" name="cpass" data-bind="attr: {placeholder: confirmPassword}" required="required" minlength="8" maxlength="50" id="cpass" onChange="formSubmitSafetyValidator(this)" onKeyup="formSubmitSafetyValidator(this)">
          </div>
          <div class="form-group">
              <button type="submit" name="save" class="form_button btn btn-success btn-lg btn-block" data-bind="text: reset"></button>
          </div>
          <div class="text-center"><a class="form_link" href="register.php" data-bind="text: createAccount"></a></div>
          <div class="text-center"><a class="form_link" href="../login.php" data-bind="text: alreadyRegistered"></a></div>

        </form>
      </div>
    </div>
  </div>
  <?php
    echo "<div id='hidden' style='display: none;'>";
    echo $visitorlang;
    echo "</div>";
  ?>
</body>
</html>