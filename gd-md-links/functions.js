const app = require('./app.js');

const exist = app.exist;
const isPathAbsolute = app.isPathAbsolute;
const toAbsolute = app.toAbsolute;
const isExtNameMd = app.isExtNameMd;
const fileContent = app.fileContent;
const findLinks = app.findLinks;
const getLinks = app.getLinks;
const options = app.options;


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


module.exports = {
  mdLinks
}