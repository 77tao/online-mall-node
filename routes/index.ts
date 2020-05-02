import express from 'express';
import path from 'path';
import multer from 'multer';

import channel from '../controller/channel';
import attribute from '../controller/attribute';
import user from '../controller/user';
import carousel from '../controller/carousel';
import news from '../controller/news';
import shop from '../controller/shop';
import order from '../controller/order';
import token from '../middleware/token';
import shop_type from '../controller/shop_type';
import brand from '../controller/brand';
import upload from '../controller/upload';
import parameter from '../controller/parameter';
import store from '../controller/store';

let router = express.Router();

let brandAddress = multer({ storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/image/brand/'));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  }) 
})

let commodityAddress =  multer({ storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/image/commidity/'));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  }) 
})

router.post('/register', user.register);

router.post('/login', user.login);

router.post("/login/internal", user.internalLogin);

router.get('/userInfo', token.checkToken, user.userInfo);

router.get('/oauth/redirect', user.oauth);

router.get('/getUserList', token.checkToken, user.getUserList)

router.post('/addShopType', token.checkToken, shop_type.addShopType);

router.get('/getAllShopTypeList', token.checkToken, shop_type.getAllShopTypeList);

router.put('/updateShopTypeStatus', token.checkToken, shop_type.updateShopTypeStatus);

router.post('/uploadbrandLogo', brandAddress.single('file'), upload.uploadbrandLogo);

router.post('/uploadCommodityImage', commodityAddress.single('file'), upload.uploadCommodityImage);

router.post('/addBrand',token.checkToken, brand.addBrand);

router.get('/getBrandList',token.checkToken, brand.getBrandList);

router.get("/getTypeBrandList", token.checkToken, brand.getTypeBrandList);

router.post('/addAttribute', token.checkToken, attribute.addAttribute);

router.get('/getAttribute', token.checkToken, attribute.getAttribute);

router.post('/updateAttribute', token.checkToken, attribute.updateAttribte);

router.post("/removeAttribute", token.checkToken, attribute.removeAttribute);

router.get("/getTypeAttributeList", token.checkToken, attribute.getTypeAttributeList);

router.post('/addParameter', token.checkToken, parameter.addParameter);

router.get('/getParameterList', token.checkToken, parameter.getParameterList);

router.get("/getParameter", token.checkToken, parameter.getParameter);

router.post("/updateParameter", token.checkToken, parameter.updateParameter);

router.post("/removeParameter", token.checkToken, parameter.removeParameter);

router.post("/addStore", token.checkToken, store.addStore);

router.get("/getStoreList", token.checkToken, store.getStoreList);

router.get('/getCarousel', carousel.getCarousel);

router.get('/getNews', news.getNews);

router.post('/addShopping', shop.addShopping);

router.get('/getSeckillShopping', shop.getSeckillShopping);

router.get('/getTrolleyShopping', shop.getTrolleyShopping);

router.get('/getChannelType', channel.getChannelType);

router.get('/getOrder', token.checkToken, order.getOrder);

export default router;
