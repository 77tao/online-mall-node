import Brand from '../database/modules/brand';
import BrandPic from '../database/modules/brand_pic';

export default {

  // 判断是否已存在
  async isBrandName(name) {
    try {
      return await new Promise((resolve, reject) => {
        Brand.findOne({ 'name': name }).then(data => {
          resolve(data);
        }).catch(err => {
          reject(err);
        });
      });
    } catch (err) {
      console.log(err);
    }
  },

  // 判断图片是否存在
  async isBrandPicId(id) {
    try {
      return await new Promise((resolve, reject) => {
        BrandPic.findOne({ _id: id }).then(data => {
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
  async addBrand(brandList: Array<Object>) {
    try {
      return await new Promise((resolve, reject) => {
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
  async getBrandList() {
    try {
      return await new Promise((resolve, reject) => {
        Brand.find().then(data => {
          resolve(data);
        })
      });
    } catch (err) {
      console.log(err);
    }
  },

  // 根据类型获取品牌列表
  async getTypeBrandList(typeId) {
    try {
      return await new Promise((resolve, reject) => {
        Brand.find({ "type": typeId }).then(data => {
          resolve(data);
        })
      });
    } catch (err) {
      console.log(err);
    }
  },

  // 获取品牌信息
  async getBrand(id) {
    try {
      return await new Promise((resolve, reject) => {
        Brand.findOne({ '_id': id }).then(data => {
          resolve(data);
        })
      });
    } catch (err) {
      console.log(err);
    }
  },

  // 添加品牌图片
  async addBrandPic(picList: Array<Object>) {
    try {
      return await new Promise((resolve, reject) => {
        const brandPic = new BrandPic(picList);
        brandPic.save().then((data) => {
          resolve(data);
        }).catch(err => {
          reject(err);
        })
      });
    } catch (err) {
      console.log(err);
    }
  },

  // 获取品牌图片列表
  async getBrandPicList() {
    try {
      return await new Promise((resolve, reject) => {
        BrandPic.find().then(data => {
          resolve(data);
        })
      });
    } catch (err) {
      console.log(err);
    }
  },

  // 根据品牌id获取品牌图片列表
  async getIdBrandPicList(brand_id) {
    try {
      return await new Promise((resolve, reject) => {
        BrandPic.find({ 'brand_id': brand_id }).then(data => {
          resolve(data);
        })
      });
    } catch (err) {
      console.log(err);
    }
  },

  // 修改品牌信息
  async updateBrand(condition, brandData) {
    try {
      return await new Promise((resolve, reject) => {
        Brand.updateOne(condition, brandData).then(data => {
          resolve(data);
        }).catch(err => {
          reject(err);
        });
      });
    } catch (err) {
      console.log(err);
    }
  },

  // 删除品牌图片
  async removeBrandPic(id) {
    try {
      return await new Promise((resolve, reject) => {
        BrandPic.deleteOne({ '_id': id }).then(data => {
          resolve(data);
        }).catch(err => {
          reject(err);
        });
      });
    } catch (err) {
      console.log(err);
    }
  },

  // 删除品牌信息
  async removeBrand(id) {
    try {
      return await new Promise((resolve, reject) => {
        Brand.deleteOne({ '_id': id }).then(data => {
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