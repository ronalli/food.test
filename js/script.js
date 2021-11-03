window.addEventListener('DOMContentLoaded', () => {

	//Tabs

	const tabs = require('./modules/tabs');

	//Timer

	const timer = require('./modules/timer');

	//Modal Window

	const modal = require('./modules/modal');

	//Class Menu Card

	const card = require('./modules/card');

	//Form

	const form = require('./modules/form');

	//Slider

	const slider = require('./modules/slider');

	//Calculator

	const calc = require('./modules/calc');

	tabs();
	timer();
	modal();
	card();
	form();
	slider();
	calc();
});

