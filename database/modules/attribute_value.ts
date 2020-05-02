import mongoose from 'mongoose';

const attribute_value_entity = new mongoose.Schema({
  attribute_value: { //属性值名称
    required: true,
    type: String
  },
  attribute_id: { // 属性id
    required: true,
    type: String
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
const attribute_value = mongoose.model('attribute_value', attribute_value_entity, 'attribute_value');

export default attribute_value