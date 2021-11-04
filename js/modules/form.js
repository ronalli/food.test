import { openModal, closeModal } from './modal';




function form(setTimeoutModal) {

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
		openModal('.modal', setTimeoutModal);

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
			closeModal('.modal');
		}, 4000);
	}
}

export default form;