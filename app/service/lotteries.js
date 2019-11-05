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
    const hasPrize = lottery.prize_list[index].isPrize

    return {
      index,
      hasPrize
    }
  }

  getLottery(id) {
    return {
      lottery_ticket: 1, //抽奖次数
      prize_list: [
        {
          icon: "/public/images/bean_500.png", // 奖品图片
          count: 50, // 奖品数量
          value: '10 元',
          name: "购物卷", // 奖品名称
          isPrize: 1 // 该奖项是否为奖品
        },
        {
          icon: "/public/images/bean_five.png",
          count: 100,
          value: '5 元',
          name: "购物卷",
          isPrize: 1
        },
        {
          icon: "/public/images/give_up.png",
          count: 0,
          name: "未中奖",
          isPrize: 0
        },
        {
          icon: "/public/images/bean_one.png",
          count: 40,
          value: '5 元',
          name: "购物卷",
          isPrize: 1
        },
        {
          icon: "/public/images/point_five.png",
          count: 20,
          value: '50 元',
          name: "购物卷",
          isPrize: 1
        },
        {
          icon: "/public/images/give_up.png",
          count: 0,
          name: "未中奖",
          isPrize: 0
        },
        {
          icon: "/public/images/point_ten.png",
          count: 10,
          value: "100 元",
          name: "购物卷",
          isPrize: 1
        },
        {
          icon: "/public/images/give_up.png",
          count: 0,
          name: "未中奖",
          isPrize: 0
        }
      ]
    }
  }
};