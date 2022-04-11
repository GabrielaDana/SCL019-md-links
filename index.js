// module.exports = () => {
//   // ...
// };
const colors = require('colors');
const path = require('path');
const jsdom = require('jsdom');
const app = require('./app.js');

const isPathAbsolute = app.isPathAbsolute;
const toAbsolute = app.toAbsolute;
const isExtNameMd = app.isExtNameMd;
const fileContent = app.fileContent;
const resultado = app.resultado;
// const href = app.href;
// const findHref = app.findHref;


const readLine = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readLine.question(colors.bgGrey(colors.brightCyan('Ingresa la ruta del archivo: ')), (route) => {
  //Convierte a ruta absoluta la ruta relativa
  isPathAbsolute(route) ? route : route = toAbsolute(route);
  //Revisa si el archivo es .md y lo lee con file(), retorna un string con el contenido
  if (isExtNameMd(route)) {
    let texts = '';
    texts = fileContent(route);
    arrayText = texts.split('\n');
    // process.stdout.write(colors.brightMagenta('El archivo contiene: \n'));
    // process.stdout.write(colors.brightMagenta(colors.bgGrey(arrayText + '\n')));

    let links = []; 
    

    const regTextLink = new RegExp(/\[[\S\s]+\]\((https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*\)/gm);
  //'[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado',
  //[Path](https://nodejs.org/api/path.html)',
    const linesWhithLinks = () => {
      arrayText.forEach(text => {
        if(regTextLink.test(text)){
          links.push(text);
        };
      });
    };
    
    linesWhithLinks();
    console.log(links)
  }

  else {
    process.stdin.write(colors.red('tu archivo no es .md \n'));
    readLine.close();
  };








  // let anchor = document.querySelector('a');
  // console.log(anchor);

  // result = resultado.route
  // const aaa = result.querySelector('.a');
  // console.log(aaa);

  readLine.close();
});

// throw new TypeError(console.log('No puede ingresar una carpeta'));