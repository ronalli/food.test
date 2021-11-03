/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
	const result = document.querySelector('.calculating__result span');
	let sex, height, weight, age, ratio;

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('ratio', 1.375);
	}

	function initLocalSetting(selector, classActive) {
		const elements = document.querySelectorAll(`${selector} div`);

		elements.forEach(elem => {
			elem.classList.remove(classActive);
			if (elem.getAttribute('id') === localStorage.getItem('sex')) {
				elem.classList.add(classActive);
			}
			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				elem.classList.add(classActive);
			}
		});

	}

	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = '____';
			return;
		}

		if (sex === 'female') {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}

	calcTotal();

	function getStaticInformation(parentSelector, classActive) {
		const elements = document.querySelectorAll(`${parentSelector} div`);

		elements.forEach(element => {

			element.addEventListener('click', (e) => {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', e.target.getAttribute('data-ratio'));
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', e.target.getAttribute('id'));
				}
				elements.forEach(element => {
					element.classList.remove(classActive);
				});
				e.target.classList.add(classActive);
				calcTotal();
			});

		});
	}

	initLocalSetting('#gender', 'calculating__choose-item_active');
	initLocalSetting('.calculating__choose_big', 'calculating__choose-item_active');

	getStaticInformation('#gender', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');


	// function returnNumber(number) {
	// 	return +number.replace(/\D/g, '');
	// }

	function getDynamicInformation(selector) {
		const inputs = document.querySelectorAll(selector);
		inputs.forEach(input => {
			input.addEventListener('input', (e) => {

				if (e.target.value.match(/\D/g)) {
					e.target.style.border = '1px solid red';
				} else {
					e.target.style.border = 'none';
				}

				switch (e.target.getAttribute('id')) {
					case 'height':
						height = e.target.value;
						break;
					case 'weight':
						weight = e.target.value;
						break;
					case 'age':
						age = e.target.value;
						break;
				}
				calcTotal();
			});
		});
	}

	getDynamicInformation('.calculating__choose_medium');
}

module.exports = calc;

/***/ }),

/***/ "./js/modules/card.js":
/*!****************************!*\
  !*** ./js/modules/card.js ***!
  \****************************/
