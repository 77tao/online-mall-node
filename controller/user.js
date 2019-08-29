var User = require('../database/modules/user');
var Token = require('../middleware/token');
var chalk = require('chalk');
module.exports = {
  async register(req, res) {
    try {
      let { email } = req.body
      User.findOne({'email': email}).then(data => {
        if (data) {
          res.status(200).send({
            code: 1,
            message: '邮箱已存在',
          });
          return
        }
        var user = new User(req.body);
        user.save().then(() => {
          res.status(200).send({
            code: 0,
            data: '注册成功'
          })
        }).catch((err) => {
          console.log(err);
        })
      });
    } catch (err) {
      res.status(400)
    }
  },

  async login(req, res) {
    try {
      User.findOne({'email': req.body.loginName}).then(data => {
        if (data !== null && data.password === req.body.password) {
          let content = { name: req.body.loginName };
          let token = Token.createToken(content);
          console.log(chalk.green('Token create success: ' + token));
          data.token = token;
          var user = new User(data);
          user.save(data).then(() => {
            res.status(200).send({
              code: 0,
              data: ({
                token: token
              })
            })
          })
        } else {
          res.status(200).send({
            code: 1,
            message: '账号不存在或密码错误',
          })
        }
      })
    } catch (err) {
      res.status(400)
    }
  },

  async userInfo(req, res) {
    try {
      User.findOne({'token': req.headers.authorization}).then(data => {
        res.status(200).send({
          code: 0,
          data: {
            userName: data.name
          }
        })
      })
    } catch (err) {
      res.status(400)
    }
  }
}