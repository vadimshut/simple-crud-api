const PORT = 4000
const HEADERS = { 'Content-Type': 'application/json' }

const GET_USERS_REGESP = /^\/api\/users$/
const GET_USER_REGESP = /^\/api\/users\/[\w]+$/

export {
    PORT,
    HEADERS,
    GET_USERS_REGESP,
    GET_USER_REGESP,
}