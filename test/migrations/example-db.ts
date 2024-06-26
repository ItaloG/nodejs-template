/**
 * @description This should be used to up and down all or part of a database!
 */

import { randomUUID } from 'crypto';

import { EXAMPLE_DB } from '@/infra/db/mssql/util';
import { createMockTable, downMockTable } from '@/util/db';
import { date, number, string } from '@/util/db/types';

const {
  EXAMPLE: { EXAMPLE },
  FOO: { FOO }
} = EXAMPLE_DB;

export const migrate = {
  // implement migration here!
  up: {
    HealthIntegrationTest: async () => {
      const promiseExampleTable = createMockTable(EXAMPLE, {
        created_at: date().default(() => new Date()),
        updated_at: date().default(() => new Date()),
        deleted_at: date().default(() => null),
        description: string(),
        external_id: string().default(() => randomUUID()),
        example_id: number(),
        value: number()
      });
      const promiseFooTable = createMockTable(FOO, {
        created_at: date().default(() => new Date()),
        updated_at: date().default(() => new Date()),
        deleted_at: date().default(() => null),
        description: string(),
        external_id: string().default(() => randomUUID()),
        foo_id: number(),
        example_id: number(),
        value: number()
      });
      await Promise.all([promiseExampleTable, promiseFooTable]);
    },
    ExampleDbUnitTest: async () => {
      const promiseExampleTb = createMockTable(EXAMPLE, {
        created_at: date().default(() => new Date()),
        updated_at: date().default(() => new Date()),
        deleted_at: date().default(() => null),
        description: string(),
        external_id: string().default(() => randomUUID()),
        example_id: number(),
        value: number()
      });
      const promiseFooTb = createMockTable(FOO, {
        created_at: date().default(() => new Date()),
        updated_at: date().default(() => new Date()),
        deleted_at: date().default(() => null),
        description: string(),
        external_id: string(),
        foo_id: number(),
        example_id: number(),
        value: number()
      });
      await Promise.all([promiseExampleTb, promiseFooTb]);
    }
  },
  // implement rollback here!
  down: async () => {
    const promiseDownExampleTb = downMockTable(EXAMPLE);
    const promiseDownFooTb = downMockTable(FOO);
    await Promise.all([promiseDownExampleTb, promiseDownFooTb]);
  }
};
