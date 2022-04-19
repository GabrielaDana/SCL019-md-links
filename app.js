const fs = require('fs');
const path = require('path');
const https = require('https');
const url = require('url');
const colors = require('colors')

//Devuelve true si la ruta es absoluta
const isPathAbsolute = (param) => path.isAbsolute(param);

//Transforma la ruta relativa a absoluta
const toAbsolute = (param) => path.resolve(param);

//Retorna true si la route es .md
const isExtNameMd = (param) => path.extname(param) === '.md';

//Lee el archivo
const fileContent = (param) => fs.readFileSync(param, 'UTF-8');

const regTextLink = new RegExp(/\[(.+)\]\s?\((https?:\/\/?[\w\-]+\.[\w\-]+[/#?]?[^\)]*)\)/gm);

const httpValidate = (param) => {
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
    })
    req.on('error', error => {
      // console.log(error);
      resolve('ENOTFOUND')
    })
    req.end()
  })
};

const getLinks = (objects, stats) => {
  return new Promise((resolve) => {
    objects.forEach((object) => {
      let href = object.href
      httpValidate(href).then((statusCode => {
        if (statusCode >= 400) {
          object.status = statusCode;
          object.ok = 'fail';
        }
        else if (statusCode === 'ENOTFOUND') {
          object.status = statusCode;
          object.ok = 'fail';
        }
        else {
          object.status = statusCode;
          object.ok = 'ok';
        }
        return object
      })).then((object) => {
        stats.push(object);
        if (objects.length === stats.length) {
          resolve(stats)
        }
      }).catch(res => console.log(res))
    });
  })
}

const options = (array, opt) => {
  const fail = array.filter(function (object) {
    return object.ok === 'fail';
  })
  const search = array.reduce((acc, link) => {
    acc[link.href] = ++acc[link.href] || 0;
    return acc;
  }, {});
  const duplicated = array.filter((link) => {
    return search[link.href];
  });

  if (opt === 'stats validate') {
    console.log(colors.brightCyan('Total: ', colors.magenta(array.length)));
    console.log(colors.brightCyan('Unique: ', colors.magenta(array.length - duplicated.length)));
    console.log(colors.brightCyan('Broken: ', colors.magenta(fail.length)));
  }

  else if (opt === 'stats') {
    console.log(colors.brightCyan('Total: ', colors.magenta(array.length)));
    console.log(colors.brightCyan('Unique: ', colors.magenta(array.length - duplicated.length)));
  }
  else if (opt === 'validate') {
    console.log(colors.brightCyan('Links encontrados en tu archivo .md', colors.magenta(array)));
  }
  else console.log(colors.brightMagenta('Ingresa una opción o ambas:', colors.brightCyan('"--stats", "--validate"')));
}

module.exports = {
  isPathAbsolute,
  toAbsolute,
  isExtNameMd,
  fileContent,
  httpValidate,
  regTextLink,
  getLinks,
  options
}

