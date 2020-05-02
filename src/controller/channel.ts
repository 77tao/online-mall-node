// 频道相关接口

export default {
  // 获取频道分类
  async getChannelType(req, res) {
    try {
      res.status(200).send({
        data: 'success'
      });
    } catch (err) {
      res.status(400);
    }
  }
}