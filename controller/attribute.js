var attributeService = require('../service/attriubte');
var ObjectId = require('mongodb').ObjectId;
//属性信息相关接口
module.exports = {
  // 添加属性信息
  async addAttribute (req, res) {
    try {
      let { typeId, enter, name, key, multiple, status, news, attribute } = req.body;
      const attributeList = {};
      attributeList.typeId = typeId;
      attributeList.enter = enter;
      attributeList.name = name;
      attributeList.multiple = multiple;
      attributeList.status = status;
      attributeList.news = news;
      attributeList.key = key;
      let result = await attributeService.isAttributeName(name,typeId);
      if (result == null) {
        const attributeResult = await attributeService.addAttribute(attributeList);
        let attribute_id = attributeResult.id;
        for (let index of attribute) {
          const attributeValueList = {};
          attributeValueList.attribute_value = index;
          attributeValueList.attribute_id = attribute_id;
          await attributeService.addAttributeValue(attributeValueList);
        };
        res.status(200).send({
          code: 0,
          message: '添加成功',
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
      let { id, enter, name, key, multiple, status, news, attribute, attributeValueId } = req.body;
      const result = await attributeService.isAttribute(id);
      if (result) {
        let obj = {};
        obj.enter = enter;
        obj.name = name;
        obj.key = key;
        obj.multiple = multiple;
        obj.status = status;
        obj.news = news;
        let condition = {_id:ObjectId(id)};
        await attributeService.updateAttribute(condition, obj);
        for(let i = 0; i < attributeValueId.length; i++) {
          let condition = {_id:ObjectId(attributeValueId[i])};
          await attributeService.updateAttributeValue(condition, {attribute_value:attribute[i]});
        };
        res.status(200).send({
          code: 0,
          message: '修改成功',
        });
      }
    } catch (err) {
      console.log(err);
    }
  },

  //根据属性id查询某条属性
  async getAttribute(req, res) {
    try {
      let { id } = req.query;
      const result = await attributeService.isAttribute(id);
      if (result) {
        const attributeResult = await attributeService.getAttribute(id);
        const obj = {};
        obj._id = attributeResult[0]._id;
        obj.key = attributeResult[0].key;
        obj.enter = attributeResult[0].enter;
        obj.name = attributeResult[0].name;
        obj.multiple = attributeResult[0].multiple;
        obj.status = attributeResult[0].status;
        obj.news = attributeResult[0].news;
        const attributeValueResult = await attributeService.getAttributeValue(attributeResult[0]._id);
        let arr = [];
        let idArr = [];
        attributeValueResult.forEach(index => {
          arr.push(index.attribute_value);
          idArr.push(index._id);
        });
        obj.attribute = arr;
        obj.attributeValueId = idArr;
        res.status(200).send({
          code:0,
          data: obj
        });
      };
    } catch(err) {
      console.log(err);
    }
  },

  // 根据类型获取属性列表
  async getTypeAttributeList(req, res) {
    try {
      let { typeId } = req.query;
      let attributeData = [];
      const attributeList = await attributeService.getAttributeType(typeId);
      for (let value of attributeList) {
        let obj = {};
        obj._id = value._id;
        obj.enter = value.enter;
        obj.key = value.key;
        obj.name = value.name;
        obj.multiple = value.multiple;
        obj.status = value.status;
        obj.news = value.news;
        const attribute_id = value._id;
        const attributeValueList = await attributeService.getAttributeValue(attribute_id);
        let arr = [];
        let idArr = [];
        attributeValueList.forEach(index => {
          arr.push(index.attribute_value);
          idArr.push(index._id);
        });
        obj.attribute = arr;
        obj.attributeValueId = idArr;
        attributeData.push(obj);
      }
      res.status(200).send({
        code: 0,
        data: attributeData
      });
    } catch (err) {
      console.log(err);
    }
  },

  //删除某个属性
  async removeAttribute(req, res) {
    try {
      let { _id, attributeValueId } = req.body;
      const result = attributeService.isAttribute(_id);
      if (result !== null) {
        await Promise.all([attributeService.removeAttribute(_id), attributeService.removeAttributeValue(attributeValueId)]).then(() => {
          res.status(200).send({
            code: 0,
            message: '删除成功'
          })
        })
      } else {
        res.status(200).send({
          code: 1,
          message: "属性不存在",
        });
      }
      
    } catch (err) {
      console.log(err);
    }
  }
}