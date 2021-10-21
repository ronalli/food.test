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

	const deadLine = '2021-10-24';

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
		modalWindow.classList.toggle('show');
		document.body.style.overflow = '';
	}

	function openModal() {
		modalWindow.classList.toggle('show');
		document.body.style.overflow = 'hidden';
	}

	const setTimeoutModal = setTimeout(openModal, 3000);

	btnsModal.forEach(btn => {
		btn.addEventListener('click', () => {
			openModal();
			clearTimeout(setTimeoutModal);
		});
	});

	document.querySelector('[data-close]').addEventListener('click', closeModal);

	modalWindow.addEventListener('click', (e) => {
		if (e.target === modalWindow) {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
			closeModal();
		}
	});

	function showModalByScroll() {
		console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
		if (Math.ceil(window.scrollY + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);

});