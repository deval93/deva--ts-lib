import logger from "./logger";

export const Util = {
  throwError: (err: Object | Error | string) => {
    logger.error(err);
    throw err;
  },
  responseStatusCode: {
    internalError: 500,
    notFound: 404,
    unAuthorized: 401,
    forbidden: 403,
    ok: 200,
    created: 201,
    NO_CONTANT: 204,
  },
  status: {
    internalError: 500,
    notFound: 404,
    unAuthorized: 401,
    forbidden: 403,
    ok: 200,
    created: 201,
    NO_CONTANT: 204,
  },
  parseErr: (err: Error) => {
    logger.error(err.stack);
    return err.message;
  },
  getErrorMsg: (err: Error | string) => {
    if (typeof err === "string") {
      logger.error(err);
      return { reason: err, statusCode: 2 };
    } else {
      return { reason: Util.parseErr(err), statusCode: 2 };
    }
  },
  getErrorStatusCode: (err: Error | string) => {
    if (typeof err === "string") {
      return Util.status.ok;
    } else {
      return Util.status.internalError;
    }
  },
  errorHandler: (handler: any) => {
    const handleError = (err: any) => {
      console.error("please handle me", err);
    };
    return (...args: any) => {
      try {
        const ret = handler.apply(this, args);
        if (ret && typeof ret.catch === "function") {
          // async handler
          ret.catch(handleError);
        }
      } catch (e) {
        // sync handler
        handleError(e);
      }
    };
  },
  successHandler: (handler: any) => {
    return (...args: any) => {
      handler.apply(this, args);
    };
  },
  debounce: (func: any, timeout = 300) => {
    let timer: any;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  },
  todayDate: () => {
    let date = new Date();
    let todayDate = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
    return todayDate
  },
  sendSuccessResponse: (data: any) => {
    return { ...data, statusCode: 1 };
  },
  asyncForEach: async (array: any, callback: any) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  },
  toSocketErrorPayload: (data: any) => {
    return {
      ...data,
      statusCode: 2
    }
  },
  toSocketSuccessPayload: (data: any) => {
    return {
      ...data,
      statusCode: 1
    }
  },
  ballsToOvers: (balls: number) => {
    const overs = Math.floor(balls / 6);
    const ballsRemaining = balls % 6;
    return `${overs}.${ballsRemaining}`;
  },
  ordinalSuffix: (i: number): string => {
    var j = i % 10, k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  },
  log: (() => {
    if (process.env.LIBRARY_DEBUG) {
      return console.log;
    } else return () => { };
  })()

};

export default Util;
