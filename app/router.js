'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.get('/lotteries', controller.lotteries.index);
  router.get('/lotteries/:id', controller.lotteries.show);
  router.post('/lotteries/:id', controller.lotteries.create);
};
