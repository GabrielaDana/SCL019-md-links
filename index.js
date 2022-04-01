// module.exports = () => {
//   // ...
// };
const fs = require('fs');
const path = require('path');
const colors = require('colors');


const readLine = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readLine.question(colors.brightCyan('Ingresa una ruta: '), (ruta) =>{

  //devuelve true si la ruta es absoluta
  const isPathAbsolute = (ruta) => path.isAbsolute(ruta);
  console.log(colors.magenta(isPathAbsolute(ruta)));

  //Si es ruta relativa la transforma a absoluta y la retorna 
  const toAbsolute = (pathAbsolute) => pathAbsolute(ruta) === false ? ruta = path.resolve(ruta): ruta;
  console.log(colors.bgMagenta(toAbsolute(isPathAbsolute)));

  //retorna true si la ruta es .md
  let isExtNameMd = () =>  path.extname(ruta) === '.md';
  console.log(colors.brightCyan(isExtNameMd()));
});