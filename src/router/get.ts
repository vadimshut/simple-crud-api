import { IncomingMessage, ServerResponse } from "http";
import { GET_USERS_REGESP, GET_USER_REGESP, INCORRECT_PATH } from "../constants";
import { IUser } from "../model/IUser";
import { getNameFromPath } from "../utils/get-name-from-path";
import { findUser } from "../utils/user-operations";
import { sendResponse} from "../utils/utils";



export const getRequest = async (req: IncomingMessage, res: ServerResponse, GLOBAL_DATA: IUser[] | []) => {
    const {url} = req      

    if(url && GET_USERS_REGESP.test(url)) {
        await sendResponse(res, 200, GLOBAL_DATA)
    } else if(url && GET_USER_REGESP.test(url)) {
        const userId = await getNameFromPath(url) 
        const {statusCode, message, payload} = await findUser(GLOBAL_DATA, userId)
        if(statusCode >= 300) {
            await sendResponse(res, statusCode, payload)
            return
        }
        await sendResponse(res, statusCode, null, message)        
    } else {
        await sendResponse(res, 404, null, INCORRECT_PATH)
    }
}