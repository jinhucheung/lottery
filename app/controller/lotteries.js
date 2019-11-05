'use strict';

const Controller = require('egg').Controller;

class LotteriesController extends Controller {
  async index(ctx) {
    const lottery = await ctx.service.lotteries.getLastLottery()
    await ctx.render('lotteries/app.js', this.respondLottery(ctx, lottery));
  }

  async show(ctx) {
    const lottery = await ctx.service.lotteries.findLottery(ctx.params.id)
    await ctx.render('lotteries/app.js', this.respondLottery(ctx, lottery))
  }

  async create(ctx) {
    let lotteryId = ctx.params.id

    if (!lotteryId || lotteryId == 0) {
      const lottery = await ctx.service.lotteries.getLastLottery()
      lotteryId = lottery && lottery.id
    }

    ctx.body = await ctx.service.lotteries.hitLottery(lotteryId)
  }

  respondLottery(ctx, lottery) {
    if (lottery) {
      let count = lottery.count - (ctx.cookies.get(`lottery-${lottery.id}-count`) || 0)
      if (count < 0) count = 0

      return {
        count,
        finished_at: lottery.finished_at,
        prizes: JSON.parse(lottery.prizes)
      }
    } else {
      return {
        count: 0,
        prizes: []
      }
    }
  }
}

module.exports = LotteriesController