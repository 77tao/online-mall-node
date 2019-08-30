var mongoose = require('mongoose');

var user = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  email: {
    type: String,
    default: ''
  },
  phone: {
    type: Number,
    default: '',
  },
  password: {
    required: true,
    type: String
  },
  create_time: {
    required: true,
    type: Date,
    default: Date.now
  },
  update_time: {
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
var User = mongoose.model('User', user, 'user');

module.exports = User