const app = require('../app.js');

const isPathAbsolute = app.isPathAbsolute;
const toAbsolute = app.toAbsolute;
const isExtNameMd = app.isExtNameMd;
const file = app.file;
const resultado = app.resultado;

describe('Function isPathAbsolute', () => {
    it('isPathAbsolute debe ser una función', () => {
        expect(typeof isPathAbsolute).toBe('function');
    });

    it('Si isPathAbsolute recibe una ruta absoluta debe retornar true', () =>{

        const route = '/Users/gabriela/Desktop/<Laboratoria>/SCL019-md-links/prueba.md';
        const result = isPathAbsolute(route)
        expect(result).toEqual(true);
    });

    it('Si isPathAbsolute recibe una ruta relativa debe retornar false', () =>{
        const route = 'prueba.md';
        const result = isPathAbsolute(route);
        expect(result).toEqual(false);
    });
});

describe('Function toAbsolute', () => {
    it('toAbsolute debe ser una función', () => {
        expect(typeof toAbsolute).toBe('function');
    });

    it('si toAbsolute recibe una ruta relativa, debe transformarla en absoluta', () =>{
        const route = 'prueba.md';
        const result = toAbsolute(route);
        expect(result).toEqual('/Users/gabriela/Desktop/<Laboratoria>/SCL019-md-links/prueba.md');
    });
})

describe('Function isExtNameMd', () => {
    it('isExtNameMd debe ser una función', () => {
        expect(typeof isExtNameMd).toBe('function');
    });

    it('Si isExtNameMd recibe un archivo .md debe retornar true', () => {
        const route = 'prueba.md';
        const result = isExtNameMd(route);
        expect(result).toBe(true)
    });

    it('Si isExtNameMd recibe un archivo con extensión distinta a .md debe retornar false', () => {
        const route = 'prueba.txt';
        const result = isExtNameMd(route);
        expect(result).toBe(false);
    });
});

describe('Function file', () => {
    it('file debe ser una función', () => {
        expect(typeof file).toBe('function');
    });

    it('file debe recibir un archivo y leerlo para acceder a su contenido', () => {
        const route = '/Users/gabriela/Desktop/<Laboratoria>/SCL019-md-links/test.md';
        const result = file(route);
        expect(result).toEqual('aquí está el contenido del archivo :B');
    });
});
