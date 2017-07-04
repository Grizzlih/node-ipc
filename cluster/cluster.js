/**
 * Created by Gizbreht on 03/07/2017.
 */
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if(cluster.isMaster){
    console.log(`Master ${process.pid} is running`);

    for(let i = 0; i < numCPUs; i++){
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
    })
} else {
    http.createServer((req,res) => {
        console.log(`process ${process.pid} processing request`);
        res.writeHead(200);
        let z = null;
        for (let i = 0; i < 500000000; i++){
            z = i * i;
        }
        res.end(`hello world\n ${process.pid}`)
    }).listen(8000);
    console.log(`Worker ${process.pid} started`)
}