// TODO: We should seek better alternatives in the future, but for now, it's not a problem.
/* eslint-disable @typescript-eslint/no-explicit-any */
import Transport from 'winston-transport';

import { isJson } from '@/util/text';

type Options = Pick<Transport.TransportStreamOptions, 'format' | 'level'> & {
  receiver: ((params: { [key: string]: any }) => void) | Function;
};

type Levels =
  | 'error'
  | 'warn'
  | 'info'
  | 'http'
  | 'verbose'
  | 'debug'
  | 'silly';

export class GenericTransport extends Transport {
  private logger!: Function;
  private levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
  };

  constructor(options: Options) {
    super(options);

    this.logger = options.receiver;
  }
  log(params: any, callback: () => void) {
    const [levelSymbols, messageSymbols] = Object.getOwnPropertySymbols(params);

    const logLevel = <Levels>params[levelSymbols];

    const logRanking = this.levels?.[logLevel] ?? 7;

    const rankingOfConfig = this.levels?.[<Levels>this?.level];

    const conditionToLog =
      logRanking <= rankingOfConfig || logLevel === this?.level;

    if (conditionToLog) {
      const message = params[messageSymbols];
      const body = isJson(message) ? JSON.parse(message) : { message };
      this.logger({ level: this.level, ...body });
    }

    callback();
  }
}
