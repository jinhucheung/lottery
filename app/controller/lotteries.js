'use strict';

const Controller = require('egg').Controller;

class LotteriesController extends Controller {
  async index(ctx) {
    await ctx.render('lotteries/app.js');
  }
}

module.exports = LotteriesController