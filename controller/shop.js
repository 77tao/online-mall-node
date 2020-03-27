// 商品数据相关接口
var shopService = require('../service/shop');
var repertroyService = require('../service/repertroy');
var ObjectId = require('mongodb').ObjectId;

module.exports = {
  // 添加商品
  async addShopping (req, res) {
    let { type, name, title, brand, content, attributeList, attributeTableList, 
      parameterList, presell, serverGuarantees, site, cost, status } = req.body;
    const shopList = {};
    shopList.name = name;
    shopList.type = type;
    shopList.title = title;
    shopList.status = status;
    shopList.brand = brand;
    shopList.content = content;
    shopList.attribute_list = attributeList;
    shopList.parameter_list = parameterList;
    shopList.presell = presell;
    shopList.server_guarantees = serverGuarantees;
    shopList.site = site;
    shopList.cost = cost;
    let shopResult = await shopService.addShop(shopList);
    let shop_id = shopResult._id;
    for (let value of attributeTableList) {
      const repertoryList = {};
      repertoryList.repertory = value.repertory;
      repertoryList.repertoryWarn = value.repertoryWarn;
      let repertroyResult = await repertroyService.addRepertory(repertoryList);
      const skuList = {};
      skuList.repertory_id = repertroyResult._id;
      skuList.price = value.price;
      skuList.skuNo = value.skuNo;
      skuList.shop_id = shop_id;
      skuList.attribute_value = value.attributeArr;
      await shopService.addSku(skuList);
    };
    res.status(200).send({
      code: 0,
      message: '添加成功',
    });
  },

  // 获取秒杀商品
  async getSeckillShopping (req, res) {
    try {
      res.status(200).send({
        data: 'success'
      });
    }catch (err) {
      res.status(400);
    }
  },
  // 获取购物车商品
  async getTrolleyShopping (req, res) {
    try {
      res.status(200).send({
        data: 'success'
      });
    }catch (err) {
      res.status(400);
    }
  },
}