import attributeService from "../service/attriubte";
const ObjectId = require("mongodb").ObjectId;

//属性信息相关接口
export default {
  // 添加属性信息
  async addAttribute(req, res) {
    try {
      const {
        typeId,
        enter,
        name,
        key,
        multiple,
        status,
        news,
        attribute,
      } = req.body;
      const attributeList: any = {
        typeId: typeId,
        enter: enter,
        name: name,
        multiple: multiple,
        status: status,
        news: news,
        key: key,
      };
      const result = await attributeService.isAttributeName(name, typeId);
      if (result == null) {
        const attributeResult: any = await attributeService.addAttribute(
          attributeList
        );
        const attribute_id = attributeResult.id;
        for (const index of attribute) {
          const attributeValueList: any = {
            attribute_value: index,
            attribute_id: attribute_id,
          };
          await attributeService.addAttributeValue(attributeValueList);
        }
        res.status(200).send({
          code: 0,
          message: "添加成功",
        });
      } else {
        res.status(200).send({
          code: 1,
          message: "属性名已存在",
        });
      }
    } catch (err) {
      res.status(400);
    }
  },

  // 修改属性信息
  async updateAttribte(req, res) {
    try {
      const {
        id,
        enter,
        name,
        key,
        multiple,
        status,
        news,
        attribute,
        attributeValueId,
      } = req.body;
      const result = await attributeService.isAttribute(id);
      if (result) {
        const obj: object = {
          enter: enter,
          name: name,
          key: key,
          multiple: multiple,
          status: status,
          news: news,
        };
        const condition = { _id: ObjectId(id) };
        await attributeService.updateAttribute(condition, obj);
        for (let i = 0; i < attributeValueId.length; i++) {
          const condition = { _id: ObjectId(attributeValueId[i]) };
          await attributeService.updateAttributeValue(condition, {
            attribute_value: attribute[i],
          });
        }
        res.status(200).send({
          code: 0,
          message: "修改成功",
        });
      }
    } catch (err) {
      console.log(err);
    }
  },

  //根据属性id查询某条属性
  async getAttribute(req, res) {
    try {
      const { id } = req.query;
      const result = await attributeService.isAttribute(id);
      if (result) {
        const attributeResult = await attributeService.getAttribute(id);
        const obj: Record<string, any> = {
          _id: attributeResult[0]._id,
          key: attributeResult[0].key,
          enter: attributeResult[0].enter,
          name: attributeResult[0].name,
          multiple: attributeResult[0].multiple,
          status: attributeResult[0].status,
          news: attributeResult[0].news,
        };
        const attributeValueResult: any = await attributeService.getAttributeValue(
          attributeResult[0]._id
        );
        const arr: Array<string> = [];
        const idArr: Array<string> = [];
        attributeValueResult.forEach((index) => {
          arr.push(index.attribute_value);
          idArr.push(index._id);
        });
        obj.attribute = arr;
        obj.attributeValueId = idArr;
        res.status(200).send({
          code: 0,
          data: obj,
        });
      }
    } catch (err) {
      console.log(err);
    }
  },

  // 根据类型获取属性列表
  async getTypeAttributeList(req, res) {
    try {
      const { typeId } = req.query;
      const attributeData = [];
      const attributeList: any = await attributeService.getAttributeType(
        typeId
      );
      for (const value of attributeList) {
        const obj: Record<string, any> = {
          _id: value._id,
          enter: value.enter,
          key: value.key,
          name: value.name,
          multiple: value.multiple,
          status: value.status,
          news: value.news,
          attribute: null,
          attributeValueId: null,
        };
        const attribute_id = value._id;
        const attributeValueList: any = await attributeService.getAttributeValue(
          attribute_id
        );
        const arr = [];
        const idArr = [];
        attributeValueList.forEach((index) => {
          arr.push(index.attribute_value);
          idArr.push(index._id);
        });
        obj.attribute = arr;
        obj.attributeValueId = idArr;
        attributeData.push(obj);
      }
      res.status(200).send({
        code: 0,
        data: attributeData,
      });
    } catch (err) {
      console.log(err);
    }
  },

  //删除某个属性
  async removeAttribute(req, res) {
    try {
      const { _id, attributeValueId } = req.body;
      const result = attributeService.isAttribute(_id);
      if (result !== null) {
        await Promise.all([
          attributeService.removeAttribute(_id),
          attributeService.removeAttributeValue(attributeValueId),
        ]).then(() => {
          res.status(200).send({
            code: 0,
            message: "删除成功",
          });
        });
      } else {
        res.status(200).send({
          code: 1,
          message: "属性不存在",
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
