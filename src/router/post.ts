import { IncomingMessage, ServerResponse } from "http";
import { GET_USERS_REGESP } from "../constants";
import { IUser } from "../model/IUser";
import { createNewUser } from "../utils/user-operations";
import { sendResponse } from "../utils/utils";
import { validateBody } from "../utils/validate-body";

export const postRequest = async (req: IncomingMessage, res: ServerResponse, GLOBAL_DATA: IUser[] | []) => {
    const {url} = req

    if(url && GET_USERS_REGESP.test(url)) {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        // if (body.length > 1e6) req.destroy()
        })

        req.on('end', async () => {
            const {verdict, user} = await validateBody(body)
            if (!verdict) await sendResponse(res, 404, null, 'Request body is not correct')
            const newUser = await createNewUser(user, GLOBAL_DATA)
            sendResponse(res, 200, newUser)
        
        });

                
        
  
        
    } else {
        await sendResponse(res, 404, null, 'Resource not found. Path is not correct')
    }
}