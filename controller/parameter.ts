var ObjectId = require('mongodb').ObjectId;
import Parameter from '../database/modules/parameter';
import chalk from 'chalk';
//参数信息相关接口
export default {
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

  //修改单个参数
  async updateParameter(req, res) {
    try {
      let { id } = req.body;
      Parameter.findOne({'_id': id}).then(data => {
        if (data) {
          let condition = {_id:ObjectId(id)};
          Parameter.updateOne(condition, req.body).then(data => {
            res.status(200).send({
              code: 0,
              message: '修改成功',
            })
          }).catch((err) => {
            res.status(500);
            console.log(err);
          })
        }
      })
    } catch (err) {
      console.log(err);
    }
  },

  // 根据参数id获取参数信息
  async getParameter(req, res) {
    try {
      let { id } = req.query;
      Parameter.find({ "_id":id }).then(data => {
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
  },

  // 获取参数信息列表
  async getParameterList(req, res) {
    try {
      const typeId = req.query.typeId;
      Parameter.find({'typeId': typeId}).then(data => {
        res.status(200).send({
          code:0,
          data:data
        })
      })
    }catch (err) {
      res.status(400);
    }
  },

  //删除某个参数
  async removeParameter(req, res) {
    try {
      let { id } = req.body;
      Parameter.findOne({"_id": id}).then(data => {
        if (data) {
          Parameter.deleteOne({"_id": id}).then(data => {
            res.status(200).send({
              code: 0,
              message: '删除成功',
            })
          }).catch(err => {
            res.status(500);
            console.log(err);
          })
        }
      })
    } catch (err) {
      console.log(err);
    }
  }
}