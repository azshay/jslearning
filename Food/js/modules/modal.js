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

export default modal;
export {
    openModal
};
export {
    closeModal
};