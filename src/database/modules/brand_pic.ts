import mongoose from 'mongoose';

const brand_pic_entity = new mongoose.Schema({
  name: { // 图片名称
    required: true,
    type: String,
  },
  path: { // 图片路径
    required: true,
    type: String
  },
  brand_id: { // 品牌id
    required: true,
    type: String
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
const brand_pic = mongoose.model('brand_pic', brand_pic_entity, 'brand_pic');

export default brand_pic