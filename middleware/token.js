var jwt = require('jsonwebtoken');
const secretOrPrivateKey = 'exclusive';
module.exports = {

  createToken(content) {
    let token = jwt.sign(content, secretOrPrivateKey, {
      expiresIn: '7d'
    })
    return token
  },

  checkToken(req, res, next) {
    jwt.verify(req.headers.authorization, secretOrPrivateKey, function(err){
      if (err) {
        res.status(401).send("认证失败，请重新登录");
      } else {
        next();
      }
    })
  }
}