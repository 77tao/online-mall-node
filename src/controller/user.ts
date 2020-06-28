import axios from "axios";
import userService from "../service/user";
import Token from "../middleware/token";
import md5 from "../middleware/md5";
import { createRandom } from "../util/index";
import chalk from "chalk";
const clientID = "89420a1175447090c216";
const clientSecret = "2d8bd797aed3c83631cc27cb5e53b2ccfc3bf41a";
export default {
  // 注册用户
  async register(req, res) {
    try {
      // 验证用户是否存在
      const { email } = req.body;
      const result = await userService.isUserEmail(email);
      if (result == null) {
        const data: any = await userService.addUser(req.body);
        console.log(chalk.green("User create success !"));
        const content = { name: req.body.name };
        const token = Token.createToken(content);
        console.log(chalk.green("Token create success: " + token));
        res.status(200).send({
          code: 0,
          data: {
            token: token,
            userId: data.id,
          },
        });
      } else {
        res.status(200).send({
          code: 1,
          message: "邮箱已存在",
        });
      }
    } catch (err) {
      res.status(400);
    }
  },
  // 登录
  async login(req, res) {
    try {
      const result: any = await userService.isUserEmail(req.body.loginName);
      if (result == null) {
        res.status(200).send({
          code: 1,
          message: "账号不存在或密码错误",
        });
      } else {
        const password = md5.createHash(req.body.password);
        if (result.password === password && result.role === "R") {
          const content = { name: req.body.loginName };
          const token = Token.createToken(content);
          console.log(chalk.green("Token create success: " + token));
          res.status(200).send({
            code: 0,
            data: {
              token: token,
              userId: result.id,
            },
          });
        }
      }
    } catch (err) {
      res.status(400);
    }
  },
  // 内部登录
  async internalLogin(req, res) {
    try {
      const result: any = await userService.isUserEmail(req.body.loginName);
      if (result == null) {
        res.status(200).send({
          code: 1,
          message: "账号不存在或密码错误",
        });
      } else {
        const password = md5.createHash(req.body.password);
        if (result.password === password && result.role !== "R") {
          const content = { name: req.body.loginName };
          const token = Token.createToken(content);
          console.log(chalk.green("Token create success: " + token));
          res.status(200).send({
            code: 0,
            data: {
              token: token,
              userId: result.id,
            },
          });
        }
      }
    } catch (err) {
      res.status(400);
    }
  },
  // 授权登录
  async oauth(req, res) {
    try {
      const code = req.query.code;
      console.log(chalk.green("authorization code:", code));

      //通过授权码获取令牌
      const tokenResponse = await axios({
        url:
          "https://github.com/login/oauth/access_token?" +
          `client_id=${clientID}&` +
          `client_secret=${clientSecret}&` +
          `code=${code}`,
        method: "post",
        headers: {
          accept: "application/json",
        },
      });

      const accessToken = tokenResponse.data.access_token;
      console.log(chalk.green(`access token: ${accessToken}`));

      //请求第三方数据接口
      const request = await axios({
        url: `https://api.github.com/user?access_token=${accessToken}`,
        method: "get",
        headers: {
          accept: "application/json",
        },
      });
      //验证账号是否存在
      const result = await userService.isUserId(request.data.id);

      if (result == null) {
        const randomNum = createRandom(8, 15); //生成随机数
        const password = md5.createHash(randomNum); //生成随机密码
        //保存第三方数据到数据库
        const outhData = {
          openid: request.data.id,
          name: request.data.name,
          email: request.data.email,
          avatar: request.data.avatar_url,
          password: password,
          registerType: 3,
        };
        const data: any = await userService.addUser(outhData);
        console.log(chalk.green("User create success !"));
        // 生成token
        const content = { name: request.data.name };
        const token = Token.createToken(content);
        console.log(chalk.green("Token create success: " + token));
        res.status(200).send({
          code: 0,
          data: {
            token: token,
            userId: data.id,
          },
        });
      } else {
        // 更新同步第三方数据
        const outhData = {
          name: request.data.name,
          email: request.data.email,
          avatar: request.data.avatar_url,
        };
        const data: any = await userService.updateUser(
          request.data.id,
          outhData
        );
        console.log(chalk.green("User update success !"));
        // 生成token
        const content = { name: request.data.name };
        const token = Token.createToken(content);
        console.log(chalk.green("Token create success: " + token));
        res.status(200).send({
          code: 0,
          data: {
            token: token,
            userId: data.id,
          },
        });
      }
    } catch (err) {
      res.status(400);
    }
  },
  // 获取用户信息
  async userInfo(req, res) {
    try {
      const data: any = await userService.getUserInfo(req.query.userId);
      res.status(200).send({
        code: 0,
        data: {
          userName: data ? data.name : "",
        },
      });
    } catch (err) {
      res.status(400);
    }
  },
  // 获取用户信息列表
  async getUserList(req, res) {
    try {
      const data = await userService.getUserList();
      res.status(200).send({
        code: 0,
        data: data,
      });
    } catch (err) {
      res.status(400);
    }
  },
};
