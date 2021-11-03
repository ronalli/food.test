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