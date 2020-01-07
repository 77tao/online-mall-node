var Brand = require('../database/modules/brand');
var chalk = require('chalk');
var path = require('path');
//品牌信息相关接口
module.exports = {
  // 添加品牌信息
  async addBrand (req, res) {
    try {
      let { name } = req.body
      Brand.findOne({'name': name}).then(data => {
        if (data) {
          res.status(200).send({
            code: 1,
            message: '品牌名称已存在',
          });
          return
        }
        // 存入用户数据
        var data = {};
        data.name = req.body.name;
        data.type = req.body.type;
        data.status = 2;
        data.imageAddress = new Array();
        for(var i = 0; i < req.body.imageAddress.fileList.length; i++) {
          data.imageAddress.push(req.body.imageAddress.fileList[i].response.data.path);
        }
        var brand = new Brand(data);
        brand.save().then((data) => {
          console.log(chalk.green('brand create success !'));
          res.status(200).send({
            code: 0,
            message: '添加成功',
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
  // 获取品牌信息列表
  async getBrandList(req, res) {
    try {
      Brand.find().then(data => {
        data.forEach(index => {
          var imageAddress = path.parse(index.imageAddress[0]);
          index.imageAddress = req.protocol + "://" + req.hostname + ':3000/image/brand/' + imageAddress.base;
        })
        res.status(200).send({
          code:0,
          data:data
        })
      })
    }catch (err) {
      res.status(400);
    }
  }
}