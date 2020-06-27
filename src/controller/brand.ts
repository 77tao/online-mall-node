import chalk from 'chalk';
import fs from 'fs';
import brandService from '../service/brand';
import { parseTime } from '../util/index';
import brand from '../service/brand';
import { POINT_CONVERSION_COMPRESSED } from 'constants';

const ObjectId = require('mongodb').ObjectId;
//品牌信息相关接口
export default {
  // 添加品牌信息
  async addBrand(req, res) {
    try {
      let { name, type, imageAddress } = req.body
      let result: any = await brandService.isBrandName(name);
      if (result === null) {
        // 存入用户数据
        let brandData: any = {
          name: name,
          type: type,
          status: 2
        };
        let data: any = await brandService.addBrand(brandData);
        if (data) {
          for (let i = 0; i < imageAddress.fileList.length; i++) {
            let picData: any = {
              name: imageAddress.fileList[i].response.data.filename,
              path: imageAddress.fileList[i].response.data.path,
              brand_id: data._id
            }
            await brandService.addBrandPic(picData);
          }
          console.log(chalk.green('brand create success !'));
          res.status(200).send({
            code: 0,
            message: '添加成功',
          })
        }
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
      let brandResult: any = await brandService.getBrandList();
      let brandPicResult: any = await brandService.getBrandPicList();
      let resultData: any = [];
      if (brandResult !== null) {
        brandResult.forEach(index => {
          let obj: any = {
            name: index.name,
            status: index.status,
            _id: index._id,
            type: index.type,
            createTime: parseTime(index.create_time, '{y}-{m}-{d} {h}:{i}:{s}')
          };
          let brand_id = JSON.stringify(index._id);
          brandPicResult.forEach(value => {
            let brand_pic_id = JSON.stringify(value.brand_id);
            if (brand_pic_id === brand_id) {
              obj.imageAddress = req.protocol + "://" + req.hostname + ':3000/image/brand/' + value.name;
              resultData.push(obj);
            }
          })
        })
        res.status(200).send({
          code: 0,
          data: resultData
        })
      } else {
        res.status(500).send({
          message: 'id不存在',
        });
      }
    } catch (err) {
      res.status(400);
    }
  },
  // 根据类型获取品牌列表
  async getTypeBrandList(req, res) {
    try {
      let { typeId } = req.query;
      let result: any = await brandService.getTypeBrandList(typeId);
      res.status(200).send({
        code: 0,
        data: result
      })
    } catch (err) {
      console.log(err);
    }
  },
  // 获取品牌信息
  async getBrand(req, res) {
    try {
      let { id } = req.query;
      let brandResult: any = await brandService.getBrand(id);
      let brandPicResult: any = await brandService.getIdBrandPicList(id);
      let resultData: any = {};
      if (brandResult !== null) {
        resultData = {
          _id:brandResult._id,
          type:brandResult.type,
          name:brandResult.name,
          status:brandResult.status
        };
        if (brandPicResult.length === 1) {
          let arr: any = [];
          let obj: any = {};
          obj.uid = brandPicResult[0]._id;
          obj.name = brandPicResult[0].name;
          obj.status = 'done';
          obj.url = req.protocol + "://" + req.hostname + ':3000/image/brand/' + brandPicResult[0].name;
          arr.push(obj);
          resultData.imageAddress = arr;
        } else {
          let arr: any = [];
          brandPicResult.forEach(value => {
            let obj: any = {};
            obj.uid = value._id;
            obj.name = value.name;
            obj.status = 'done';
            obj.url = req.protocol + "://" + req.hostname + ':3000/image/brand/' + value.name;
            arr.push(obj);
          });
          resultData.imageAddress = arr;
        }
        res.status(200).send({
          code: 0,
          data: resultData
        })
      } else {
        res.status(500).send({
          message: 'id不存在'
        })
      }
    } catch (err) {

    }
  },
  // 修改品牌
  async editBrand(req, res) {
    try {
      let { id, name, type, imageAddress } = req.body
      let result: any = await brandService.getBrand(id);
      if (result !== null) {
        // 存入用户数据
        let brandData: any = {
          name: name,
          type: type,
          status: 2
        };
        let condition = { _id: ObjectId(id) };
        await brandService.updateBrand(condition, brandData);
        if (imageAddress.fileList !== undefined) {
          for (let i = 0; i < imageAddress.fileList.length; i++) {
            if (imageAddress.fileList[i].response !== undefined) {
              let picData: any = {
                name: imageAddress.fileList[i].response.data.filename,
                path: imageAddress.fileList[i].response.data.path,
                brand_id: id
              }
              await brandService.addBrandPic(picData);
            }
          }
          console.log(chalk.green('brand update success !'));
        }
        res.status(200).send({
          code: 0,
          message: '修改成功',
        })
      } else {
        res.status(200).send({
          code: 1,
          message: 'id不存在',
        });
      }
    } catch (err) {
      res.status(400);
    }
  },

  // 删除品牌图片
  async removeBrandPic(req, res) {
    try {
      let { uid, name, isEdit, response } = req.body;
      if (isEdit) {
        let url = 'public/image/brand/' + name;
        fs.unlink(url, (err) => {
          if (err) throw err;
        });
        let result: any = await brandService.isBrandPicId(uid);
        if (result !== null) {
          await brandService.removeBrandPic(uid);
          res.status(200).send({
            code: 0,
            message: '删除成功'
          })
        } else {
          res.status(200).send({
            code: 1,
            message: 'id不存在',
          });
        }
      } else {
        let url = 'public/image/brand/' + response.data.filename;
        fs.unlink(url, (err) => {
          if (err) throw err;
        });
        res.status(200).send({
          code: 0,
          message: '删除成功'
        })
      }
    } catch (err) {
      res.status(400);
    }
  },

  // 删除品牌信息
  async removeBrand(req, res) {
    try {
      let { id } = req.body;
      let result: any = await brandService.getBrand(id);
      if (result) {
        let resultBrandPic: any = await brandService.getIdBrandPicList(id) // 获取品牌图片列表
        if (resultBrandPic) {
          await brandService.removeBrand(id); // 删除品牌信息
          resultBrandPic.forEach(async index => {
            await brandService.removeBrandPic(index._id);
            let url = 'public/image/brand/' + index.name;
            fs.unlink(url, (err) => {
              if (err) throw err;
            });
          });
          res.status(200).send({
            code: 0,
            message: '删除成功'
          })
        }
      } else {
        res.status(200).send({
          code: 1,
          message: 'id不存在',
        });
      }
    } catch (err) {
      res.status(400);
    }
  },

}