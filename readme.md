# Repositorio de Información de Distritos, Cantones y Provincias de Costa Rica

Este repositorio contiene la lista completa de provincias, cantones y distritos de Costa Rica, con sus códigos oficiales de la División Territorial Administrativa (los mismos que usa el INEC).

**Totales:** 7 provincias, 84 cantones y 492 distritos.

## Fuente

Los datos provienen de la **División Territorial Administrativa de la República**, declarada oficial mediante el **Decreto Ejecutivo N.º 44882-MGP**, publicado en el Alcance N.º 12 a La Gaceta N.º 17 del **28 de enero de 2025** ([PDF en el SNIT](https://www.snitcr.go.cr/fe/http/Home/public/pdfs/leyes/DE%2044882-MGP%20Declaratoria%20Oficial%20DTA%20(Alcance%2012%20Gaceta%2017%20del%2028%2001%202025).pdf)).

Todos los nombres usan la ortografía oficial, con tildes. Cuando el decreto da un nombre alternativo (por ejemplo, «Agua Caliente o San Francisco»), se usa el primero.

## Códigos

| Nivel     | Formato | Ejemplo                  |
|-----------|---------|--------------------------|
| Provincia | `P`     | `1` (San José)           |
| Cantón    | `PCC`   | `101` (San José)         |
| Distrito  | `PCCDD` | `10101` (Carmen)         |

Así, `Math.floor(distrito.id / 100) === distrito.cantonId` y `Math.floor(canton.id / 100) === canton.provinciaId`.

## Archivos JSON

| Archivo           | Contenido                                   | Ejemplo de registro                                    |
|-------------------|---------------------------------------------|--------------------------------------------------------|
| `provincias.json` | 7 provincias                                | `{ "id": 1, "nombre": "San José" }`                    |
| `cantones.json`   | 84 cantones, con `provinciaId`              | `{ "id": 101, "nombre": "San José", "provinciaId": 1 }` |
| `distritos.json`  | 492 distritos, con `cantonId`               | `{ "id": 10101, "nombre": "Carmen", "cantonId": 101 }` |

Los registros están ordenados por `id`.

### Uso

```javascript
// Node.js
const provincias = require("./provincias.json");
const cantones = require("./cantones.json");
const distritos = require("./distritos.json");

// Distritos del cantón Escazú (102)
const distritosDeEscazu = distritos.filter((d) => d.cantonId === 102);
```

```javascript
// Desde otro proyecto, fijando un commit específico
const base = "https://raw.githubusercontent.com/santaval/lista-cantones-distritos-costa-rica/<commit>";
const distritos = await fetch(`${base}/distritos.json`).then((r) => r.json());
```

## Archivos JavaScript (compatibilidad)

Los archivos `.js` se generan a partir de los JSON y se mantienen por compatibilidad con versiones anteriores:

- `Provincias.js`: arreglo `Provincias` con los nombres de las provincias.
- `Cantones.js`: objeto `Cantones` con los cantones agrupados por provincia.
- `Distritos.js`: objeto `Distritos` con los distritos agrupados por provincia y cantón.

Cada archivo exporta su valor con `module.exports` y también declara una variable global cuando se carga con `<script>`.

```javascript
const Provincias = require("./Provincias.js");
const Cantones = require("./Cantones.js");
const Distritos = require("./Distritos.js");

const cantonesDeSanJose = Cantones["San José"];
const distritosDeSanJose = Distritos["San José"]["San José"];
console.log(distritosDeSanJose);
```

Las claves antiguas sin tilde (`"San Jose"`, `"Limon"`) siguen funcionando como alias, pero no aparecen al recorrer los objetos.

## Mantenimiento

Los JSON son la fuente de verdad. Después de modificarlos:

```bash
node scripts/build-js.js   # regenera los archivos .js
node scripts/validate.js   # verifica totales, códigos y referencias
```

## Contribuciones

Si encuentras algún error o falta de información en los archivos, o si deseas agregar información adicional, ¡te animamos a contribuir a este repositorio! Puedes hacerlo mediante la apertura de un problema o enviando una solicitud de extracción.
