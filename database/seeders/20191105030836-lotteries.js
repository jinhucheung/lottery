'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let prizes = [
      {
        icon: "/public/images/bean_one.png",
        count: 10,
        value: '10 元',
        name: "购物券",
        isPrize: 1
      },
      {
        icon: "/public/images/give_up.png",
        count: 30,
        name: "未中奖",
        isPrize: 0
      },
      {
        icon: "/public/images/bean_two.png",
        count: 8,
        value: '20 元',
        name: "购物券",
        isPrize: 1
      },
      {
        icon: "/public/images/bean_five.png",
        count: 6,
        value: "30 元",
        name: "购物券",
        isPrize: 1
      },
      {
        icon: "/public/images/bean_ten.png",
        count: 6,
        value: '50 元',
        name: "购物券",
        isPrize: 1
      },
      {
        icon: "/public/images/give_up.png",
        count: 30,
        name: "未中奖",
        isPrize: 0
      },
      {
        icon: "/public/images/bean_500.png",
        count: 2,
        value: '100 元',
        name: "购物券",
        isPrize: 1
      },
      {
        icon: "/public/images/give_up.png",
        count: 30,
        name: "未中奖",
        isPrize: 0
      }
    ]

    prizes.forEach(prize => {
      if(prize.isPrize) prize.url = 'https://lt16838247.m.icoc.bz'
    })

    return queryInterface.bulkInsert('lotteries', [{
      name: '购物节活动',
      count: 1,
      finished_at: new Date(2019, 10, 10, 20),
      created_at: new Date(),
      updated_at: new Date(),
      prizes: JSON.stringify(prizes)
    }], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('lotteries', null, {})
  }
};
