var Attribute = require('../database/modules/attribute');
var chalk = require('chalk');
//属性信息相关接口
module.exports = {
  // 添加属性信息
  async addAttribute (req, res) {
    try {
      let { name } = req.body
      Attribute.findOne({'name': name}).then(data => {
        if (data) {
          res.status(200).send({
            code: 1,
            message: '属性称已存在',
          });
          return
        }
        var attribute = new Attribute(req.body);
        attribute.save().then((data) => {
          console.log(chalk.green('attribute create success !'));
          res.status(200).send({
            code: 0,
            message: '添加成功'
          })
        }).catch((err) => {
          res.status(500);
          console.log(err);
        })          
      });
    }catch (err) {
      res.status(400);
    }
  },

  // 修改属性信息
  async updateAttribte(req, res) {
    try {
      let { id } = req.body;
      Attribute.findOne({'id': id}).then(data => {
        if (data) {
          var attribute = new Attribute(req.body);
          attribute.update().then(data => {
            console.log(chalk.green('attribute update success !'));
            res.status(200).send({
              code: 0,
              message: "修改成功"
            })
          }).cathc((err) => {
            res.status(500);
            console.log(err);
          })
        }
      })
    } catch (err) {
      console.log(err);
    }
  },

  // 获取属性信息列表
  async getAttributeList(req, res) {
    try {
      Attribute.find().then(data => {
        res.status(200).send({
          code:0,
          data:data
        })
      }).catch((err) => {
        res.status(500);
        console.log(err);
      })
    }catch (err) {
      res.status(400);
    }
  },

  // 根据类型获取属性列表
  async getTypeAttributeList(req, res) {
    try {
      let { typeId } = req.query;
      Attribute.find({ "typeId":typeId }).then(data => {
        res.status(200).send({
          code:0,
          data:data
        })
      }).catch((err) => {
        res.status(500);
        console.log(err);
      })
    } catch (err) {
      console.log(err);
    }
  }
}