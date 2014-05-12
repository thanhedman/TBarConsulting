<?php
include('Sizing.php');
if ($_POST['command'] == 'submitSubjective') {
	$size = $_POST['size'];
	$chest = $_POST['chest'];
	$hips = $_POST['hips'];
	$cup = $_POST['cup'];
	$array = array(	'size' => $size,
					'chest' => $chest,
					'hips' => $hips,
					'cup' => $cup);
	if ( isset( $_SESSION['user_id'] ) ) {
		$array['user_id'] = $_SESSION['user_id'];
	}
	$sizing = new Sizing($array);
	$_SESSION['size'] = $sizing->size;
	$_SESSION['band'] = $sizing->band;
	$_SESSION['cupsize'] = $sizing->cupsize;
	$_SESSION['bottom'] = $sizing->bottom;
	$_SESSION['sizing'] = $sizing;
}

if ($_POST['command'] == 'submitObjective') {
	$band = $_POST['band'];
	$cupsize = $_POST['cupsize'];
	$bottom = $_POST['bottom'];
	$array = array(	'band' => $band,
					'bottom' => $bottom,
					'cupsize' => $cupsize);
	if ( isset( $_SESSION['user_id'] ) ) {
		$array['user_id'] = $_SESSION['user_id'];
	}
	$sizing = new ObjectiveSizing($array);
	$_SESSION['band'] = $sizing->band;
	$_SESSION['cupsize'] = $sizing->cupsize;
	$_SESSION['bottom'] = $sizing->bottom;
	$_SESSION['sizing'] = $sizing;
}