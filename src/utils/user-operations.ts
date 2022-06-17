import { v4 as uuidv4, validate } from 'uuid';
import { IUser } from '../model/IUser';

const findUser = async (data: IUser[] | [], id: string) => {
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


const createNewUser = async () => {
    const id = uuidv4()
    console.log(id);
    
}


export {
    findUser,
    createNewUser

}