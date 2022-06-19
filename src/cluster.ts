import cluster from 'cluster';
import { cpus } from 'os';
import { pid } from 'process';
import { IUser } from './model/IUser';
import { runServer } from './server';

cluster.schedulingPolicy = cluster.SCHED_RR;

const GLOBAL_DATA: IUser[] = [];

void (async () => {
  if (cluster.isPrimary) {
    const cpusCount = cpus().length;
    console.log(`Master started. Pid ${pid}`);
    console.log(`Starting ${cpusCount} workers\n`);

    const workers = [];
    for (let i = 0; i < cpusCount - 1; i++) {
      const worker = cluster.fork();
      workers.push(worker);
      worker.on('exit', () => {
        console.log(`Worker died! ${worker.process.pid}`);
        cluster.fork();
      });
      worker.send({ GLOBAL_DATA });
    }
  }
  if (cluster.isWorker) {
    const id = cluster.worker?.id;
    let database: IUser[] | null = null;
    process.on('message', (msg: { GLOBAL_DATA: IUser[] }) => {
      console.log(`Msg from server ${JSON.stringify(msg)}`);
    });

    if (database) {
      runServer(6000, database);
    }

    console.log(`Worker: ${id}, pid: ${pid}`);
  }
})();
