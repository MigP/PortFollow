// Global variables
	var cryptoDataUrl = "https://api.bitpanda.com/v1/ticker";
	var cryptoData, currentAssets = {}, totalAssets = [], valuesArray = [], preferences = [];

// Document load functions
	// device detection
		var isMobile = false; //initiate as false
		if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
		    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
		    isMobile = true;
		}

	function fetchDbIntoObj() {
		currentAssets = {};
		assetArrayLength = document.getElementById('assets').children.length;
		for (a=0; a<assetArrayLength; a = a+5) {
			assetNr = a/5;
			id = document.getElementById('assets').children[a].innerHTML;
			asset = document.getElementById('assets').children[a+1].innerHTML;
			amount = document.getElementById('assets').children[a+2].innerHTML;
			value = document.getElementById('assets').children[a+3].innerHTML;
			type = document.getElementById('assets').children[a+4].innerHTML;
			status = "none";

			transaction = {
				id : [id],
				asset : [asset],
				amount : [amount],
				value : [value],
				status: [status],
				type: [type]
				};
			currentAssets[assetNr] = transaction;
		}
		calculateValues();
	}

	function lightOrDarkMode() { // Detects browser's dark or light mode
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		    $("#favicon").attr("href","/images/lightlogo.png");
		} else {
			$("#favicon").attr("href","/images/logo.png");
		}
	}
	lightOrDarkMode();

	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) { // Detects browser's dark or light mode change
		lightOrDarkMode();
	});

	$(document).ready(function() {
		if (document.body.contains(document.getElementById('total_assets'))) {
			// Setting up asset variables
				if (document.getElementById('hidden').childElementCount == 3) {
					fetchDbIntoObj();
				}

				totalAssetArrayLength = document.getElementById('total_assets').children.length;
				for (a=0; a<totalAssetArrayLength; a = a+4) {
					tAssetNr = a/4;
					asset_code = document.getElementById('total_assets').children[a].innerHTML;
					asset_name = document.getElementById('total_assets').children[a+1].innerHTML;
					ex_eur = document.getElementById('total_assets').children[a+2].innerHTML;
					ex_usd = document.getElementById('total_assets').children[a+3].innerHTML;

					totAss = {
						asset_name : asset_name,
						ex_eur : ex_eur,
						ex_usd : ex_usd,
						displayed : 'no'
						};
					totalAssets[asset_code] = totAss;
				}

				for (a=0; a<5; a++) {
					preferences.push(document.getElementById('prefs').children[a].innerHTML);
				}

				document.getElementById('hidden').innerHTML = '';
				createAssetMenu();

			// Get crypto data
				getLatestCryptoData();
			
			// Draw graphs and get forex data
				forexAndGraphs();

			// Initialise data timer
				setInterval(forexAndGraphs, 60000);
		}
	});

