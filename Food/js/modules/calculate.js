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

export default calculate;