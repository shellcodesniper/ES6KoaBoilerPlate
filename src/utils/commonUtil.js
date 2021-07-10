const COMMON_UTIL = {
  isNotNull: (data) => (typeof data !== 'undefined' && data !== null),

  objectHaveKeys: (obj, keys = [], conditionKeys = []) => {
    const lackKeys = [];
    const tempConditions = [];
    let success = true;

    // eslint-disable-next-line no-restricted-syntax
    for (const condition of conditionKeys) {
      if (condition.length >= 2) {
        tempConditions.push({
          conditionOne: condition[0],
          conditiontwo: condition[1],
        });
      }
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const key of keys) {
      if (key in obj) {
        if (!COMMON_UTIL.isNotNull(obj[key])) {
          lackKeys.push(key);
          success = false;
        }
      } else {
        lackKeys.push(key);
        success = false;
      }
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const condition of tempConditions) {
      if (!(condition.conditionOne in obj || condition.conditionTwo in obj)) {
        lackKeys.push(`<${condition.conditionOne} OR ${condition.conditionTwo}>`);
        success = false;
      }
    }
    return [success, lackKeys];
  },

  successResult: (ctx, data = {}, msg = '', statusCode = 200) => {
    ctx.status = statusCode;
    ctx.body = { status: statusCode, msg, data };
  },
  errorResult: (ctx, msg = '', statusCode = 500) => {
    ctx.status = statusCode;
    ctx.body = { status: ctx.status, msg };
  },
  lackKeyResult: (ctx, lackKeys) => {
    ctx.status = 500;
    ctx.body = { status: ctx.status, msg: `Following Keys must need: ${lackKeys}` };
  },
};

export default COMMON_UTIL;