/***/ ((module) => {

function card() {

	class MenuCard {
		constructor(title, description, price, srcImage, alt, parentSelector, ...classes) {
			this.title = title;
			this.description = description;
			this.price = price;
			this.srcImage = srcImage;
			this.alt = alt;
			this.parent = document.querySelector(parentSelector);
			this.classes = classes;
			this.transfer = 26.70;
			this.changeToUAH();
		}

		changeToUAH() {
			this.price = Math.round(this.price * this.transfer);
		}

		render() {
			const element = document.createElement('div');
			if (this.classes.length === 0) {
				this.classes = 'menu__item';
				element.classList.add(this.classes);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}
			element.innerHTML = `
				<img src=${this.srcImage} alt="${this.alt}">
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.description}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
			`;
			this.parent.append(element);
		}
	}

	// getResource('http://localhost:3000/menu')
	// 	.then((data) => {
	// 		data.forEach(({ img, imgalt, title, descr, price }) => {
	// 			new MenuCard(title, descr, price, img, imgalt, ".menu .container").render();
	// 		});
	// 	});


	axios.get('http://localhost:3000/menu').then((data) => {
		data.data.forEach(({ img, imgalt, title, descr, price }) => {
			new MenuCard(title, descr, price, img, imgalt, ".menu .container").render();
		});
	});

}


module.exports = card;

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((module) => {

function form() {

	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо. Наш сотрудник скоро с Вами свяжется.',
		error: 'Произошла ошибка. Попробуйте позже.'
	};

	const forms = document.querySelectorAll('form');

	forms.forEach(item => {
		bindPostData(item);
	});

	const postData = async (url, data) => {
		let res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: data
		});
		return await res.json();
	};


	// async function getResource(url) {
	// 	let res = await fetch(url);
	// 	if (!res.ok) {
	// 		throw new Error(`Could not fetch ${url}, status: ${res.status}`);
	// 	}
	// 	return await res.json();
	// }

	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			form.insertAdjacentElement('afterend', statusMessage);
			e.preventDefault();

			const formData = new FormData(form);
			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData('http://localhost:3000/requests', json)
				.then((data) => {
					console.log(data);
					showThanksModal(message.success);
				})
				.catch(() => {
					showThanksModal(message.error);
				}).finally(() => {
					statusMessage.remove();
					form.reset();
				});

		});
	}

	//showThanksModal

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');
		prevModalDialog.classList.add('hide');
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
		<div class="modal__content">
			<div data-close class="modal__close">×</div>
			<div class="modal__title">${message}</div>
		</div>
		`;
		document.querySelector('.modal').append(thanksModal);

		setTimeout(() => {
			thanksModal.remove();
			// prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	}
}

module.exports = form;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {

	const btnsModal = document.querySelectorAll('[data-modal]'),
		modalWindow = document.querySelector('.modal');

	function closeModal() {
		modalWindow.classList.add('hide');
		modalWindow.classList.remove('show');
		// modalWindow.classList.toggle('show');
		document.body.style.overflow = '';
	}

	function openModal() {
		modalWindow.classList.add('show');
		modalWindow.classList.remove('hide');
		// modalWindow.classList.toggle('show');
		document.body.style.overflow = 'hidden';
		clearTimeout(setTimeoutModal);
	}

	const setTimeoutModal = setTimeout(openModal, 50000);

	btnsModal.forEach(btn => {
		btn.addEventListener('click', () => {
			openModal();
			clearTimeout(setTimeoutModal);
		});
	});

	// document.querySelector('[data-close]').addEventListener('click', closeModal);

	modalWindow.addEventListener('click', (e) => {
		if (e.target === modalWindow || e.target.getAttribute('data-close') === "") {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
			closeModal();
		}
	});

	function showModalByScroll() {
		if (Math.ceil(window.scrollY + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);

}


module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
	let currentIndexSlider = 1;
	let offset = 0;

	const slides = document.querySelectorAll('.offer__slide'),
		slider = document.querySelector('.offer__slider');
	const current = document.querySelector('#current');
	const total = document.querySelector('#total');
	const sliderPrev = document.querySelector('.offer__slider-prev');
	const sliderNext = document.querySelector('.offer__slider-next');
	const sliderWrapper = document.querySelector('.offer__slider-wrapper');
	const sliderInner = document.querySelector('.offer__slider-inner');
	const widthSlide = window.getComputedStyle(sliderWrapper).width;

	indexCheck(currentIndexSlider);

	sliderInner.style.display = 'flex';
	sliderInner.style.width = 100 * slides.length + '%';
	sliderInner.style.transition = '0.5s all';
	sliderWrapper.style.overflow = 'hidden';

	slides.forEach(item => {
		item.style.width = widthSlide;
	});

	function indexCheck(currentIndex, totalLength = slides.length) {
		current.textContent = currentIndex < 10 ? `0${currentIndex}` : currentIndex;
		total.textContent = totalLength < 10 ? `0${totalLength}` : totalLength;
	}

	function numberWithWidth(number) {
		return +number.replace(/\D/g, '');
	}


	sliderNext.addEventListener('click', () => {
		if (offset == numberWithWidth(widthSlide) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += numberWithWidth(widthSlide);
		}
		if (currentIndexSlider == slides.length) {
			currentIndexSlider = 1;
		} else {
			currentIndexSlider++;
		}
		indexCheck(currentIndexSlider);
		setStyleOpacity(massDots, currentIndexSlider);
		sliderInner.style.transform = `translateX(-${offset}px)`;
	});


	sliderPrev.addEventListener('click', () => {
		if (offset === 0) {
			offset = numberWithWidth(widthSlide) * (slides.length - 1);
		} else {
			offset -= numberWithWidth(widthSlide);
		}
		if (currentIndexSlider === 1) {
			currentIndexSlider = slides.length;
		} else {
			currentIndexSlider--;
		}
		indexCheck(currentIndexSlider);
		setStyleOpacity(massDots, currentIndexSlider);
		sliderInner.style.transform = `translateX(-${offset}px)`;
	});


	slider.style.position = 'relative';
	const indicators = document.createElement('ol');
	const massDots = [];
	indicators.classList.add('carousel-indicators');
	indicators.style.cssText = `
			position: absolute;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 15;
			display: flex;
			justify-content: center;
			margin-right: 15%;
			margin-left: 15%;
			list-style: none;
	`;
	slider.append(indicators);

	slides.forEach((item, index) => {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', index + 1);
		dot.style.cssText = `
				box-sizing: content-box;
				flex: 0 1 auto;
				width: 30px;
				height: 6px;
				margin-right: 3px;
				margin-left: 3px;
				cursor: pointer;
				background-color: #fff;
				background-clip: padding-box;
				border-top: 10px solid transparent;
				border-bottom: 10px solid transparent;
				opacity: .5;
				transition: opacity .6s ease;
		`;
		indicators.append(dot);
		massDots.push(dot);
		massDots[currentIndexSlider - 1].style.opacity = '1';
	});

	massDots.forEach(dot => {
		dot.addEventListener('click', () => {
			const index = dot.getAttribute('data-slide-to');
			offset = (+widthSlide.replace(/\D/g, '') * (index - 1));
			sliderInner.style.transform = `translateX(-${offset}px)`;
			currentIndexSlider = index;
			indexCheck(index);
			setStyleOpacity(massDots, index);
		});
	});

	function setStyleOpacity(arr, index) {
		arr.forEach(item => item.style.opacity = '0.5');
		arr[index - 1].style.opacity = '1';
	}
}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
	const tabsContent = document.querySelectorAll('.tabcontent');
	const tabs = document.querySelectorAll('.tabheader__item');
	const tabsParent = document.querySelector('.tabheader__items');
	// const btnsModal = document.querySelectorAll('[data-modal]'),
	// 	modalWindow = document.querySelector('.modal');


	function hideTabContent() {
		tabsContent.forEach(item => {
			// item.style.display = 'none';
			item.classList.add('hide');
			item.classList.remove('show');
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(index = 0) {
		tabs[index].classList.add('tabheader__item_active');
		// tabsContent[index].style.display = 'block';
		tabsContent[index].classList.add('show');
	}

	tabsParent.addEventListener('click', (e) => {
		let target = e.target;
		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target === item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	hideTabContent();
	showTabContent();
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {

	const deadLine = '2021-11-11';

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date());
		const days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor((t / (1000 * 60 * 60)) % 24),
			minutes = Math.floor((t / (1000 * 60)) % 60),
			seconds = Math.floor((t / 1000) % 60);
		return {
			t,
			days,
			hours,
			minutes,
			seconds
		};
	}

	function getZero(num) {
		return (num >= 0 && num < 10) ? `0${num}` : num;
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector);
		const days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds');
		const timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const time = getTimeRemaining(endtime);

			days.innerHTML = getZero(time.days);
			hours.innerHTML = getZero(time.hours);
			minutes.innerHTML = getZero(time.minutes);
			seconds.innerHTML = getZero(time.seconds);

			if (time.t <= 0) {
				clearInterval(timeInterval);
				days.innerHTML = '00';
				hours.innerHTML = '00';
				minutes.innerHTML = '00';
				seconds.innerHTML = '00';
			}
		}
	}

	setClock('.timer', deadLine);

}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', () => {

	//Tabs

	const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");

	//Timer

	const timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

	//Modal Window

	const modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");

	//Class Menu Card

	const card = __webpack_require__(/*! ./modules/card */ "./js/modules/card.js");

	//Form

	const form = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");

	//Slider

	const slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");

	//Calculator

	const calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");

	tabs();
	timer();
	modal();
	card();
	form();
	slider();
	calc();
});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map