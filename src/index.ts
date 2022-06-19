import { IUser } from './model/IUser';
import { config } from 'dotenv';
import { ALTERNATIVE_PORT } from './constants';
import { server } from './server';

config();

const PORT = Number(process.env['SERVER_PORT']) || ALTERNATIVE_PORT;
let GLOBAL_DATA: IUser[] = [];

server(GLOBAL_DATA).listen(PORT, 'localhost', () => {
  console.log(`App has been started on port ${PORT}...`);
});
