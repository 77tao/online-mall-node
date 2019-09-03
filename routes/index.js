var express = require('express');
var router = express.Router();
var user = require('../controller/user');
var home = require('../controller/home');
var order = require('../controller/order');
var token = require('../middleware/token');

router.post('/register', user.register);

router.post('/login', user.login);

router.get('/userInfo', user.userInfo);

router.get('/oauth/redirect', user.oauth);

router.get('/getCarousel', home.getCarousel);

router.get('/getNews', home.getNews);

router.get('/getSeckillShopping', home.getSeckillShopping);

router.get('/getChannelType', home.getChannelType);

router.get('/getOrder', token.checkToken, order.getOrder);

module.exports = router;
