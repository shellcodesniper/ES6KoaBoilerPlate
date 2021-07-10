// const isProduction = (!((process.env.NODE_ENV || 'development') === 'development'));
// ? 프로덕션 환경일 경우 작업에 쓰일 변수

process.env.TZ = 'Asia/Seoul';
// ! SET TIMEZONE

import('../src/app');
