var axios = require('axios');
var User = require('../database/modules/user');
var Token = require('../middleware/token');
var md5 = require('../middleware/md5');
var util = require('../util/index');
var chalk = require('chalk');
var clientID = '89420a1175447090c216';
var clientSecret = '2d8bd797aed3c83631cc27cb5e53b2ccfc3bf41a';
module.exports = {
  async register(req, res) {
    try {
      // 验证用户是否存在
      let { email } = req.body
      User.findOne({'email': email}).then(data => {
        if (data) {
          res.status(200).send({
            code: 1,
            message: '邮箱已存在',
          });
          return
        }
        // 存入用户数据
        var user = new User(req.body);
        var hash = md5.createHash(user.password);
        user.password = hash;
        user.role = "R";
        user.save().then((data) => {
          console.log(chalk.green('User create success !'));
          var content = { name: req.body.name };
          var token = Token.createToken(content);
          console.log(chalk.green('Token create success: ' + token));
          res.status(200).send({
            code: 0,
            data: ({
              token: token,
              userId:data.id
            })
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
        var password = md5.createHash(req.body.password);
        if (data !== null && data.password === password && data.role === 'R') {
          var content = { name: req.body.loginName };
          var token = Token.createToken(content);
          console.log(chalk.green('Token create success: ' + token));
          res.status(200).send({
            code: 0,
            data: ({
              token: token,
              userId:data.id
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

  async internalLogin(req, res) {
    try {
      User.findOne({'email': req.body.loginName}).then(data => {
        var password = md5.createHash(req.body.password);
        if (data !== null && data.password === password && data.role !== 'R') {
          var content = { name: req.body.loginName };
          var token = Token.createToken(content);
          console.log(chalk.green('Token create success: ' + token));
          res.status(200).send({
            code: 0,
            data: ({
              token: token,
              userId:data.id
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

  async oauth(req, res) {
    try {
      var code = req.query.code;
      console.log(chalk.green('authorization code:', code));

      //通过授权码获取令牌
      var tokenResponse = await axios({
        url: 'https://github.com/login/oauth/access_token?' +
        `client_id=${clientID}&` +
        `client_secret=${clientSecret}&` +
        `code=${code}`,
        method: 'post',
        headers: {
          accept: 'application/json'
        }
      });

      var accessToken = tokenResponse.data.access_token;
      console.log(chalk.green(`access token: ${accessToken}`));

      //请求第三方数据接口
      var request = await axios({
        url: `https://api.github.com/user?access_token=${accessToken}`,
        method: 'get',
        headers: {
          accept: 'application/json',
        }
      });
      //验证账号是否存在
      User.findOne({'openid': request.data.id}).then((data) =>{
        if (data) {
          // 更新同步第三方数据
          var outhData = {
            name: request.data.name,
            email: request.data.email,
            avatar: request.data.avatar_url
          }
          User.updateOne({'openid': request.data.id}, outhData).then((data) =>{
            console.log(chalk.green('User update success !'));
            // 生成token
            var content = { name: request.data.name };
            var token = Token.createToken(content);
            console.log(chalk.green('Token create success: ' + token));
            res.status(200).send({
              code: 0,
              data: ({
                token: token,
                userId: data.id
              })
            })
          }).catch(err => {
            console.log(err);
          })
        } else {
          var randomNum = util.createRandom(8,15); //生成随机数
          var password = md5.createHash(randomNum); //生成随机密码
          //保存第三方数据到数据库
          var outhData = {
            openid: request.data.id,
            name: request.data.name,
            email: request.data.email,
            avatar: request.data.avatar_url,
            password: password,
            registerType: 3
          }
          var user = new User(outhData);
          user.save().then((data) => {
            console.log(chalk.green('User create success !'));
            // 生成token
            var content = { name: request.data.name };
            var token = Token.createToken(content);
            console.log(chalk.green('Token create success: ' + token));
            res.status(200).send({
              code: 0,
              data: ({
                token: token,
                userId:data.id
              })
            })
          }).catch((err) => {
            console.log(err);
          })
        }
        
      })
    } catch (err) {
      res.status(400)
    }
  },

  async userInfo(req, res) {
    try {
      User.findOne({'_id': req.query.userId}).then(data => {
        res.status(200).send({
          code: 0,
          data: {
            userName: data ? data.name : ''
          }
        })
      })
    } catch (err) {
      res.status(400)
    }
  },

  async getUserList(req, res) {
    try {
      User.find().then(data => {
        res.status(200).send({
          code: 0,
          data: data
        })
      })
    } catch (err) {
      res.status(400)
    }
  }
}