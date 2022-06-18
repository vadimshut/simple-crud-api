import { v4 as uuidv4, validate } from 'uuid';
import { MESSAGE_IS_NOT_UUID, NOT_FOUND } from '../constants';
import { IUser } from '../model/IUser';

const findUser = async (data: IUser[] | [], id: string, method?: string) => {
    const isValidated = validate(id) 
    let statusCode = method === 'DELETE' ? 204 : 200

    if(!isValidated) {
        return {statusCode: 400, message: MESSAGE_IS_NOT_UUID}
    }
    const userList = data.filter(user => user.id === id)

    if(userList.length && userList[0]) {
        return {statusCode, message: '', payload: userList[0]}
    }
    return {statusCode: 404, message: NOT_FOUND} 
}


const createNewUser = async (user: IUser, GLOBAL_DATA: IUser[]) => {
    const id = uuidv4()
    const userForAddToDb: IUser = {id, ...user}    
    GLOBAL_DATA.push(userForAddToDb)
    console.log(`- User ${id} was add successfully`);
    return userForAddToDb    
}

const updateUser = async (oldUser: IUser, newUser: IUser, GLOBAL_DATA: IUser[]) => {
    const {id} = oldUser
    const index = GLOBAL_DATA.findIndex(user => user.id === oldUser.id)
    const updatedUser: IUser = {id, ...newUser}
    GLOBAL_DATA.splice(index, 1, updatedUser)
    console.log(`- User ${id} was update`);
    
    return updatedUser   
}

const deleteUser = async (id: string, GLOBAL_DATA: IUser[]) => {
    const index = GLOBAL_DATA.findIndex(user => user.id === id)
    GLOBAL_DATA.splice(index, 1)
    console.log(`- User ${id} was delete successfully`);
    
}


export {
    findUser,
    createNewUser,
    updateUser,
    deleteUser
}