// 上传相关接口
export default {
  // 上传商品图片
  async uploadCommodityImage(req, res) {
    try {
      res.status(200).send({
        code: 0,
        data: req.file,
      });
    } catch (err) {
      res.status(400);
    }
  },

  // 上传商品logo
  async uploadbrandLogo(req, res) {
    try {
      res.status(200).send({
        code: 0,
        data: req.file,
      });
    } catch (err) {
      res.status(400);
    }
  },
};
