<?php
	function sanitise($str) {
		str_replace('\\',"",$str);
		str_replace('"',"",$str);
		str_replace('\'',"",$str);
		return $str;
	}

?>