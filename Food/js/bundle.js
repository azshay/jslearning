/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculate.js":
/*!*********************************!*\
  !*** ./js/modules/calculate.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculate() {
    // CALCULATE
    const resultCalculate = document.querySelector('.calculating__result span');

    let sex, height, weight, age, activity;

    if (localStorage.getItem("sex")) {
        sex = localStorage.getItem("sex");
    } else {
        sex = "female";
        localStorage.setItem("sex", "female");
    }

    if (localStorage.getItem("activity")) {
        activity = localStorage.getItem("activity");
    } else {
        activity = "1.375";
        localStorage.setItem("activity", "1.375");
    }

    function initCalculator(parentSelector, activityClass) {
        const parent = document.querySelectorAll(parentSelector + " div");

        parent.forEach((item) => {
            item.classList.remove(activityClass);
            if (item.getAttribute("id") === localStorage.getItem("sex")) {
                item.classList.add(activityClass);
            }

            if (item.getAttribute("data-activity") === localStorage.getItem("activity")) {
                item.classList.add(activityClass);
            }
        });
    }

    initCalculator("#gender", "calculating__choose-item_active");
    initCalculator(".calculating__choose_big", "calculating__choose-item_active");

    function calculateCalories() {
        if (!sex || !height || !weight || !age || !activity) {
            resultCalculate.textContent = "_____";
        } else {
            if (sex === "female") {
                resultCalculate.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activity);
            } else {
                resultCalculate.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activity);
            }
        }
    }

    calculateCalories();

    function getCalculateTabsInformation(parentSelector, activityClass) {
        const parent = document.querySelector(parentSelector);

        parent.addEventListener("click", (e) => {
            if (e.target.classList.contains(activityClass.replace(/_active/, ''))) {
                if (e.target.getAttribute('data-activity')) {
                    activity = e.target.getAttribute('data-activity');
                    localStorage.setItem('activity', e.target.getAttribute('data-activity'));
                } else {
                    sex = e.target.getAttribute("id");
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                parent.querySelectorAll("." + activityClass.replace(/_active/, '')).forEach(item => {
                    item.classList.remove(activityClass);
                });

                e.target.classList.add(activityClass);
            }

            calculateCalories();
        });
    }

    getCalculateTabsInformation("#gender", "calculating__choose-item_active");
    getCalculateTabsInformation(".calculating__choose_big", "calculating__choose-item_active");

    function getCalculateInputInfromation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener("input", () => {
            switch (input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calculateCalories();
        });
    }

    getCalculateInputInfromation("#height");
    getCalculateInputInfromation("#weight");
    getCalculateInputInfromation("#age");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculate);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


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

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");



function forms(formSelector) {
    const forms = document.querySelectorAll(formSelector);

    const messages = {
        loading: '../icons/spinner.svg',
        success: 'Success! :)',
        error: 'Error! Please try again later.'
    }

    forms.forEach(form => {
        bindPostData(form);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = messages.loading;
            form.appendChild(statusMessage);

            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            const formData = new FormData(form); // На вход - форма

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.postData)('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    thanksMessage(messages.success);
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 3000);
                })
                .catch(() => {
                    thanksMessage(messages.error);
                })
                .finally(() => {
                    form.reset();
                });

            // const object = {};
            // formData.forEach(function (value, key) {
            //     object[key] = value;
            // });
        });
    }

    function thanksMessage(message) {
        const startModal = document.querySelector('.modal__dialog');
        startModal.classList.add('hide');
        startModal.classList.remove('show');

        // openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close"></div>
                <div class="modal__title">
                    ${message}
                </div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            startModal.classList.remove('hide');
            startModal.classList.add('show');
            (0,_modal__WEBPACK_IMPORTED_MODULE_1__.closeModal)('.modal');
        }, 4000)
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal),
/* harmony export */   "closeModal": () => (/* binding */ closeModal)
/* harmony export */ });
function closeModal(modalDialogSelector) {
    const modalDialog = document.querySelector(modalDialogSelector);

    modalDialog.style.display = 'none';
    document.body.style.overflow = '';
}

function openModal(modalDialogSelector, openModalTimeout) {
    const modalDialog = document.querySelector(modalDialogSelector);

    modalDialog.style.display = 'block';
    document.body.style.overflow = 'hidden';
    clearInterval(openModalTimeout);
}

