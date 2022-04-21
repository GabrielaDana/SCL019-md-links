const app = require('./app.js');
const { argv } = require('yargs');
const exist = app.exist;
const isPathAbsolute = app.isPathAbsolute;
const toAbsolute = app.toAbsolute;
const isExtNameMd = app.isExtNameMd;
const fileContent = app.fileContent;
const findLinks = app.findLinks;
const getLinks = app.getLinks;
const options = app.options;

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


const mdLinks = (route, opt) => {
  return new Promise((resolve, reject) => {
    let arrayObjects = new Array();
    if (exist(route)) {
      isPathAbsolute(route) ? route : route = toAbsolute(route);
      if (isExtNameMd(route)) {
        let texts = fileContent(route);
        findLinks(texts, arrayObjects, route);
      } else {
        reject('Tu archivo no es .md');
      };
    }
    else {
      reject('Ingresa una ruta válida');
    }
    let arrayStatus = new Array();
    const links = getLinks(arrayObjects, arrayStatus);
    
    resolve(links.then((res) => {
      options(res, opt);
    }))
  })
}

mdLinks(path, option)
    .then((res) => res)
    .catch((resp)=> resp)
