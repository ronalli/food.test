

function slider({ container, slide, totalCounter, currentCounter, nextArrow, prevArrow, wrapper, inner }) {
	let currentIndexSlider = 1;
	let offset = 0;

	const slides = document.querySelectorAll(slide),
		slider = document.querySelector(container);
	const current = document.querySelector(currentCounter);
	const total = document.querySelector(totalCounter);
	const sliderPrev = document.querySelector(prevArrow);
	const sliderNext = document.querySelector(nextArrow);
	const sliderWrapper = document.querySelector(wrapper);
	const sliderInner = document.querySelector(inner);
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

export default slider;