const ObjectId = require('mongodb').ObjectId;
import chalk from 'chalk';
import shopTypeService from '../service/shop_type';
// 商品类型相关接口
export default {
  // 添加商品类型
  async addShopType (req, res) {
    try {
      // 验证类型名称是否存在
      let { name } = req.body
      let result = shopTypeService.isShopTypeName(name);
      if (result == null) {
        await shopTypeService.addShopType(req.body);
        console.log(chalk.green('shopType create success !'));
        res.status(200).send({
          code: 0,
          message: '添加成功',
        })
      } else {
        res.status(200).send({
          code: 1,
          message: '类型名称已存在',
        });
      };
    } catch (err) {
      res.status(400);
    }
  },
  // 获取商品类型列表
  async getAllShopTypeList (req, res) {
    try {
      let data = await shopTypeService.getAllShopTypeList();
      res.status(200).send({
        code: 0,
        data: data
      });
    }catch (err) {
      res.status(400);
    }
  },
  // 更改商品类型状态
  async updateShopTypeStatus(req, res) {
    try {
      let { id,status } = req.body;
      let condition = {_id:ObjectId(id)};
      let updateData = {$set: {'status': status}};
      await shopTypeService.updateShopTypeStatus(condition, updateData);
      res.status(200).send({
        code: 0,
        message: '修改成功',
      });
    } catch (err) {
      res.status(400);
    }
  }
}