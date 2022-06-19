import cluster, { Worker } from 'cluster';
import { cpus } from 'os';
import { pid } from 'process';
import { ALTERNATIVE_PORT } from './constants';
import { IUser } from './model/IUser';
import { server } from './server';
import { config } from 'dotenv';

config();
cluster.schedulingPolicy = cluster.SCHED_RR;

const PORT = Number(process.env['SERVER_PORT']) || ALTERNATIVE_PORT;
let GLOBAL_DATA: IUser[] = [];

void (async () => {
  if (cluster.isPrimary) {
    const cpusCount = cpus().length;
    console.log(`Master started. Pid ${pid}`);
    console.log(`Starting ${cpusCount} workers\n`);

    for (let i = 0; i < cpusCount - 1; i++) {
      const worker = cluster.fork();
      worker.send({ message: 'data', payload: JSON.stringify(GLOBAL_DATA) });
    }

    cluster
      .on('message', (_worker, msg: { message: string; payload: IUser[] }) => {
        const { message, payload } = msg;
        if (message === 'updatedStore' && payload) {
          GLOBAL_DATA = [...payload];
          for (const id in cluster.workers) {
            if (cluster.workers && cluster.workers[id]) {
              const w = cluster.workers[+id];
              w?.send({ message: 'data', payload: JSON.stringify(payload) });
            }
          }
        }
      })
      .on('exit', (worker, _msg) => {
        console.log(`Worker died! ${worker.process.pid}`);
        cluster.fork();
        cluster.fork().send({ message: 'data', payload: JSON.stringify(GLOBAL_DATA) });
      });

   
  }

  if (cluster.isWorker) {
    const id = cluster.worker?.id;
    let database: IUser[] = [];
    console.log(`Worker: ${id}, pid: ${pid}`);

    process.on('message', (msg: { message: string; payload: string }) => {
      const { message, payload } = msg;
      if (message === 'data') {
        database = JSON.parse(payload);
        console.log('database2', database);
      }
    });

    server(database, process).listen(PORT, 'localhost', () => {
      console.log(`App has been started on port ${PORT}...`);
    });
  }
})();
