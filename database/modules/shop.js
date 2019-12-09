var mongoose = require('mongoose');

var shop = new mongoose.Schema({
  name: { //商品名称
    required: true,
    type: String
  },
  image: { //商品图片
    required: true,
    type: String
  },
  type: { // 商品类型
    required: true,
  },
  describe: { //商品描述
    type: String,
    default: ''
  },
  price: { //商品价格
    required: true,
    type: Number
  },
  video: { //商品视频
    type: String,
    default: ''
  },
  shop: { //所属商铺
    required: true,
    type: Number,
  },
  capacity: { // 商品容量（数量）
    required: true,
    type: Number,
    default: 0
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
var Shop = mongoose.model('Shop', shop, 'shop');

module.exports = Shop