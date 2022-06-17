import { ServerResponse } from "http";
import { IUser } from "../model/IUser";

export const sendResponse = async (res: ServerResponse, statusCode: number, data?: IUser | IUser[] | [] | null, message?: string) => { 
    res.writeHead(statusCode, { 'Content-Type': 'application/json' })
    if(message) {
        const errorMessage = JSON.stringify({message})        
        return res.end(errorMessage)
    }      
    const dataToString = JSON.stringify(data)
    return res.end(dataToString)
}
