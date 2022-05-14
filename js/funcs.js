

    The file has been saved successfully!

Choose your theme

    Blue
    Red
    Grey

Dashboard/Sidebar

    Reset Dashboard
    Reset Sidebar
    Reset Notifications

View
Select your Region

    United States
    United Kingdom
    Canada
    Australia and New Zealand
    Europe
    South America
    Asia
    Africa
    World

Region
Control Panel Language

    English
    Spanish
    German
    French
    Russian
    Arabic
    Bosnian
    Bulgarian
    Chinese (Simplified)
    Croatian
    Czech
    Danish
    Dutch
    Finnish
    Greek
    Hungarian
    Italian
    Japanese
    Norwegian
    Polish
    Portuguese
    Portuguese (Brazil)
    Serbian
    Swedish
    Turkish

Language | EN
Logout
Welcome, Miguel Pinto

    Dashboard
    Hosting Tools
    Domain Names
    Buy Services
    Cloud Servers
    Account
    Support

File Manager

    john.miguelpinto.dx.am
    miguelpinto.dx.am
    portfollow.miguelpinto.dx.am
    shapes.miguelpinto.dx.am

Are you new to our File Manager?

Discover all built in features.
Open Tutorial
Back Close Undo Changes Save
/home/www Up Level Home 	/home/www/ protection is enabled Disable

			if (fearAndGreedData.data[0].value > 7

 887

888

889

890

891

892

893

894

895

896

897

898

899

900

901

902

903

904

905

906

907

908

909

910

911

912

913

914

915

916

917

918

919

920

921

922

923

924

925

926

927

928

929

930

931

932

933

934

935

936

937

938

939

940

941

942

943

944

945

946

947

948

949

950

951

952

953

954

955

956

957

958

959

960

961

962

963

964

965

966

967

968

969

970

971

972

973

974

975

976

977

978

979

980

981

982

983

984

985

986

987

988

989

990

991

992

993

994

995

996

997

998

999

1000

1001

1002

1003

1004

1005

1006

1007

1008

1009

1010

1011

1012

1013

1014

1015

1016

1017

1018

1019

1020

1021

1022

1023

1024

1025

1026

1027

1028

1029

1030

1031

1032

1033

1034

1035

1036

1037

1038

1039

1040

1041

1042

1043

1044

1045

1046

1047

1048

1049

1050

1051

1052

1053

1054

1055

1056

1057

1058

1059

1060

1061

1062

1063

1064

1065

1066

1067

1068

1069

1070

1071

1072

1073

1074

1075

1076

1077

1078

1079

1080

1081

1082

1083

1084

1085

1086

1087

1088

1089

1090

1091

1092

1093

1094

1095

1096

1097

1098

1099

1100

1101

1102

1103

1104

1105

1106

1107

1108

1109

1110

1111

1112

1113

1114

1115

1116

1117

1118

1119

1120

1121

1122

1123

1124

1125

1126

1127

1128

1129

1130

1131

1132

1133

1134

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

 

		// Fill out headers

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

                        

			if (fearAndGreedData.data[0].value > 7.5) {

				$('#fear_index').css('color','green');

			} else if (fearAndGreedData.data[0].value > 5 && fearAndGreedData.data[0].value <= 7.5) {

				$('#fear_index').css('color','greenyellow');

			} else if (fearAndGreedData.data[0].value > 2.5 && fearAndGreedData.data[0].value <= 5) {

				$('#fear_index').css('color','orange');

			} else if (fearAndGreedData.data[0].value <= 2.5) {

				$('#fear_index').css('color','red');

			}

 

 

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

		   this.currentGreedAndFear = ko.computed(function() {

                        if (fearAndGreedData.data[0].value > 75) {

                                if (preferences[0] == "en") {

                                        return "Extreme greed";

                                } else if (preferences[0] == "fr") {

                                        return "Cupidité extrême";

                                } else if (preferences[0] == "es") {

                                        return "Codicia extrema";

                                } else if (preferences[0] == "de_DE") {

                                        return "Extreme Gier";

                                } else if (preferences[0] == "br") {

                                        return "Ganância extrema";

                                } else if (preferences[0] == "ru") {

                                        return "Крайняя жадность";

                                }

                        } else if (fearAndGreedData.data[0].value > 50 && fearAndGreedData.data[0].value <= 75) {

                                if (preferences[0] == "en") {

                                        return "Greed";

                                } else if (preferences[0] == "fr") {

                                        return "Cupidité";

                                } else if (preferences[0] == "es") {

                                        return "Codicia";

                                } else if (preferences[0] == "de_DE") {

                                        return "Gier";

                                } else if (preferences[0] == "br") {

                                        return "Ganância";

                                } else if (preferences[0] == "ru") {

                                        return "Жадность";

                                }

                        } else if (fearAndGreedData.data[0].value > 25 && fearAndGreedData.data[0].value <= 50) {

                                if (preferences[0] == "en") {

                                        return "Fear";

                                } else if (preferences[0] == "fr") {

                                        return "Peur";

                                } else if (preferences[0] == "es") {

                                        return "Miedo";

                                } else if (preferences[0] == "de_DE") {

                                        return "Angst";

                                } else if (preferences[0] == "br") {

                                        return "Medo";

                                } else if (preferences[0] == "ru") {

                                        return "Страх";

                                }

                        } else if (fearAndGreedData.data[0].value <= 25) {

                                if (preferences[0] == "en") {

                                        return "Extreme fear";

                                } else if (preferences[0] == "fr") {

                                        return "Peur extrême";

                                } else if (preferences[0] == "es") {

                                        return "Miedo extremo";

                                } else if (preferences[0] == "de_DE") {

                                        return "Extreme Angst";

                                } else if (preferences[0] == "br") {

                                        return "Medo extremo";

                                } else if (preferences[0] == "ru") {

© Copyright 2003 - 2022 - All rights reserved. Privacy Policy | Terms of Services | Refund Policy | Provisioning & Invoicing

