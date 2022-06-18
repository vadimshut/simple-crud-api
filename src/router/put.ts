import { IncomingMessage, ServerResponse } from 'http';
import { GET_USER_REGESP, INCORRECT_PATH } from '../constants';
import { IUser } from '../model/IUser';
import { getNameFromPath } from '../utils/get-name-from-path';
import { findUser, updateUser } from '../utils/user-operations';
import { sendResponse } from '../utils/utils';
import { validateBody } from '../utils/validate-body';

export const putRequest = async (req: IncomingMessage, res: ServerResponse, GLOBAL_DATA: IUser[]) => {
  const { url } = req;

  if (url && GET_USER_REGESP.test(url)) {
    const userId = await getNameFromPath(url);
    const { statusCode, message, payload: foundUser } = await findUser(GLOBAL_DATA, userId);
    if (statusCode !== 200) {
      await sendResponse(res, statusCode, null, message);
      return;
    }

    let body = '';
    req.on('data', (chunk) => (body += chunk.toString()));

    req.on('end', async () => {
      const { verdict, user: updatedUser } = await validateBody(body);
      if (!verdict) await sendResponse(res, 404, null, 'Request body is not correct');

      if (foundUser && updatedUser) {
        const user = await updateUser(foundUser, updatedUser, GLOBAL_DATA);
        sendResponse(res, 200, user);
      }
    });
  } else {
    await sendResponse(res, 404, null, INCORRECT_PATH);
  }
};
