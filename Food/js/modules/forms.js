import {
    postData
} from "../services/services";
import {
    closeModal
} from "./modal";

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

            postData('http://localhost:3000/requests', json)
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
            closeModal('.modal');
        }, 4000)
    }
}

export default forms;