import Attribute from "../database/modules/attribute";
import AttributeValue from "../database/modules/attribute_value";
export default {
  // 判断属性名称是否存在
  async isAttributeName(name: string, typeId: string) {
    try {
      return await new Promise((resolve, reject) => {
        Attribute.findOne({ name: name, typeId: typeId })
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

  // 添加属性
  async addAttribute(attributeList: Array<Record<string, any>>) {
    try {
      return await new Promise((resolve, reject) => {
        const attributes = new Attribute(attributeList);
        attributes
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

  // 添加属性值
  async addAttributeValue(attributeValueList: Array<Record<string, any>>) {
    try {
      return await new Promise((resolve, reject) => {
        const attributeValue = new AttributeValue(attributeValueList);
        attributeValue
          .save()
          .then((data) => {
            resolve(data);
          })
          .catch(() => {
            reject();
          });
      });
    } catch (err) {
      console.log(err);
    }
  },

  // 验证属性是否存在
  async isAttribute(id: string) {
    try {
      return await new Promise((resolve, reject) => {
        Attribute.findOne({ _id: id })
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

  // 修改属性信息
  async updateAttribute(condition, attributeData) {
    try {
      return await new Promise((resolve, reject) => {
        Attribute.updateOne(condition, attributeData)
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

  // 修改属性值信息
  async updateAttributeValue(condition, attributeValueData) {
    try {
      return await new Promise((resolve, reject) => {
        AttributeValue.updateOne(condition, attributeValueData)
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

  // 查询属性信息
  async getAttribute(id: string) {
    try {
      return await new Promise((resolve, reject) => {
        Attribute.find({ _id: id })
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

  // 查询属性值
  async getAttributeValue(id: string) {
    try {
      return await new Promise((resolve, reject) => {
        AttributeValue.find({ attribute_id: id })
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

  // 根据类型获取属性
  async getAttributeType(typeId: string) {
    try {
      return await new Promise((resolve, reject) => {
        Attribute.find({ typeId: typeId })
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

  // 删除属性
  async removeAttribute(id: string) {
    try {
      return await new Promise((resolve, reject) => {
        Attribute.deleteOne({ _id: id })
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

  // 删除属性值
  async removeAttributeValue(attributeValueIdList) {
    try {
      return await new Promise((resolve, reject) => {
        AttributeValue.deleteMany({ _id: { $in: attributeValueIdList } })
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
