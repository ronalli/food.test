window.addEventListener('DOMContentLoaded', () => {

	//Tabs
	const tabsContent = document.querySelectorAll('.tabcontent');
	const tabs = document.querySelectorAll('.tabheader__item');
	const tabsParent = document.querySelector('.tabheader__items');
	const btnsModal = document.querySelectorAll('[data-modal]'),
		modalWindow = document.querySelector('.modal');


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

	//Timer

	const deadLine = '2021-10-29';

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

	//Modal Window

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

	//Class Menu Card

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

	//Form

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


	//Slider

	const sliders = document.querySelector('.offer__slider-wrapper');
	let currentIndexSlider = 1;
	const currentSlider = document.querySelector('#current');
	const sliderPrev = document.querySelector('.offer__slider-prev');
	const sliderNext = document.querySelector('.offer__slider-next');

	function runSlider(sliders) {
		const arr = [...sliders.children];
		arr.forEach(item => {
			item.classList.add('hide');
		});
		arr[currentIndexSlider - 1].classList.remove('hide');
		currentSlider.textContent = currentIndexSlider < 10 ? `0${currentIndexSlider}` : `${currentIndexSlider}`;
	}

	sliderNext.addEventListener('click', () => {
		currentIndexSlider++;
		if (currentIndexSlider === 5) {
			currentIndexSlider = 1;
		}
		runSlider(sliders);
	});

	sliderPrev.addEventListener('click', () => {
		currentIndexSlider--;
		if (currentIndexSlider === 0) {
			currentIndexSlider = 4;
		}
		runSlider(sliders);
	});


	runSlider(sliders);

});