// module.exports = () => {
//   // ...
// };
const colors = require('colors');
const app = require('./app.js');

const isPathAbsolute = app.isPathAbsolute;
const toAbsolute = app.toAbsolute;
const isExtNameMd = app.isExtNameMd;
const fileContent = app.fileContent;
const regTextLink = app.regTextLink;
const regLink = app.regLink;
const httpValidate = app.httpValidate;

const readLine = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readLine.question(colors.bgGrey(colors.brightCyan('Ingresa la ruta del archivo: ')), (route) => {

  isPathAbsolute(route) ? route : route = toAbsolute(route);
  let arrayObjects = new Array();
  if (isExtNameMd(route)) {
    const texts = fileContent(route);
    while ((arrayText = regTextLink.exec(texts)) !== null) {
      let objectLinks = new Object();
      objectLinks.href = arrayText[2];
      objectLinks.text = arrayText[1].substr(0, 50);
      objectLinks.file = route;
      arrayObjects.push(objectLinks)
    };
    // while ((arrayText = regTextLink.exec(texts)) === null && (arrayOnlyLink = regLink.exec(texts)) !== null){
    //     console.log(regTextLink.test(texts));
    //     let objectLinks = new Object();
    //     objectLinks.href = arrayOnlyLink[0];
    //     objectLinks.text = '';
    //     objectLinks.file = route;
    //     arrayObjects.push(objectLinks)
    // };
    // console.log(arrayObjects, arrayObjects.length);
  }
  else {
    process.stdin.write(colors.red('tu archivo no es .md \n'));
    readLine.close();
  };

  let arrayStatus = new Array();
  const mdLinks = new Promise((resolve) => {
    arrayObjects.map(function (object) {
      let href = object.href
      httpValidate(href).then((statusCode => {
        if (statusCode >= 400) {
          object.status = statusCode;
          object.ok = 'fail';
          // console.log(object);
        }
        else if (statusCode === '???') {
          object.status = statusCode;
          object.ok = 'fail';
          // console.log(object);
        }
        else {
          object.status = statusCode;
          object.ok = 'ok';
          // console.log(object);
        }
        return object
      })).then((object) => {arrayStatus.push(object)
        if (arrayObjects.length === arrayStatus.length){
          resolve(arrayStatus)
        } 
      })
    });
  });

  Promise.all([mdLinks]).then((res) =>{
    console.log('Array de objetos',res[0]);
    console.log('Total: ',arrayStatus.length);

    const ok = arrayStatus.filter(function(object){
      return object.ok === 'ok';
    })
    const fail = arrayStatus.filter(function(object){
      return object.ok === 'fail';
    })
    const search = arrayStatus.reduce((acc, link) => {
      acc[link.href] = ++acc[link.href] || 0;
      return acc;
    }, {});
    const duplicated = arrayStatus.filter( (link) => {
      return search[link.href];
    });
    console.log('Unique: ',(arrayStatus.length - duplicated.length));
    console.log('Broken: ',fail.length);
  })

  readLine.close()
});
