"use strict";

function User(name, age) {
    let userName = name,
        userAge = age;

    this.getName = function () {
        return userName;
    };

    this.getAge = function () {
        return userAge;
    };
}

const azat = new User("Azat", 21);

console.log(azat.getName());


// CLASS ENCAPSULATION

class UserClass {
    constructor(name, age) {
        this._name = name;
        this._age = age;
    }

    setAge(age) {
        this._age = age;
    }

    getAge() {
        return this._age;
    }
}

const alina = new UserClass("Alina", 20);

alina.setAge(6);
console.log(alina.getAge());