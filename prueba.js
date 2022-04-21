const {mdLinks} = require('gd-md-links');

const path = 'readme.md';
mdLinks(path, {validate:true})
.then((res)=> console.log(res))
.catch((resp)=> console.log(resp))