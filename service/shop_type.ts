import ShopType from '../database/modules/shop_type';

export default {
  // 验证商品类型是否存在
  async isShopTypeName (name) {
    try {
      return await new Promise((resolve, reject) => {
        ShopType.findOne({'name': name}).then(data => {
          resolve(data);
        }).catch(err => {
          reject(err);
        });
      });
    } catch (err) {
      console.log(err);
    }
  },

  // 添加商品类型
  async addShopType (shopTypeData) {
    try {
      return await new Promise((resolve, reject) => {
        const shopType = new ShopType(shopTypeData);
        shopType.save().then((data) => {
          resolve(data);
        }).catch((err) => {
          reject(err);
        })
      });
    } catch (err) {
      console.log(err);
    }
  },

  async getAllShopTypeList () {
    try {
      return await new Promise((resolve, reject) => {
        ShopType.find().then(data => {
          resolve(data);
        }).catch(err => {
          reject(err);
        });
      });
    } catch (err) {
      console.log(err);
    }
  },

  async updateShopTypeStatus (condition, updateData) {
    try {
      return await new Promise((resolve, reject) => {
        ShopType.updateOne(condition, updateData).then(data => {
          resolve(data);
        }).catch(err => {
          reject(err);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
}