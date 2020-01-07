var mongoose = require('mongoose');

var brand = new mongoose.Schema({
  name: { //品牌名称
    required: true,
    type: String
  },
  type: { //所属分类
    required: true,
    type: Array
  },
  imageAddress: { // 品牌图标
    required: true,
    type: Array
  },
  status: { // 品牌状态 0-未审核 1-审核中 2审核通过 3审核未通过 （保留字段 暂时不做审核相关功能  暂时状态都为2）
    require: true,
    type: Number
  },
  create_time: { // 创建时间
    required: true,
    type: Date,
    default: Date.now
  }
})

/**
 * model 有4个参数
 * name: model的名称
 * schema mongodb的document映射的schema
 * collection 真正的collection名称
 * skipInit 是否跳过初始化，默认为false
 * 当collection缺失时，该方法会将name参数根据一定的规则转换成Mongodb中的collection的名称
 */
var brand = mongoose.model('brand', brand, 'brand');

module.exports = brand