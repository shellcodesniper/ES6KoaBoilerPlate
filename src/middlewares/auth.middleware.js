import COMMON_UTIL from '../utils/commonUtil';
import JWT_UTIL from '../utils/jwtUtil';

const AUTH_MIDDLEWARE = {
  verify: async (ctx, token) => {
    const ret = JWT_UTIL.verify(token);
    if (ret.success) {
      const { data } = ret;
      ctx.decoded = data;
    }
    return ret;
  },

  parseToken: async (ctx) => {
    let reason;

    if (ctx.req.headers.token) {
      reason = await AUTH_MIDDLEWARE.verify(ctx, ctx.req.headers.token);
    } else {
      reason = { success: false, message: 'NO ANY TOKEN IN HEADER' };
    }
    return reason;
  },

  verifyToken: async (ctx, next) => {
    const result = await AUTH_MIDDLEWARE.parseToken(ctx);

    if (result.success === true) {
      if (ctx.decoded) {
        const { decoded } = ctx;
        console.log(`--- 토큰 파싱에 성공하였습니다. 접속 유저 ${decoded.name} ---`);
        return next();
      }
      return COMMON_UTIL.errorResult(ctx, 'NO VALID USER', 401);
    }

    if (result.code) {
      if (result.code.toString() in JWT_UTIL.errorTable) {
        const simpleErrorMessage = JWT_UTIL.errorTable[result.code.toString()];
        return COMMON_UTIL.errorResult(ctx, `SIMPLE REASON: ${simpleErrorMessage}, REASON: ${result.message}`, 401);
      }
      return COMMON_UTIL.errorResult(ctx, result.message, 401);
    }
    return COMMON_UTIL.errorResult(ctx, 'Unknown Error In Authorize');
  },
};

export default AUTH_MIDDLEWARE;
