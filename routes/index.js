var express = require('express');
var router = express.Router();
var user = require('../controller/user')
var home = require('../controller/home')
var token = require('../middleware/token');

router.post('/register', user.register);

router.post('/login', user.login);

router.get('/userInfo', user.userInfo);

router.get('/getCarousel', home.getCarousel);

router.get('/getNews', home.getNews);

router.get('/getSeckillShopping', home.getSeckillShopping);

router.get('/getChannelType', home.getChannelType);

module.exports = router;
