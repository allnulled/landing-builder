# landing-builder

Landing builder es un script personalizable para la construcción rápida de páginas HTML estáticas mediante plantillas EJS para el HTML, el CSS o incluso el JS.

La ventaja de este landing es que la curva de aprendizaje es la más básica: HTML, CSS y JavaScript. Por otro lado, igual puede ofrecerte todas las ventajas o casi que otros boilerplates hipercargados, con mil capas sintácticas, y un porrón de dependencias.

## Instalación

**Paso 1. Descargar el proyecto e instalar las dependencias**

Sería así:

```sh
git clone tadada .
npm install
```

**Paso 2. Reconstruir el proyecto a mano**

En un sentido amplio, no necesitas nada más, y con hacer:

```sh
node build.js
```

...ya estarías listo.

**Paso 3. Automatizar el proceso al máximo**

Esto tendría que contemplar: levantar el servidor, escuchar cambios para reconstruir, y escuchar cambios para autorrefrescar. Sería así:

```sh
npm run serve:linux
npm run watch:linux
npm run sync:linux
```

Si usas windows, usa `windows` en lugar de linux en los comandos, así: `npm run serve:windows`, y así todos.

## Uso

Consiste en escribir una plantilla con `ejs`. La plantilla es `src/index.html.ejs`. En esta plantilla:

- Se inyecta la variable global `api` que tiene 3 métodos solo:
   - `api.mezclar_clases(...String clases)`
   - `api.montar_ruta(...String subrutas)`
   - `api.requerir(String ruta, Any parametros)`
- Se inyecta la variable global `__dirname` que corresponderá al `src` del proyecto.

Todo esto lo puedes personalizar y extender fácilmente en `api.js` y `build.js`, si precisas.

## Directorios

- El directorio `/bin` guarda los scripts de cada sistema operativo necesarios para servir la aplicación HTML (serve) y trabajar rápido (watch).
- El directorio `/docs` es donde se escupe la aplicación HTML. Así se puede usar directamente en Github Pages para publicarlo.
- El directorio `/src` es el que sí contiene el código fuente, y desde donde se trabajaría.
# landing-builder
