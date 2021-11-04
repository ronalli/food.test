import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import card from './modules/card';
import form from './modules/form';
import slider from './modules/slider';
import calc from './modules/calc';
import { openModal } from './modules/modal';



window.addEventListener('DOMContentLoaded', () => {

	const setTimeoutModal = setTimeout(() => openModal('.modal', setTimeoutModal), 50000000);

	tabs();
	timer();
	modal('[data-modal]', '.modal', setTimeoutModal);
	card();
	form(setTimeoutModal);
	slider();
	calc();
});

