import request from 'supertest';
import { IUser } from '../model/IUser';
import { server } from '../server';

const db: IUser[] = [
  {
    id: '9ffa7c24-5dff-42b0-beae-298ef4d2299b',
    username: 'Alex',
    age: 30,
    hobbies: ['JS', 'TS'],
  },
  {
    id: '7e95a5f6-1f3b-41fe-ba54-a10fcc4cefac',
    username: 'Olga',
    age: 30,
    hobbies: ['JS', 'TS'],
  },
];

const newUser: IUser = {
  username: 'Alex',
  age: 1,
  hobbies: ['Toys', 'Cartoons'],
};

const userForUpdate: IUser = {
  username: 'Update Name',
  age: 100,
  hobbies: [],
};

let testUserId: string;

describe('Test server scenario 1', () => {
  test('GET ALL. Should return all users in db', async () => {
    const srv = server(db);
    const response = await request(srv).get('/api/users').set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(db);
  });

  test('POST Request. Should return new user', async () => {
    const srv = server(db);
    const response = await request(srv).post('/api/users').send(newUser);
    const { id } = response.body;
    testUserId = id;
    expect(response.status).toBe(200);
    expect(response.body.id).toBeTruthy();
    expect(response.body).toEqual({ id, ...newUser });
  });

  test('GET User. Should return record', async () => {
    const srv = server(db);
    const response = await request(srv).get(`/api/users/${testUserId}`);
    expect(response.status).toBe(200);
    const { id } = response.body;
    expect(id).toBe(testUserId);
  });

  test('PUT Request. Should update user and return updated record', async () => {
    const srv = server(db);
    const response = await request(srv).put(`/api/users/${testUserId}`).send(userForUpdate);
    expect(response.status).toBe(200);
    const { id } = response.body;
    expect(id).toBe(testUserId);
    expect(response.body).toEqual({ id: testUserId, ...userForUpdate });
  });

  test('DELETE Request. Should delete user and return right status code', async () => {
    const srv = server(db);
    const response = await request(srv).del(`/api/users/${testUserId}`);
    expect(response.status).toBe(204);
  });
});
