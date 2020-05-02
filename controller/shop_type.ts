var ObjectId = require('mongodb').ObjectId;
import chalk from 'chalk';
import ShopType from '../database/modules/shop_type';
// 商品类型相关接口
export default {
  // 添加商品类型
  async addShopType (req, res) {
    try {
      // 验证类型名称是否存在
      let { name } = req.body
      ShopType.findOne({'name': name}).then(data => {
        if (data) {
          res.status(200).send({
            code: 1,
            message: '类型名称已存在',
          });
          return
        }
        // 存入用户数据
        var shopType = new ShopType(req.body);
        console.log(req.body);
        shopType.save().then((data) => {
          console.log(chalk.green('shopType create success !'));
          res.status(200).send({
            code: 0,
            message: '添加成功',
          })
        }).catch((err) => {
          res.status(500);
          console.log(err);
        })
      });
    } catch (err) {
      res.status(400);
    }
  },
  // 获取商品类型列表
  async getAllShopTypeList (req, res) {
    try {
      ShopType.find().then(data => {
        if(data) {
          res.status(200).send({
            code: 0,
            data: data
          });
        }
      })
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
      ShopType.updateOne(condition, updateData).then(data => {
        res.status(200).send({
          code: 0,
          message: '修改成功',
        })
      }).catch((err) => {
        res.status(500);
        console.log(err);
      })
    } catch (err) {
      res.status(400);
    }
  }
}