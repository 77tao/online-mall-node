
var Shop = require('../database/modules/shop');
var Sku = require('../database/modules/sku');

module.exports = {
  // 添加商品
  async addShop(shopList) {
    try {
      return await new Promise((resolve,reject) => {
        var shop = new Shop(shopList);
        shop.save().then((data) => {
          resolve(data);
        }).catch(err => {
          reject(err);
        })
      });
    } catch (err) {
      console.log(err);
    }
  },
  
  // 添加sku
  async addSku (skuList) {
    try {
      return await new Promise((resolve,reject) => {
        var sku = new Sku(skuList);
        sku.save().then((data) => {
          resolve(data);
        }).catch(err => {
          reject(err);
        })
      });
    } catch (err) {
      console.log(err);
    }
  },
};