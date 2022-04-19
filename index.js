// module.exports = () => {
//   // ...
// };
const app = require('./app.js');

const exist = app.exist;
const isPathAbsolute = app.isPathAbsolute;
const toAbsolute = app.toAbsolute;
const isExtNameMd = app.isExtNameMd;
const fileContent = app.fileContent;
const regTextLink = app.regTextLink;
const getLinks = app.getLinks;
const options = app.options;


const mdLinks = (route, opt) => {
  return new Promise((resolve, reject) => {
    let arrayObjects = new Array();
    if (exist(route)){
      isPathAbsolute(route) ? route : route = toAbsolute(route);
      if (isExtNameMd(route)) {
        let texts = fileContent(route);
        while ((arrayText = regTextLink.exec(texts)) !== null) {
          let objectLinks = new Object();
          objectLinks.href = arrayText[2];
          objectLinks.text = arrayText[1].substr(0, 50);
          objectLinks.file = route;
          arrayObjects.push(objectLinks)
        };
        if (regTextLink.exec(texts) === null) {
          reject('No hay links en tu archivo .md')
        }
      }
      else {
        reject('Tu archivo no es .md');
      };
    }

    else{
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
