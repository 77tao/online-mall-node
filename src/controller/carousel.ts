// 获取轮播数据相关接口

export default {
  // 根据用户喜好 获取轮播图数据
  async getCarousel(req, res) {
    try {
      res.status(200).send({
        data: 'success'
      })
    } catch (err) {
      res.status(400);
    }
  },
}