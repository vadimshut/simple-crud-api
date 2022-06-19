import { IUser } from './model/IUser';
import { config } from 'dotenv';
import { ALTERNATIVE_PORT } from './constants';
import { runServer } from './server';

config();

const PORT = Number(process.env['SERVER_PORT']) || ALTERNATIVE_PORT;
let GLOBAL_DATA: IUser[] = [];

runServer(PORT, GLOBAL_DATA);
