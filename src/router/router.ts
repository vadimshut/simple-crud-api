import { IncomingMessage, ServerResponse } from 'http';
import { IUser } from '../model/IUser';
import { deleteRequest } from './delete';
import { getRequest } from './get';
import { postRequest } from './post';
import { putRequest } from './put';

export const router = async (req: IncomingMessage, res: ServerResponse, GLOBAL_DATA: IUser[] | []) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      getRequest(req, res, GLOBAL_DATA);
      break;
    case 'POST':
      postRequest(req, res, GLOBAL_DATA);
      break;
    case 'PUT':
      putRequest(req, res, GLOBAL_DATA);
      break;
    case 'DELETE':
      deleteRequest(req, res, GLOBAL_DATA);
      break;
    default:
      res.statusCode = 500;
      res.end({ message: "Server Error. Server doesn't proccesing you request" });
      break;
  }
};
