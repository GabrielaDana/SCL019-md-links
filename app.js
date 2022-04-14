// module.exports = () => {
//   // ...
// };
const colors = require('colors');
const app = require('./app2.js');

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
            objectLinks.text = arrayText[1].substr(0,50);
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
      arrayObjects.forEach(object =>{
        let href = object.href
        httpValidate(href).then((statusCode)=>{
          if (statusCode >= 400){
            object.status = 'fail';
          }
          if (statusCode === 'error 0000'){
            object.status = '----->revisar<-----'
          }
          else {
            object.status = 'ok';
          }
          return object
        }).then((object)=>{
          arrayStatus.push(object);
        })
      })
      setTimeout(function(){
        console.log(arrayStatus, arrayStatus.length);
      }, 3000);

    readLine.close();
});

// throw new TypeError(console.log('No puede ingresar una carpeta'));