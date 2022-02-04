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

export default slider;