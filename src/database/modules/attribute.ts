import mongoose from 'mongoose';

const attribute_entity = new mongoose.Schema({
  name: { //属性名称
    required: true,
    type: String
  },
  key: { //属性key
    required: true,
    type: String
  },
  enter: { //属性录入方式
    required: true,
    type: String
  },
  typeId: { // 类型id
    required: true,
    type: String
  },
  multiple: { // 是否支持多选
    required: true,
    type: Boolean
  },
  status: { // 是否开启该属性
    required: true,
    type: Boolean
  },
  news: { // 是否支持新增
    required: true,
    type: Boolean
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
const attribute = mongoose.model('attribute', attribute_entity, 'attribute');

export default attribute