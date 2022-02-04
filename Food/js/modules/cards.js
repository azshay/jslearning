import {
    getResource
} from "../services/services";

function cards() {
    // MENU

    class MenuItem {
        constructor(imgSrc, imgAlt, subtitle, descr, total, parentSelector, ...classes) {
            this.imgSrc = imgSrc;
            this.imgAlt = imgAlt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.total = total;
            this.classes = classes;
            this.parentSelector = document.querySelector(parentSelector);
            this.convertToRUB();
        }

        convertToRUB() {
            this.total = (+this.total * 76.51).toFixed(2);
        }

        render() {
            const element = document.createElement('div');

            console.log(this.classes);

            if (this.classes.length === 0) {
                element.classList.add('menu__item');
            } else {
                let includeStandart = 0;
                this.classes.forEach(item => {
                    if (item === 'menu__item') {
                        includeStandart = 1;
                    }
                });

                if (includeStandart === 0) {
                    element.classList.add('menu__item');
                }
            }

            element.innerHTML = `
                <img src="${this.imgSrc}" alt="${this.imgAlt}">
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.total}</span> руб/день</div>
                </div>
            `;
            this.parentSelector.append(element);
        }
    }

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
                img,
                altImg,
                title,
                descr,
                price
            }) => {
                new MenuItem(img, altImg, title, descr, price, '.menu .container').render();
            });
        });
}

export default cards;