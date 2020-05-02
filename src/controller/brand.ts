import chalk from 'chalk';
import path from 'path';
import brandService from '../service/brand';
//品牌信息相关接口
export default {
  // 添加品牌信息
  async addBrand(req, res) {
    try {
      let { name } = req.body
      let result = await brandService.isBrandName(name);
      if (result == null) {
        // 存入用户数据
        let brandData: any = {
          name: req.body.name,
          type: req.body.type,
          status: 2,
          imageAddress: []
        };
        for (let i = 0; i < req.body.imageAddress.fileList.length; i++) {
          brandData.imageAddress.push(req.body.imageAddress.fileList[i].response.data.path);
        }
        await brandService.addBrand(brandData);
        console.log(chalk.green('brand create success !'));
        res.status(200).send({
          code: 0,
          message: '添加成功',
        })
      } else {
        res.status(200).send({
          code: 1,
          message: '品牌名称已存在',
        });
      }
    } catch (err) {
      res.status(400);
    }
  },
  // 获取品牌信息列表
  async getBrandList(req, res) {
    try {
      let result: any = await brandService.getBrandList();
      if (result != null) {
        result.forEach(index => {
          let imageAddress = path.parse(index.imageAddress[0]);
          index.imageAddress = req.protocol + "://" + req.hostname + ':3000/image/brand/' + imageAddress.base;
        })
        res.status(200).send({
          code: 0,
          data: result
        })
      };
    } catch (err) {
      res.status(400);
    }
  },
  // 根据类型获取品牌列表
  async getTypeBrandList(req, res) {
    try {
      let { typeId } = req.query;
      let result: any = await brandService.getTypeBrandList(typeId);
      if (result != null) {
        result.forEach(index => {
          let imageAddress = path.parse(index.imageAddress[0]);
          index.imageAddress = req.protocol + "://" + req.hostname + ':3000/image/brand/' + imageAddress.base;
        })
        res.status(200).send({
          code: 0,
          data: result
        })
      }
    } catch (err) {
      console.log(err);
    }
  }
}