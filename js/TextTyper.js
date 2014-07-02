/*!
 * jQuery Text Animation Plugin
 * Copyright (c) 2014 Won You
 * Version: 1.0 (July 1, 2014)
 *
 * Free to use under the GPLv2 license.
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 */
(function($) {

	var defaults = {
				message: '', 
				speed: 15,
				cursor: "_",
				autostart: true,
				callback: null
			};

	function TextTyper(str, target, speed) {
		this.str = str;  //the user-defined string
		this.target = target; //the target DOM element's name
		this.speed = speed;  //The time interval to use for rendering text
		this.len = this.str.length; //The string length 
		this.counter = 0;  
		this.tracker = 0;
		this.lastCount = 0;
		this.typoText = "_"; //the precursor
	}

			
	$.fn.typer = function(options) {

		this.each(function(){

			var settings = $.extend(defaults, options);
			
			this.str = settings.message;  //the user-defined string
			this.target = $(this); 
			this.speed = settings.speed;  //The time interval to use for rendering text
			this.len = this.str.length; //The string length 
			this.counter = 0;  
			this.tracker = 0;
			this.lastCount = 0;
			this.typoText = settings.cursor; //the output string		
			
			if (settings.autostart){
				this.render();
			}
		});
		
		return this;
	}

	$.fn.typer.render = function(){
		var me = this;  //need a local reference to this for setInterval;
		me.typeInterval = setInterval(function(){me.genText();}, me.speed);
	}

	$.fn.typer.stop = function(){
		clearInterval(this.typeInterval);
	}

	function genText(){

		if (this.tracker >= this.len) {	
			this.stop();
			$(this.target).text(this.str);
			if (this.settings.callback){
				this.settings.callback();
			}
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

			$(this.target).text(this.typoText);
		}
	}
})(jQuery);