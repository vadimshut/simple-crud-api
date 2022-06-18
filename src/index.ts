import {createServer} from 'http'
import { IUser } from './model/IUser';
import { router } from './router/router';
import {config} from 'dotenv'

import { ALTERNATIVE_PORT, SERVER_ERROR } from './constants';
import { sendResponse } from './utils/utils';



async function start() {
    config()
    const PORT = Number(process.env['SERVER_PORT']) || ALTERNATIVE_PORT

    let GLOBAL_DATA: IUser[] = []
    const server = createServer(async (req, res) => {
        try {
            await router(req, res, GLOBAL_DATA) 
        } catch {
            sendResponse(res, 500, null, SERVER_ERROR)
            SERVER_ERROR 
        }
       
    })
  
    server.listen(PORT, 'localhost', () => {
        console.log(`App has been started on port ${PORT}...`)});
}

start()

