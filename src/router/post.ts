import { IncomingMessage, ServerResponse } from "http";
import { IUser } from "../model/IUser";

export const postRequest = async (req: IncomingMessage, res: ServerResponse, GLOBAL_DATA: IUser | []) => {
    console.log(req, res, GLOBAL_DATA);
}