var Parameter = require('../database/modules/parameter');
var chalk = require('chalk');
//参数信息相关接口
module.exports = {
  // 添加参数信息
  async addParameter (req, res) {
    try {
      let { name } = req.body
      Parameter.findOne({'name': name}).then(data => {
        if (data) {
          res.status(200).send({
            code: 1,
            message: '参数称已存在',
          });
          return
        }
        var parameter = new Parameter(req.body);
        parameter.save().then((data) => {
          console.log(chalk.green('parameter create success !'));
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
  // 获取参数信息列表
  async getParameterList(req, res) {
    try {
      Parameter.find().then(data => {
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