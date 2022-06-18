import { IUser } from '../model/IUser'

const instanceOfIUser = (object: IUser): boolean => {
    const userKeys = ['username', 'age', 'hobbies']
    const objectKeys = Object.keys(object)
    if(objectKeys.length !== userKeys.length) return false
   
   for (let key of objectKeys) {
    if(!userKeys.includes(key)) return false
   }  

   const {age, hobbies, username} = object
   if(typeof username !== 'string' || typeof age !== 'number' || !Array.isArray(hobbies)) return false
   
   if(hobbies.length === 0) {
    return true
   } else {
    for (let key of hobbies) {
        if(typeof key !== 'string') return false
       }
   }
    return true
}

export const validateBody = async (body: string) => {
    const bodyInJson: IUser = JSON.parse(body)
    let verdict = instanceOfIUser(bodyInJson)
    return {verdict, user: bodyInJson}
}