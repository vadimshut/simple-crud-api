import { IncomingMessage, ServerResponse } from "http";
import { GET_USERS } from "../constants";
import { IUser } from "../model/IUser";

export const getRequest = async (req: IncomingMessage, res: ServerResponse, GLOBAL_DATA: IUser | []) => {
    if(req.url === GET_USERS) {
        const data = JSON.stringify(GLOBAL_DATA)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        console.log(data);
        res.end(data)
    }


}