jqueryTyper
===========

A simple jQuery plugin to do text animation

The plugin takes the following options:

  message: the string to be written out
  speed: the number of milliseconds between each character being printed out
  cursor: the character to display ahead of the message (default: "_");
	autostart: boolean to tell whether to wait to animate (default: true),
	callback: an optional callback function


Example:
$("#hello").typer({message:headline, callback: exampleCallback});
