const express = require('express');
const xmlparser = require('express-xml-bodyparser');

const weatherController = require('../controllers/weatherController');

const router = express.Router();

/* GET users listing. */

router.post('/insert',xmlparser({trim: false, explicitArray: false}),weatherController.insert);
router.post('/getWeather',weatherController.fetchWeather);

module.exports = router;

