(function($) {
	  
  "use strict";
  
	$.fn.validation = function(settings) {


		var $that = $(this);

		$.each(settings, function(input, value) {
			var $input = $that.find(input);
			$input.on('input', function() {
				validateField($input, value);
			});
		});

		var validateField = function($input, pattern) {
			var emailPattern = /\S+@\S+\.\S+/;
			switch(pattern.constructor) {

				case String: 
					if(pattern == "email")
						highlightField($input, emailPattern.test($input.val()));
					else if(pattern == "password")
						highlightField($input, isPasswordStrong($input.val()));
					break;

				case RegExp:
					highlightField($input, pattern.test($input.val()));
					break;
			}
		};
		
		var isPasswordStrong = function(password) {
			var strength = 0;
			var length = password.toString().length;

			if(length >= 8) strength = strength + 2;
			if(/[a-z]/.test(password)) strength++; // alfa numeric small
			if(/[A-Z]/.test(password)) strength++; // alfa numeric big
			if(/[0-9]/.test(password)) strength++; // digits
			if(/[\W]/.test(password)) strength++; // specials

			if(strength >= 5)
				return true;
			else 
				return false;	
			};
		
		var highlightField = function($input, correct) {
			if(correct)
				$input.removeClass('invalid').addClass('valid');
			else
				$input.removeClass('valid').addClass('invalid');

			checkIfLockSubmit();

			return correct;
		};

		var checkIfLockSubmit = function() {
			var shouldBlockSubmit = false;

			$.each($that.children("input"), function(key, value){
				var $value = $(value);
				if($value.hasClass('invalid')) {
					shouldBlockSubmit = true;
					
					return;
				}
			});

			blockSubmit(shouldBlockSubmit);
		};

		var blockSubmit = function(doBlock) {
			var $submit = $that.children("[type='submit']");
			$submit.prop("disabled", doBlock);
		};

		return this;
	};
	
})(jQuery);
