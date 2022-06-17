 const HEADERS = { 'Content-Type': 'application/json' }

const GET_USERS_REGESP = /^\/api\/users$/
const GET_USER_REGESP = /^\/api\/users\/[\w]+$/
// export const POST_USER
// export const PUT_USER
// export const DELETE_USER

// resizeBy.writeHead(404)
// resizeBy.end(JSON.stringify({error: 'Resource not found'}))


const ROOT = '/'
const DIR = '/api/users'


export {
    HEADERS,
    GET_USERS_REGESP,
    GET_USER_REGESP,
    ROOT,
    DIR
}