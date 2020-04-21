var mongoose = require('mongoose');

var shop = new mongoose.Schema({
  name: { //商品名称
    required: true,
    type: String
  },
  type: { //商品类型
    required: true,
    type: Array
  },
  title: { //商品标题
    required: true,
    type: String
  },
  pictureList: { // 商品图片
    required: true,
    type: Array
  },
  status: { //商品状态
    required: true,
    type: Number
  },
  brand: { //商品品牌
    required: true,
    type: String
  },
  content: { //商品介绍
    required: true,
    type: String
  },
  attribute_list: { //商品属性
    required: true,
    type: Array
  },
  parameter_list: { // 商品参数
    required: true,
    type: Array
  },
  presell: { // 预售
    required: true,
    type: Boolean
  },
  server_guarantees: { //服务保证
    required: true,
    type: Array
  },
  site: { // 发货地
    required: true,
    type: Array
  },
  cost: { // 运费
    required: true,
    type: Number
  },
  create_time: { // 创建时间
    required: true,
    type: Date,
    default: Date.now
  },
  update_time: { // 修改时间
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
var shop = mongoose.model('shop', shop, 'shop');

module.exports = shop