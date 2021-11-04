function closeModal(modalSelector) {
	const modalWindow = document.querySelector(modalSelector);
	modalWindow.classList.add('hide');
	modalWindow.classList.remove('show');
	// modalWindow.classList.toggle('show');
	document.body.style.overflow = '';
}

function openModal(modalSelector, setTimeoutModal) {
	const modalWindow = document.querySelector(modalSelector);
	modalWindow.classList.add('show');
	modalWindow.classList.remove('hide');
	// modalWindow.classList.toggle('show');
	document.body.style.overflow = 'hidden';
	if (setTimeoutModal) {
		clearTimeout(setTimeoutModal);
	}
}

function modal(triggerSelector, modalSelector, setTimeoutModal) {

	const btnsModal = document.querySelectorAll(triggerSelector),
		modalWindow = document.querySelector(modalSelector);

	btnsModal.forEach(btn => {
		btn.addEventListener('click', () => {
			openModal(modalSelector, setTimeoutModal);
			// clearTimeout(setTimeoutModal);
		});
	});

	// document.querySelector('[data-close]').addEventListener('click', closeModal);

	modalWindow.addEventListener('click', (e) => {
		if (e.target === modalWindow || e.target.getAttribute('data-close') === "") {
			closeModal(modalSelector);
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
			closeModal(modalSelector);
		}
	});

	function showModalByScroll() {
		if (Math.ceil(window.scrollY + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
			openModal(modalSelector, setTimeoutModal);
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);

}


export default modal;

export { closeModal };
export { openModal };