'use strict';

const egg = require('egg');

module.exports = class ArticeService extends egg.Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
  }

  hitLottery(id) {
    const lottery = this.getLottery(id)

    const index = Math.floor(Math.random() * lottery.prize_list.length)
    const prize = lottery.prize_list[index]
    let hasPrize = false

    if (prize.isPrize && prize.count > 0) {
      prize.count -= 1
      hasPrize = true
    }

    const count = (hasPrize || lottery.count <= 1) ? 0 : lottery.count - 1

    return {
      index,
      hasPrize,
      count
    }
  }

  getLottery(id) {
    return {
      count: 1, //抽奖次数
      prize_list: [
        {
          icon: "/public/images/bean_500.png", // 奖品图片
          count: 1, // 奖品数量
          value: '10 元',
          name: "购物券", // 奖品名称
          isPrize: 1 // 该奖项是否为奖品
        },
        {
          icon: "/public/images/bean_five.png",
          count: 1,
          value: '5 元',
          name: "购物券",
          isPrize: 1
        },
        {
          icon: "/public/images/give_up.png",
          count: 20,
          name: "未中奖",
          isPrize: 0
        },
        {
          icon: "/public/images/bean_one.png",
          count: 40,
          value: '5 元',
          name: "购物券",
          isPrize: 1
        },
        {
          icon: "/public/images/point_five.png",
          count: 20,
          value: '50 元',
          name: "购物券",
          isPrize: 1
        },
        {
          icon: "/public/images/give_up.png",
          count: 20,
          name: "未中奖",
          isPrize: 0
        },
        {
          icon: "/public/images/point_ten.png",
          count: 10,
          value: "100 元",
          name: "购物券",
          isPrize: 1
        },
        {
          icon: "/public/images/give_up.png",
          count: 20,
          name: "未中奖",
          isPrize: 0
        }
      ]
    }
  }
};