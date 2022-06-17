import { ServerResponse } from "http";
import { IUser } from "../model/IUser";
import { v4 as uuidv4, validate } from 'uuid';



export const sendResponse = async (res: ServerResponse, statusCode: number, data?: IUser | IUser[] | [] | null, message?: string) => { 
    res.writeHead(statusCode, { 'Content-Type': 'application/json' })
    if(message) {
        const errorMessage = JSON.stringify({message})        
        return res.end(errorMessage)
    }      
    const dataToString = JSON.stringify(data)
    return res.end(dataToString)
}


export const findUser = async (data: IUser[] | [], id: string) => {
    const isValidated = validate(id)
    if(!isValidated) {
        return {statusCode: 400, message: 'Resource not found. ID type is not UUID'}
    }
    const userList = data.filter(user => user.id === id)

    if(userList.length && userList[0]) {
        return {statusCode: 200, message: '', payload: userList[0]}
    }
    return {statusCode: 404, message: 'Resource not found.'} 
}


export const createNewUser = async () => {
    const id = uuidv4()
    console.log(id);
    
}