"use strict";

let numberOfFilms;

function start() {
    numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');
    
    // Когда пользователь будет: 1) Вводить пустую строку 2) Отменять данное действие ввода
    // 3)
    while (numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms)) {
        numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');
    }
}

start();

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false,

    rememberMyFilms: function() {
        for (let i = 0; i < 2; i++) {
            const userAnswerFilm = prompt('Один из последних просмотренных фильмов?', '');
            const userAnswerScoreFilm = prompt('На сколько оцените его?');
            if (userAnswerFilm != null && userAnswerScoreFilm != null && userAnswerFilm.length < 50 &&
                userAnswerScoreFilm != '' && userAnswerFilm != '') {
                personalMovieDB.movies[userAnswerFilm] = userAnswerScoreFilm;
            } else {
                i--;
            }
        }
    },

    detectPersonalLevel: function() {
        if (personalMovieDB.count > 0 && personalMovieDB.count < 10) {
            alert('Просмотрено довольно мало фильмов');
        } else if (personalMovieDB.count <= 30 && personalMovieDB.count >= 10) {
            alert('Вы классический зритель');
        } else if (personalMovieDB.count > 30) {
            alert('Вы кинноман');
        } else {
            alert('Что-то пошло не так :/');
        }
    },

    showMyDB: function(hidden) {
        if (!hidden) {
            console.log(personalMovieDB);
        }
    },

    writeYourGenres: function() {
        for (let i = 0; i < 3; i++) {
            const userAnswer = prompt(`Ваш любимый жанр под номером ${i + 1}`);
            if (userAnswer != null && userAnswer != '') {
                personalMovieDB.genres[i] = userAnswer;
            } else {
                console.log('Error. Incorrect input.');
                i--;
            }
        }

        personalMovieDB.genres.forEach(function(item, itemIndex) {
            console.log(`Любимый жанр #${itemIndex + 1} - это ${item}`);
        });
    },

    toggleVisibleMyDB: function() {
        if (!personalMovieDB.privat) {
            personalMovieDB.privat = true;
        } else {
            personalMovieDB.privat = false;
        }
    }
};

personalMovieDB.rememberMyFilms();
personalMovieDB.detectPersonalLevel();
personalMovieDB.showMyDB(personalMovieDB.privat);
personalMovieDB.writeYourGenres();
personalMovieDB.showMyDB(personalMovieDB.privat);
personalMovieDB.toggleVisibleMyDB(personalMovieDB.privat);
personalMovieDB.showMyDB(personalMovieDB.privat);


// function rememberMyFilms() {
//     for (let i = 0; i < 2; i++) {
//         const userAnswerFilm = prompt('Один из последних просмотренных фильмов?', '');
//         const userAnswerScoreFilm = prompt('На сколько оцените его?');
//         if (userAnswerFilm != null && userAnswerScoreFilm != null && userAnswerFilm.length < 50 &&
//             userAnswerScoreFilm != '' && userAnswerFilm != '') {
//             personalMovieDB.movies[userAnswerFilm] = userAnswerScoreFilm;
//         } else {
//             i--;
//         }
//     }
// }

// rememberMyFilms();

// function detectPersonalLevel() {
//     if (personalMovieDB.count > 0 && personalMovieDB.count < 10) {
//         alert('Просмотрено довольно мало фильмов');
//     } else if (personalMovieDB.count <= 30 && personalMovieDB.count >= 10) {
//         alert('Вы классический зритель');
//     } else if (personalMovieDB.count > 30) {
//         alert('Вы кинноман');
//     } else {
//         alert('Что-то пошло не так :/');
//     }
// }

// detectPersonalLevel();

// function showMyDB(hidden) {
//     if (!hidden) {
//         console.log(personalMovieDB);
//     }
// }

// showMyDB(personalMovieDB.privat);

// function writeYourGenres() {
//     for (let i = 0; i < 3; i++) {
//         personalMovieDB.genres[i] = prompt(`Ваш любимый жанр под номером ${i + 1}`);

//     }
// }

// console.log(personalMovieDB);

// 'use strict';

// let money = +prompt('Ваш бюджет на месяц?', '');
// let time = prompt('Введите дату в формате YYYY-MM-DD');

// let appData = {
//     budget: money,
//     timeDate: time,

//     expenses: {

//     },

//     optionalExpenses: {

//     },

//     income: [],

//     savings: false
// };

// let firstAnswer = prompt('Введите обязательную статью расходов в этом месяце.');
// let secondAnswer = prompt('Во сколько обойдется?');
// appData.expenses.firstAnswer = secondAnswer;
// firstAnswer = prompt('Введите обязательную статью расходов в этом месяце.');
// secondAnswer = prompt('Во сколько обойдется?');
// appData.expenses.firstAnswer = secondAnswer;

// alert('Ваш бюджет на 1 день: ' + money / 30 + "$");