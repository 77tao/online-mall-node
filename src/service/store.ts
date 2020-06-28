import Store from "../database/modules/store";

export default {
  // 添加店铺
  async addStore(storeList) {
    try {
      return await new Promise((resolve, reject) => {
        const store = new Store(storeList);
        store
          .save()
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    } catch (err) {
      console.log(err);
    }
  },
  //判断商铺名是否存在
  async isStoreName(name, typeId) {
    try {
      return await new Promise((resolve, reject) => {
        Store.findOne({ name: name, typeId: typeId })
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    } catch (err) {
      console.log(err);
    }
  },
  //判断商铺是否存在
  async isStoreId(id: string) {
    try {
      return await new Promise((resolve, reject) => {
        Store.findOne({ _id: id })
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    } catch (err) {
      console.log(err);
    }
  },
  // 获取店铺列表
  async getStoreList() {
    try {
      return await new Promise((resolve, reject) => {
        Store.find()
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    } catch (err) {
      console.log(err);
    }
  },
  // 根据商铺id获取商铺
  async getStore(id: string) {
    try {
      return await new Promise((resolve, reject) => {
        Store.findOne({ _id: id })
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    } catch (err) {
      console.log(err);
    }
  },
  // 修改商铺信息
  async updateStore(condition, storeData) {
    try {
      return await new Promise((resolve, reject) => {
        Store.updateOne(condition, storeData)
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    } catch (err) {
      console.log(err);
    }
  },
};
