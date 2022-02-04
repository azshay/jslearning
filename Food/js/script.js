"use strict";

import tabs from "./modules/tabs";
import timer from "./modules/timer";
import modal from "./modules/modal";
import cards from "./modules/cards";
import forms from "./modules/forms";
import slider from "./modules/slider";
import calculate from "./modules/calculate";

window.addEventListener("DOMContentLoaded", () => {
    const openModalTimeout = setTimeout(() => {
        openModal('.modal', openModalTimeout);
    }, 180000);

    tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
    timer("2022-05-20", '.timer');
    modal('[data-modal]', '.modal', openModalTimeout);
    cards();
    forms('form');
    slider({
        sliderSelector: '.offer__slide',
        sliderNextSelector: ".offer__slider-next",
        sliderPrevSelector: ".offer__slider-prev",
        totalSliderSelector: '#total',
        currentSliderSelector: '#current',
        slideWindowSelector: '.offer__slider-wrapper',
        slidesContainerSelector: '.offer__slider-inner'
    });
    calculate();
});