// YO新闻相关接口

module.exports = {
  // 获取新闻
  async getNews (req, res) {
    try {
      res.status(200).send({
        data: 'success'
      });
    }catch (err) {
      res.status(400);
    }
  },
}