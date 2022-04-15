const fs = require('fs');
const path = require('path');
const https = require('https');
const url = require('url');

//Devuelve true si la ruta es absoluta
const isPathAbsolute = (param) => path.isAbsolute(param);

//Transforma la ruta relativa a absoluta
const toAbsolute = (param) => path.resolve(param);

//Retorna true si la route es .md
const isExtNameMd = (param) =>  path.extname(param) === '.md';

//Lee el archivo
const fileContent = (param) => fs.readFileSync(param, 'UTF-8');

const regTextLink = new RegExp(/\[(.+)\]\s?\((https?:\/\/?[\w\-]+\.[\w\-]+[/#?]?[^\)]*)\)/gm);
const regLink = new RegExp(/(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?[^\)]*/gm);

const httpValidate = (param) =>{
    return new Promise((resolve) => {
    const options = {
        method: 'HEAD',
        host: url.parse(param).host,
        port: 443,
        path: url.parse(param).pathname,
    };

      const req = https.request(options, res => {
        let statusCode = res.statusCode
        resolve(statusCode);
        res.on('data', d => {
          process.stdout.write(d)
        })
      })
      req.on('error', error => {
        resolve('error 0000')
      })
      req.end()
    })
};


module.exports = {
    isPathAbsolute,
    toAbsolute,
    isExtNameMd,
    fileContent,
    httpValidate,
    regTextLink,
    regLink
}

// const RegExr = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n]+)(?=\))/g
// const returnFileUrls = (file) => {
//   fs.readFile(file, "utf-8", (err, file) => {
//     const stringLinks = file.match(RegExr);
//     const newArray = Array.from(stringLinks);
//     if (err) {
//       console.log(err);
//     }
//     else {
//       console.log(newArray)
//     }
//   });
// }

// (https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?[^\)]*

// [asdsd ññ](http://algo.com/2/3/asasdasddsaadsdas$%&/) Link a alg',

// aa[feibu](www.facebook.com)asdasdsss

// [mentira]
// (https://miwebkasjd.cl)asdasd

// https://www.google.com