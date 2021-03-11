const { Command } = require('commander');
const dev = require('./scripts/dev')
const pro = require('./scripts/pro')

const program = new Command();
program.version('0.0.1');



const install = ()=>{
  program
  .command('dev')
  .option('-p, --port <port>', 'port',8090)
  .action(({port}) => {
    console.log(port, 'dev');
    dev(port)
  });
  program
  .command('build')
  .action(() => {
    console.log('project in building');
    pro()
  });
  
  program.parse(process.argv);
  
}
module.exports = install