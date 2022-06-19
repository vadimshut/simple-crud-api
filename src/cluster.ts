import cluster from 'cluster';
import { cpus } from 'os';
import { pid } from 'process'


void (async () => {
  if (cluster.isPrimary) {
    const cpusCount = cpus().length;
    console.log(`Master started. Pid ${pid}`);
    console.log(`Starting ${cpusCount} workers\n`);
  
    for (let i = 0; i < cpusCount - 1; i++) {
      const worker = cluster.fork();
      worker.on('exit', () => {
        console.log(`Worker died! ${worker.process.pid}`);
        cluster.fork();
      });    
    }
  }
  if (cluster.isWorker) {
    const id = cluster.worker?.id;
    await import('./index')
    console.log(`Worker: ${id}, pid: ${pid}`);
  }
})()



