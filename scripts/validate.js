// Valida la integridad de los datos. Uso: node scripts/validate.js
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const errors = [];
const check = (ok, msg) => ok || errors.push(msg);

const read = (f) => {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, f), "utf8"));
  } catch (e) {
    console.error(`${f}: JSON inválido (${e.message})`);
    process.exit(1);
  }
};
const provincias = read("provincias.json");
const cantones = read("cantones.json");
const distritos = read("distritos.json");

check(provincias.length === 7, `Se esperaban 7 provincias, hay ${provincias.length}`);
check(cantones.length === 84, `Se esperaban 84 cantones, hay ${cantones.length}`);
check(distritos.length === 492, `Se esperaban 492 distritos, hay ${distritos.length}`);

const ids = new Set();
for (const r of [...provincias, ...cantones, ...distritos]) {
  check(!ids.has(r.id), `Código duplicado: ${r.id}`);
  ids.add(r.id);
  check(typeof r.nombre === "string" && r.nombre === r.nombre.trim() && r.nombre, `Nombre inválido en ${r.id}`);
}

const provIds = new Set(provincias.map((p) => p.id));
const cantonIds = new Set(cantones.map((c) => c.id));
for (const c of cantones) {
  check(provIds.has(c.provinciaId), `Cantón ${c.id}: provinciaId ${c.provinciaId} no existe`);
  check(Math.floor(c.id / 100) === c.provinciaId, `Cantón ${c.id}: código no coincide con provinciaId`);
  check(distritos.some((d) => d.cantonId === c.id), `Cantón ${c.id} (${c.nombre}) no tiene distritos`);
}
for (const d of distritos) {
  check(cantonIds.has(d.cantonId), `Distrito ${d.id}: cantonId ${d.cantonId} no existe`);
  check(Math.floor(d.id / 100) === d.cantonId, `Distrito ${d.id}: código no coincide con cantonId`);
}

// Los archivos .js deben coincidir exactamente con los JSON.
const Provincias = require("../Provincias.js");
const Cantones = require("../Cantones.js");
const Distritos = require("../Distritos.js");
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
check(same(Provincias, provincias.map((p) => p.nombre)), "Provincias.js no coincide con provincias.json");
for (const p of provincias) {
  const cs = cantones.filter((c) => c.provinciaId === p.id);
  check(same(Cantones[p.nombre], cs.map((c) => c.nombre)), `Cantones.js no coincide para ${p.nombre}`);
  for (const c of cs) {
    const ds = distritos.filter((d) => d.cantonId === c.id).map((d) => d.nombre);
    check(same((Distritos[p.nombre] || {})[c.nombre], ds), `Distritos.js no coincide para ${p.nombre} / ${c.nombre}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`OK: ${provincias.length} provincias, ${cantones.length} cantones, ${distritos.length} distritos`);
