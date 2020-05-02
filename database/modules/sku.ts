import mongoose from 'mongoose';

const sku_entity = new mongoose.Schema({
  skuNo: { // sku编号
    required: true,
    type: String
  },
  shop_id: { // 商品id
    required: true,
    type: String
  },
  repertory_id: { // 仓库id
    required: true,
    type: String
  },
  attribute_value: { // 属性值id
    required: true,
    type: Array
  },
  price: { // 商品价格
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
const sku = mongoose.model('sku', sku_entity, 'sku');

export default sku