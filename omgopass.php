<?php

// Omgopass
function omgopass($settings = array()) {
	// default settings
	$defaults = array(
		'syllables' => 3,
		'numbers' => true,
		'titlecase' => true,
		'consonants' => 'bcdfghklmnprstvz',
		'vowels' => 'aeiouy'
	);
	// merge defaults and user settings
	$settings = array_merge($defaults, $settings);
	// create and return password
	return omgopass_get_password($settings);
};

// get password function
function omgopass_get_password($s) {
	$password = '';
	for ($i=0; $i<$s['syllables']; $i++) $password .= omgopass_get_syllable($s['consonants'], $s['vowels'], $s['numbers'], $s['titlecase']);
	return $password;
};

// get syllable function
function omgopass_get_syllable($consonants, $vowels, $numbers, $titlecase) {
	$syllable = omgopass_get_char($consonants);
	if ($titlecase) $syllable = strtoupper($syllable);
	$syllable .= omgopass_get_char($vowels);
	if (rand(2,3) == 3) $syllable .= omgopass_get_char($consonants);
	if ($numbers) $syllable .= rand(0,9);
	return $syllable;
};

// get char function
function omgopass_get_char($stack) {
	return $stack[rand(0, strlen($stack)-1)];
};
