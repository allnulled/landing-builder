/**
 * @descripción: Se establecen las variables de entorno.
 */
Object.assign(process.env, {
  NODE_ENV: "production"
});

/**
 * @descripción: Se importan las librerías externas.
 */
const fs = require("fs-extra");
const ejs = require("ejs");

/**
 * @descripción: En el paso 1 solo compilamos el fichero src/index.html.ejs a docs/index.html.
 */
const paso_1 = async function() {
  const plantilla = fs.readFileSync(__dirname + "/src/index.html.ejs").toString();
  const salida = await ejs.render(plantilla, {api: require(__dirname + "/api.js"), __dirname: __dirname + "/src"}, {async:true});
  fs.writeFileSync(__dirname + "/docs/index.html", salida, "utf8");
};

/**
 * @descripción: En el paso 2 solo copiamos todos los ficheros de src a docs
 * luego eliminamos la carpeta docs/dev, y finalmente eliminamos el fichero 
 * docs/index.html.ejs,
 */
const paso_2 = async function() {
  fs.copySync(__dirname + "/src", __dirname + "/docs");
  fs.removeSync(__dirname + "/docs/dev");
  fs.removeSync(__dirname + "/docs/index.html.ejs");
};

/**
 * @descripción: Se define la función principal del programa
 */
const main = async function() {
  try {
    await paso_1();
    await paso_2();
    console.log("Compilación exitosa");
  } catch (error) {
    console.log(error);
    console.log("Fin de la compilación");
  }
};

module.exports = main();


