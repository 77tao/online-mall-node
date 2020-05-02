import Brand from '../database/modules/brand';
import chalk from 'chalk';
import path from 'path';
//品牌信息相关接口
export default {
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
        let brandData = {
          name: req.body.name,
          type: req.body.type,
          status: 2,
          imageAddress: []
        };
        for(let i = 0; i < req.body.imageAddress.fileList.length; i++) {
          brandData.imageAddress.push(req.body.imageAddress.fileList[i].response.data.path);
        }
        let brand = new Brand(data);
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
          let imageAddress = path.parse(index.imageAddress[0]);
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
  },

  async getTypeBrandList(req, res){
    try {
      let { typeId } = req.query;
      Brand.find({"type": typeId}).then(data => {
        data.forEach(index => {
          let imageAddress = path.parse(index.imageAddress[0]);
          index.imageAddress = req.protocol + "://" + req.hostname + ':3000/image/brand/' + imageAddress.base;
        })
        res.status(200).send({
          code:0,
          data:data
        })
      })
    } catch (err) {
      console.log(err);
    }
  }
}