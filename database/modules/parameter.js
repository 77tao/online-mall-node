var mongoose = require('mongoose');

var parameter = new mongoose.Schema({
  name: { //参数名称
    required: true,
    type: String
  },
  parameter: { //参数可选值列表
    required: true,
    type: Array
  },
  enter: {
    required: true,
    type: String
  },
  typeId: {
    required: true,
    type: String
  },
  status: { // 是否开启该参数
    required: true,
    type: Boolean
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
var parameter = mongoose.model('parameter', parameter, 'parameter');

module.exports = parameter