// YO新闻相关接口

export default {
  // 获取新闻
  async getNews(req, res) {
    try {
      res.status(200).send({
        data: "success",
      });
    } catch (err) {
      res.status(400);
    }
  },
};
