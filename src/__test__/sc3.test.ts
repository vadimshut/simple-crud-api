import request from 'supertest';
import { IUser } from '../model/IUser';
import { server } from '../server';

const db: IUser[] = [];
const srv = server(db);

const newUser: IUser = {
  username: 'Alex',
  age: 1,
  hobbies: ['Toys', 'Cartoons'],
};

let userId: string;
const wrongId = 'sdjkh23rh';

describe('Test server scenario 3', () => {
  test('POST REQUEST. Should return created user', async () => {
    const response = await request(srv).post('/api/users').send(newUser);
    const { id } = response.body;
    userId = id;
    expect(response.status).toBe(200);
    expect(db.length).toBe(1);
  });

  test('DELETE REQUEST. Should return wrong status code when send wrong user id', async () => {
    const response = await request(srv).del(`/api/users/${wrongId}`);
    expect(response.status).toBe(400);
  });

  test('DELETE REQUEST. Should delete user', async () => {
    const response = await request(srv).del(`/api/users/${userId}`);
    expect(response.status).toBe(204);
    expect(db.length).toBe(0);
  });
});
