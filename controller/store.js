var storeService = require('../service/store');

module.exports = {
  // 添加店铺
  async addStore (req,res) {
    try {
      let { name, typeId } = req.body;
      let result = await storeService.isStoreName(name,typeId);
      if (result == null ) {
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
  async getStoreList (req, res) {
    try {
      let result = await storeService.getStoreList();
      if (result) {
        res.status(200).send({
          code: 0,
          data: result,
        });
      } else  {
        res.status(200).send({
          code: 1,
          message: "获取失败",
        });
      };
    } catch (err) {
      console.log(err);
    }
  }
}
