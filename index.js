// module.exports = () => {
//   // ...
// };
const fs = require('fs');
const path = require('path')


let ruta = '';
process.stdout.write('Ingresa la ruta: ');

process.stdin.on('data', function(data){
  
  ruta = data.toString();
  let mensajeError = 'el archivo no es .md';
  let mensajeMd = 'el archivo SSIIII es md';

  //devuelve true si la ruta es absoluta
  const verifyPath = (ruta) => path.isAbsolute(ruta);
  console.log(verifyPath(ruta));
  
  //Si es ruta relativa la transforma a absoluta y la retorna 
  const transform = (verifyPath) => verifyPath(ruta) === false ? ruta = path.resolve(ruta): ruta;
  console.log(transform(verifyPath));
  console.log(ruta);

  //verifica si es .md 
  console.log('la extensión del archivo es: ' + path.extname(ruta));
  const isMd = (ruta) => path.extname(ruta) === '.md' ? console.log(mensajeMd) : console.log(mensajeError);

  console.log(isMd(ruta));


  // let etensiondelaruta = ext(ruta);
  // console.log(etensiondelaruta);

  //Verifica si la ruta es .md
  // const isMd = (ext) => {

  //   console.log('estamos dentro de isMd');
  //   console.log('35' + ext(ruta));
  //   let md = ext(ruta);
  //   console.log('37'+ md);
  //   if (md !== '.md'){
  //     console.log(mensajeError); 
  //   }
  //   else console.log(mensajeMd);
  // };

  // console.log(isMd(ext(ruta)));
});


 
// // metodo que devuelve true si la ruta es absoluta
// console.log(path.isAbsolute('README.md'));
// console.log(path.isAbsolute('/Users/gabriela/Desktop/<Laboratoria>/SCL019-md-links/README.md'));
// //método que devuelve la extensión del archivo 
// console.log(path.extname('README.md'));
// console.log(path.extname('/Users/gabriela/Desktop/<Laboratoria>/SCL019-md-links/README.md'));

// //método que transforma ruta relativa en absoluta
// console.log('De relativa a absoluta: '+ path.resolve('README.md'));