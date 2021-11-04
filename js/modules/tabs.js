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

export default tabs;