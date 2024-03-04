const PORT = process.env.PORT || 3000;
const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const chokidar = require('chokidar');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');
  let timeout_id = undefined;
  socket.on('refrescar', () => {
    console.log('El servidor ha recibido la señal de refrescar');
    clearTimeout(timeout_id);
    timeout_id = setTimeout(() => {
      io.emit('refrescar');
    }, 1000 * 2);
  });
  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado');
  });
});

const directorioObjetivo = path.resolve(__dirname + "/../../src");
const patrones = ['**/*.json', '**/*.js', '**/*.css', '**/*.xml', '**/*.html'];
const patrones_finales = patrones.map(pat => path.join(directorioObjetivo, pat));
console.log("Escuchando patrones de ficheros:");
console.log(patrones_finales);
const watcher = chokidar.watch(patrones_finales, {
  persistent: true,
  ignoreInitial: true,
  depth: Infinity,
  recursive: true
});
watcher.on('all', (evento, ruta) => {
  console.log(`Cambios han habido en el archivo: ${ruta}`);
  let timeout_id = undefined;
  clearTimeout(timeout_id);
  timeout_id = setTimeout(() => {
    io.emit("refrescar");
  }, 1000 * 0.5);
});
watcher.on('error', error => {
  console.error('Error en el observador:', error);
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});