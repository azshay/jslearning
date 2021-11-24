/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

"use strict";

let counter = 0;

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости :)",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против...",
    ],
};

// let counter = movieDB.movies.length;
movieDB.movies.sort();

// 1. Мой вариант.
// document.querySelector(".promo__adv").remove();

// 1. Вариант препод-ля
document.querySelectorAll(".promo__adv img").forEach(item => {
    item.remove();
});

// 2. 
document.querySelector(".promo__genre").textContent = "ДРАМА";

// 3.
document.querySelector(".promo__bg").style.backgroundImage =
    "url(../lesson-30/img/bg.jpg)";
// document.querySelectorAll(".promo__interactive-item").forEach((item) => {
//      item.innerHTML = `${movieDB.movies[counter]}<div class="delete"></div>`;
//      counter++;
//      console.log(movieDB.movies[counter]);
// });

// document.querySelectorAll(".promo__interactive-item").forEach((item) => {
//     if (counter != 0) {
//         item.innerHTML = `${movieDB.movies.length - counter + 1}. ${movieDB.movies[movieDB.movies.length - counter]}<div class="delete"></div>`;
//         counter--;
//     }
// });

const filmsList = document.querySelector(".promo__interactive-list");
filmsList.innerHTML = '';

while (counter != movieDB.movies.length) {
    filmsList.insertAdjacentHTML('beforeend', `
        <li class="promo__interactive-item">
            ${counter + 1}. ${movieDB.movies[counter]}
            <div class="delete"></div>
        </li>
    `);
    counter++;
}