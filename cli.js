const
    app = require('./app'),
    yargs = require('yargs')


const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: 'search tv show  here and get informtaions',
        builder: (yargs) => {
            return yargs.option('i',{
                alias: 'item',
                describe: 'item keyword or id to be want to search'
            })
        },
        handler: (argv) => { app.search(argv.item) }
    })
    .help('help')
    .argv