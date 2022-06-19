import { createServer } from 'http';
import { SERVER_ERROR } from './constants';
import { IUser } from './model/IUser';
import { router } from './router/router';
import { sendResponse } from './utils/utils';

export function server(db: IUser[], process?: NodeJS.Process) {
  if (process) {
    process.on('message', (msg: { message: string; payload: string }) => {
      const { message, payload } = msg;
      if (message === 'data') {
        db = JSON.parse(payload);
      }
    });
  }

  return createServer(async (req, res) => {
    try {
      await router(req, res, db, process);
    } catch {
      sendResponse(res, 500, null, SERVER_ERROR);
    }
  });
}
