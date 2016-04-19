jQuery.prototype.validator = function(settings, styles){
		var standardSettings = {
			styles:{
				valid : 'valid',
				invalid: 'invalid',
			},
			selectors:{
				email: '#email',
				password: '#password',
			},
			patterns:{
				email: /\S+@\S+\.\S+/
			},

		};
		var $that = $(this);
		
		$.each(settings, function(input, value) {
			var $input = $that.find(input);
			$input.on('input', function() {
				validateInput($input, value);
			});
		});

		var validateInput = function($input, pattern) {
			switch(pattern.constructor) {
				case RegExp:
					break;
				case String: 
					break;
				case Object: 
					break;
			}
		};
};
