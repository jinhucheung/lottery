'use strict';

const egg = require('egg');

module.exports = class ArticeService extends egg.Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
  }

  async hitLottery(id) {
    const lottery = await this.findLottery(id)
    let index = 0
    let hasPrize = false

    if (!lottery) {
      return {
        index,
        hasPrize,
        count: 0
      }
    }

    let weightSum = 0
    lottery.prizes = JSON.parse(lottery.prizes)
    lottery.prizes.forEach(prize => {
      if (!prize.weight) prize.weight = 1
      weightSum += prize.weight
    })

    const random = Math.random() * weightSum
    let randomWeight = 0
    for (let i = 0; i < lottery.prizes.length; i++) {
      randomWeight += lottery.prizes[i].weight

      if (randomWeight > random) {
        index = i
        break
      }
    }
    let prize = lottery.prizes[index]

    if (prize.count <= 0 || lottery.finished_at <= new Date()) {
      let noPrizeIndex = lottery.prizes.findIndex(prize => { return !prize.isPrize })

      if (noPrizeIndex >= 0) index = noPrizeIndex
    } else if (prize.isPrize) {
      hasPrize = true
      prize.count -= 1

      this.ctx.model.Lottery.update({
        prizes: JSON.stringify(lottery.prizes)
      }, {
        where: { id: lottery.id }
      })
    }

    let hitCookiesKey = `lottery-${lottery.id}-count`
    let hitCount = this.ctx.cookies.get(hitCookiesKey)
    hitCount = hitCount ? Number(hitCount) : 0
    this.ctx.cookies.set(hitCookiesKey, ++hitCount)

    let count = lottery.count - hitCount
    if (count < 0) count = 0

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