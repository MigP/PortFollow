<?php
  session_start();
  include 'includes/functions.php';
  if(isset($_SESSION["visitorlang"])) {
    $visitorlang = sanitise($_SESSION['visitorlang']);
  } else {
    $_SESSION['visitorlang'] = "en";
    $visitorlang = "en";
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <link id="favicon" rel="shortcut icon" href="images/logo.png">
  <link href="css/bootstrap.min.css" rel="stylesheet">
  <link href="css/styles.css" rel="stylesheet">
  <meta charset="utf-8">
  <meta name="description" content="Easily keep track of your portfolio of commodities">
  <meta name="author" content="Miguel Pinto">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PortFollow</title>
  <script src="js/jquery-3.6.0.min.js"></script><script src="js/knockout-3.5.1.js"></script>  
  <script src="js/funcs.js"></script>
  <script type="text/javascript">
    $(document).ready(function() {
      var visitorLang = document.getElementById('hidden').innerHTML;
      preferences[0] = visitorLang;
      document.getElementById('visitorlan-sel').value = visitorLang;
      $('#visitorlan-sel').change(function(){
        $vl = document.getElementById('visitorlan-sel').value;
        $.ajax({
          type: "POST",
          url: 'includes/update_db.php',
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
        <form action="includes/loginProcess.php" method="post" enctype="multipart/form-data" onsubmit="return validateLogin();">
          <p class="hint-text" data-bind="text: pleaseEnterYourDetails"></p>
          <div class="form-group">
            <img src="images/icons/envelope.svg" data-bind="attr: {alt: email}" width="25" height="25" style="margin-right: 5px;">
            <input type="email" class="form-control" name="email" data-bind="attr: {placeholder: email}" required="required" id="email" onChange="formSubmitSafetyValidator(this)" onKeyup="formSubmitSafetyValidator(this)">
          </div>
          <div class="form-group">
            <img src="images/icons/lock.svg" data-bind="attr: {alt: password}" width="25" height="25" style="margin-right: 5px;">
            <input type="password" class="form-control" name="pass" data-bind="attr: {placeholder: password}" required="required" id="pass" onChange="formSubmitSafetyValidator(this)" onKeyup="formSubmitSafetyValidator(this)">
          </div>
          <div class="form-group">
            <button type="submit" name="save" class="form_button btn btn-success btn-lg btn-block" data-bind="text: login"></button>
          </div>
          <div class="text-center"><a class="form_link" href="includes/register.php" data-bind="text: createAccount"></a></div>
          <div class="text-center"><a class="form_link" href="includes/reset_pass.php" data-bind="text: forgotPassword"></a></div>
        </form>
      </div>
    </div>
    <div class="row">
        <?php
        echo "<p id='error_para'>";
          if(isset($_GET["invalid"])) {
            echo "<span data-bind='text: invalidEmailOrPassword'></span>";
          } else if(isset($_GET["verified"])) {
            echo "<span data-bind='text: emailVerified'></span>";
          } else if(isset($_GET["updated"])) {
            echo "<span data-bind='text: passwordReset'></span>";
          } else {
            echo "<br>";
          }
          echo "</p>";
          echo "<div id='hidden' style='display: none;'>";
          echo $visitorlang;
          echo "</div>";
        ?>
      
    </div>
  </div>
</body>
</html>