# Repositorio de Información de Distritos, Cantones y Provincias de Costa Rica

Este repositorio contiene información completa y actualizada sobre los distritos, cantones y provincias de Costa Rica. 

## Contenido

El repositorio se estructura de la siguiente manera:

- El archivo `provincias.js` contiene un objeto JavaScript llamado `Provincias` que enumera todas las provincias de Costa Rica, junto con sus respectivos cantones y distritos.
- El archivo `cantones.js` contiene un objeto JavaScript llamado `Cantones` que enumera todos los cantones de Costa Rica, junto con sus respectivos distritos.
- El archivo `distritos.js` contiene un objeto JavaScript llamado `Distritos` que enumera todos los distritos de Costa Rica, agrupados por cantón y provincia.

## Uso

Puedes utilizar estos archivos para acceder y utilizar la información sobre los distritos, cantones y provincias de Costa Rica en tus proyectos de desarrollo de software. 

Aquí hay un ejemplo de cómo puedes acceder a la información utilizando JavaScript:

```javascript
// Importar el archivo de provincias
const Provincias = require('./provincias.js');

// Acceder a la lista de provincias
const provincias = Provincias;

// Obtener todos los cantones de una provincia específica (por ejemplo, San José)
const cantonesDeSanJose = Provincias["San Jose"];

// Obtener todos los distritos de un cantón específico (por ejemplo, San José)
const distritosDeSanJose = Cantones["San Jose"]["San Jose"];

// Imprimir la lista de distritos de San José
console.log(distritosDeSanJose);
```

## Contribuciones

Si encuentras algún error o falta de información en los archivos, o si deseas agregar información adicional, ¡te animamos a contribuir a este repositorio! Puedes hacerlo mediante la apertura de un problema o enviando una solicitud de extracción.

## Licencia

Este repositorio se distribuye bajo la Licencia MIT. Puedes encontrar más detalles en el archivo `LICENSE`.

Esperamos que esta información sea útil y facilite el acceso a los datos de los distritos, cantones y provincias de Costa Rica. ¡Disfruta explorando y utilizando esta información en tus proyectos!