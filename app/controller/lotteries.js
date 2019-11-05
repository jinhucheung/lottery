'use strict';

const Controller = require('egg').Controller;

class LotteriesController extends Controller {
  async index(ctx) {
    await ctx.render('lotteries/app.js', this.lottery(ctx));
  }

  async show(ctx) {
    await ctx.render('lotteries/app.js', this.lottery(ctx));
  }

  async create(ctx) {
    ctx.body = ctx.service.lotteries.hitLottery(ctx.params.id)
  }

  lottery(ctx) {
    return ctx.service.lotteries.getLottery(ctx.params.id)
  }
}

module.exports = LotteriesController