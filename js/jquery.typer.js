/*!
 * jQuery Text Animation Plugin
 * Copyright (c) 2014 Won You
 * Version: 1.0 (July 1, 2014)
 * Plugin structure taken from Antonio Santiago's article:
 * http://acuriousanimal.com/blog/2013/01/15/things-i-learned-creating-a-jquery-plugin-part-i/
 * Free to use under the GPLv2 license.
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 */
(function($) {

	function TextTyper(element, settings) {
		
		this.el = element;
		this.$el = $(element);
		this.settings = $.extend( {}, $.fn.typer.defaults, settings );

		this._init();
	}

	TextTyper.prototype = {
		_init: function() {
				this.str = this.settings.message;  //the user-defined string
				this.speed = this.settings.speed;  //The time interval to use for rendering text
				this.len = this.str.length; //The string length 
				this.counter = 0;  
				this.tracker = 0;
				this.lastCount = 0;
				this.typoText = this.settings.cursor; //the output string
				this.autostart = this.settings.autostart;

				if (this.autostart){		
					this.start();
				}
		},
		
		destroy: function(){
			// Remove data
			this.$el.removeData();
		},
		
		stop: function(){
			clearInterval(this.typeInterval);
		},
		
		getSpeed: function(){
			return this.speed;
		},
	
		_genText: function(){

			if (this.tracker >= this.len) {	
				this.stop();
				this.$el.text(this.str);
				this.settings.callback();
			} 
			else {
				this.typoText = "";
				
				for (var i=0; i<this.tracker; i++){
					this.typoText += this.str.charAt(i);
				}

				this.typoText+="_";
				this.counter++;

				if (this.counter >= (2 + this.lastCount)){
					this.tracker++;
					this.lastCount = this.counter;
				}

				this.$el.text(this.typoText);
			}
		
		},
		
		start: function(){
			var me = this;
	
			this.typeInterval = setInterval(function(){me._genText();}, this.speed);
	
		}
	}

	
	$.fn.typer = function(options) {
		var args = arguments;
		console.log("\nbefore $.fn.typer.defaults speed: " + $.fn.typer.defaults.speed);
		if (options === undefined || typeof options === 'object') {
			// Creates a new plugin instance, for each selected element, and
			// store a reference within the element's data
			return this.each(function() {
				if (!$.data(this, 'plugin_typer')) {
					$.data(this, 'plugin_typer', new TextTyper(this, options));
				}
			});
		} else if (typeof options === 'string' && options[0] !== '_' ) {
			// Call a public plugin method (not starting with an underscore) for each 
			// selected element.
			if (Array.prototype.slice.call(args, 1).length == 0 && $.inArray(options, $.fn.typer.getters) != -1) {
				// If the user does not pass any arguments and the method allows to
				// work as a getter then break the chainability so we can return a value
				// instead the element reference.
				var instance = $.data(this[0], 'plugin_typer');
				return instance[options].apply(instance, Array.prototype.slice.call(args, 1));
			} else {
				// Invoke the specified method on each selected element
				return this.each(function() {
					var instance = $.data(this, 'plugin_typer');
					if (instance instanceof TextTyper && typeof instance[options] === 'function') {
						instance[options].apply(instance, Array.prototype.slice.call(args, 1));
					}
				});
			}
		}

	}

	$.fn.typer.getters = ['getSpeed'];
	
	$.fn.typer.defaults = {
			message: '', 
			speed: 15,
			cursor: "_",
			autostart: true,
			callback: function(){}
	}
})(jQuery);