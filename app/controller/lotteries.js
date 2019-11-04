'use strict';

const Controller = require('egg').Controller;

class LotteriesController extends Controller {
  async index() {
    const data = { name: 'egg' };

    await this.ctx.render('lotteries/index', data);
  }
}

module.exports = LotteriesController