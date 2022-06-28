import { server } from '@/main/application';
import request from 'supertest';

describe('Health Route', () => {
  it('Should return 200 when the server is online', async () => {
    await request(server).get('/api/v1/health').expect(200);
  });
});
