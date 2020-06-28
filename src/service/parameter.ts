import Parameter from "../database/modules/parameter";

export default {
  // 判断参数是否存在
  async isParameterName(name) {
    try {
      return await new Promise((resolve, reject) => {
        Parameter.findOne({ name: name })
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

  // 判断参数是否存在
  async isParameterId(id) {
    try {
      return await new Promise((resolve, reject) => {
        Parameter.findOne({ _id: id })
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

  // 添加参数
  async addParameter(parameterList: Array<Record<string, any>>) {
    try {
      return await new Promise((resolve, reject) => {
        const parameter = new Parameter(parameterList);
        parameter
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

  // 修改参数
  async updateParameter(condition, parameter) {
    try {
      return await new Promise((resolve, reject) => {
        Parameter.updateOne(condition, parameter)
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

  // 根据id获取参数列表
  async getParameterId(id) {
    try {
      return await new Promise((resolve, reject) => {
        Parameter.find({ _id: id })
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

  async getParameterTypeList(typeId) {
    try {
      return await new Promise((resolve, reject) => {
        Parameter.find({ typeId: typeId })
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

  async removeParameter(id) {
    try {
      return await new Promise((resolve, reject) => {
        Parameter.deleteOne({ _id: id })
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
