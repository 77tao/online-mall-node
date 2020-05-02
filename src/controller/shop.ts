// 商品数据相关接口
import shopService from '../service/shop';
import repertroyService from '../service/repertroy';

export default {
  // 添加商品
  async addShopping(req, res) {
    let { type, name, title, brand, commidityImageList, content, attributeList, attributeTableList,
      parameterList, presell, serverGuarantees, site, cost, status } = req.body;
    const shopList = {
      name: name,
      type: type,
      title: title,
      status: status,
      brand: brand,
      pictureList: commidityImageList.fileList,
      content: content,
      attribute_list: attributeList,
      parameter_list: parameterList,
      presell: presell,
      server_guarantees: serverGuarantees,
      site: site,
      cost: cost
    };
    let shopResult: any = await shopService.addShop(shopList);
    let shop_id = shopResult._id;
    for (let value of attributeTableList) {
      const repertoryList = {
        repertory: value.repertory,
        repertoryWarn: value.repertoryWarn
      };
      let repertroyResult: any = await repertroyService.addRepertory(repertoryList);
      const skuList = {
        repertory_id: repertroyResult._id,
        price: value.price,
        skuNo: value.skuNo,
        shop_id: shop_id,
        attribute_value: value.attributeArr
      };
      await shopService.addSku(skuList);
    };
    res.status(200).send({
      code: 0,
      message: '添加成功',
    });
  },

  // 获取秒杀商品
  async getSeckillShopping(req, res) {
    try {
      res.status(200).send({
        data: 'success'
      });
    } catch (err) {
      res.status(400);
    }
  },

  // 获取购物车商品
  async getTrolleyShopping(req, res) {
    try {
      res.status(200).send({
        data: 'success'
      });
    } catch (err) {
      res.status(400);
    }
  },
}