// General usage functions
	function httpGet(theUrl) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
		xmlHttp.send( null );
		return xmlHttp.responseText;
	}
	  
	function formSubmitSafetyValidator(stringToValidate) {
		var invalidChars = /(\\)|(['"])|(\|)/g;
		if(invalidChars.test(stringToValidate.value)) {
			stringToValidate.value = stringToValidate.value.replace(invalidChars,"");
		}
	}

	function validateDecimalNumber(stringToValidate) {
		var invalidChars = /[^\d.]|\.(?=.*\.)/g;
		if(invalidChars.test(stringToValidate.value)) {
			stringToValidate.value = stringToValidate.value.replace(invalidChars,"");
		}
	}

	function hoverInMenuIcons() {
		$(".menu-icons").addClass("biggerIcons");
	}

// Site validation, login, logout, etc
	function sanitise(str) {
		str.replace("\\","");
		str.replace('"',"");
		str.replace('\'',"");
		return str;
	}

	function validateEmail() {
	  var error="";
	  // Email validation
	  var email = document.getElementById("email");
	  if (email.value == "" || email.value.indexOf( "@" ) == -1) {
	    error = "Please enter a valid email";
	    document.getElementById ("error_para").innerHTML = error;
	    email.value = "";
	    return false;
	  }
	 }

	function validatePassword() {
	  var error="";
	  // Password validation
	  var password = document.getElementById("pass");
	  if (password.value == "" || password.value.length < 8 || password.value.length > 50) {
	    error = "Password must be 8 to 50 characters long";
	    document.getElementById("error_para").innerHTML = error;
	    pass.value = "";
	    return false;
	  } else {
	    return true;
	  }
	}

	function validateLogin() {
	  	var error="";
		validateEmail();
		validatePassword();
	}

	function validateReset() {
		var error="";
		// Password confirmation validation
		var password = document.getElementById("pass");
		var passwordConfirmation = document.getElementById("cpass");
		if (password.value == passwordConfirmation.value) {
			if (password.value == "" || password.value.length < 8 || password.value.length > 50) {
				error = "Password must be 8 to 50 characters long";
				document.getElementById("error_para").innerHTML = error;
				pass.value = "";
				cpass.value = "";
				return false;
			} else {
				return true;
			}
		} else {
			error = "Passwords don't match";
			document.getElementById("error_para").innerHTML = error;
			return false;
		}
	}

	function validateRegister() {
		var error="";
		// Email validation
		var email = document.getElementById("email");
		if (email.value == "" || email.value.indexOf( "@" ) == -1) {
			error = "Please enter a valid email";
			document.getElementById ("error_para").innerHTML = error;
			email.value = "";
			return false;
		} else {
			// Password confirmation validation
			var password = document.getElementById("pass");
			var passwordConfirmation = document.getElementById("cpass");
			if (password.value == passwordConfirmation.value) {
				if (password.value == "" || password.value.length < 8 || password.value.length > 50) {
					error = "Password must be 8 to 50 characters long";
					document.getElementById("error_para").innerHTML = error;
					pass.value = "";
					cpass.value = "";
					return false;
				} else {
					return true;
				}
			} else {
				error = "Passwords don't match";
				document.getElementById("error_para").innerHTML = error;
				return false;
			}
		}
	}

	function logmeout() {
		window.location.href = "includes/logout.php";
	}

// Assets menu
	function updateAssetMenuDisplay() {
		var liObjs = document.getElementById('sortable').getElementsByTagName('li');
		var $strToAdd = "";
		for (a=0; a<liObjs.length; a++) {
			if (totalAssets[liObjs[a].title].displayed == "yes") {
				$strToAdd += liObjs[a].title;
			}
			if (a<liObjs.length-1) {
				$strToAdd += ",";
			}
		}
		$.ajax({
	        url: "includes/update_db.php",
	        data: {assetlist: sanitise($strToAdd)},
	        type: "POST",
			success: function (response) {
				console.log(response);
				location.reload(); 
			}
	    });
	}

	function createAssetMenuDropdown() {
		var strToAdd = "<div><select name='assetMenuDropdown' id='assetMenuDropdown' style='width: 90%;'>";
		for (const key in totalAssets) {
			if (totalAssets[key].displayed == "no") {
				strToAdd += "<option value='" + key + "'>" + totalAssets[key].asset_name + "</option>";
			}
		}
		strToAdd += "</select></div><div><img src='images/icons/add.svg' data-bind='attr: {alt: display, title: display}' width='20' height='20' style='margin-right: 5px;cursor: pointer;' onClick='addToDisplayList()'></div>";
		document.getElementById('add_items').innerHTML = strToAdd;

	}

	function removeDisplayedItem(el) {
		totalAssets[el.parentElement.parentElement.title].displayed = "no";
		el.parentElement.parentElement.remove();
		createAssetMenuDropdown();
	}

	function addToDisplayList() {
		var ul = document.getElementById("sortable");
		var li = document.createElement("li");
		$(li).addClass('menu-link assetListItems ui-sortable-handle');
		$(li).attr('title', document.getElementById("assetMenuDropdown").value);
		li.innerHTML = "<div>" + $("#assetMenuDropdown option:selected").text() + "</div><div><img src='images/icons/delete.svg' data-bind='attr: {alt: doNotDisplay, title: doNotDisplay}' width='20' height='20' style='margin-right: 5px;cursor: pointer;' onClick='removeDisplayedItem(this)'></div>";
		ul.appendChild(li);
		$("#sortable").sortable();

		totalAssets[document.getElementById("assetMenuDropdown").value].displayed = "yes";
		createAssetMenuDropdown();
	}

	function createAssetMenu() {
		if (preferences[3] == "") {
			document.getElementById("asset_list").innerHTML = "<div><p>No assets displayed</p></div>";
		} else {
			var listOfAssets = preferences[3].split(',');
			var strToAdd = "<ul id='sortable'>";
			for (a=0; a<listOfAssets.length; a++) {
				totalAssets[listOfAssets[a]].displayed = "yes";
				strToAdd += "<li class='menu-link assetListItems' title='" + listOfAssets[a] + "'><div>" + totalAssets[listOfAssets[a]].asset_name + "</div><div><img src='images/icons/delete.svg' data-bind='attr: {alt: doNotDisplay, title: doNotDisplay}' width='20' height='20' style='margin-right: 5px;cursor: pointer;' onClick='removeDisplayedItem(this)'></div></li>";
			}
			strToAdd += "</ul>";
			document.getElementById("asset_list").innerHTML = strToAdd;
		}
		$("#sortable").sortable();
		createAssetMenuDropdown();
	}

// Settings menu
	function exitMenu() {
		document.getElementById("popup_message").innerHTML = "";
		document.getElementById("popup_buttons").innerHTML = "";
		$('.pop_up_parent').toggleClass('popup_visibility');
		$('body').css('position','absolute');
		$('body').css('overflow-y','auto');
	}

	function delAccount(){
		$delacc = "1";
	    $.ajax({
	        url: "includes/update_db.php",
	        data: {delacc: $delacc},
	        type: "POST",
			success: function (response) {
				console.log(response);
				window.location.href = "includes/logout.php?linksent";
			}
	    });
	    exitMenu();
	}

	function changeCurrency(){
		$curr = $("input[type=radio][name=currency]:checked").val();
	    $.ajax({
	        url: "includes/update_db.php",
	        data: {curr: $curr},
	        type: "POST",
			success: function (response) {
				console.log(response);
				location.reload();
			}
	    });
	    exitMenu();
	}

	function changeTimezone(){
		$time = document.getElementById('timezone').options[document.getElementById('timezone').selectedIndex].value;
	    $.ajax({
	        url: "includes/update_db.php",
	        data: {time: $time},
	        type: "POST",
			success: function (response) {
				console.log(response);
				location.reload();
			}
	    });
	    exitMenu();
	}

	function changeLanguage(){
		$lang = document.getElementById('language').options[document.getElementById('language').selectedIndex].value;
	    $.ajax({
	        url: "includes/update_db.php",
	        data: {lang: $lang},
	        type: "POST",
			success: function (response) {
				console.log(response);
				location.reload();
			}
	    });
	    exitMenu();
	}

	function changeName(){
		$fname = document.getElementById("fname").value;
		$lname = document.getElementById("lname").value;
	    if ($fname.length >0 && $lname.length >0) {
		    $.ajax({
		        url: "includes/update_db.php",
		        data: {fname: $fname, lname: $lname},
		        type: "POST",
				success: function (response) {
					console.log(response);
				}
		    });
		    exitMenu();
		    document.getElementById("headerMessage").innerHTML = document.getElementById("headerMessage").innerHTML.replace(preferences[4], $fname + " " + $lname);;
		    preferences[4] = $fname + " " + $lname;
		}
	}

	// Menu clicking functions
		function clickLogout() {
			document.getElementById("popup_message").innerHTML = "<span id='conf-log' data-bind='text: confirmLogout'></span>";
			document.getElementById("popup_buttons").innerHTML = "<div class='col'><div class='form-group' style='flex-direction: column;'><button id='conf-log-yes-btn' data-bind='text: yes' class='form_button btn btn-success btn-lg btn-block' onClick='logmeout()'></button></div></div><div class='col'><div class='form-group'><button id='conf-log-no-btn' data-bind='text: no' class='form_button btn btn-success btn-lg btn-block' onClick='exitMenu()'></button></div></div>";
			$('.pop_up_parent').toggleClass('popup_visibility');
			ko.applyBindings(AppViewModel, $("#conf-log")[0]);
			ko.applyBindings(AppViewModel, $("#conf-log-yes-btn")[0]);
			ko.applyBindings(AppViewModel, $("#conf-log-no-btn")[0]);
		}

		function clickDelete() {
			document.getElementById("popup_message").innerHTML = "<span id='del-acc' data-bind='text: confirmDelete'></span>";
			document.getElementById("popup_buttons").innerHTML = "<div class='col'><div class='form-group' style='flex-direction: column;'><button id='del-acc-yes-btn' data-bind='text: yes' class='form_button btn btn-success btn-lg btn-block' onClick='delAccount()'></button></div></div><div class='col'><div class='form-group'><button id='del-acc-no-btn' data-bind='text: no' class='form_button btn btn-success btn-lg btn-block' onClick='exitMenu()'></button></div></div>";
			$('.pop_up_parent').toggleClass('popup_visibility');
			ko.applyBindings(AppViewModel, $("#del-acc")[0]);
			ko.applyBindings(AppViewModel, $("#del-acc-yes-btn")[0]);
			ko.applyBindings(AppViewModel, $("#del-acc-no-btn")[0]);
		}

		function clickDeleteTransaction(trNr) {
			// Remove the deleted transaction from the displayed list
			const element = document.getElementById("transaction_" + trNr);
			$(element).addClass('hiddenTransaction');
			if (document.getElementById("tr_src").childElementCount - document.getElementsByClassName("hiddenTransaction").length == 1) {
				document.getElementById("tr_src").innerHTML = "<div><p>You own no assets</p></div><div class='editTransactionRowAddNewButton'><img src='images/icons/add.svg' title ='Add new transaction' alt='Add new transaction' width='35' height='35' style='margin-right: 5px;cursor: pointer;' onClick='clickAddTransaction()'></div>";
			}
		}

		function clickAddTransaction() {
			var displayedTransactions = document.getElementsByClassName('editTransactionRow').length;

			if (displayedTransactions == 0) {
				$($('#tr_src').children()[$('#tr_src').children().length-2]).remove();
				var lastTransactionElement = $('#tr_src').children()[$('#tr_src').children().length-1];
			} else {
				var lastTransactionElement = $('#tr_src').children()[$('#tr_src').children().length-1];
			}

			stringToAdd = "<div id='transaction_" + displayedTransactions + "' class='editTransactionRow'><div style='width: 100%;display: grid;'><select data-bind='attr: {title: assets}' title='Asset' class='transaction_input' name='asset_" + displayedTransactions + "' id='asset_" + displayedTransactions + "'>";
			for (const key in totalAssets) {
				stringToAdd += "<option value='" + key + "'>" + totalAssets[key].asset_name + "</option>";
			}
			stringToAdd += "</select></div><div class='wrapper'><div><input type='tel' data-bind='attr: {title: assAmount, placeholder: assAmount}' class='transaction_input' id='amount_" + displayedTransactions + "' name='amount_" + displayedTransactions + "' min='0' value='' step='0.00000000000001' onChange='validateDecimalNumber(this)' onKeyup='validateDecimalNumber(this)'></div><div><input data-bind='attr: {title: assPrice, placeholder: assPrice}' type='tel' class='transaction_input' id='value_" + displayedTransactions + "' name='value_" + displayedTransactions + "' min='0' value='' step='0.00000000000001' onChange='validateDecimalNumber(this)' onKeyup='validateDecimalNumber(this)'></div><div class='transactionType' id='transaction_type_" + displayedTransactions + "'><img id='tr-buy-" + displayedTransactions + "' data-bind='attr: {alt: buy, title: buy}' src='images/icons/buy.svg' style='margin-right: 5px;cursor: pointer;' onclick='clickTransactionType(this)' width='35' height='35'></div></div><div class='editTransactionRowDeleteButton'><img id='del-tr-" + displayedTransactions + "' data-bind='attr: {title: delTr, alt: delTr}' src='images/icons/delete.svg' width='35' height='35' style='margin-right: 5px;cursor: pointer;' onClick='clickDeleteTransaction(" + displayedTransactions + ")'></div><div><br></div></div>";

			$(stringToAdd).insertBefore(lastTransactionElement);
			ko.applyBindings(AppViewModel, $("#asset_" + displayedTransactions)[0]);
			ko.applyBindings(AppViewModel, $("#amount_" + displayedTransactions)[0]);
			ko.applyBindings(AppViewModel, $("#value_" + displayedTransactions)[0]);
			ko.applyBindings(AppViewModel, $("#tr-buy-" + displayedTransactions)[0]);
			ko.applyBindings(AppViewModel, $("#del-tr-" + displayedTransactions)[0]);
		}

		function clickLanguage() {
			document.getElementById("popup_message").innerHTML = "<span id='chg-lang' data-bind='text: changeTheLanguage'></span>";
			document.getElementById("popup_buttons").innerHTML = "<div class='col'><div class='form-group' style='flex-direction: column;'><div style='justify-content: center;display: flex;'><select name='language' id='language'style='max-width: 80%;'><option value='en'>English</option><option value='fr'>Français</option><option value='es'>Español</option><option value='de_DE'>Deutsch</option><option value='br'>Português</option><option value='ru'>Русский</option></select></div><div><br></div><button id='update-lang-btn' class='form_button btn btn-success btn-lg btn-block' style='width: 175px;' onClick='changeLanguage()' data-bind='text: update'></button><button id='cancel-lang-btn' class='form_button btn btn-success btn-lg btn-block' style='width: 175px;' onClick='exitMenu()' data-bind='text: cancel'></button></div></div>";
			$('.pop_up_parent').toggleClass('popup_visibility');
			ko.applyBindings(AppViewModel, $("#update-lang-btn")[0]);
			ko.applyBindings(AppViewModel, $("#cancel-lang-btn")[0]);
			ko.applyBindings(AppViewModel, $("#chg-lang")[0]);

		}

		function clickTimezone() {
			document.getElementById("popup_message").innerHTML = "<span id='chg-tz' data-bind='text: changeTheTimezone'></span>";
			document.getElementById("popup_buttons").innerHTML = "<div class='col'><div class='form-group' style='flex-direction: column;'><div style='justify-content: center;display: flex;'><select name='timezone' id='timezone'style='max-width: 80%;'><option value='Pacific/Honolulu'>(UTC-10) Pacific/Honolulu</option><option value='America/Juneau'>(UTC-8) America/Juneau</option><option value='America/Los_Angeles'>(UTC-7) America/Los_Angeles</option><option value='America/Phoenix'>(UTC-7) America/Phoenix</option><option value='America/Vancouver'>(UTC-7) America/Vancouver</option><option value='US/Mountain'>(UTC-6) US/Mountain</option><option value='America/Mexico_City'>(UTC-6) America/Mexico_City</option><option value='America/El_Salvador'>(UTC-6) America/El_Salvador</option><option value='America/Bogota'>(UTC-5) America/Bogota</option><option value='America/Chicago'>(UTC-5) America/Chicago</option><option value='America/Lima'>(UTC-5) America/Lima</option><option value='America/Caracas'>(UTC-4) America/Caracas</option><option value='America/New_York'>(UTC-4) America/New_York</option><option value='America/Toronto'>(UTC-4) America/Toronto</option><option value='America/Argentina/Buenos_Aires'>(UTC-3) America/Argentina/Buenos_Aires</option><option value='America/Santiago'>(UTC-3) America/Santiago</option><option value='America/Sao_Paulo'>(UTC-3) America/Sao_Paulo</option><option value='Atlantic/Reykjavik'>(UTC) Atlantic/Reykjavik</option><option value='Europe/Dublin'>(UTC+1) Europe/Dublin</option><option value='Africa/Lagos'>(UTC+1) Africa/Lagos</option><option value='Europe/Lisbon'>(UTC+1) Europe/Lisbon</option><option value='Europe/London'>(UTC+1) Europe/London</option><option value='Europe/Amsterdam'>(UTC+2) Europe/Amsterdam</option><option value='Europe/Belgrade'>(UTC+2) Europe/Belgrade</option><option value='Europe/Berlin'>(UTC+2) Europe/Berlin</option><option value='Europe/Bratislava'>(UTC+2) Europe/Bratislava</option><option value='Europe/Brussels'>(UTC+2) Europe/Brussels</option><option value='Africa/Cairo'>(UTC+2) Africa/Cairo</option><option value='Europe/Copenhagen'>(UTC+2) Europe/Copenhagen</option><option value='Africa/Johannesburg'>(UTC+2) Africa/Johannesburg</option><option value='Europe/Luxembourg'>(UTC+2) Europe/Luxembourg</option><option value='Europe/Madrid'>(UTC+2) Europe/Madrid</option><option value='Europe/Malta'>(UTC+2) Europe/Malta</option><option value='Europe/Oslo'>(UTC+2) Europe/Oslo</option><option value='Europe/Paris'>(UTC+2) Europe/Paris</option><option value='Europe/Rome'>(UTC+2) Europe/Rome</option><option value='Europe/Stockholm'>(UTC+2) Europe/Stockholm</option><option value='Europe/Warsaw'>(UTC+2) Europe/Warsaw</option><option value='Europe/Zurich'>(UTC+2) Europe/Zurich</option><option value='Europe/Athens'>(UTC+3) Europe/Athens</option><option value='Asia/Bahrain'>(UTC+3) Asia/Bahrain</option><option value='Europe/Bucharest'>(UTC+3) Europe/Bucharest</option><option value='Europe/Helsinki'>(UTC+3) Europe/Helsinki</option><option value='Europe/Istanbul'>(UTC+3) Europe/Istanbul</option><option value='Asia/Jerusalem'>(UTC+3) Asia/Jerusalem</option><option value='Asia/Kuwait'>(UTC+3) Asia/Kuwait</option><option value='Europe/Moscow'>(UTC+3) Europe/Moscow</option><option value='Asia/Qatar'>(UTC+3) Asia/Qatar</option><option value='Europe/Riga'>(UTC+3) Europe/Riga</option><option value='Asia/Riyadh'>(UTC+3) Asia/Riyadh</option><option value='Europe/Tallinn'>(UTC+3) Europe/Tallinn</option><option value='Europe/Vilnius'>(UTC+3) Europe/Vilnius</option><option value='Asia/Dubai'>(UTC+4) Asia/Dubai</option><option value='Asia/Muscat'>(UTC+4) Asia/Muscat</option><option value='Asia/Tehran'>(UTC+4) Asia/Tehran</option><option value='Asia/Ashkhabad'>(UTC+5) Asia/Ashkhabad</option><option value='Asia/Karachi'>(UTC+5) Asia/Karachi</option><option value='Asia/Kolkata'>(UTC+5:30) Asia/Kolkata</option><option value='Asia/Almaty'>(UTC+6) Asia/Almaty</option><option value='Asia/Bangkok'>(UTC+7) Asia/Bangkok</option><option value='Asia/Ho_Chi_Minh'>(UTC+7) Asia/Ho_Chi_Minh</option><option value='Asia/Jakarta'>(UTC+7) Asia/Jakarta</option><option value='Asia/Chongqing'>(UTC+8) Asia/Chongqing</option><option value='Asia/Hong_Kong'>(UTC+8) Asia/Hong_Kong</option><option value='Asia/Manila'>(UTC+8) Asia/Manila</option><option value='Australia/Perth'>(UTC+8) Australia/Perth</option><option value='Asia/Shanghai'>(UTC+8) Asia/Shanghai</option><option value='Asia/Singapore'>(UTC+8) Asia/Singapore</option><option value='Asia/Taipei'>(UTC+8) Asia/Taipei</option><option value='Asia/Seoul'>(UTC+9) Asia/Seoul</option><option value='Asia/Tokyo'>(UTC+9) Asia/Tokyo</option><option value='Australia/Brisbane'>(UTC+10) Australia/Brisbane</option><option value='Australia/Adelaide'>(UTC+10:30) Australia/Adelaide</option><option value='Australia/Sydney'>(UTC+11) Australia/Sydney</option><option value='Pacific/Norfolk'>(UTC+12) Pacific/Norfolk</option><option value='Pacific/Auckland'>(UTC+13) Pacific/Auckland</option><option value='Pacific/Fakaofo'>(UTC+13) Pacific/Fakaofo</option><option value='Pacific/Chatham'>(UTC+13:45) Pacific/Chatham</option></select></div><div><br></div><div style='display: grid;justify-items: center;'><button id='update-tz-btn' class='form_button btn btn-success btn-lg btn-block' style='width: 175px;' onClick='changeTimezone()' data-bind='text: update'></button><button id='cancel-tz-btn' class='form_button btn btn-success btn-lg btn-block' style='width: 175px;' onClick='exitMenu()' data-bind='text: cancel'></button></div></div></div>";
			$('.pop_up_parent').toggleClass('popup_visibility');
			ko.applyBindings(AppViewModel, $("#update-tz-btn")[0]);
			ko.applyBindings(AppViewModel, $("#cancel-tz-btn")[0]);
			ko.applyBindings(AppViewModel, $("#chg-tz")[0]);
		}

		function clickName() {
			document.getElementById("popup_message").innerHTML = "Change your name:";
			document.getElementById("popup_buttons").innerHTML = "<div class='col'><div class='form-group' style='flex-direction: column;'><div><img src='images/icons/user.svg' alt='Change name' width='15' height='15' style='margin-right: 5px;'><input type='text' id='fname' name='fname' placeholder='First Name' required='required' maxlength='50' onChange='formSubmitSafetyValidator(this)' onKeyup='formSubmitSafetyValidator(this)'><br><img src='images/icons/user.svg' alt='Change name' width='15' height='15' style='margin-right: 5px;'><input type='text' id='lname' name='lname' placeholder='Last Name' required='required' maxlength='50' onChange='formSubmitSafetyValidator(this)' onKeyup='formSubmitSafetyValidator(this)'><br></div><div><br></div><button class='form_button btn btn-success btn-lg btn-block' style='width: 175px;' onClick='changeName()'>Update</button><button class='form_button btn btn-success btn-lg btn-block' style='width: 175px;' onClick='exitMenu()'>Cancel</button></div></div>";
			$('.pop_up_parent').toggleClass('popup_visibility');
		}

		function clickCurrency() {
			document.getElementById("popup_message").innerHTML = "<span id='chg-curr' data-bind='text: chooseYourCurrency'></span>";
			document.getElementById("popup_buttons").innerHTML = "<div class='col'><div class='form-group' style='flex-direction: column;'><div><input type='radio' id='euro' name='currency' value='eur'><label for='euro' style='padding-left: 10px;'>Euro</label><br><input type='radio' id='usd' name='currency' value='usd'><label for='usd' style='padding-left: 10px;'>US Dollar</label></div><div><br></div><button id='update-curr-btn' class='form_button btn btn-success btn-lg btn-block' style='width: 175px;' onClick='changeCurrency()' data-bind='text: update'></button><button id='cancel-curr-btn' class='form_button btn btn-success btn-lg btn-block' style='width: 175px;' onClick='exitMenu()' data-bind='text: cancel'></button></div></div>";
			$('.pop_up_parent').toggleClass('popup_visibility');
			ko.applyBindings(AppViewModel, $("#update-curr-btn")[0]);
			ko.applyBindings(AppViewModel, $("#cancel-curr-btn")[0]);
			ko.applyBindings(AppViewModel, $("#chg-curr")[0]);
		}

		function clickTransactionType(el) {
			if ($(el).attr('src') == 'images/icons/sell.svg') {
				transl = document.getElementById('transBuy').innerHTML;
				$(el).attr('src', 'images/icons/buy.svg');
				$(el).attr('title', transl);
				$(el).prop("alt", transl);
			} else if ($(el).attr('src') == 'images/icons/buy.svg') {
				transl = document.getElementById('transSell').innerHTML;
				$(el).attr('src', 'images/icons/sell.svg');
				$(el).attr('title', transl);
				$(el).prop("alt", transl);
			}
		}

		function clickTransactions() {
			document.getElementById("popup_message").innerHTML = "<span id='chg-tr' data-bind='text: editYourTransactions'></span>";
			stringToAdd = "<div><div class='form-group' style='flex-direction: column;'><div id='tr_src' style='display: flex;flex-direction: column;align-items: center;'>";
			assetNr = Object.keys(currentAssets).length;
			possibleAssetsNr = Object.keys(totalAssets).length;

			if (assetNr == 0) {
				stringToAdd += "<div><p id='noass' data-bind='text: youOwnNoAssets'></p></div>", trTypeStr = "";
				ko.applyBindings(AppViewModel, $("#noass")[0]);
			}
			for (a=0; a<assetNr; a++) {
				el = "";
				if (currentAssets[a].type[0] == "B") {
					trTypeStr = "<div class='transactionType' id='transaction_type_" + a + "'><img id='tr-buy-" + a + "' src='images/icons/buy.svg' data-bind='attr: {alt: buy, title: buy}' style='margin-right: 5px;cursor: pointer;' onclick='clickTransactionType(this)' width='35' height='35'></div>";
				} else if (currentAssets[a].type[0] == "S") {
					trTypeStr = "<div class='transactionType' id='transaction_type_" + a + "'><img id='tr-sell-" + a + "' src='images/icons/sell.svg' data-bind='attr: {alt: sell, title: sell}' style='margin-right: 5px;cursor: pointer;' onclick='clickTransactionType(this)' width='35' height='35'></div>";
				}

				stringToAdd += "<div id='transaction_" + a + "' class='editTransactionRow'><div style='width: 100%;display: grid;'><select data-bind='attr: {title: assets}' class='transaction_input' name='asset_" + a + "' id='asset_" + a + "'>";
				for (const key in totalAssets) {
					stringToAdd += "<option value='" + key + "'";
					if (key == currentAssets[a].asset[0]) {
						stringToAdd += " selected";
					}
					stringToAdd += ">" + totalAssets[key].asset_name + "</option>";
				}
				stringToAdd += "</select></div><div class='wrapper'><div><input type='tel' data-bind='attr: {title: assAmount, placeholder: assAmount}' class='transaction_input' id='amount_" + a + "' name='amount_" + a + "' min='0' value='" + currentAssets[a].amount[0] + "' step='0.00000000000001' onChange='validateDecimalNumber(this)' onKeyup='validateDecimalNumber(this)'></div><div><input data-bind='attr: {title: assPrice, placeholder: assPrice}' type='tel' class='transaction_input' id='value_" + a + "' name='value_" + a + "' min='0' value='" + currentAssets[a].value[0] + "' step='0.00000000000001' onChange='validateDecimalNumber(this)' onKeyup='validateDecimalNumber(this)'></div>" + trTypeStr + "</div><div class='editTransactionRowDeleteButton'><img id='del-tr-" + a + "' src='images/icons/delete.svg' data-bind='attr: {title: delTr, alt: delTr}' width='35' height='35' style='margin-right: 5px;cursor: pointer;' onClick='clickDeleteTransaction(" + a + ")'></div><div><br></div></div>";
			}
			stringToAdd += "<div class='editTransactionRowAddNewButton'><img id='add-tr' src='images/icons/add.svg' data-bind='attr: {title: addTr, alt: addTr}' width='35' height='35' style='margin-right: 5px;cursor: pointer;' onClick='clickAddTransaction()'></div></div><div><br></div><div style='display: flex;flex-direction: column;align-items: center;'><button id='update-tr' data-bind='text: update' class='form_button btn btn-success btn-lg btn-block' style='width: 175px;' onClick='updateTransactions()'></button><button id='cancel-tr' data-bind='text: cancel' class='form_button btn btn-success btn-lg btn-block' style='width: 175px;' onClick='exitMenu()'></button></div></div></div>";
			document.getElementById("popup_buttons").innerHTML = stringToAdd;
			$('body').css('position','fixed');
			$('body').css('overflow-y','hidden');
			$('.pop_up_parent').toggleClass('popup_visibility');
			ko.applyBindings(AppViewModel, $("#chg-tr")[0]);
			ko.applyBindings(AppViewModel, $("#add-tr")[0]);
			ko.applyBindings(AppViewModel, $("#update-tr")[0]);
			ko.applyBindings(AppViewModel, $("#cancel-tr")[0]);
			for (a=0; a<assetNr; a++) {
				if (currentAssets[a].type[0] == "B") {
					ko.applyBindings(AppViewModel, $("#tr-buy-" + a)[0]);
				} else if (currentAssets[a].type[0] == "S") {
					ko.applyBindings(AppViewModel, $("#tr-sell-" + a)[0]);
				}
				ko.applyBindings(AppViewModel, $("#asset_" + a)[0]);
				ko.applyBindings(AppViewModel, $("#amount_" + a)[0]);
				ko.applyBindings(AppViewModel, $("#value_" + a)[0]);
				ko.applyBindings(AppViewModel, $("#del-tr-" + a)[0]);
			}
		}

		// Settings functions
			function fetchDb(){
				// Get data from database
					$get_data = '1';
					$.ajax({
						url: "includes/update_db.php",
						data: {get_data: $get_data},
						type: "POST",
						async: false,
						success: function (response) {

							// Update it in currentAssets object
								$('#hidden').html(response);
								fetchDbIntoObj();
								document.getElementById("hidden").innerHTML = "";
						}
					});
			}

			function updateTransactions() {
				var transactionsInHtml = document.getElementsByClassName('editTransactionRow').length;
				var transactionsInObject = Object.keys(currentAssets).length;
				function reorderObject() {
					// Reorder currentAssets object
						var tempList = {}, b = 0, index = 0;
						for (a=0; a<transactionsInObject; a++) {
							index = Object.keys(currentAssets)[a];
							if (currentAssets[index] != undefined) {
								id = currentAssets[index].id[0];
								asset = currentAssets[index].asset[0];
								amount = currentAssets[index].amount[0];
								value = currentAssets[index].value[0];
								type = currentAssets[index].type[0];
								status = currentAssets[index].status[0];

								transaction = {
									id : [id],
									asset : [asset],
									amount : [amount],
									value : [value],
									type: [type],
									status: [status]
									};
								tempList[b] = transaction;
								b++;
							}
						}
						currentAssets = tempList;
				}

				// Process transactions in currentAssets object
					if (transactionsInHtml > 0) { // If there are transactions left in HTML
						
						// Validate transactions
							for (a=0; a<transactionsInHtml; a++) {
								var ignoreButton = false;
								if (document.getElementById("amount_" + a) != null && document.getElementById("transaction_" + a).classList.contains('hiddenTransaction') == false) {
									if (document.getElementById("amount_" + a).value == "" || document.getElementById("value_" + a).value == "" || document.getElementById("amount_" + a).value == "0" || document.getElementById("value_" + a).value == "0") {
										clickDeleteTransaction(a);
										ignoreButton = true;
									}

									typedAmountValue = document.getElementById("amount_" + a).value.replace(/(?:(-)(?![0.]+(?![\d.]))|-)?\d*?([1-9]\d*|0)(?:(?:(\.\d*[1-9])|\.)\d*)?(?![\d.])/gm, "$1$2$3");
									if (typedAmountValue.substr(0,1) == ".") {
										typedAmountValue = typedAmountValue.substr(1,typedAmountValue.length);
									}
									if (typedAmountValue.substr(typedAmountValue.length-1,1) == ".") {
										typedAmountValue.substr(0,typedAmountValue.length-1);
									}
									document.getElementById("amount_" + a).value = typedAmountValue;

									typedValueValue = document.getElementById("value_" + a).value.replace(/(?:(-)(?![0.]+(?![\d.]))|-)?\d*?([1-9]\d*|0)(?:(?:(\.\d*[1-9])|\.)\d*)?(?![\d.])/gm, "$1$2$3");
									if (typedValueValue.substr(0,1) == ".") {
										typedValueValue = typedValueValue.substr(1,typedValueValue.length);
									}
									if (typedValueValue.substr(typedValueValue.length-1,1) == ".") {
										typedValueValue.substr(0,typedValueValue.length-1);
									}
									document.getElementById("value_" + a).value = typedValueValue;
								}
							}
							if (ignoreButton) {return;} // If there was an invalid value, don't continue

						// Loop through HTML transactions
							var currentType = "";
							for (a=0; a<transactionsInHtml; a++) {
								if (document.getElementById("transaction_type_" + a).childNodes[0].src.includes("images/icons/sell.svg") == true) {
									currentType = "S";
								} else if (document.getElementById("transaction_type_" + a).src.includes("images/icons/buy.svg") == true) {
									currentType = "B";
								}

								if (a + 1 <= transactionsInObject) { // Transaction exists in currentAssets object
									if (document.getElementById("transaction_" + a).classList.contains('hiddenTransaction') == true) { // Transaction for deletion
										// Add delete to status
											currentAssets[a].status[0] ="delete";
									} else { // Transaction to keep

										// Compare transactions in HTML with the ones in currentAssets object
											if (currentAssets[a].amount[0] != document.getElementById("amount_" + a).value || currentAssets[a].value[0] != document.getElementById("value_" + a).value || currentAssets[a].asset[0] != document.getElementById("asset_" + a).value || currentAssets[a].type[0] != currentType) {
												
												// Update currentAssets object
													currentAssets[a].amount[0] = document.getElementById("amount_" + a).value;
													currentAssets[a].value[0] = document.getElementById("value_" + a).value;
													currentAssets[a].asset[0] = document.getElementById("asset_" + a).value;
													currentAssets[a].type[0] = currentType;
													currentAssets[a].status[0] = "update";
											}
									}
								} else { // Transaction does not exist in currentAssets object
									if (document.getElementById("transaction_" + a).classList.contains('hiddenTransaction') == false) { // New transaction to keep

										// Add it to currentAssets object
											id = "0";
											asset = document.getElementById("asset_" + a).value;
											amount = document.getElementById("amount_" + a).value;
											value = document.getElementById("value_" + a).value;
											type = currentType;
											status = "add";

											var newTransaction = {
												id : [id],
												asset : [asset],
												amount : [amount],
												value : [value],
												type: [type],
												status: [status]
												};
											currentAssets[a] = newTransaction;
											transactionsInObject = Object.keys(currentAssets).length;
									}
								}
							}
						
						reorderObject();
					} else { // If there are no transactions left in HTML

						// Empty currentAssets object
							currentAssets = {};
							transactionsInObject = Object.keys(currentAssets).length;

						// Remove all transactions from database
							$del = '2';
							$id = '1';
							$.ajax({
								url: "includes/update_db.php",
								data: {del: $del, id: $id},
								type: "POST"
						    });
					}
				
				// Process transactions in database
					if (transactionsInObject > 0) {
						for (a=0; a<transactionsInObject; a++) {
							if (currentAssets[a].status[0] == "delete") {

								// Remove from database
									$id = currentAssets[a].id[0];
									$del = '1';
									$.ajax({
										url: "includes/update_db.php",
										data: {del: $del, id: $id},
										type: "POST",
										async: false,
										success: function (response) {
											console.log(response);
										}
									});
							} else if (currentAssets[a].status[0] == "add") {

								// Add it to the database
									$asset = currentAssets[a].asset[0];
									$amount = currentAssets[a].amount[0];
									$value = currentAssets[a].value[0];
									$type = currentAssets[a].type[0];
									$id = '0';
									$del = '4';
									$.ajax({
										url: "includes/update_db.php",
										data: {del: $del, id: $id, asset: $asset, amount: $amount, value: $value, type: $type},
										type: "POST",
										async: false,
										success: function (response) {
											console.log(response);
										}
									});
							} else if (currentAssets[a].status[0] == "update") {

								// Update database
									$id = currentAssets[a].id[0];
									$asset = currentAssets[a].asset[0];
									$amount = currentAssets[a].amount[0];
									$value = currentAssets[a].value[0];
									$type = currentAssets[a].type[0];
									$del = '3';
									$.ajax({
										url: "includes/update_db.php",
										data: {del: $del, id: $id, asset: $asset, amount: $amount, value: $value, type: $type},
										type: "POST",
										async: false,
										success: function (response) {
											console.log(response);
										}
									});
									currentAssets[a].status[0] = "none";
							}
						}
						fetchDb();
					}

				exitMenu();
				calculateValues();
			}

// Calculations, data, charts

	function formatNr (nr) {
		if (nr < 0.0000001) {
			return nr;
		} else if (nr >= 0.0000001 && nr < 0.0001) {
			return Math.round(nr * 10000000) / 10000000;
		} else if (nr >= 0.0001 && nr < 0.01) {
			return Math.round(nr * 10000) / 10000;
		} else if (nr >= 0.01 && nr < 5000.01) {
			return Math.round(nr * 100) / 100;
		} else if (nr >= 5000.01) {
			return Intl.NumberFormat('en-US').format(Math.round(nr));
		}
	}

	function calculateValues() {
		// Find names of all assets and nr of their transactions  --  uniqueAssets

			var transactionsInObject = Object.keys(currentAssets).length;
			var assetArray = [], temp = {};

			for (a=0; a<transactionsInObject; a++) {
						assetArray.push(currentAssets[a]);
			}
			var uniqueAssets = assetArray.reduce( (acc, o) => (acc[o.asset] = (acc[o.asset] || 0)+1, acc), {} );
			var nrAssets = Object.keys(uniqueAssets).length;

		// Create final values array  --  valuesArray

			var loopedUniqueAsset = "", loopedTransactionAsset = "", totalValue = 0, totalAmount = 0, totalSpent;

			for (a=0; a<nrAssets; a++) {
				totalValue = 0, totalAmount = 0, totalSpent = 0;
				loopedUniqueAsset = Object.keys(uniqueAssets)[a];

				for (b=0; b<transactionsInObject; b++) {
					loopedTransactionAsset = currentAssets[b].asset[0];

					if (loopedTransactionAsset == loopedUniqueAsset) {
						if (currentAssets[b].type[0] == "B") {
							totalSpent += parseFloat(currentAssets[b].value[0]) * parseFloat(currentAssets[b].amount[0]);
							totalAmount += parseFloat(currentAssets[b].amount[0]);
							totalValue = totalSpent / totalAmount;
						} else if (currentAssets[b].type[0] == "S") {
							totalAmount -= parseFloat(currentAssets[b].amount[0]);
							totalSpent = totalAmount * totalValue;
						} 
					}
				}
				
				if (totalAmount >0) {
					valuesArray.push({
						asset: loopedUniqueAsset,
						amount: totalAmount,
						spent: totalSpent,
						value: totalValue
					});
				}
			}
	}

	function getLatestCryptoData() {
		// Get latest Crypto data
			cryptoData = JSON.parse(httpGet(cryptoDataUrl));
	}

	function forexAndGraphs() {
		// Get latest Forex data
			var exchanges;
			var requestURL = 'https://api.exchangerate.host/latest?base=USD&symbols=EUR';
			var request = new XMLHttpRequest();
			request.open('GET', requestURL);
			request.responseType = 'json';
			request.send();

			request.onload = function() {
				var response = request.response;
				exchanges = response;
				document.getElementById('usdToEur').innerHTML = exchanges.rates.EUR;

				var exchanges2;
				var requestURL2 = 'https://api.exchangerate.host/latest?base=EUR&symbols=USD';
				var request2 = new XMLHttpRequest();
				request2.open('GET', requestURL2);
				request2.responseType = 'json';
				request2.send();

				request2.onload = function() {
					var response2 = request2.response;
					exchanges2 = response2;
					document.getElementById('eurToUsd').innerHTML = exchanges2.rates.USD;
					
					getLatestCryptoData();
					drawAllGraphs();
				}
			}
	}

	function drawChart(curr, vP, vA, assetCode, id, translations_portfolio, translations_current, translations_sale) { // Currency, Average portfolio value (money spent on it), Current value of asset, Asset Code, Id of Chart element
		if (curr == "EUR") {
			var prefix = "€ ";
			var vS = vP * 1.1;
		} else if (curr == "USD") {
			var exchRate = parseFloat(document.getElementById('eurToUsd').innerHTML);
			var prefix = "US$ ";
			var vP = vP * exchRate; 
			var vS = vP * 1.1;
		}
		var xValues = [[translations_portfolio, prefix + formatNr(vP)], [translations_current, prefix + formatNr(vA)], [translations_sale, prefix + formatNr(vS)]];
		var yValues = [vP, vA, vS];
		var barColors = ["red", "orange","green"];

		new Chart(id, {
			type: "bar",
			data: {
				labels: xValues,
				datasets: [{
					backgroundColor: barColors,
					data: yValues
				}]
			},
			options: {
				maintainAspectRatio: false,
				legend: {
					display: false
				},
				title: {
					display: false
				},
				scales: {
					yAxes: [{
						ticks: {
							fontColor: "#bac0d0",
							fontSize: 12,
							autoSkip: true,
    						maxTicksLimit: 4
						}
					}],
					xAxes: [{
						ticks: {
							fontColor: "#bac0d0",
							fontSize: 0
						}
					}]
				}
			}
		});

	}

	function drawAllGraphs() {
		var currency = preferences[2].toUpperCase();

		if (preferences[3] == "") {
			document.getElementById("main_view").innerHTML = "";
		} else {
			var listOfAssets = preferences[3].split(',');
			var foundIt = false;

			for (a=0; a<listOfAssets.length; a++) { // Loop displayed assets
				foundIt = false;
				strToAdd = "";
				// Draw owned chart
					for (b=0; b<valuesArray.length; b++) { // Loop owned assets
						if (listOfAssets[a] == valuesArray[b].asset) {
							strToAdd += "<canvas id='myChart_" + a + "' style='width:100%;max-width:700px'></canvas>";
								foundIt = true;
								document.getElementById("portfolio_chart_" + a).innerHTML = strToAdd;
						}
					}
			}

			// Draw owned assets graphs and write info
				if (currency == "EUR") {
					var prefix = "€ ";
					var rate = 1;
				} else if (currency == "USD") {
					var prefix = "US$ ";
					var rate = parseFloat(document.getElementById('eurToUsd').innerHTML);
				}
				for (a=0; a<listOfAssets.length; a++) {
					foundIt = false;
					strToAdd = "<h7><strong>" + totalAssets[listOfAssets[a]].asset_name + "</strong></h7><br><div style='text-align: left; padding-left: 2.5em;'><span id='expl-port-" + a + "' data-bind='attr: {title: explanationPortfolio}' style='cursor: help;color: red'>█</span><span id='expl-port2-" + a + "' data-bind='attr: {title: explanationPortfolio}, text: avgPortPrice' style='cursor: help'></span></span>";
					for (b=0; b<valuesArray.length; b++) { // Loop owned assets
						if (listOfAssets[a] == valuesArray[b].asset) {
							spentVsWorthColor = ""; totalSpent = 0, totalWorth = 0;
							totalSpent += parseFloat(valuesArray[a].spent);
							totalWorth += valuesArray[a].amount * parseFloat(cryptoData[valuesArray[a].asset][currency]);
							if (currency == "USD") {
								totalSpent = totalSpent * rate;
							}

							if (totalSpent > totalWorth) {
								spentVsWorthColor = "red";
							} else if (totalSpent < totalWorth) {
								spentVsWorthColor = "green";
							} else if (totalSpent == totalWorth) {
								spentVsWorthColor = "cornflowerblue";
							}

							drawChart(currency, valuesArray[b].value, cryptoData[valuesArray[b].asset][currency], valuesArray[b].asset, "myChart_" + a, document.getElementById('transPortfolio').innerHTML, document.getElementById('transCurrent').innerHTML, document.getElementById('transSale').innerHTML);
							strToAdd += prefix + " " + formatNr(valuesArray[b].value * rate) + "<br><span id='expl-curr-" + a + "' data-bind='attr: {title: explanationCurrent}' style='cursor:help;color: yellow'>█</span><span id='expl-curr2-" + a + "' data-bind='attr: {title: explanationCurrent}, text: currPrice' style='cursor: help'></span>" + prefix + " " + formatNr(cryptoData[valuesArray[b].asset][currency]) + "<br><span id='expl-sale-" + a + "' data-bind='attr: {title: explanationSale}' style='cursor:help;color: green'>█</span><span id='expl-sale2-" + a + "' data-bind='attr: {title: explanationSale}, text: salePrice' style='cursor: help'></span>" + prefix + " " + formatNr(valuesArray[b].value * rate * 1.1) + "</span><br><span id='owned-" + a + "' data-bind=' text: owned'></span>" + formatNr(valuesArray[b].amount) + "<br><span id='spent-" + a + "' data-bind=' text: spent'></span>/<span id='worth-" + a + "' data-bind='text: worth'></span><span style='color: cornflowerblue;'>" + prefix + " " + formatNr(valuesArray[b].spent * rate) + "</span> / <span style='color: " + spentVsWorthColor + ";'>" + prefix + " " + formatNr(valuesArray[b].amount * cryptoData[valuesArray[b].asset][currency]) + "</span></div></div>";
							foundIt = true;
						}
					}
					if (foundIt == false) {
						strToAdd += "<span id='none-" + a + "' data-bind='text: none'></span><br><span id='expl-curr-" + a + "' data-bind='attr: {title: explanationCurrent}' style='cursor:help;color: yellow'>█</span><span id='expl-curr2-" + a + "' data-bind='attr: {title: explanationCurrent}, text: currPrice' style='cursor: help'></span>" + prefix + " " + formatNr(cryptoData[listOfAssets[a]][currency]) + "</span><br><span id='expl-sale-" + a + "' data-bind='attr: {title: explanationSale}' style='cursor:help;color: green'>█</span><span id='expl-sale2-" + a + "' data-bind='attr: {title: explanationSale}, text: salePrice' style='cursor: help'></span><span id='none2-" + a + "' data-bind='text: none'></span><br><span id='owned-" + a + "' data-bind=' text: owned'></span><span id='none3-" + a + "' data-bind='text: none'></span><br><span id='spent-" + a + "' data-bind=' text: spent'></span>/<span id='worth-" + a + "' data-bind='text: worth'></span><span style='color: cornflowerblue;'>" + prefix + " 0.00</span> / <span style='color: " + spentVsWorthColor + ";'>" + prefix + " 0.00</span></div></div>";
					}
					document.getElementById("section_info_" + a).innerHTML = strToAdd;
				}
				for (a=0; a<listOfAssets.length; a++) {
					ko.applyBindings(AppViewModel, $("#expl-port-" + a)[0]);
					ko.applyBindings(AppViewModel, $("#expl-port2-" + a)[0]);
					ko.applyBindings(AppViewModel, $("#expl-curr-" + a)[0]);
					ko.applyBindings(AppViewModel, $("#expl-curr2-" + a)[0]);
					ko.applyBindings(AppViewModel, $("#expl-sale-" + a)[0]);
					ko.applyBindings(AppViewModel, $("#expl-sale2-" + a)[0]);
					ko.applyBindings(AppViewModel, $("#owned-" + a)[0]);
					ko.applyBindings(AppViewModel, $("#spent-" + a)[0]);
					ko.applyBindings(AppViewModel, $("#worth-" + a)[0]);
					if ($("#none-" + a).length >0) {
						ko.applyBindings(AppViewModel, $("#none-" + a)[0]);
					}
					if ($("#none2-" + a).length >0) {
						ko.applyBindings(AppViewModel, $("#none2-" + a)[0]);
					}
					if ($("#none3-" + a).length >0) {
						ko.applyBindings(AppViewModel, $("#none3-" + a)[0]);
					}
				}
				
		}

		// Fill out header
			totalSpent = 0, totalWorth = 0;
			for(a=0; a<valuesArray.length; a++) {
				totalSpent += parseFloat(valuesArray[a].spent);
				totalWorth += valuesArray[a].amount * parseFloat(cryptoData[valuesArray[a].asset][currency]);
			}
			if (currency == "USD") {
				totalSpent = totalSpent * rate;
			}
			
			document.getElementById('username').innerHTML = " " + preferences[4] + "! ";
			document.getElementById('invested-amount').innerHTML = prefix + " " + formatNr(totalSpent);
			document.getElementById('worth-amount').innerHTML = prefix + " " + formatNr(totalWorth);

			if (totalSpent > totalWorth) {
				$('#worth-amount').css('color','red');
			} else if (totalSpent < totalWorth) {
				$('#worth-amount').css('color','green');
			} else if (totalSpent == totalWorth) {
				$('#worth-amount').css('color','cornflowerblue');
			}

		if (isMobile == true) {
			$('.main-list-item').css('height', 'fit-content');
			$('#headerMessage').css('font-size', 'small');
		}
	}
// jQuery ready functions
	jQuery(document).ready(function($){
		function toggleLeftMenuIcons() {
			$('.left-menu-icons img').toggleClass('hoverMenuIcons', 250);
		}
		function toggleRightMenuIcons() {
			$('.right-menu-icons img').toggleClass('hoverMenuIcons', 250);
		}
		function toggleLeftNav() {
			$('.nav-left').toggleClass('leftNavMenuOut', 250);
		}
		function removeRightNav() {
			$('.nav-right').removeClass('rightNavMenuOut', 250);
		}
		function toggleRightNav() {
			$('.nav-right').toggleClass('rightNavMenuOut', 250);
		}
		function removeLeftNav() {
			$('.nav-left').removeClass('leftNavMenuOut', 250);
		}

		$('.left-menu-icons').hover(
			function(){
				toggleLeftMenuIcons();
			}
		);
		$('.left-menu-icons').click(
			function(){
				toggleLeftNav();
				removeRightNav();
			}
		);

		$('.right-menu-icons').hover(
			function(){
				toggleRightMenuIcons();
			}
		);
		$('.right-menu-icons').click(
			function(){
				toggleRightNav();
				removeLeftNav();
			}
		);

		$('.menu-link').click(
			function(){
				removeRightNav();
			}
		);

		$('.main_body').click(
			function(){
				removeRightNav();
				removeLeftNav();
			}
		);

		$('.pop_up_bg').click(
			function(){
				exitMenu();
			}
		);
	});

// Knockout viewModel
	function AppViewModel() {
		   this.reset = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Reset";
		    	} else if (preferences[0] == "fr") {
		    		return "Réinitialiser";
		    	} else if (preferences[0] == "es") {
		    		return "Restablecer";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Zurücksetzen";
		    	} else if (preferences[0] == "br") {
		    		return "Redefinir";
		    	} else if (preferences[0] == "ru") {
		    		return "Перезагрузить";
		    	}
		    }, this);
		   this.enterYourNewPassword = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Enter your new password";
		    	} else if (preferences[0] == "fr") {
		    		return "Saisissez votre nouveau mot de passe";
		    	} else if (preferences[0] == "es") {
		    		return "Introduzca su nueva contraseña";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Gib dein neues Passwort ein";
		    	} else if (preferences[0] == "br") {
		    		return "Insira a sua nova senha";
		    	} else if (preferences[0] == "ru") {
		    		return "Введите новый пароль";
		    	}
		    }, this);
		   this.invalidCredentials = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Invalid credentials";
		    	} else if (preferences[0] == "fr") {
		    		return "Identifiants invalides";
		    	} else if (preferences[0] == "es") {
		    		return "Credenciales no válidas";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Ungültige Anmeldeinformationen";
		    	} else if (preferences[0] == "br") {
		    		return "Credenciais inválidas";
		    	} else if (preferences[0] == "ru") {
		    		return "Недействительные учетные данные";
		    	}
		    }, this);
		   this.emailNotFound = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "That email is not in our records";
		    	} else if (preferences[0] == "fr") {
		    		return "Cet e-mail ne figure pas dans nos archives";
		    	} else if (preferences[0] == "es") {
		    		return "Ese email no está en nuestros registros";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Diese E-Mail ist nicht in unseren Aufzeichnungen";
		    	} else if (preferences[0] == "br") {
		    		return "Esse e-mail não está nos nossos registros";
		    	} else if (preferences[0] == "ru") {
		    		return "Этого электронного письма нет в наших записях";
		    	}
		    }, this);
		   this.sendEmail = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Send email";
		    	} else if (preferences[0] == "fr") {
		    		return "Envoyer e-mail";
		    	} else if (preferences[0] == "es") {
		    		return "Enviar email";
		    	} else if (preferences[0] == "de_DE") {
		    		return "E-Mail senden";
		    	} else if (preferences[0] == "br") {
		    		return "Enviar email";
		    	} else if (preferences[0] == "ru") {
		    		return "Отправить электронную почту";
		    	}
		    }, this);
		   this.enterYourEmail = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Enter your email address";
		    	} else if (preferences[0] == "fr") {
		    		return "Saisissez votre adresse email";
		    	} else if (preferences[0] == "es") {
		    		return "Ingrese su correo electrónico";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Geben sie ihre E-Mailadresse ein";
		    	} else if (preferences[0] == "br") {
		    		return "Insira o seu endereço de email";
		    	} else if (preferences[0] == "ru") {
		    		return "Введите адрес электронной почты";
		    	}
		    }, this);
		   this.pwReset = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Password reset";
		    	} else if (preferences[0] == "fr") {
		    		return "Réinitialisation du mot de passe";
		    	} else if (preferences[0] == "es") {
		    		return "Restablecimiento de contraseña";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Passwort zurücksetzen";
		    	} else if (preferences[0] == "br") {
		    		return "Redefinição de senha";
		    	} else if (preferences[0] == "ru") {
		    		return "Сброс пароля";
		    	}
		    }, this);
		   this.couldNotVerify = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Your email couldn't be verified";
		    	} else if (preferences[0] == "fr") {
		    		return "Votre e-mail n'a pas pu être vérifié";
		    	} else if (preferences[0] == "es") {
		    		return "Su email no pudo ser verificado";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Ihre E-Mail konnte nicht bestätigt werden";
		    	} else if (preferences[0] == "br") {
		    		return "Não foi possível verificar seu e-mail";
		    	} else if (preferences[0] == "ru") {
		    		return "Ваш адрес электронной почты не может быть подтвержден";
		    	}
		    }, this);
		   this.emailAreadyRegistered = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "That email is already registered";
		    	} else if (preferences[0] == "fr") {
		    		return "Cet e-mail est déjà enregistré";
		    	} else if (preferences[0] == "es") {
		    		return "Ese email ya esta registrado";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Diese E-Mail ist bereits registriert";
		    	} else if (preferences[0] == "br") {
		    		return "Esse e-mail já está registrado";
		    	} else if (preferences[0] == "ru") {
		    		return "Эта электронная почта уже зарегистрирована";
		    	}
		    }, this);
		   this.passwordReset = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Your password has been reset";
		    	} else if (preferences[0] == "fr") {
		    		return "Votre mot de passe a été réinitialisé";
		    	} else if (preferences[0] == "es") {
		    		return "Su contraseña ha sido restablecida";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Dein Passwort wurde zurück gesetzt";
		    	} else if (preferences[0] == "br") {
		    		return "Sua senha foi alterada";
		    	} else if (preferences[0] == "ru") {
		    		return "Ваш пароль был сброшен";
		    	}
		    }, this);
		   this.emailVerified = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Your email has been verified";
		    	} else if (preferences[0] == "fr") {
		    		return "Votre email a été vérifié";
		    	} else if (preferences[0] == "es") {
		    		return "Su email ha sido verificado";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Ihre E-Mail wurde verifiziert";
		    	} else if (preferences[0] == "br") {
		    		return "O seu e-mail foi verificado";
		    	} else if (preferences[0] == "ru") {
		    		return "Ваш адрес электронной почты подтвержден";
		    	}
		    }, this);
		   this.invalidEmailOrPassword = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Invalid email or password";
		    	} else if (preferences[0] == "fr") {
		    		return "Email ou mot de passe invalide";
		    	} else if (preferences[0] == "es") {
		    		return "Email o contraseña no válidos";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Ungültige E-Mail oder Passwort";
		    	} else if (preferences[0] == "br") {
		    		return "E-mail ou senha inválidos";
		    	} else if (preferences[0] == "ru") {
		    		return "неверный адрес электронной почты или пароль";
		    	}
		    }, this);
		   this.alreadyRegistered = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Already registered? ";
		    	} else if (preferences[0] == "fr") {
		    		return "Déjà inscrit? ";
		    	} else if (preferences[0] == "es") {
		    		return "¿Ya registrado? ";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Bereits registriert? ";
		    	} else if (preferences[0] == "br") {
		    		return "Já registrado? ";
		    	} else if (preferences[0] == "ru") {
		    		return "Уже зарегистрирован? ";
		    	}
		    }, this);
		   this.register = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Register";
		    	} else if (preferences[0] == "fr") {
		    		return "S'inscrire";
		    	} else if (preferences[0] == "es") {
		    		return "Registrarse";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Registrieren";
		    	} else if (preferences[0] == "br") {
		    		return "Registrar-se";
		    	} else if (preferences[0] == "ru") {
		    		return "Регистр";
		    	}
		    }, this);
		   this.confirmPassword = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Confirm password";
		    	} else if (preferences[0] == "fr") {
		    		return "Confirmez mot de passe";
		    	} else if (preferences[0] == "es") {
		    		return "Confirmar contraseña";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Bestätige das Passwort";
		    	} else if (preferences[0] == "br") {
		    		return "Confirmar senha";
		    	} else if (preferences[0] == "ru") {
		    		return "Подтвердить Пароль";
		    	}
		    }, this);
		   this.constrainedPassword = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Password (8-50 chars)";
		    	} else if (preferences[0] == "fr") {
		    		return "Mot de passe (8-50 car.)";
		    	} else if (preferences[0] == "es") {
		    		return "Contraseña (8-50 car.)";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Passwort (8-50 Zeichen)";
		    	} else if (preferences[0] == "br") {
		    		return "Senha (8-50 caracteres)";
		    	} else if (preferences[0] == "ru") {
		    		return "Пароль (8-50 символов)";
		    	}
		    }, this);
		   this.lastName = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Last name";
		    	} else if (preferences[0] == "fr") {
		    		return "Nom";
		    	} else if (preferences[0] == "es") {
		    		return "Apellido";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Nachname";
		    	} else if (preferences[0] == "br") {
		    		return "Apelido";
		    	} else if (preferences[0] == "ru") {
		    		return "Фамилия";
		    	}
		    }, this);
		   this.firstName = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "First name";
		    	} else if (preferences[0] == "fr") {
		    		return "Prénom";
		    	} else if (preferences[0] == "es") {
		    		return "Nombre propio";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Vorname";
		    	} else if (preferences[0] == "br") {
		    		return "Nome";
		    	} else if (preferences[0] == "ru") {
		    		return "Имя";
		    	}
		    }, this);
		   this.email = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Email";
		    	} else if (preferences[0] == "fr") {
		    		return "Email";
		    	} else if (preferences[0] == "es") {
		    		return "Email";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Email";
		    	} else if (preferences[0] == "br") {
		    		return "Email";
		    	} else if (preferences[0] == "ru") {
		    		return "Эл. адрес";
		    	}
		    }, this);
		   this.password = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Password";
		    	} else if (preferences[0] == "fr") {
		    		return "Mot de passe";
		    	} else if (preferences[0] == "es") {
		    		return "Contraseña";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Passwort";
		    	} else if (preferences[0] == "br") {
		    		return "Senha";
		    	} else if (preferences[0] == "ru") {
		    		return "Пароль";
		    	}
		    }, this);
		   this.forgotPassword = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Forgot password";
		    	} else if (preferences[0] == "fr") {
		    		return "Mot de passe oublié";
		    	} else if (preferences[0] == "es") {
		    		return "Olvide la contraseña";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Passwort vergessen";
		    	} else if (preferences[0] == "br") {
		    		return "Esqueceu sua senha";
		    	} else if (preferences[0] == "ru") {
		    		return "Забыли пароль";
		    	}
		    }, this);
		   this.createAccount = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Create an account";
		    	} else if (preferences[0] == "fr") {
		    		return "Créer un compte";
		    	} else if (preferences[0] == "es") {
		    		return "Crear una cuenta";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Konto erstellen";
		    	} else if (preferences[0] == "br") {
		    		return "Crie uma conta";
		    	} else if (preferences[0] == "ru") {
		    		return "Завести аккаунт";
		    	}
		    }, this);
		   this.pleaseEnterYourDetails = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Please enter your details";
		    	} else if (preferences[0] == "fr") {
		    		return "Veuillez saisir vos coordonnées";
		    	} else if (preferences[0] == "es") {
		    		return "Por favor ingrese sus datos";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Bitte geben Sie Ihre Daten ein";
		    	} else if (preferences[0] == "br") {
		    		return "Por favor insira seus dados";
		    	} else if (preferences[0] == "ru") {
		    		return "Пожалуйста введите свои данные";
		    	}
		    }, this);
		   this.none = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "None";
		    	} else if (preferences[0] == "fr") {
		    		return "Aucun";
		    	} else if (preferences[0] == "es") {
		    		return "Ninguno";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Kein";
		    	} else if (preferences[0] == "br") {
		    		return "Nenhum";
		    	} else if (preferences[0] == "ru") {
		    		return "Никто";
		    	}
		    }, this);
		   this.worth = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Worth: ";
		    	} else if (preferences[0] == "fr") {
		    		return "Valeur: ";
		    	} else if (preferences[0] == "es") {
		    		return "Valor: ";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Wert: ";
		    	} else if (preferences[0] == "br") {
		    		return "Valor: ";
		    	} else if (preferences[0] == "ru") {
		    		return "Ценность: ";
		    	}
		    }, this);
		   this.spent = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Spent";
		    	} else if (preferences[0] == "fr") {
		    		return "Dépensé";
		    	} else if (preferences[0] == "es") {
		    		return "Gasto";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Erschöpft";
		    	} else if (preferences[0] == "br") {
		    		return "Gasto";
		    	} else if (preferences[0] == "ru") {
		    		return "Потраченный";
		    	}
		    }, this);
		   this.owned = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Owned: ";
		    	} else if (preferences[0] == "fr") {
		    		return "Possède: ";
		    	} else if (preferences[0] == "es") {
		    		return "Poseo: ";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Besitz: ";
		    	} else if (preferences[0] == "br") {
		    		return "Possui: ";
		    	} else if (preferences[0] == "ru") {
		    		return "В собственности: ";
		    	}
		    }, this);
		   this.salePrice = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return " Sale Price: ";
		    	} else if (preferences[0] == "fr") {
		    		return " Prix ​​vente: ";
		    	} else if (preferences[0] == "es") {
		    		return " Precio de venta: ";
		    	} else if (preferences[0] == "de_DE") {
		    		return " Verkaufspreis: ";
		    	} else if (preferences[0] == "br") {
		    		return " Preço venda: ";
		    	} else if (preferences[0] == "ru") {
		    		return " Цена продажи: ";
		    	}
		    }, this);
		   this.currPrice = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return " Current Price: ";
		    	} else if (preferences[0] == "fr") {
		    		return " Prix ​​actuel: ";
		    	} else if (preferences[0] == "es") {
		    		return " Precio actual: ";
		    	} else if (preferences[0] == "de_DE") {
		    		return " Derzeitiger Preis: ";
		    	} else if (preferences[0] == "br") {
		    		return " Preço atual: ";
		    	} else if (preferences[0] == "ru") {
		    		return " Текущая цена: ";
		    	}
		    }, this);
		   this.avgPortPrice = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return " Portfolio price: ";
		    	} else if (preferences[0] == "fr") {
		    		return " Prix portefeuille: ";
		    	} else if (preferences[0] == "es") {
		    		return " Precio cartera: ";
		    	} else if (preferences[0] == "de_DE") {
		    		return " Portfoliopreis: ";
		    	} else if (preferences[0] == "br") {
		    		return " Preço carteira: ";
		    	} else if (preferences[0] == "ru") {
		    		return " Стоимость портфеля: ";
		    	}
		    }, this);
		    this.explanationSale = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "This shows you the price this asset must reach so that you can have a profit after paying trading fees";
		    	} else if (preferences[0] == "fr") {
		    		return "Ceci vous montre le prix que cet atout doit atteindre pour que vous puissiez réaliser un profit après avoir payé les frais de transaction";
		    	} else if (preferences[0] == "es") {
		    		return "Esto le muestra el precio que debe alcanzar este activo para que pueda obtener un lucro después de pagar las tarifas de transacción";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Dies zeigt Ihnen den Preis, den dieser Vermögenswert erreichen muss, damit Sie nach Zahlung der Handelsgebühren einen Gewinn erzielen können";
		    	} else if (preferences[0] == "br") {
		    		return "Isso mostra o preço que esse ativo precisa atingir para que possa obter lucro depois de pagar as taxas de transação";
		    	} else if (preferences[0] == "ru") {
		    		return "Это показывает цену, которую должен достичь этот актив, чтобы вы могли получить прибыль после уплаты торговых комиссий";
		    	}
		    }, this);
		    this.explanationPortfolio = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "This shows you the average value of each asset on your portfolio calculated from the amount of money you spent on it";
		    	} else if (preferences[0] == "fr") {
		    		return "Ceci vous montre la valeur moyenne de chaque atout de votre portefeuille calculée à partir du montant d'argent que vous y avez dépensé";
		    	} else if (preferences[0] == "es") {
		    		return "Esto le muestra el valor promedio de cada activo en su cartera calculado a partir de la cantidad de dinero que gastó en él";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Dies zeigt Ihnen den Durchschnittswert jedes Vermögenswerts in Ihrem Portfolio, berechnet aus dem Geldbetrag, den Sie dafür ausgegeben haben";
		    	} else if (preferences[0] == "br") {
		    		return "Isto mostra o valor médio de cada ativo no seu portfólio calculado a partir domontante de dinheiro que gastou nele";
		    	} else if (preferences[0] == "ru") {
		    		return "Это показывает вам среднюю стоимость каждого актива в вашем портфеле, рассчитанную на основе суммы денег, которую вы потратили на него";
		    	}
		    }, this);
		    this.explanationCurrent = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "This shows you the current market price of this asset";
		    	} else if (preferences[0] == "fr") {
		    		return "Ceci vous montre le prix actuel du marché de cet atout";
		    	} else if (preferences[0] == "es") {
		    		return "Esto le muestra el precio de mercado actual de este activo";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Dies zeigt Ihnen den aktuellen Marktpreis dieses Vermögenswerts";
		    	} else if (preferences[0] == "br") {
		    		return "Isto mostra o preço de mercado atual desse ativo";
		    	} else if (preferences[0] == "ru") {
		    		return "Это показывает текущую рыночную цену этого актива";
		    	}
		    }, this);
		    this.display = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Add to list";
		    	} else if (preferences[0] == "fr") {
		    		return "Ajouter à la liste";
		    	} else if (preferences[0] == "es") {
		    		return "Agregar a la lista";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Zur Liste hinzufügen";
		    	} else if (preferences[0] == "br") {
		    		return "Adicionar à lista";
		    	} else if (preferences[0] == "ru") {
		    		return "добавить в список";
		    	}
		    }, this);
		    this.doNotDisplay = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Hide";
		    	} else if (preferences[0] == "fr") {
		    		return "Cacher";
		    	} else if (preferences[0] == "es") {
		    		return "Esconder";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Ausblenden";
		    	} else if (preferences[0] == "br") {
		    		return "Esconder";
		    	} else if (preferences[0] == "ru") {
		    		return "Скрывать";
		    	}
		    }, this);
		    this.login = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Login";
		    	} else if (preferences[0] == "fr") {
		    		return "Se connecter";
		    	} else if (preferences[0] == "es") {
		    		return "Iniciar sesión";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Einloggen";
		    	} else if (preferences[0] == "br") {
		    		return "Conecte-se";
		    	} else if (preferences[0] == "ru") {
		    		return "Авторизоваться";
		    	}
		    }, this);
		    this.logout = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Logout";
		    	} else if (preferences[0] == "fr") {
		    		return "Déconnexion";
		    	} else if (preferences[0] == "es") {
		    		return "Cerrar sesión";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Ausloggen";
		    	} else if (preferences[0] == "br") {
		    		return "Terminar sessão";
		    	} else if (preferences[0] == "ru") {
		    		return "Выйти";
		    	}
		    }, this);
		    this.deleteAccount = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Delete account";
		    	} else if (preferences[0] == "fr") {
		    		return "Supprimer compte";
		    	} else if (preferences[0] == "es") {
		    		return "Eliminar cuenta";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Konto löschen";
		    	} else if (preferences[0] == "br") {
		    		return "Apagar conta";
		    	} else if (preferences[0] == "ru") {
		    		return "Удалить аккаунт";
		    	}
		    }, this);
		    this.transactions = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Transactions";
		    	} else if (preferences[0] == "fr") {
		    		return "Transactions";
		    	} else if (preferences[0] == "es") {
		    		return "Transacciones";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Transaktionen";
		    	} else if (preferences[0] == "br") {
		    		return "Transações";
		    	} else if (preferences[0] == "ru") {
		    		return "Транзакции";
		    	}
		    }, this);
		    this.changeName = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Change name";
		    	} else if (preferences[0] == "fr") {
		    		return "Changer le nom";
		    	} else if (preferences[0] == "es") {
		    		return "Cambiar el nombre";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Namen ändern";
		    	} else if (preferences[0] == "br") {
		    		return "Alterar o nome";
		    	} else if (preferences[0] == "ru") {
		    		return "Изменить имя";
		    	}
		    }, this);
		    this.currency = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Currency";
		    	} else if (preferences[0] == "fr") {
		    		return "Devise";
		    	} else if (preferences[0] == "es") {
		    		return "Divisa";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Währung";
		    	} else if (preferences[0] == "br") {
		    		return "Moeda";
		    	} else if (preferences[0] == "ru") {
		    		return "Валюта";
		    	}
		    }, this);
		    this.timezone = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Time zone";
		    	} else if (preferences[0] == "fr") {
		    		return "Fuseau horaire";
		    	} else if (preferences[0] == "es") {
		    		return "Huso horario";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Zeitzone";
		    	} else if (preferences[0] == "br") {
		    		return "Fuso horário";
		    	} else if (preferences[0] == "ru") {
		    		return "Часовой пояс";
		    	}
		    }, this);
		    this.language = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Language";
		    	} else if (preferences[0] == "fr") {
		    		return "Langue";
		    	} else if (preferences[0] == "es") {
		    		return "Idioma";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Sprache";
		    	} else if (preferences[0] == "br") {
		    		return "Idioma";
		    	} else if (preferences[0] == "ru") {
		    		return "Язык";
		    	}
		    }, this);
		    this.refreshDisplay = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Update";
		    	} else if (preferences[0] == "fr") {
		    		return "Actualiser";
		    	} else if (preferences[0] == "es") {
		    		return "Actualizar";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Aktualisieren";
		    	} else if (preferences[0] == "br") {
		    		return "Atualizar";
		    	} else if (preferences[0] == "ru") {
		    		return "Обновление";
		    	}
		    }, this);
		    this.rightMenu = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Right menu";
		    	} else if (preferences[0] == "fr") {
		    		return "Menu de droite";
		    	} else if (preferences[0] == "es") {
		    		return "Menú derecho";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Rechtes Menü";
		    	} else if (preferences[0] == "br") {
		    		return "Menu direito";
		    	} else if (preferences[0] == "ru") {
		    		return "Правое меню";
		    	}
		    }, this);
		    this.leftMenu = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Left menu";
		    	} else if (preferences[0] == "fr") {
		    		return "Menu de gauche";
		    	} else if (preferences[0] == "es") {
		    		return "Menú izquierdo";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Linkes Menü";
		    	} else if (preferences[0] == "br") {
		    		return "Menu esquerdo";
		    	} else if (preferences[0] == "ru") {
		    		return "Левое меню";
		    	}
		    }, this);
		    this.assets = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Assets";
		    	} else if (preferences[0] == "fr") {
		    		return "Atouts";
		    	} else if (preferences[0] == "es") {
		    		return "Activos";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Vermögenswerte";
		    	} else if (preferences[0] == "br") {
		    		return "Ativos";
		    	} else if (preferences[0] == "ru") {
		    		return "Aвуары";
		    	}
		    }, this);
		    this.settings = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Settings";
		    	} else if (preferences[0] == "fr") {
		    		return "Paramètres";
		    	} else if (preferences[0] == "es") {
		    		return "Configuración";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Einstellungen";
		    	} else if (preferences[0] == "br") {
		    		return "Configurações";
		    	} else if (preferences[0] == "ru") {
		    		return "Настройки";
		    	}
		    }, this);
		    this.welcome = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Welcome";
		    	} else if (preferences[0] == "fr") {
		    		return "Bienvenu(e)";
		    	} else if (preferences[0] == "es") {
		    		return "Bienvenido/a";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Willkommen";
		    	} else if (preferences[0] == "br") {
		    		return "Bem vindo/a";
		    	} else if (preferences[0] == "ru") {
		    		return "Добро пожаловать";
		    	}
		    }, this);
		    this.yourInvested = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Your invested ";
		    	} else if (preferences[0] == "fr") {
		    		return "Votre investissement de ";
		    	} else if (preferences[0] == "es") {
		    		return "Su inversión de ";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Ihre Investition von ";
		    	} else if (preferences[0] == "br") {
		    		return "O seu investimento de ";
		    	} else if (preferences[0] == "ru") {
		    		return "Ваши инвестиции в ";
		    	}
		    }, this);
		    this.isNowWorth = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return " is now worth ";
		    	} else if (preferences[0] == "fr") {
		    		return " vaut maintenant ";
		    	} else if (preferences[0] == "es") {
		    		return " ahora vale ";
		    	} else if (preferences[0] == "de_DE") {
		    		return " ist jetzt 400 ";
		    	} else if (preferences[0] == "br") {
		    		return " vale agora ";
		    	} else if (preferences[0] == "ru") {
		    		return " теперь стоят ";
		    	}
		    }, this);
		    this.isNowWorthSuffix = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "";
		    	} else if (preferences[0] == "fr") {
		    		return "";
		    	} else if (preferences[0] == "es") {
		    		return "";
		    	} else if (preferences[0] == "de_DE") {
		    		return " wert";
		    	} else if (preferences[0] == "br") {
		    		return "";
		    	} else if (preferences[0] == "ru") {
		    		return "";
		    	}
		    }, this);
		    this.update = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Update";
		    	} else if (preferences[0] == "fr") {
		    		return "Actualiser";
		    	} else if (preferences[0] == "es") {
		    		return "Actualizar";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Aktualisieren";
		    	} else if (preferences[0] == "br") {
		    		return "Atualizar";
		    	} else if (preferences[0] == "ru") {
		    		return "Обновлять";
		    	}
		    }, this);
		    this.cancel = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Cancel";
		    	} else if (preferences[0] == "fr") {
		    		return "Annuler";
		    	} else if (preferences[0] == "es") {
		    		return "Cancelar";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Absagen";
		    	} else if (preferences[0] == "br") {
		    		return "Cancelar";
		    	} else if (preferences[0] == "ru") {
		    		return "Отмена";
		    	}
		    }, this);
		    this.changeTheLanguage = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Change the language:";
		    	} else if (preferences[0] == "fr") {
		    		return "Changer la langue :";
		    	} else if (preferences[0] == "es") {
		    		return "Cambiar el idioma:";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Ändere die Sprache:";
		    	} else if (preferences[0] == "br") {
		    		return "Alterar o idioma:";
		    	} else if (preferences[0] == "ru") {
		    		return "Изменить язык:";
		    	}
		    }, this);
		    this.changeTheTimezone = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Change the time zone:";
		    	} else if (preferences[0] == "fr") {
		    		return "Modifier le fuseau horaire:";
		    	} else if (preferences[0] == "es") {
		    		return "Cambiar el huso horario:";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Zeitzone ändern:";
		    	} else if (preferences[0] == "br") {
		    		return "Alterar o fuso horário:";
		    	} else if (preferences[0] == "ru") {
		    		return "Изменить часовой пояс:";
		    	}
		    }, this);
		    this.chooseYourCurrency = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Choose your currency:";
		    	} else if (preferences[0] == "fr") {
		    		return "Choisissez votre devise:";
		    	} else if (preferences[0] == "es") {
		    		return "Seleccione su moneda:";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Wählen Sie Ihre Währung:";
		    	} else if (preferences[0] == "br") {
		    		return "Escolha a sua moeda";
		    	} else if (preferences[0] == "ru") {
		    		return "Выберите свою валюту:";
		    	}
		    }, this);
		    this.editYourTransactions = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Edit your transactions:";
		    	} else if (preferences[0] == "fr") {
		    		return "Modifiez vos transactions:";
		    	} else if (preferences[0] == "es") {
		    		return "Edite sus transacciones:";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Bearbeiten Sie Ihre Transaktionen:";
		    	} else if (preferences[0] == "br") {
		    		return "Altere as suas transações:";
		    	} else if (preferences[0] == "ru") {
		    		return "Отредактируйте свои транзакции:";
		    	}
		    }, this);
		    this.youDoNotOwnThisAsset = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "You do not own this asset";
		    	} else if (preferences[0] == "fr") {
		    		return "Vous ne possédez pas cet atout";
		    	} else if (preferences[0] == "es") {
		    		return "Usted no posee eso activo";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Sie besitzen diesen Inhalt nicht";
		    	} else if (preferences[0] == "br") {
		    		return "Não possui este ativo";
		    	} else if (preferences[0] == "ru") {
		    		return "Вы не владеете этим активом";
		    	}
		    }, this);
		    this.youOwnNoAssets = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "You own no assets";
		    	} else if (preferences[0] == "fr") {
		    		return "Vous ne possédez aucun bien";
		    	} else if (preferences[0] == "es") {
		    		return "No posee activos";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Sie besitzen kein Vermögen";
		    	} else if (preferences[0] == "br") {
		    		return "Não possui bens";
		    	} else if (preferences[0] == "ru") {
		    		return "У вас нет активов";
		    	}
		    }, this);
		    this.buy = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return 'Buy';
		    	} else if (preferences[0] == "fr") {
		    		return 'Achetez';
		    	} else if (preferences[0] == "es") {
		    		return 'Compre';
		    	} else if (preferences[0] == "de_DE") {
		    		return 'Kauf';
		    	} else if (preferences[0] == "br") {
		    		return 'Compre';
		    	} else if (preferences[0] == "ru") {
		    		return 'Купить';
		    	}
		    }, this);
		    this.sell = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Sell";
		    	} else if (preferences[0] == "fr") {
		    		return "Vendez";
		    	} else if (preferences[0] == "es") {
		    		return "Venda";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Verkauf";
		    	} else if (preferences[0] == "br") {
		    		return "Venda";
		    	} else if (preferences[0] == "ru") {
		    		return "Продавать";
		    	}
		    }, this);
		    this.assAmount = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Amount";
		    	} else if (preferences[0] == "fr") {
		    		return "Quantité";
		    	} else if (preferences[0] == "es") {
		    		return "Cantidad";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Menge";
		    	} else if (preferences[0] == "br") {
		    		return "Quantidade";
		    	} else if (preferences[0] == "ru") {
		    		return "Количество";
		    	}
		    }, this);
		    this.assPrice = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Price (EUR)";
		    	} else if (preferences[0] == "fr") {
		    		return "Prix (EUR)";
		    	} else if (preferences[0] == "es") {
		    		return "Precio (EUR)";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Preis (EUR)";
		    	} else if (preferences[0] == "br") {
		    		return "Preço (EUR)";
		    	} else if (preferences[0] == "ru") {
		    		return "Цена (евро)";
		    	}
		    }, this);
		    this.delTr = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Delete transaction";
		    	} else if (preferences[0] == "fr") {
		    		return "Supprimer transaction";
		    	} else if (preferences[0] == "es") {
		    		return "Eliminar transacción";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Transaktion löschen";
		    	} else if (preferences[0] == "br") {
		    		return "Apagar transação";
		    	} else if (preferences[0] == "ru") {
		    		return "Удалить транзакцию";
		    	}
		    }, this);
		    this.addTr = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Add new transaction";
		    	} else if (preferences[0] == "fr") {
		    		return "Ajouter une nouvelle transaction";
		    	} else if (preferences[0] == "es") {
		    		return "Agregar nueva transacción";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Neue Transaktion hinzufügen";
		    	} else if (preferences[0] == "br") {
		    		return "Adicionar nova transação";
		    	} else if (preferences[0] == "ru") {
		    		return "Добавить новую транзакцию";
		    	}
		    }, this);
		    this.confirmLogout = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Do you really want to logout?";
		    	} else if (preferences[0] == "fr") {
		    		return "Souhaitez-vous vraiment vous déconnecter?";
		    	} else if (preferences[0] == "es") {
		    		return "¿Desea mismo salir?";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Möchten Sie sich wirklich abmelden?";
		    	} else if (preferences[0] == "br") {
		    		return "Deseja mesmo sair?";
		    	} else if (preferences[0] == "ru") {
		    		return "Вы действительно хотите выйти?";
		    	}
		    }, this);
		    this.yes = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Yes";
		    	} else if (preferences[0] == "fr") {
		    		return "Oui";
		    	} else if (preferences[0] == "es") {
		    		return "Sí";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Ja";
		    	} else if (preferences[0] == "br") {
		    		return "Sim";
		    	} else if (preferences[0] == "ru") {
		    		return "Да";
		    	}
		    }, this);
		    this.no = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "No";
		    	} else if (preferences[0] == "fr") {
		    		return "Non";
		    	} else if (preferences[0] == "es") {
		    		return "No";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Nein";
		    	} else if (preferences[0] == "br") {
		    		return "Não";
		    	} else if (preferences[0] == "ru") {
		    		return "Нет";
		    	}
		    }, this);
		    this.confirmDelete = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Do you really want to delete your account?";
		    	} else if (preferences[0] == "fr") {
		    		return "Voulez-vous vraiment supprimer votre compte?";
		    	} else if (preferences[0] == "es") {
		    		return "¿Quiere mismo eliminar su cuenta?";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Möchten Sie Ihr Konto wirklich löschen?";
		    	} else if (preferences[0] == "br") {
		    		return "Deseja mesmo eliminar a sua conta?";
		    	} else if (preferences[0] == "ru") {
		    		return "Вы действительно хотите удалить свой аккаунт?";
		    	}
		    }, this);
		    this.trPortfolio = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Portfolio";
		    	} else if (preferences[0] == "fr") {
		    		return "Portefeuille";
		    	} else if (preferences[0] == "es") {
		    		return "Cartera";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Portfolio";
		    	} else if (preferences[0] == "br") {
		    		return "Portfólio";
		    	} else if (preferences[0] == "ru") {
		    		return "Портфолио";
		    	}
		    }, this);
		    this.trCurrent = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Current";
		    	} else if (preferences[0] == "fr") {
		    		return "Courant";
		    	} else if (preferences[0] == "es") {
		    		return "Actual";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Aktuelle";
		    	} else if (preferences[0] == "br") {
		    		return "Atual";
		    	} else if (preferences[0] == "ru") {
		    		return "Текущий";
		    	}
		    }, this);
		    this.trSale = ko.computed(function() {
		    	if (preferences[0] == "en") {
		    		return "Sale";
		    	} else if (preferences[0] == "fr") {
		    		return "Vente";
		    	} else if (preferences[0] == "es") {
		    		return "Venda";
		    	} else if (preferences[0] == "de_DE") {
		    		return "Verkauf";
		    	} else if (preferences[0] == "br") {
		    		return "Venda";
		    	} else if (preferences[0] == "ru") {
		    		return "Распродажа";
		    	}
		    }, this);
	}