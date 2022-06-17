import { IncomingMessage, ServerResponse } from "http";
import { GET_USERS_REGESP, GET_USER_REGESP } from "../constants";
import { IUser } from "../model/IUser";
import { findUser, sendResponse } from "../utils/utils";


export const getRequest = async (req: IncomingMessage, res: ServerResponse, GLOBAL_DATA: IUser[] | []) => {
    const {url} = req  

    if(url && GET_USERS_REGESP.test(url)) {
        await sendResponse(res, 200, GLOBAL_DATA)
    } else if(url && GET_USER_REGESP.test(url)) {
        const params = url.split('/')            
        const id = params[params.length -1]
        if (id) {
          const {statusCode, message} = await findUser(GLOBAL_DATA, id.toString())
          await sendResponse(res, statusCode, null, message)
          
        }        
    } else {
        await sendResponse(res, 404, null, 'Resource not found. Path is not correct')
    }
}