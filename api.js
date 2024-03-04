module.exports = {
  inicializar(include, directorio) {
    this.include = include;
    this.__dirname = directorio;
  },
  mezclar_clases(...cachos_de_clases) {
    return cachos_de_clases.join(" ").split(" ").join(" ");
  },
  montar_ruta(...subrutas) {
    return require("path").resolve(__dirname, "src", subrutas.join("/").replace(/\/\/+/g, "/").replace(/^\//g, ""));
  },
  requerir(subruta, complementos = {}) {
    return this.include(this.montar_ruta(subruta), { __dirname: this.__dirname, api: this, ...complementos });
  }
};