const { argv } = require('yargs');
const index = require('./index.js');
const colors = require('colors');
const mdLinks = index.mdLinks

let path = process.argv[2]
let option = '';

if (argv.stats && argv.validate) {
    option = 'stats validate';
}
else if (argv.validate) {
    option = 'validate';
}
else if (argv.stats) {
    option = 'stats';
}

mdLinks(path, option)
    .then((res) => { res })
    .catch((resp)=> {console.log(colors.brightMagenta(resp))})