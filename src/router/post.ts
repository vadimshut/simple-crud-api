import { IncomingMessage, ServerResponse } from 'http';
import { BAD_REQUEST, GET_USERS_REGESP, INCORRECT_PATH } from '../constants';
import { IUser } from '../model/IUser';
import { createNewUser } from '../utils/user-operations';
import { sendResponse } from '../utils/utils';
import { validateBody } from '../utils/validate-body';

export const postRequest = async (req: IncomingMessage, res: ServerResponse, GLOBAL_DATA: IUser[] | []) => {
  const { url } = req;

  if (url && GET_USERS_REGESP.test(url)) {
    let body = '';
    req.on('data', (chunk) => (body += chunk.toString()));

    req.on('end', async () => {
      const { verdict, user } = await validateBody(body);
      if (!verdict) await sendResponse(res, 404, null, BAD_REQUEST);
      if (user) {
        const newUser = await createNewUser(user, GLOBAL_DATA);
        sendResponse(res, 200, newUser);
      }
    });
  } else {
    await sendResponse(res, 404, null, INCORRECT_PATH);
  }
};
