"use strict";

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,

    start: function () {
        this.count = +prompt('Сколько фильмов вы уже посмотрели?', '');

        // Когда пользователь будет: 1) Вводить пустую строку 2) Отменять данное действие ввода
        // 3) Если это не число.
        while (this.count == '' || this.count == null || isNaN(this.count)) {
            this.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
        }
    },

    rememberMyFilms: function () {
        for (let i = 0; i < 2; i++) {
            const userAnswerFilm = prompt('Один из последних просмотренных фильмов?', '');
            const userAnswerScoreFilm = prompt('На сколько оцените его?');
            if (userAnswerFilm != null && userAnswerScoreFilm != null && userAnswerFilm.length < 50 &&
                userAnswerScoreFilm != '' && userAnswerFilm != '') {
                this.movies[userAnswerFilm] = userAnswerScoreFilm;
            } else {
                i--;
            }
        }
    },

    detectPersonalLevel: function () {
        if (this.count > 0 && this.count < 10) {
            alert('Просмотрено довольно мало фильмов');
        } else if (this.count <= 30 && this.count >= 10) {
            alert('Вы классический зритель');
        } else if (this.count > 30) {
            alert('Вы кинноман');
        } else {
            alert('Что-то пошло не так :/');
        }
    },

    showMyDB: function (hidden) {
        if (!hidden) {
            console.log(personalMovieDB);
        }
    },

    writeYourGenres: function () {
        for (let i = 0; i < 3; i++) {
            const userAnswer = prompt(`Ваш любимый жанр под номером ${i + 1}`);
            if (userAnswer != null && userAnswer != '') {
                this.genres[i] = userAnswer;
            } else {
                console.log('Error. Incorrect input.');
                i--;
            }
        }

        this.genres.forEach(function (item, itemIndex) {
            console.log(`Любимый жанр #${itemIndex + 1} - это ${item}`);
        });
    },

    toggleVisibleMyDB: function () {
        if (!this.privat) {
            this.privat = true;
        } else {
            this.privat = false;
        }
    }
};

personalMovieDB.start();
personalMovieDB.rememberMyFilms();
personalMovieDB.detectPersonalLevel();
personalMovieDB.showMyDB(personalMovieDB.privat);
personalMovieDB.writeYourGenres();
personalMovieDB.showMyDB(personalMovieDB.privat);
personalMovieDB.toggleVisibleMyDB(personalMovieDB.privat);
personalMovieDB.showMyDB(personalMovieDB.privat);