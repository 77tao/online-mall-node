module.exports = {
  async getCarousel (req, res) {
    try {
      res.status(200).send({
        data: 'success'
      })
    }catch (err) {
      res.status(400);
    }
  },
  async getNews (req, res) {
    try {
      res.status(200).send({
        data: 'success'
      });
    }catch (err) {
      res.status(400);
    }
  },
  async getSeckillShopping (req, res) {
    try {
      res.status(200).send({
        data: 'success'
      });
    }catch (err) {
      res.status(400);
    }
  },
  async getChannelType (req, res) {
    try {
      res.status(200).send({
        data: 'success'
      });
    }catch (err) {
      res.status(400);
    }
  }
}