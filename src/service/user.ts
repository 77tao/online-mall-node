import User from "../database/modules/user";
import md5 from "../middleware/md5";

export default {
  // 验证邮箱是否存在
  async isUserEmail(email) {
    try {
      return await new Promise((resolve, reject) => {
        User.findOne({ email: email })
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

  // 验证邮箱是否存在
  async isUserId(id) {
    try {
      return await new Promise((resolve, reject) => {
        User.findOne({ openid: id })
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

  // 添加用户
  async addUser(userData) {
    try {
      return await new Promise((resolve, reject) => {
        const user: any = new User(userData);
        const hash = md5.createHash(user.password);
        user.password = hash;
        user.role = "R";
        user
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

  async updateUser(id, outhData) {
    try {
      return await new Promise((resolve, reject) => {
        User.updateOne({ openid: id }, outhData)
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

  // 获取用户信息
  async getUserInfo(id) {
    try {
      return await new Promise((resolve, reject) => {
        User.findOne({ _id: id })
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

  // 获取用户信息列表
  async getUserList() {
    try {
      return await new Promise((resolve, reject) => {
        User.find()
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
