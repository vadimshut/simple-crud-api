import { IncomingMessage, ServerResponse } from 'http';
import { GET_USER_REGESP, INCORRECT_PATH } from '../constants';
import { IUser } from '../model/IUser';
import { getNameFromPath } from '../utils/get-name-from-path';
import { deleteUser, findUser } from '../utils/user-operations';
import { sendResponse } from '../utils/utils';

export const deleteRequest = async (req: IncomingMessage, res: ServerResponse, GLOBAL_DATA: IUser[]) => {
  const { url } = req;

  if (url && GET_USER_REGESP.test(url)) {
    const userId = await getNameFromPath(url);
    const { statusCode, message, payload: foundUser } = await findUser(GLOBAL_DATA, userId, 'DELETE');
    if (statusCode >= 300) {
      await sendResponse(res, statusCode, null, message);
      return;
    }
    if (foundUser?.id) {
      await deleteUser(foundUser.id, GLOBAL_DATA);
      if (process?.send) process.send({ message: 'updatedStore', payload: GLOBAL_DATA });
      sendResponse(res, statusCode, null, message);
    }
  } else {
    await sendResponse(res, 404, null, INCORRECT_PATH);
  }
};