function modal(modalBtnsSelector, modalDialogSelector, openModalTimeout) {
    // Modal

    const modalBtns = document.querySelectorAll(modalBtnsSelector);
    const modalDialog = document.querySelector(modalDialogSelector);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalDialogSelector, openModalTimeout);
            document.removeEventListener('scroll', showModalByScroll);
        }
    }

    modalBtns.forEach((item) => {
        item.addEventListener('click', () => {
            openModal(modalDialogSelector, openModalTimeout);
        });
    });

    modalDialog.addEventListener('click', (e) => {
        if (e.target === modalDialog || e.target.getAttribute('data-close') == "") {
            closeModal(modalDialogSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape' && modalDialog.style.display == 'block') {
            closeModal(modalDialogSelector);
        }
    });

    document.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({
    sliderSelector,
    sliderPrevSelector,
    sliderNextSelector,
    totalSliderSelector,
    currentSliderSelector,
    slideWindowSelector,
    slidesContainerSelector
}) {
    // Slider

    const slideItems = document.querySelectorAll(sliderSelector);
    const prevSlide = document.querySelector(sliderPrevSelector);
    const nextSlide = document.querySelector(sliderNextSelector);
    const totalSlides = document.querySelector(totalSliderSelector);
    const currentSlide = document.querySelector(currentSliderSelector);
    const slidesWrapper = document.querySelector(slideWindowSelector);
    const width = window.getComputedStyle(slidesWrapper).width;
    const slidesInner = document.querySelector(slidesContainerSelector);
    const dotsArray = [];
    let slideIndex = 1;
    let offset = 0;

    // startSlider();

    // if (slideItems.length < 10) {
    //     totalSlides.textContent = `0${slideItems.length}`;
    // } else {
    //     totalSlides.textContent = slideItems.length;
    // }

    // function startSlider() {

    //     if (slideIndex > slideItems.length - 1) {
    //         slideIndex = 0;
    //     }

    //     if (slideIndex < 0) {
    //         slideIndex = 3;
    //     }

    //     slideItems.forEach(slideItem => {
    //         slideItem.classList.remove('show');
    //         slideItem.classList.add('hide');
    //     });

    //     slideItems[slideIndex].classList.remove('hide');
    //     slideItems[slideIndex].classList.add('show');

    //     if (slideItems.length < 10) {
    //         currentSlide.textContent = `0${slideIndex + 1}`;
    //     } else {
    //         currentSlide.textContent = slideIndex + 1;
    //     }
    // }

    // prevSlide.addEventListener("click", () => {
    //     slideIndex += -1;
    //     startSlider();
    // });

    // nextSlide.addEventListener("click", () => {
    //     slideIndex += 1;
    //     startSlider();
    // });


    // SLIDER NEW



    slidesInner.style.width = 100 * slideItems.length + "%";
    slidesInner.style.display = "flex";
    slidesInner.style.transition = "all 0.5s";

    slidesWrapper.style.overflow = "hidden";

    if (slideItems.length < 10) {
        totalSlides.textContent = `0${slideItems.length}`;
        changeCurrentSlide();
    } else {
        totalSlides.textContent = slideItems.length;
        changeCurrentSlide();
    }

    function changeCurrentSlide() {
        if (slideIndex < 10) {
            currentSlide.textContent = `0${slideIndex}`;
        } else {
            currentSlide.textContent = slideIndex;
        }
    }

    function changeActiveDot() {
        dotsArray.forEach(item => {
            item.style.backgroundColor = "transparent";
        });

        dotsArray[slideIndex - 1].style.backgroundColor = "#ffffff";
    }

    nextSlide.addEventListener("click", () => {
        if (offset == (+width.slice(0, width.length - 2) * (slideItems.length - 1))) {
            offset = 0;
            slideIndex = 1;
            changeCurrentSlide();
        } else {
            offset += +width.slice(0, width.length - 2);
            slideIndex += 1;
            changeCurrentSlide();
        }

        changeActiveDot();

        slidesInner.style.transform = `translateX(-${offset}px)`;
    });

    prevSlide.addEventListener("click", () => {
        if (offset == 0) {
            offset = (+width.slice(0, width.length - 2) * (slideItems.length - 1));
            slideIndex = slideItems.length;
            changeCurrentSlide();
        } else {
            offset -= +width.slice(0, width.length - 2);
            slideIndex -= 1;
            changeCurrentSlide();
        }

        changeActiveDot();

        slidesInner.style.transform = `translateX(-${offset}px)`;
    });

    const slider = document.querySelector(".offer__slider");
    const dots = document.createElement("ul");

    dots.style.cssText = `
        display: flex;
        list-style: none;
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
    `;

    slider.style.position = "relative";

    for (let i = 0; i < slideItems.length; i++) {
        const dot = document.createElement("li");
        dot.setAttribute("data-slide-to", i + 1);
        dot.style.cssText = `
            width: 11px;
            height: 11px;
            border: 1px solid #ffffff;
            border-radius: 100%;
            margin: 0 4px;
            cursor: pointer;
            transition: all 0.5s;
        `;

        if ((slideIndex - 1) == i) {
            dot.style.backgroundColor = "#ffffff";
        }

        dots.append(dot);
        dotsArray.push(dot);
    }

    dotsArray.forEach(dot => {
        dot.addEventListener("click", event => {
            slideIndex = +(dot.getAttribute("data-slide-to"));
            offset = (+width.slice(0, width.length - 2) * (slideIndex - 1));

            changeCurrentSlide();

            changeActiveDot();

            slidesInner.style.transform = `translateX(-${offset}px)`;
        });
    });

    slider.append(dots);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, tabsActiveClass) {
    const tabs = document.querySelectorAll(tabsSelector);
    const tabsContent = document.querySelectorAll(tabsContentSelector);
    const tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(tabsActiveClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(tabsActiveClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;


        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(discountEnd, id) {
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
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
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

            if (time.time <= 0) {
                clearInterval(timeInterval);

                days.innerHTML = 0;
                hours.innerHTML = 0;
                minutes.innerHTML = 0;
                seconds.innerHTML = 0;
            }
        }
    }

    setClock('.timer', discountEnd);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could't fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return await res.json();
}





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calculate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculate */ "./js/modules/calculate.js");










window.addEventListener("DOMContentLoaded", () => {
    const openModalTimeout = setTimeout(() => {
        openModal('.modal', openModalTimeout);
    }, 180000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])("2022-05-20", '.timer');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])('[data-modal]', '.modal', openModalTimeout);
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form');
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        sliderSelector: '.offer__slide',
        sliderNextSelector: ".offer__slider-next",
        sliderPrevSelector: ".offer__slider-prev",
        totalSliderSelector: '#total',
        currentSliderSelector: '#current',
        slideWindowSelector: '.offer__slider-wrapper',
        slidesContainerSelector: '.offer__slider-inner'
    });
    (0,_modules_calculate__WEBPACK_IMPORTED_MODULE_6__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map