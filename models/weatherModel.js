const db = require('../utils/database');
const { getTimeStamp } = require('../utils/getTimeStamp');

module.exports = class Weather {
    static insert(input) {
        return new Promise((resolve) => {
            console.log('Check Model Insert Call');
            //resolve(db.query('START TRANSACTION;'));
            var i;
            for (i = 0; i < 4; i++) {
                resolve(db.query("INSERT INTO " + input[i].valuename + " (timeStamp,value) VALUES (?,?)",
                    [getTimeStamp(), input[i].value]));
            }
            //resolve(db.query('COMMIT;'));
        }).catch((err) => {
            console.log(err);
        });
    }

    static getWeatherValue(weather) {
        return new Promise((resolve) => {
            "SELECT fields FROM table ORDER BY id DESC LIMIT 1;"
            resolve(db.query("SELECT value AS "+weather+", timeStamp AS "+weather+"TimeStamp FROM "+weather+" ORDER BY id DESC LIMIT 1;"))
        }).catch((err) => {
            console.log(err);
        });
    }

    static getTemperature() {
        return new Promise((resolve) => {
            "SELECT fields FROM table ORDER BY id DESC LIMIT 1;"
            resolve(db.query("SELECT value AS temperature FROM temperature ORDER BY id DESC LIMIT 1;"))
        }).catch((err) => {
            console.log(err);
        });
    }

    static getPressure() {
        return new Promise((resolve) => {
            "SELECT fields FROM table ORDER BY id DESC LIMIT 1;"
            resolve(db.query("SELECT value AS pressure FROM pressure ORDER BY id DESC LIMIT 1;"))
        }).catch((err) => {
            console.log(err);
        });
    }
}