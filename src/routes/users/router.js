import Router from 'koa-router';

import indexRouter from './index.router';

const router = new Router();

router.post('/', indexRouter.loginAction);
router.post('/register', indexRouter.registerAction);

export default router;
