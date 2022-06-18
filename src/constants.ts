const PORT = 4000
const HEADERS = { 'Content-Type': 'application/json' }

const GET_USERS_REGESP = /^\/api\/users$/
const GET_USER_REGESP = /^\/api\/users\/[\w-]+$/


const INCORRECT_PATH = '- Resource not found. Path is not correct'
const MESSAGE_IS_NOT_UUID = '- Resource not found. ID type is not UUID'
const BAD_REQUEST = 'Invalid data in request'
const NOT_FOUND = 'Resource not found.'
export {
    PORT,
    HEADERS,
    GET_USERS_REGESP,
    GET_USER_REGESP,
    INCORRECT_PATH,
    MESSAGE_IS_NOT_UUID,
    BAD_REQUEST,
    NOT_FOUND
}