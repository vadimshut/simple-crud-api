import {createServer} from 'http'
import { IUser } from './model/IUser';
import { router } from './router/router';

console.log(__dirname);
const PORT = 5000

async function start() {
    let GLOBAL_DATA: IUser[] = []
    const server = createServer((req, res) => {
        router(req, res, GLOBAL_DATA) 
    })
  
    server.listen(PORT, 'localhost', () => {
        console.log(`App has been started on port ${PORT}...`)});
}

start()

