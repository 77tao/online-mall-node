import storeService from "../service/store";
const ObjectId = require("mongodb").ObjectId;

export default {
  // 添加店铺
  async addStore(req, res) {
    try {
      const { name, typeId } = req.body;
      const result = await storeService.isStoreName(name, typeId);
      if (result == null) {
        await storeService.addStore(req.body);
        res.status(200).send({
          code: 0,
          message: "添加成功",
        });
      } else {
        res.status(200).send({
          code: 1,
          message: "店铺名已存在",
        });
      }
    } catch (err) {
      res.status(400);
    }
  },

  // 获取店铺列表
  async getStoreList(req, res) {
    try {
      const result = await storeService.getStoreList();
      if (result) {
        res.status(200).send({
          code: 0,
          data: result,
        });
      } else {
        res.status(200).send({
          code: 1,
          message: "获取失败",
        });
      }
    } catch (err) {
      console.log(err);
    }
  },

  // 根据商铺id获取商铺信息
  async getStore(req, res) {
    try {
      const { id } = req.query;
      const result = await storeService.getStore(id);
      if (result) {
        res.status(200).send({
          code: 0,
          data: result,
        });
      } else {
        res.status(200).send({
          code: 1,
          message: "该商铺不存在",
        });
      }
    } catch (err) {}
  },

  // 修改商铺信息
  async updateStore(req, res) {
    try {
      const { id, name, type, status } = req.body;
      const result = await storeService.isStoreId(id);
      if (result) {
        const obj = {
          name: name,
          type: type,
          status: status,
        };
        const condition = { _id: ObjectId(id) };
        await storeService.updateStore(condition, obj);
        res.status(200).send({
          code: 0,
          message: "修改成功",
        });
      } else {
        res.status(200).send({
          code: 1,
          message: "该商铺不存在",
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
