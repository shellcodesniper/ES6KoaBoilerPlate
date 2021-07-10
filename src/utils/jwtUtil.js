import jwt from 'jsonwebtoken';

const jwtSecret = 'jwtsecret';
const signOption = {
  algorithm: 'HS512',
  expiresIn: '1d',
  issuer: 'seung.com',
};

const JWT = {
  errorTable: {
    '-2': 'String returned..', // Object를 반환하도록 생각하였는데 string이 리턴됨
    '-1': 'Unknown', // 모르는 에러
    0: 'TokenExpired', // 토큰 만료됨
    1: 'JsonWebTokenError', // webtoken Error 통틀어서
    2: 'NotBeforeError', // Json 아직 active 되지 않음.
  },
  sign: (data) => jwt.sign(data, jwtSecret, signOption),

  verify: (token) => {
    try {
      const data = jwt.verify(token, jwtSecret);
      if (typeof data === 'string') {
        return { success: false, code: -2, message: data };
      }
      return { success: true, data };
    } catch (err) {
      const message = err.message ?? '';
      let code = -1;

      if (err instanceof jwt.TokenExpiredError) code = 0;
      else if (err instanceof jwt.JsonWebTokenError) code = 1;
      else if (err instanceof jwt.NotBeforeerror) code = 2;

      return { success: false, code, message };
    }
  },

  decode: (token) => jwt.decode(token, { complete: true }),
};

export default JWT;
