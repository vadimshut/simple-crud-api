import { IncomingMessage, ServerResponse } from "http";
import { GET_USERS_REGESP } from "../constants";
import { IUser } from "../model/IUser";
import { sendResponse } from "../utils/utils";

export const postRequest = async (req: IncomingMessage, res: ServerResponse, GLOBAL_DATA: IUser[] | []) => {
    const {url} = req

    if(url && GET_USERS_REGESP.test(url)) {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
            // if (body.length > 1e6) req.destroy()
        })

        req.on('end', () => {
            console.log(body);
        });
        
  
        
    } else {
        await sendResponse(res, 404, null, 'Resource not found. Path is not correct')
    }
}