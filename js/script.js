require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import card from './modules/card';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';
import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

	const setTimeoutModal = setTimeout(() => openModal('.modal', setTimeoutModal), 50000000);

	tabs();
	timer('.timer', '2021-11-11');
	modal('[data-modal]', '.modal', setTimeoutModal);
	card();
	forms('form', setTimeoutModal);
	slider({
		container: '.offer__slider',
		slide: '.offer__slide',
		totalCounter: '#total',
		currentCounter: '#current',
		prevArrow: '.offer__slider-prev',
		nextArrow: '.offer__slider-next',
		wrapper: '.offer__slider-wrapper',
		inner: '.offer__slider-inner',
	});
	calc();
});

