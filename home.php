 <?php
  include 'includes/database.php';
  include 'includes/functions.php';
  require_once 'includes/Mobile_Detect.php';
  $detect = new Mobile_Detect;
  session_start();
  if(isset($_SESSION["email"])) {
    $email = sanitise($_SESSION["email"]);
    $first_name = sanitise($_SESSION["first_name"]);
    $last_name = sanitise($_SESSION["last_name"]);
    $personID = sanitise($_SESSION["personID"]);
    $visitorlanguage = sanitise($_SESSION["visitorlang"]);

    $checkingPrefsQuery = mysqli_query($conn,"SELECT * FROM prefs WHERE personID = '$personID'");
    $checkingPrefsRow  = mysqli_fetch_array($checkingPrefsQuery);
    if ($visitorlanguage != $checkingPrefsRow["language"]) { // Check if languages match
      $_SESSION["visitorlang"] = $visitorlanguage;
      $query = "UPDATE prefs SET language='$visitorlanguage' WHERE personID = '$personID'";

      if ($conn->query($query) === TRUE) {
          //echo "New record updated successfully";
      } else {
          //echo "Error: " . $query . "<br>" . $conn->error;
      }
    }

    $assetsDbQuery = mysqli_query($conn,"SELECT * FROM assets WHERE personID = '$personID'");
    $assetCodeDbQuery = mysqli_query($conn,"SELECT * FROM asset_code ORDER BY asset_name");
    $prefsDbQuery = mysqli_query($conn,"SELECT * FROM prefs WHERE personID = '$personID'");

    $assetsDbRow  = mysqli_fetch_array($assetsDbQuery);
    $assetCodeDbRow  = mysqli_fetch_array($assetCodeDbQuery);
    $prefsDbRow  = mysqli_fetch_array($prefsDbQuery);

    if (strlen($prefsDbRow['assets_visible']) == 0) {
      $assetsDisplayed = [];
    } else {
      $assetsDisplayed = explode(',', $prefsDbRow['assets_visible']);
    }
    

  } else {
    header("Location:login.php");
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <link id="favicon" rel="shortcut icon" href="/images/logo.png">
  <link href="css/bootstrap.min.css" rel="stylesheet">
  <link href="css/styles.css" rel="stylesheet">
  <meta charset="utf-8">
  <meta name="description" content="Easily keep track of your portfolio of commodities">
  <meta name="author" content="Miguel Pinto">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PortFollow</title>
  <script src="js/jquery-3.6.0.min.js"></script>
  <script src="js/jquery-ui.min.js"></script>
  <script src="js/jquery.ui.touch-punch.min.js"></script>
  <script src="js/knockout-3.5.1.js"></script>  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
  <script src="js/gauge.min.js"></script>
  <script src="js/funcs.js"></script>
 </head>
<body>
  <!-- Popup -->  
    <div class="pop_up_parent d-flex align-items-center">
      <div class="pop_up login-forms">
        <div style="position: relative;">
          <div class="p-4" style='justify-content: center;display: flex;'>
            <h4 id="popup_message"></h4>
          </div>
        </div>
        <div id="popup_buttons" class="row" style="margin: auto;"></div>
      </div>
      <div class="pop_up_bg">
      </div>
    </div>

  <!-- Navigation -->
    <div class="nav-left" data-bind="attr: {title: assets}">
      <div class="left-menu-icons">
        <img src="images/icons/left.svg" data-bind="attr: {alt: leftMenu}" width="25" height="25">
        <img src="images/icons/burger.svg" data-bind="attr: {alt: leftMenu}" width="25" height="25">
      </div>
      <ul style='display: flex;flex-direction: column;align-items: center;overflow-y: auto;'>
        <li>
          <h3 data-bind="text: assets"></h3>
        </li>
        <br>
        <li id='asset_list' style='width: 75%;'></li>
        <div><br></div>
        <li id='add_items' style='width: 75%;display: flex;flex-direction: row;justify-content: space-between;'></li>
        <div><br></div>
        <li id='refresh' style='width: 75%;display: flex;flex-direction: row;justify-content: space-between;'>
          <button class="form_button btn btn-success btn-lg btn-block" onclick="updateAssetMenuDisplay()" data-bind="text: refreshDisplay"></button>
        </li>
      </ul>
    </div>
    <div class="nav-right">
      <div class="right-menu-icons" data-bind="attr: {title: settings}">
        <img src="images/icons/burger.svg" data-bind="attr: {alt: rightMenu}" width="25" height="25">
        <img src="images/icons/right.svg" data-bind="attr: {alt: rightMenu}" width="25" height="25">
      </div>
      <ul style='display: flex;flex-direction: column;overflow-y: auto;'>
        <li>
          <h3 data-bind="text: settings"></h3>
        </li>
        <br>
        <li>
          <img src="images/icons/help.svg" data-bind="attr: {alt: help}" width="15" height="15" style="margin-right: 5px;">
          <a class="menu-link" style="text-decoration: none;" target="_blank" href="https://github.com/MigP/PortFollow/blob/main/README.md" data-bind="text: help"></a>
        </li>
        <br>
        <li>
          <img src="images/icons/globe.svg" data-bind="attr: {alt: language}" width="15" height="15" style="margin-right: 5px;">
          <span class="menu-link" onClick="clickLanguage()" data-bind="text: language"></span>
        </li>
        <li>
          <img src="images/icons/clock.svg" data-bind="attr: {alt: timezone}" width="15" height="15" style="margin-right: 5px;">
          <span class="menu-link" onClick="clickTimezone()" data-bind="text: timezone"></span>
        </li>
        <li>
          <img src="images/icons/dollar.svg" data-bind="attr: {alt: currency}" width="15" height="15" style="margin-right: 5px;">
          <span class="menu-link" onClick="clickCurrency()" data-bind="text: currency"></span>
        </li>
        <li>
          <img src="images/icons/user.svg" data-bind="attr: {alt: changeName}" width="15" height="15" style="margin-right: 5px;">
          <span class="menu-link" onClick="clickName()" data-bind="text: changeName"></span>
        </li>
        <li>
          <img src="images/icons/list.svg" data-bind="attr: {alt: transactions}" width="15" height="15" style="margin-right: 5px;">
          <span class="menu-link" onClick="clickTransactions()" data-bind="text: transactions"></span>
        </li>
        <br><br><br><br>
        <li>
          <img src="images/icons/trash.svg" data-bind="attr: {alt: deleteAccount}" width="15" height="15" style="margin-right: 5px;">
          <span class="menu-link" onClick="clickDelete()" data-bind="text: deleteAccount"></span>
        </li>
        <li>
          <img src="images/icons/logout.svg" data-bind="attr: {alt: logout}" width="15" height="15" style="margin-right: 5px;">
          <span class="menu-link" onClick="clickLogout()" data-bind="text: logout"></span>
        </li>
      </ul>
    </div>

    <div class="d-flex flex-column align-items-center container main_body">
      <!-- Ticker -->
      <div class="row ticker">
        <div id="ticker_col" class="col">
          <?php
            if (count($assetsDisplayed) == 0) {
              echo "<h1>No assets displayed</h1>";
            } else {
              $stringVar = '<div class="tradingview-widget-container"><div class="tradingview-widget-container__widget"></div><div class="tradingview-widget-copyright"><a href="https://www.tradingview.com" rel="noopener" target="_blank"><span class="blue-text">Ticker Tape</span></a> by TradingView</div><script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js" async>{"symbols": [';
              for ($a = 0; $a < count($assetsDisplayed); $a++) {
                $tickerQuery = mysqli_query($conn,"SELECT * FROM asset_code WHERE asset_code = '$assetsDisplayed[$a]'");
                $tickerRow  = mysqli_fetch_array($tickerQuery);

                $currentCurrency = strtoupper($prefsDbRow["currency"]);
                $currentAssetCode = $tickerRow["asset_code"];
                $currentEurExchange = $tickerRow["exchange_eur"];
                $currentUsdExchange = $tickerRow["exchange_usd"];
                $currentLanguage = $prefsDbRow["language"];

                if ($a > 0) {
                  $stringVar = $stringVar . ',';
                }
                if ($prefsDbRow["currency"] == 'eur') {
                  $stringVar = $stringVar . '{"description": "' .  $currentAssetCode . '/' . $currentCurrency . '","proName": "' . $currentEurExchange . ':' .  $currentAssetCode . $currentCurrency . '"}';
                } else {
                  $stringVar = $stringVar . '{"description": "' .  $currentAssetCode . '/' . $currentCurrency . '","proName": "' . $currentUsdExchange . ':' .  $currentAssetCode . $currentCurrency . '"}';

                }
               }
              $stringVar = $stringVar . '],"showSymbolLogo": true,"colorTheme": "dark","isTransparent": false,"displayMode": "adaptive","locale": "' . $currentLanguage . '"}</script></div>';
              echo $stringVar;
            }
          ?>
        </div>
      </div>

      <!-- Headers -->
      <div class="row header">
        <div class="col">
          <p id="headerMessage" class="hint-text">
            <span data-bind="text: welcome"></span><span id="username"></span>
            <br>
            <span data-bind="text: yourInvested"></span><strong style='color: cornflowerblue;'><span id="invested-amount"></span></strong>
            <span data-bind="text: isNowWorth"></span><strong><span id="worth-amount"></span></strong><span data-bind="text: isNowWorthSuffix"></span>
          </p>
        </div>
      </div>

      <div class="row header">
        <div class="col gauge_container">
          <div class="col-7" style="justify-content: end;display: inline-flex;">
            <p id="fearAndGreed" class="hint-text">
              <span data-bind="text: currentFearIndex"></span><strong><span id="fear_index" data-bind="text: currentGreedAndFear"></span></strong>
            </p>
          </div>
          <div class="col-5" style="justify-content: start;display: inline-flex;padding-left: 3em;">
            <canvas id="gauge"></canvas>
          </div>
        </div>
      </div>
      
      <!-- Main section -->
      <div id="main_view" class="row main">
          <?php
            echo "<ul class='main-list'>";
            if (count($assetsDisplayed) > 0) {
              for ($a = 0; $a < count($assetsDisplayed); $a++) {
                $strToAdd = "";
                $mainItemQuery = mysqli_query($conn,"SELECT * FROM asset_code WHERE asset_code = '$assetsDisplayed[$a]'");
                $mainItemRow  = mysqli_fetch_array($mainItemQuery);

                $currentCurrency = strtoupper($prefsDbRow["currency"]);
                $currentAssetCode = $mainItemRow["asset_code"];
                $currentEurExchange = $mainItemRow["exchange_eur"];
                $currentUsdExchange = $mainItemRow["exchange_usd"];
                $currentLanguage = $prefsDbRow["language"];
                $currentTimezone = $prefsDbRow["timezone"];

                echo "<li class='main-list-item'>";
                  echo '<div class="main-list-item-section big-section">';
                    if ($detect->isMobile()) { // Mobile device
                      if ($currentCurrency == 'EUR') {
                        $exch = $currentEurExchange;
                      } else {
                        $exch = $currentUsdExchange;

                      }
                      $strToAdd = $strToAdd . '<div class="tradingview-widget-container"><div class="tradingview-widget-container__widget"></div><div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/' . $currentAssetCode . $currentCurrency . '/?exchange=' . $exch . '" rel="noopener" target="_blank"><span class="blue-text">' . $currentAssetCode . $currentCurrency . ' Rates</span></a> by TradingView</div><script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js" async>{"symbol": "' . $exch . ':' . $currentAssetCode . $currentCurrency . '","width": "100%","height": "100%","locale": "' . $currentLanguage . '","dateRange": "1D",  "colorTheme": "dark","trendLineColor": "rgba(41, 98, 255, 1)","underLineColor": "rgba(41, 98, 255, 0.3)","underLineBottomColor": "rgba(41, 98, 255, 0)","isTransparent": false,"autosize": true,"largeChartUrl": ""}</script></div>';
                      echo $strToAdd;
                    } else { // Not mobile device
                      if ($currentCurrency == 'EUR') {
                        $exch = $currentEurExchange;
                      } else {
                        $exch = $currentUsdExchange;

                      }
                      $strToAdd = $strToAdd . '<div class="tradingview-widget-container"><div class="trview" id="tradingview_' . $a . '"></div><script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script><script type="text/javascript">new TradingView.widget({"autosize": true,"symbol": "' . $exch . ':' . $currentAssetCode . $currentCurrency . '","interval": "5","timezone": "' . $currentTimezone . '","theme": "dark","style": "3","locale": "' . $currentLanguage . '","toolbar_bg": "#f1f3f6","enable_publishing": false,"hide_top_toolbar": true,"withdateranges": true,"hide_side_toolbar": false,"save_image": false,"container_id": "tradingview_' . $a . '"});</script></div>';
                      echo $strToAdd;
                    }
                  echo '</div>';
                  echo "<div class='main-list-item-section small-section' id='section_info_".$a."'></div>";
                  echo '<div class="main-list-item-section small-section" id="portfolio_chart_' . $a . '" data-bind="text: youDoNotOwnThisAsset"></div>';
                echo "</li>";
              }
            }
            echo "</ul>";
          ?>


      </div>
    </div>

  <!-- Hidden -->
    <div id="forex" style="display: none;">
      <div id="usdToEur"></div>
      <div id="eurToUsd"></div>
    </div>
    <div id="transBuy" data-bind="text: buy" style="display: none;"></div>
    <div id="transSell" data-bind="text: sell" style="display: none;"></div>
    <div id="transPortfolio" data-bind="text: trPortfolio" style="display: none;"></div>
    <div id="transCurrent" data-bind="text: trCurrent" style="display: none;"></div>
    <div id="transSale" data-bind="text: trSale" style="display: none;"></div>
    <div id="hidden" style="display: none;">
      <?php
        $assetsQuery = mysqli_query($conn,"SELECT * FROM assets WHERE personID = '$personID'");
        $assetCodeQuery = mysqli_query($conn,"SELECT * FROM asset_code ORDER BY asset_name");
        $prefsQuery = mysqli_query($conn,"SELECT * FROM prefs WHERE personID = '$personID'");
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
        echo "<div id='total_assets'>";
        while($assetCodeRow = $assetCodeQuery->fetch_array()) {
          echo "<div>";
          echo $assetCodeRow["asset_code"];
          echo "</div>";
          echo "<div>";
          echo $assetCodeRow["asset_name"];
          echo "</div>";
          echo "<div>";
          echo $assetCodeRow["exchange_eur"];
          echo "</div>";
          echo "<div>";
          echo $assetCodeRow["exchange_usd"];
          echo "</div>";
        }
        echo "</div>";
        echo "<div id='prefs'>";
        while($prefsRow = $prefsQuery->fetch_array()) {
          echo "<div>";
          echo $prefsRow["language"];
          echo "</div>";
          echo "<div>";
          echo $prefsRow["timezone"];
          echo "</div>";
          echo "<div>";
          echo $prefsRow["currency"];
          echo "</div>";
          echo "<div>";
          echo $prefsRow["assets_visible"];
          echo "</div>";
          echo "<div>";
          echo $first_name . " " . $last_name;
          echo "</div>";
        }
        echo "</div>";
      ?>
    </div>
</body>
</html>
<script>
var AppViewModel;
  $(document).ready(function() {
    // Initialise Ko ViewModel
            AppViewModel = new ViewModel();
            ko.applyBindings(AppViewModel);
  });
</script>
