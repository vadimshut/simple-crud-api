import request from 'supertest';
import { IUser } from '../model/IUser';
import { server } from '../server';

const db: IUser[] = [];

const newUser: IUser = {
  username: 'Alex',
  age: 1,
  hobbies: ['Toys', 'Cartoons'],
};

const errorUserForUpdate = {
  username: 'Alex',
};

let testUserId: string;

describe('Test server scenario 2', () => {
  test('should create 5 equal users', async () => {
    const srv = server(db);
    const requests = [];
    for (let i = 0; i < 5; i++) {
      requests.push(request(srv).post('/api/users').send(newUser));
    }
    const users = await Promise.all(requests);
    expect(users.length).toBe(5);
    expect(users.length).toBe(db.length);
  });

  test('PUT Request. Should return error when request does not consist all fields', async () => {
    const srv = server(db);
    if (db[0]?.id) testUserId = db[0]?.id;
    const response = await request(srv).put(`/users/${testUserId}`).send(errorUserForUpdate);
    expect(response.statusCode).toBe(404);
  });

  test('GET Request. Should return all records', async () => {
    const srv = server(db);
    const response = await request(srv).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(5);
  });
});
