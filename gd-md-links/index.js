const app = require('./functions.js');

const exist = app.exist;
const isPathAbsolute = app.isPathAbsolute;
const toAbsolute = app.toAbsolute;
const isExtNameMd = app.isExtNameMd;
const fileContent = app.fileContent;
const findLinks = app.findLinks;
const getLinks = app.getLinks;


const mdLinks = (path, option) => {
    return new Promise((resolve, reject) => {
        let arrayObjects = new Array();
        if (exist(path)) {
            isPathAbsolute(path) ? path : path = toAbsolute(path);
            if (isExtNameMd(path)) {
                let texts = fileContent(path);
                if ((option?.validate)) {
                    findLinks(texts, arrayObjects, path)
                    let arrayStatus = new Array();
                    const links = getLinks(arrayObjects, arrayStatus);
                    links.then((res) => {
                        resolve(res)
                    })
                }
                else{
                    resolve(findLinks(texts, arrayObjects, path))
                }

            } else {
                reject('Tu archivo no es .md');
            };
        }
        else {
            reject('Ingresa una ruta válida');
        }
    })
}

module.exports = {
    mdLinks
    };