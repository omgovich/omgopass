(function(){

	// Omgopass
	var omgopass = function(options) {
		// check user options
		var options = options || {};
		// write settings object
		var settings = {
		    syllables: options.syllables || 3,
		    numbers: (options.numbers===false) ? false : true,
		    titlecase: (options.titlecase===false) ? false : true,
		    consonants: options.consonants || 'bcdfghklmnprstvz',
		    vowels: options.vowels || 'aeiouy'
		};
		// return password
		return getPassword(settings);
	};

	// get password function
	function getPassword(s) {
		var password = '';
		for (var i=0; i<s.syllables; i++) password += getSyllable(s.consonants, s.vowels, s.numbers, s.titlecase);
		return password;
	};

	// get syllable function
	function getSyllable(consonants, vowels, numbers, titlecase) {
		var syllable = getChar(consonants);
		if (titlecase) syllable = syllable.toUpperCase();
		syllable += getChar(vowels);
		if (getNumber(2,3) == 3) syllable += getChar(consonants);
		if (numbers) syllable += getNumber(0,9);
		return syllable;
	};

	// get char function
	function getChar(stack) {
		return stack.charAt( getNumber(0, stack.length-1) );
	};

	// get number function
	function getNumber(from,to) {
		return  Math.round((Math.random()*(to-from)+from));
	};

	// expose omgopass to the global object
	window.omgopass = omgopass;

}());