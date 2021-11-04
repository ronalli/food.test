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


export default card;