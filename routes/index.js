var express = require('express');
var router = express.Router();
var multer  = require('multer');
var user = require('../controller/user');
var carousel = require('../controller/carousel');
var channel = require('../controller/channel');
var news = require('../controller/news');
var shop = require('../controller/shop');
var order = require('../controller/order');
var token = require('../middleware/token');
var shop_type = require('../controller/shop_type');
var upload = require('../controller/upload');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
})

var imageAddress = multer({ storage: storage })

router.post('/register', user.register);

router.post('/login', user.login);

router.post("/login/internal", user.internalLogin);

router.get('/userInfo', token.checkToken, user.userInfo);

router.get('/oauth/redirect', user.oauth);

router.get('/getUserList', token.checkToken, user.getUserList)

router.post('/addShopType', token.checkToken, shop_type.addShopType);

router.get('/getAllShopTypeList', token.checkToken, shop_type.getAllShopTypeList);

router.put('/updateShopTypeStatus', token.checkToken, shop_type.updateShopTypeStatus);

router.post('/uploadbrandLogo', imageAddress.single('file'), upload.uploadbrandLogo);

router.get('/getCarousel', carousel.getCarousel);

router.get('/getNews', news.getNews);

router.get('/getSeckillShopping', shop.getSeckillShopping);

router.get('/getTrolleyShopping', shop.getTrolleyShopping);

router.get('/getChannelType', channel.getChannelType);

router.get('/getOrder', token.checkToken, order.getOrder);

module.exports = router;
