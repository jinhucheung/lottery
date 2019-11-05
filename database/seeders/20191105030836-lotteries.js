'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('lotteries', [{
      name: '购物节活动',
      count: 1,
      created_at: new Date(),
      updated_at: new Date(),
      prizes: JSON.stringify([
        {
          icon: "/public/images/bean_five.png",
          count: 1,
          value: '10 元',
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
          icon: "/public/images/bean_five.png",
          count: 1,
          value: '5 元',
          name: "购物券",
          isPrize: 1
        },
        {
          icon: "/public/images/bean_500.png",
          count: 10,
          value: "100 元",
          name: "购物券",
          isPrize: 1
        },
        {
          icon: "/public/images/bean_500.png",
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
        }
      ])
    }], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('lotteries', null, {})
  }
};
