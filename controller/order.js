module.exports = {
  async getOrder (req, res) {
    try {
      res.status(200).send({
        data: 'success'
      })
    }catch (err) {
      res.status(400);
    }
  },
}