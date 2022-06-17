import {createServer} from 'http'
import { IUser } from './model/IUser';
import { router } from './router/router';

console.log(__dirname);
const PORT = 5000

// console.log(req.url);
    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.end(DATA)

async function start() {

    const GLOBAL_DATA: IUser | [] = []

    const server = createServer((req, res) => {
        router(req, res, GLOBAL_DATA) 
    })
    // server.on('request', (req, res) => {
    //     console.log('Request path' + req.url);
    //             
    // })

    server.listen(PORT, 'localhost', () => {
        console.log(`App has been started on port ${PORT}...`)});
}

start()

