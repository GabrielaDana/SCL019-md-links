// module.exports = () => {
//   // ...
// };
const colors = require('colors');
const app = require('./app.js');

const isPathAbsolute = app.isPathAbsolute;
const toAbsolute = app.toAbsolute;
const isExtNameMd = app.isExtNameMd;
const fileContent = app.fileContent;

const readLine = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readLine.question(colors.bgGrey(colors.brightCyan('Ingresa la ruta del archivo: ')), (route) => {
  //Convierte a ruta absoluta la ruta relativa
  isPathAbsolute(route) ? route : route = toAbsolute(route);
  //Revisa si el archivo es .md y lo lee con file(), retorna un array de string con el contenido
  if (isExtNameMd(route)) {
    let texts = fileContent(route);
    arrayText = texts.split('\n');
  }
  else {
    process.stdin.write(colors.red('tu archivo no es .md \n'));
    readLine.close();
  };
   //Expresiones regulares:
   //Separa la línea que contiene el link + el texto
    const regTextLink = new RegExp(/\[[\S\s]+\]\((https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*\)/gm);
   //Separa solo el link
    const regLink = new RegExp(/(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*/gm);
   //Separa solo el texto
    const regText = new RegExp(/\[[\S\s]+\]/gm);
  
   //Arreglo para almacenar las líneas que contienen links+texto
    let arrayLinks = [];
   //Revisa si existen líneas con links y los guarda en arraylinks
    arrayText.forEach(text => {
      if (regTextLink.test(text)){
        text.toString();
        let links = text.match(regTextLink);
        arrayLinks.push(links.toString())
      }
    });
    //Arrego para almacenar los objetos con las claves href, text, file y status
    let arrayObjects = [];
    //Recorre el arreglo de link + texto y los separa para enviarlos a la clave correspondiente
    //El resultado lo envía a arrayObjects
    arrayLinks.forEach(link =>{
        let href = link.match(regLink);
        href = href.toString().slice(0,-1);

        let textOfLink = link.match(regText);
        textOfLink = textOfLink.toString().slice(1,-1).substr(0,50);

        let objectLinks = {
          href: href,
          text: textOfLink,
          file: route,
          status: ""
        };
        arrayObjects.push(objectLinks);
    });
    console.log(arrayObjects)

  readLine.close();
});

// throw new TypeError(console.log('No puede ingresar una carpeta'));