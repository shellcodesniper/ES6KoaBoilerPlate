import Koa from 'koa';
import Router from 'koa-router';
import KoaBody from 'koa-body';

import indexRouter from './routes/router';

const port = parseInt(`${process.env.PORT || '3000'}`, 10);
// ? 서버 리스닝 포트

const app = new Koa();

const parseOption = {
  patchNode: true,
  formLimit: '10mb',
  multipart: true,
  formidable: { multiples: false },
  onError: (err) => {
    console.error('Error While Parse Body - Koabody');
    console.error(JSON.stringify(err));
  },
};

const appRouter = new Router();

appRouter.use('/', KoaBody(parseOption), indexRouter.routes());

app.use(appRouter.routes())
  .use(appRouter.allowedMethods());

app.listen(port, () => {
  console.debug(`서버가 준비되었고, ${port} 로 연결 대기중입니다.`);
});

export default app;
