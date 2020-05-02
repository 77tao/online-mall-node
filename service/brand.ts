import Brand from '../database/modules/brand';

export default {
  
  // 判断是否已存在
  async isBrandName (name) {
    try {
      return await new Promise((resolve, reject) => {
        Brand.findOne({'name': name}).then(data => {
          resolve(data);
        }).catch(err => {
          reject(err);
        });
      });
    } catch (err) {
      console.log(err);
    }
  },

  // 添加品牌
  async addBrand (brandList: Array<Object>) {
    try {
      return await new Promise((resolve,reject) => {
        const brand = new Brand(brandList);
        brand.save().then((data) => {
          resolve(data);
        }).catch(err => {
          reject(err);
        })
      });
    } catch (err) {
      console.log(err);
    }
  },

  // 获取品牌信息列表
  async getBrandList () {
    try {
      return await new Promise((resolve,reject) => {
        Brand.find().then(data => {
          resolve(data);
        })
      });
    } catch (err) {
      console.log(err);
    }
  },

  // 根据类型获取品牌列表
  async getTypeBrandList (typeId) {
    try {
      return await new Promise((resolve,reject) => {
        Brand.find({"type": typeId}).then(data => {
          resolve(data);
        })
      });
    } catch (err) {
      console.log(err);
    }
  }
}