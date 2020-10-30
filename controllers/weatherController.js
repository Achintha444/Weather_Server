const { getTemperature, getPressure } = require('../models/weatherModel');
const Weather = require('../models/weatherModel');
const { IDENTIFIER, SENDER } = require('../utils/details');
const { getTimeStamp } = require('../utils/getTimeStamp');
const { createXmlError, createAck, createError } = require('../utils/xmlParser');

const parseString = require('xml2js').parseString;

exports.insert = (req, res, next) => {
    var body = req.body
    var alert = body.alert;
    console.log('Check Controller Insert Call');
    //console.log(alert);
    try {
        if ((alert.identifier == IDENTIFIER) && (alert.sender == SENDER)) {
            parameters = alert.info.parameter;
            return Weather.insert(parameters).then(() => {
                res.status(200);
                res.set('Content-Type', 'text/xml');
                res.send(createAck(body));
            }).catch(() => {
                res.status(404);
                res.set('Content-Type', 'text/xml');
                res.send(createError(body));
            });

        } else {
            throw (Error('Cannot Identify the Sender'));
        }
    } catch (e) {
        res.status(404);
        res.set('Content-Type', 'text/xml');
        res.send(createXmlError(e, getTimeStamp()));
    }
}

exports.fetchWeather = (req, res, next) => {
    return Weather.getWeatherValue('temperature').then((resultTemp) => {
        Weather.getWeatherValue('pressure').then((resultPressure) => {
            Weather.getWeatherValue('ambient').then((resultAmbient) => {
                Weather.getWeatherValue('humidity').then((resultHumidity) => {
                    console.log(resultTemp);
                    res.status(200).json({
                        temperature: resultTemp[0].temperature,
                        temperatureTimeStamp: resultTemp[0].temperatureTimeStamp,
                        pressure: resultPressure[0].pressure,
                        pressureTimeStamp: resultPressure[0].pressureTimeStamp,
                        humidity: resultHumidity[0].humidity,
                        humidityTimeStamp: resultHumidity[0].humidityTimeStamp,
                        ambient: resultAmbient[0].ambient,
                        ambientTimeStamp: resultAmbient[0].ambientTimeStamp
                    });
                }).catch((err) => {
                    console.log('check3');
                    if (err) {
                        res.status(404).render('error', { error: 'Database Connection Error!', dbError: true });
                    }
                });
            }).catch((err) => {
                console.log('check4');
                if (err) {
                    res.status(404).render('error', { error: 'Database Connection Error!', dbError: true });
                }
            });
        }).catch((err) => {
            console.log('check5');
            if (err) {
                res.status(404).render('error', { error: 'Database Connection Error!', dbError: true });
            }
        });
    }).catch((err) => {
        console.log('check6');
        if (err) {
            res.status(404).render('error', { error: 'Database Connection Error!', dbError: true });
        }
    });

} 