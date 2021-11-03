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