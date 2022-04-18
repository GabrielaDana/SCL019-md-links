// module.exports = () => {
//   // ...
// };
const app = require('./app.js');

const isPathAbsolute = app.isPathAbsolute;
const toAbsolute = app.toAbsolute;
const isExtNameMd = app.isExtNameMd;
const fileContent = app.fileContent;
const regTextLink = app.regTextLink;
const getLinks = app.getLinks;
const options = app.options;


const mdLinks = (route, opt) => {
  return new Promise((resolve, reject) =>{
    isPathAbsolute(route) ? route : route = toAbsolute(route);
    let arrayObjects = new Array();
    if (isExtNameMd(route)) {
      let texts = fileContent(route);
        while ((arrayText = regTextLink.exec(texts)) !== null) {
          let objectLinks = new Object();
          objectLinks.href = arrayText[2];
          objectLinks.text = arrayText[1].substr(0, 50);
          objectLinks.file = route;
          arrayObjects.push(objectLinks)
          // arrayText.pop(texts)
        };

        if (regTextLink.exec(texts) === null){
          reject ('No hay links en tu archivo .md')
        }
     
      // while ((arrayOnlyLink = regLink.exec(texts)) !== null ){ //||(arrayText = regTextLink.exec(texts))){
        
      //     let objectLinks = new Object();
      //     objectLinks.href = arrayOnlyLink[0];
      //     objectLinks.text = ''
      //     objectLinks.file = route;
      //     arrayObjects.push(objectLinks)
      // };
    }
    else {
      reject('Tu archivo no es .md');
    };
    
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
