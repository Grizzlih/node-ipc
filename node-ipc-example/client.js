const ipc = require('node-ipc');

ipc.config.id = 'compare';
ipc.config.retry = 1000;
ipc.config.silent = true;

ipc.connectTo('demoserver', () => {

    ipc.of.demoserver.on('connect', () => {

        ipc.of.demoserver.emit('client.started', {});

    });

    ipc.of.demoserver.on('operation.start', (data) => {

        console.log('got some data: ', data);
        console.log('starting long operation...');

        let result;

        for (let i = 0; i < 9000000000; i++){

            result = i * i

        }

        ipc.of.demoserver.emit('operation.done', {result});

    });

    ipc.of.demoserver.on('client.shutdown', (data) => {

        console.log('got shutdown command, exiting...');
        process.exit();

    })

});