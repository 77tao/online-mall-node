var express = require('express');
var path = require('path');
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
var brand = require('../controller/brand');
var upload = require('../controller/upload');
var attribute = require('../controller/attribute');
var parameter = require('../controller/parameter')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/image/brand/'));
  },
  filename: function (req, file, cb) {
    console.log(file);
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

router.post('/addBrand',token.checkToken, brand.addBrand);

router.get('/getBrandList',token.checkToken, brand.getBrandList);

router.get("/getTypeBrandList", token.checkToken, brand.getTypeBrandList);

router.post('/addAttribute', token.checkToken, attribute.addAttribute);

router.get('/getAttributeList', token.checkToken, attribute.getAttributeList);

router.get('/getAttribute', token.checkToken, attribute.getAttribute);

router.post('/updateAttribute', token.checkToken, attribute.updateAttribte);

router.post("/removeAttribute", token.checkToken, attribute.removeAttribute);

router.get("/getTypeAttributeList", token.checkToken, attribute.getTypeAttributeList);

router.post('/addParameter', token.checkToken, parameter.addParameter);

router.get('/getParameterList', token.checkToken, parameter.getParameterList);

router.get('/getCarousel', token.checkToken, carousel.getCarousel);

router.get('/getNews', news.getNews);

router.get('/getSeckillShopping', shop.getSeckillShopping);

router.get('/getTrolleyShopping', shop.getTrolleyShopping);

router.get('/getChannelType', channel.getChannelType);

router.get('/getOrder', token.checkToken, order.getOrder);

module.exports = router;
