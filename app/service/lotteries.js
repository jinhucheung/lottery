'use strict';

const egg = require('egg');

module.exports = class ArticeService extends egg.Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
  }

  async hitLottery(id) {
    const lottery = await this.findLottery(id)

    if (lottery) lottery.prizes = JSON.parse(lottery.prizes)

    const index = Math.floor(Math.random() * lottery.prizes.length)
    const prize = lottery.prizes[index]
    let hasPrize = false

    if (prize && prize.isPrize && prize.count > 0) {
      prize.count -= 1
      hasPrize = true

      this.ctx.model.Lottery.update({
        prize: JSON.stringify(prize)
      }, {
        where: { id: lottery.id }
      })
    }

    const count = (hasPrize || lottery.count <= 1) ? 0 : lottery.count - 1

    return {
      index,
      hasPrize,
      count
    }
  }

  async findLottery(id) {
    return await this.ctx.model.Lottery.findByPk(id)
  }

  async getLastLottery() {
    return await this.ctx.model.Lottery.findOne({
      order: [['id', 'DESC']]
    })
  }
};