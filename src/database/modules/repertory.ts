import mongoose from "mongoose";

const repertory_entity = new mongoose.Schema({
  repertory: {
    // 库存
    required: true,
    type: Number,
  },
  repertoryWarn: {
    // 库存预警值
    required: true,
    type: Number,
  },
  create_time: {
    // 创建时间
    required: true,
    type: Date,
    default: Date.now,
  },
  update_time: {
    // 修改时间
    required: true,
    type: Date,
    default: Date.now,
  },
});

/**
 * model 有4个参数
 * name: model的名称
 * schema mongodb的document映射的schema
 * collection 真正的collection名称
 * skipInit 是否跳过初始化，默认为false
 * 当collection缺失时，该方法会将name参数根据一定的规则转换成Mongodb中的collection的名称
 */
const repertory = mongoose.model("repertory", repertory_entity, "repertory");

export default repertory;
