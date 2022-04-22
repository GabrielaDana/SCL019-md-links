#!/usr/bin/env node

const app = require('./functions.js');
const exist = app.exist;
const isPathAbsolute = app.isPathAbsolute;
const toAbsolute = app.toAbsolute;
const isExtNameMd = app.isExtNameMd;
const fileContent = app.fileContent;
const findLinks = app.findLinks;
const getLinks = app.getLinks;
const options = app.options;

const proAr = process.argv
let path = proAr[1]
let option = '';

if ((proAr[2]==='--stats' && proAr[3]==='--validate')||((proAr[3]==='--stats' && proAr[2]==='--validate'))) {
    option = 'stats validate';
}
else if (proAr[2]==='--validate') {
    option = 'validate';
}
else if (proAr[2]==='--stats') {
    option = 'stats';
}

const mdLinks = (route, opt) => {
  return new Promise((resolve, reject) => {
    let arrayObjects = new Array();
    if (exist(route)) {
      isPathAbsolute(route) ? route : route = toAbsolute(route);
      if (isExtNameMd(route)) {
        let texts = fileContent(route);
        findLinks(texts, arrayObjects, route);
      } else {
        reject('Tu archivo no es .md');
      };
    }
    else {
      reject('Ingresa una ruta válida');
    }
    let arrayStatus = new Array();
    const links = getLinks(arrayObjects, arrayStatus);
    
    resolve(links.then((res) => {
      options(res, opt);
    }))
  })
}

mdLinks(path, option)
    .then((res) => res)
    .catch((resp)=> console.log(resp))
