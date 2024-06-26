import { logger as customLogger } from '@/util/observability/loggers/default';

import { makeDecorator } from '../make-decorator';

const loggerAdapter = ({ name, ...payload }: Record<string, string>) => {
  customLogger.log({ level: 'verbose', message: name, ...payload });
};

export const logger = makeDecorator(loggerAdapter, {
  inputName: 'input',
  outputName: 'output'
});
