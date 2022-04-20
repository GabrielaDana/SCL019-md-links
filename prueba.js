const {mdLinks} = require('./index.js')


mdLinks('prueba.md', {validate: true})
    .then((res) => {
        console.log(res);
    })
    .catch((res) => {
        console.log(res);
    });