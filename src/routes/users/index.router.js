import COMMON_UTIL from '../../utils/commonUtil';
import JWT_UTIL from '../../utils/jwtUtil';

const indexRouter = {
  loginAction: async (ctx) => {
    const [success, lackKeys] = COMMON_UTIL.objectHaveKeys(ctx.req.body, ['email', 'password']);
    if (!success) return COMMON_UTIL.lackKeyResult(ctx, lackKeys);
    // ? 필요한 email, password 가 없다고 에러 표시하며 끝내줌.

    const { email, password } = ctx.req.body;

    if (email === 'test' && password === 'test') {
      const token = JWT_UTIL.sign({
        id: 1,
        name: '내이름',
        info: '더 저장하고싶은것들',
      });
      COMMON_UTIL.successResult(ctx, { token });
    } else {
      return COMMON_UTIL.errorResult(ctx, '이메일 혹은 패스워드가 틀립니다.');
    }
  },
  registerAction: async (ctx) => {
    console.log(ctx.req.body);
    COMMON_UTIL.successResult(ctx);
  },
};

export default indexRouter;
