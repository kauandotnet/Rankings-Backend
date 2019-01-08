import latinize = require('latinize');
import { isNil } from 'lodash';
import * as moment from 'moment';

import env_variables from './env_variables';
import { logger } from './logger';

// tslint:disable-next-line:no-namespace
export namespace Utils {
  export function concatParams(base: string, ...params: string[]) {
    let str = base;
    for (const param of params) {
      if (param !== undefined && param !== null && param.length > 0) {
        str = str + ':' + param;
      } else {
        break;
      }
    }
    return str;
  }

  export function unixToDate(unix: number): moment.Moment {
    return moment.unix(unix);
  }

  export function dateToMoment(date: Date): moment.Moment {
    return moment(date);
  }

  export function normalizeString(str: string) {
    return latinize(str).toLowerCase();
  }

  export function omitReject<T>(promise: Promise<T>) {
    return promise.then<T>(d => d).catch<null>(err => {
      logger.debug('OmitReject Error', err.message);
      return null;
    });
  }

  export function isRequestAuthenticated(request: Express.Request) {
    if (env_variables.isDev) {
      return true;
    }
    return !isNil(request.cognitoClaims);
  }
}
