// 商品数据相关接口

module.exports = {
  // 获取秒杀商品
  async getSeckillShopping (req, res) {
    try {
      res.status(200).send({
        data: 'success'
      });
    }catch (err) {
      res.status(400);
    }
  },
  // 获取购物车商品
  async getTrolleyShopping (req, res) {
    try {
      res.status(200).send({
        data: 'success'
      });
    }catch (err) {
      res.status(400);
    }
  },
}