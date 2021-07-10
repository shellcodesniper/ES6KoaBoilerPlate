import Router from 'koa-router';
import userRouter from './users/router';
import packageData from '../../package.json';
import AUTH_MIDDLEWARE from '../middlewares/auth.middleware';

const router = new Router();

router.get('/', async (ctx) => {
  const level = (process.env.SERVICE_LEVEL || 'NO LEVEL');
  const { version } = packageData;
  ctx.status = 200;

  const data = {
    status: ctx.status,
    msg: "I'm Alive!",
    version,
    level,
  };
  ctx.body = data;
});

router.use('user', userRouter.routes());
router.get('test', AUTH_MIDDLEWARE.verifyToken, (ctx) => {
  ctx.body = 'Hello~?';
});

export default router;
