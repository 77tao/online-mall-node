import mongoose from 'mongoose';

const shop_type_entity = new mongoose.Schema({
  name: { //类型名称
    required: true,
    type: String
  },
  status: { //类型状态
    required: true,
    type: Boolean
  },
  lastName: { // 上级分类
    type: String,
    default: null
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
const shop_type = mongoose.model('shop_type', shop_type_entity, 'shop_type');

export default shop_type