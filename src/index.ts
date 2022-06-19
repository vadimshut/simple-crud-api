import { createServer } from 'http';
import { IUser } from './model/IUser';
import { router } from './router/router';
import { config } from 'dotenv';


import { ALTERNATIVE_PORT, SERVER_ERROR } from './constants';
import { sendResponse } from './utils/utils';

config();
const PORT = Number(process.env['SERVER_PORT']) || ALTERNATIVE_PORT;

let GLOBAL_DATA: IUser[] = [];

export function start(port: number, db: IUser[]) {
  createServer(async (req, res) => {
    try {
      await router(req, res, db);
    } catch {
      sendResponse(res, 500, null, SERVER_ERROR);
    }
  }).listen(port, 'localhost', () => {
    console.log(`App has been started on port ${port}...`);
  });
}

start(PORT, GLOBAL_DATA);
