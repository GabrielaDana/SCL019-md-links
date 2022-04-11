const fs = require('fs');
const path = require('path');
// const jsdom = require("jsdom");

//Devuelve true si la ruta es absoluta
const isPathAbsolute = (param) => path.isAbsolute(param);

//Transforma la ruta relativa a absoluta
const toAbsolute = (param) => path.resolve(param);

//Retorna true si la route es .md
const isExtNameMd = (param) =>  path.extname(param) === '.md';

//Lee el archivo
const fileContent = (param) => fs.readFileSync(param, 'UTF-8');



module.exports = {
    isPathAbsolute,
    toAbsolute,
    isExtNameMd,
    fileContent
}