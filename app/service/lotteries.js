'use strict';

const egg = require('egg');

module.exports = class ArticeService extends egg.Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
  }

  async hitLottery(id) {
    const lottery = await this.findLottery(id)

    let hitCookiesKey = null

    if (lottery) {
      lottery.prizes = JSON.parse(lottery.prizes)

      hitCookiesKey = `lottery-${lottery.id}-count`
      let hitCount = this.ctx.cookies.get(hitCookiesKey)
      hitCount = hitCount ? Number(hitCount) : 0
      this.ctx.cookies.set(hitCookiesKey, ++hitCount)
    }

    const index = Math.floor(Math.random() * lottery.prizes.length)
    const prize = lottery.prizes[index]
    let hasPrize = false

    if (prize && prize.isPrize && prize.count > 0) {
      prize.count -= 1
      hasPrize = true

      this.ctx.model.Lottery.update({
        prizes: JSON.stringify(lottery.prizes)
      }, {
        where: { id: lottery.id }
      })

      // hitCookiesKey && this.ctx.cookies.set(hitCookiesKey, lottery.count)
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