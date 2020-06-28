import jwt from "jsonwebtoken";
const secretOrPrivateKey = "exclusive";
export default {
  // 创建token
  createToken(content) {
    const token = jwt.sign(content, secretOrPrivateKey, {
      expiresIn: "7d",
    });
    return token;
  },

  // 检查token
  checkToken(req, res, next) {
    jwt.verify(req.headers.authorization, secretOrPrivateKey, (err) => {
      if (err) {
        res.status(401).send("认证失败，请重新登录");
      } else {
        next();
      }
    });
  },
};
