import expect from 'expect';
import request from 'supertest';
import { isTypedArray } from 'util/types';
import { runServer } from '../server';

describe('Get users', () => {
  it('should return users list', () => {
    request(runServer)
      .get('/api/users')
      .expect(200)
      .expect((res) => {
        console.log(res);
      });
  });
});
