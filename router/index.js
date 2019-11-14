const router = require('koa-router')();

const userRouter = require('./user');

router.use(userRouter.routes(),userRouter.allowedMethods())

module.exports = router;