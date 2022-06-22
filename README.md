# Markdown Links

## Índice
* [1. MdLinks](#1-MdLinks)
* [2. Guía de uso](#2-Guía-de-uso)
* [3. Planificación del proyecto](#3-planificación-del-proyecto)
* [4. Package](#4-Package)

## 1. MdLinks 

Herramienta creada utilizando Node.js, que lee y analiza archivos en formato Markdown, para verificar los links que contengan y reportar estadísticas.

## 2. Guía de uso

### Instalación

    npm i gd-md-links

### Uso de librería

    const {mdLinks} = require('gd-md-links');
    
Se utiliza mdLinks con los parámetros path (ruta del archivo) y opción (un objeto que contiene validate:true) para mostrar un arreglo de objetos con los links validados y su información:

    mdLinks('tu/ruta/aqui.md', {validate: true})
    .then((res) => res)
    .catch((res) => res)
    
Se utiliza mdLinks con el parametro path (ruta del archivo) para mostrar un arreglo de objetos con los links dentro del archivo:

    mdLinks('tu/ruta/aqui.md')
    .then((res) => res)
    .catch((res) => res)

### CLI (Interfaz de línea de comando)

se ejecuta a través del terminal:

    $ gd-md-links <path> [options]
    
Ejemplo:

    $ gd-md-links carpeta/archivo.md --stats

#### Ruta o path

Debes ingresar una ruta, que puede ser relativa o absoluta. Si es relativa recuerda incluir las carpetas.

Ejemplo:

    $ gd-md-links carpeta1/carpeta2/archivo.md --validate

#### Options:

##### Opción *--validate*

Si ingresamos esta opción el módulo realiza una petición HTTP para averiguar si los links dentro del archivo funcionan o no. Si un link tienen un status menor a "400", por ejemplo "200", el link tendrá el mensaje "ok", en cambio si es mayor a "400" el mensaje será "fail".

Ejemplo:

    $ gd-md-links carpeta1/carpeta2/archivo.md --validate
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/',
    text: 'Array - MDN',
    file: '/Users/user/Desktop/carpeta/SCL019-md-links/carpeta1/carpeta2/archivo.md',
    status: 302,
    ok: 'ok'
    
##### Opción *--stats*

Si ingresamos la opción --stats el output (salida) será un texto con estadísticas básicas sobre los links. Cuántos links fueron encontrados (total) y cuantos son únicos (unique).

Ejemplo:

    $ gd-md-links carpeta1/carpeta2/archivo.md --stats
    Total: 5
    Unique: 3
    
##### Opción *--stats --validate*

Si ingresamos ambas opciones independiente del orden (*--stats --validate* o *--validate --stats*) obtendremos estadísticas que necesiten de los resultados de la validación, como los links quebrados (broken)

Ejemplo:

    $ gd-md-links carpeta1/carpeta2/archivo.md --stats --validate
    Total: 5
    Unique: 3
    Broken: 1

## 3. Planificación del proyecto

### Diagrama de flujo

 ![Diagrama](https://github.com/GabrielaDana/SCL019-md-links/blob/main/Diagrama_de_flujo.png)
 
### Organización

![backlog](https://github.com/GabrielaDana/SCL019-md-links/blob/main/backlog.png)

## 4. Package

[Package npmjs.com](https://www.npmjs.com/package/gd-md-links)
 





  
  
  
  
  
  
  
  
  
  
  
