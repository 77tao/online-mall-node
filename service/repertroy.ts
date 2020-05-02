import Repertory from '../database/modules/repertory';

export default {
  // 添加库存信息
  async addRepertory (repertoryList) {
    try {
      return await new Promise((resolve,reject) => {
        var repertory = new Repertory(repertoryList);
        repertory.save().then((data) => {
          resolve(data);
        }).catch(err => {
          reject(err);
        })
      });
    } catch (err) {
      console.log(err);
    }
  }
}