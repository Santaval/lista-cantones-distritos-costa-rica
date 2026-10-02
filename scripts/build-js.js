// Regenera Provincias.js, Cantones.js y Distritos.js a partir de los archivos JSON.
// Uso: node scripts/build-js.js
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const read = (f) => JSON.parse(fs.readFileSync(path.join(root, f), "utf8"));

const provincias = read("provincias.json");
const cantones = read("cantones.json");
const distritos = read("distritos.json");

// Claves sin tilde usadas por versiones anteriores, para compatibilidad.
const PROVINCE_ALIASES = { "San Jose": "San José", Limon: "Limón" };
const CANTON_ALIASES = { "San José": { "San Jose": "San José" }, Limón: { Limon: "Limón" } };

const cantonesDe = (p) => cantones.filter((c) => c.provinciaId === p.id);
const distritosDe = (c) => distritos.filter((d) => d.cantonId === c.id).map((d) => d.nombre);

const Cantones = {};
const Distritos = {};
for (const p of provincias) {
  Cantones[p.nombre] = cantonesDe(p).map((c) => c.nombre);
  Distritos[p.nombre] = {};
  for (const c of cantonesDe(p)) Distritos[p.nombre][c.nombre] = distritosDe(c);
}

const json = (v) => JSON.stringify(v, null, 2);
const aliasLines = (target, aliases) =>
  Object.entries(aliases)
    .map(
      ([alias, real]) =>
        `Object.defineProperty(${target}, ${JSON.stringify(alias)}, { get() { return ${target}[${JSON.stringify(real)}]; }, enumerable: false });`
    )
    .join("\n");

const header = "// Archivo generado por scripts/build-js.js a partir de los archivos JSON. No editar a mano.\n";
const footer = (name) => `\nif (typeof module !== "undefined") module.exports = ${name};\n`;

const files = {
  "Provincias.js": `${header}const Provincias = ${json(provincias.map((p) => p.nombre))};\n${footer("Provincias")}`,
  "Cantones.js": `${header}const Cantones = ${json(Cantones)};\n\n// Alias sin tilde (no enumerables)\n${aliasLines("Cantones", PROVINCE_ALIASES)}\n${footer("Cantones")}`,
  "Distritos.js":
    `${header}const Distritos = ${json(Distritos)};\n\n// Alias sin tilde (no enumerables)\n` +
    `${aliasLines("Distritos", PROVINCE_ALIASES)}\n` +
    Object.entries(CANTON_ALIASES)
      .map(([prov, aliases]) => aliasLines(`Distritos[${JSON.stringify(prov)}]`, aliases))
      .join("\n") +
    `\n${footer("Distritos")}`,
};

for (const [file, content] of Object.entries(files)) fs.writeFileSync(path.join(root, file), content);
console.log(`Generados: ${Object.keys(files).join(", ")}`);
