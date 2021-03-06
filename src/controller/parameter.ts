const ObjectId = require("mongodb").ObjectId;
import parameterService from "../service/parameter";
import chalk from "chalk";
//参数信息相关接口
export default {
  // 添加参数信息
  async addParameter(req, res) {
    try {
      const { name } = req.body;
      const result = await parameterService.isParameterName(name);
      if (result == null) {
        await parameterService.addParameter(req.body);
        console.log(chalk.green("parameter create success !"));
        res.status(200).send({
          code: 0,
          message: "添加成功",
        });
      } else {
        res.status(200).send({
          code: 1,
          message: "参数称已存在",
        });
      }
    } catch (err) {
      res.status(400);
    }
  },

  //修改单个参数
  async updateParameter(req, res) {
    try {
      const { id } = req.body;
      const result = await parameterService.isParameterId(id);
      if (result == null) {
        res.status(200).send({
          code: 1,
          message: "参数不存在",
        });
      } else {
        const condition = { _id: ObjectId(id) };
        await parameterService.updateParameter(condition, req.body);
        console.log(chalk.green("parameter update success !"));
        res.status(200).send({
          code: 0,
          message: "修改成功",
        });
      }
    } catch (err) {
      console.log(err);
    }
  },

  // 根据参数id获取参数信息
  async getParameter(req, res) {
    try {
      const { id } = req.query;
      const result = await parameterService.isParameterId(id);
      if (result != null) {
        const data = parameterService.getParameterId(id);
        res.status(200).send({
          code: 0,
          data: data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  },

  // 获取参数信息列表
  async getParameterList(req, res) {
    try {
      const typeId = req.query.typeId;
      const data = await parameterService.getParameterTypeList(typeId);
      res.status(200).send({
        code: 0,
        data: data,
      });
    } catch (err) {
      res.status(400);
    }
  },

  //删除某个参数
  async removeParameter(req, res) {
    try {
      const { id } = req.body;
      const result = await parameterService.isParameterId(id);
      if (result == null) {
        res.status(200).send({
          code: 1,
          message: "参数不存在",
        });
      } else {
        await parameterService.removeParameter(id);
        console.log(chalk.green("parameter delete success !"));
        res.status(200).send({
          code: 0,
          message: "删除成功",
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
