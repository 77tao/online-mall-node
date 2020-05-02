import mongoose from 'mongoose';

const user_entity = new mongoose.Schema({
  openid: { //授权id
    type:Number,
  },
  avatar: { //头像
   type: String
  },
  name: { //名称
    required: true,
    type: String
  },
  email: { //邮箱
    type: String,
    default: ''
  },
  phone: { // 手机号
    type: Number,
    default: '',
  },
  password: { // 密码
    required: true,
    type: String
  },
  registerType: { // 注册方式 1 邮箱 2 手机 3.第三方
    type: Number
  },
  role: { // 用户角色 R 注册用户 A管理员用户
    required: true,
    type: "String",
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
const user = mongoose.model('User', user_entity, 'user');

export default user