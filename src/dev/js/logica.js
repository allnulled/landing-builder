const ajustar_ancho_de_texto = async function (elemento, texto) {
  try {
    const contenedor = elemento.parentElement;
    let fontSize = 1;
    elemento.style.fontSize = fontSize + "px";
    elemento.style.visibility = "visible";
    elemento.textContent = texto;
    let limitador = 2000;
    Iterador_peligroso:
    while (elemento.offsetWidth < (contenedor.offsetWidth - 120)) {
      limitador--;
      if (limitador === 0) break Iterador_peligroso;
      elemento.style.fontSize = ++fontSize + "px";
      if (elemento.offsetWidth === 1000) return;
    }
    elemento.style.visibility = "visible";
  } catch (error) {
    console.log(error);
  }
};

const ajustar_ancho_de_titulos = async function () {
  await ajustar_ancho_de_texto(document.getElementById("titulo"), "tiki");
  await ajustar_ancho_de_texto(document.getElementById("subtitulo1"), "rest & auth & ui");
  await ajustar_ancho_de_texto(document.getElementById("subtitulo3"), "xampp & lampp & vue2");
  await ajustar_ancho_de_texto(document.getElementById("subtitulo2"), "simple & powerful");
};

let id_timeout = undefined;
const ajustar_ancho_de_titulos_con_retardo = function() {
  clearTimeout(id_timeout);
  setTimeout(ajustar_ancho_de_titulos, 100);
};

const autoreproducir_video = function () {
  document.getElementById("video_gatito").play();
};

const animar_fondo = async function() {
  let posicion = 1;
  let sentido = "incremental";
  const capa_2 = document.getElementsByClassName("capa_2")[0];
  while(true) {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        if(sentido === "incremental") {
          posicion+=0.1;
        } else {
          posicion-=0.1;
        }
        if(posicion <= 2) {
          sentido = "incremental";
        } else if (posicion >= 120) {
          posicion = 2;
        }
        capa_2.style.background = `linear-gradient(180deg,
         #77231dFF 0%,
         #77231dFF ${posicion-1}%,
         white ${posicion}%,
         #77231dFF ${posicion+1}%,
         #77231dFF 100%
        )`;
        resolve();
      }, 1);
    });
  }
};

const main = async function () {
  try {
    await autoreproducir_video();
    await ajustar_ancho_de_titulos();
    animar_fondo();
  } catch (error) {
    console.log(error);
    console.log("Fin de la ejecución");
  }
};

window.addEventListener("load", main);
window.addEventListener("resize", ajustar_ancho_de_titulos_con_retardo);