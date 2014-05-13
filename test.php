<?php
session_start();
	$band = $_SESSION['band'];
	$cupsize = $_SESSION['cupsize'];
	$bottom = $_SESSION['bottom'];
	echo "HELLLO";
	echo ($band . $cupsize) . "<br>";
	echo ($bottom);