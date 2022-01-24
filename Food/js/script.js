"use strict";

window.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tabheader__item");
    const tabsContent = document.querySelectorAll(".tabcontent");
    const tabsParent = document.querySelector(".tabheader__items");

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;


        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    const discountEnd = "2022-02-01";

    function getTimeRemaining(endtime) {
        const time = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = Math.floor((time / (1000 * 60 * 60) % 24));
        const minutes = Math.floor((time / (1000 * 60) % 60));
        const seconds = Math.floor((time / 1000) % 60);

        return {
            'time': time,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = document.querySelector('#days');
        const hours = document.querySelector('#hours');
        const minutes = document.querySelector('#minutes');
        const seconds = document.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function getZero(num) {
            if (num >= 0 && num < 10) {
                return `0` + num;
            } else {
                return num;
            }
        }

        function updateClock() {
            const time = getTimeRemaining(endtime);

            days.innerHTML = getZero(time.days);
            hours.innerHTML = getZero(time.hours);
            minutes.innerHTML = getZero(time.minutes);
            seconds.innerHTML = getZero(time.seconds);

            if (time <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', discountEnd);

    // Modal

    const modalBtns = document.querySelectorAll('[data-modal]');
    const modalClose = document.querySelector('[data-close]');
    const modalDialog = document.querySelector('.modal');
    const openModalTimeout = setTimeout(openModal, 10000);

    function closeModal() {
        modalDialog.style.display = 'none';
        document.body.style.overflow = '';
    }

    function openModal() {
        modalDialog.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(openModalTimeout);
    }

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            document.removeEventListener('scroll', showModalByScroll);
        }
    }

    modalBtns.forEach((item) => {
        item.addEventListener('click', openModal)
    });

    modalClose.addEventListener('click', closeModal);

    modalDialog.addEventListener('click', (e) => {
        if (e.target === modalDialog) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape' && modalDialog.style.display == 'block') {
            closeModal();
        }
    });

    document.addEventListener('scroll', showModalByScroll);

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
            this.total = (+this.total / 76.51).toFixed(2);
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

    new MenuItem('img/tabs/vegy.jpg', 'Vegy', 'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        '229', '.menu .container', 'big').render();

    new MenuItem('img/tabs/elite.jpg', 'Elite', 'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        '550', '.menu .container').render();

    new MenuItem('img/tabs/post.jpg', 'Post', 'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        '430', '.menu .container').render();

    const forms = document.querySelectorAll('form');

    const messages = {
        loading: 'Loading...',
        success: 'Success! :)',
        error: 'Error! Please try again later.'
    }

    forms.forEach(form => {
        postData(form);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.innerHTML = messages.loading;
            form.appendChild(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php'); // Путь относительно index.html
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            const formData = new FormData(form); // На вход - форма

            console.log(formData + " FormData закончилась.");

            const object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });

            console.log(object);

            const json = JSON.stringify(object);

            console.log(json);

            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.innerHTML = messages.success;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 3000);
                } else {
                    statusMessage.innerHTML = messages.error;
                }
            });
        });
    }
});