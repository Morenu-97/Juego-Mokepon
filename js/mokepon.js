const sectionSeleccionarAtaque = document.getElementById("selectionar-ataque");
const sectionReiniciar = document.getElementById("reiniciar");
const botonMascotaJugador = document.getElementById("boton-mascota");
const botonFuego = document.getElementById("Boton-fuego");
const botonAgua = document.getElementById("Boton-agua");
const botonTierra = document.getElementById("Boton-tierra");
const botonReiniciar = document.getElementById("boton-reiniciar");

const sectionSeleccionarMascota = document.getElementById(
  "selectionar-mascota"
);
const inputHipodoge = document.getElementById("Hipodoge");
const inputCapipepo = document.getElementById("Capipepo");
const inputRatigueya = document.getElementById("Ratigueya");
const spanMascotaJugador = document.getElementById("mascota-jugador");

const spanMascotaEnemigo = document.getElementById("mascota-enemigo");

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const sectionMensajes = document.getElementById("resultado");
const ataquesDelJugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");

const contenedorTarjetas = document.getElementById("contenedor-tarjetas");

let mokepones = [];
let ataqueJugador;
let ataqueEnemigo;
let opcionDeMokepones;
let vidasJugador = 3;
let vidasEnemigo = 3;

class Mokepon {
  constructor(nombre, foto, vida) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
  }
}

let Hipodoge = new Mokepon(
  "Hipodoge",
  "./assets/mokepons_mokepon_hipodoge_attack.png",
  "5"
);

let Capipepo = new Mokepon(
  "Capipepo",
  "./assets/mokepons_mokepon_capipepo_attack.png",
  "5"
);

let Ratigueya = new Mokepon(
  "Ratigueya",
  "./assets/mokepons_mokepon_ratigueya_attack.png",
  "5"
);

Hipodoge.ataques.push(
  { nombre: "🌊", id: "Boton - agua" },
  { nombre: "🌊", id: "Boton - agua" },
  { nombre: "🌊", id: "Boton - agua" },
  { nombre: "🔥", id: "Boton - fuego" },
  { nombre: "🌴", id: "Boton - tierra" }
);

Capipepo.ataques.push(
  { nombre: "🌴", id: "Boton - tierra" },
  { nombre: "🌴", id: "Boton - tierra" },
  { nombre: "🌴", id: "Boton - tierra" },
  { nombre: "🔥", id: "Boton - fuego" },
  { nombre: "🌊", id: "Boton - agua" }
);

Ratigueya.ataques.push(
  { nombre: "🔥", id: "Boton - fuego" },
  { nombre: "🔥", id: "Boton - fuego" },
  { nombre: "🔥", id: "Boton - fuego" },
  { nombre: "🌴", id: "Boton - tierra" },
  { nombre: "🌊", id: "Boton - agua" }
);

mokepones.push(Hipodoge, Capipepo, Ratigueya);

window.addEventListener("load", iniciarJuego);

function iniciarJuego() {
  sectionSeleccionarAtaque.style.display = "none";

  sectionReiniciar.style.display = "none";

  mokepones.forEach((Mokepon) => {
    opcionDeMokepones = `
<input type="radio" name="mascota" id=${Mokepon.nombre}/>
        <label class="tarjeta-de-mokepon" for=${Mokepon.nombre}>
          <p>${Mokepon.nombre}</p>
          <img
            src=${Mokepon.foto}
            alt=${Mokepon.nombre}
          />
        </label>
`;
    contenedorTarjetas.innerHTML += opcionDeMokepones;
  });

  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

  botonFuego.addEventListener("click", ataqueFuego);
  botonAgua.addEventListener("click", ataqueAgua);
  botonTierra.addEventListener("click", ataqueTierra);
  botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarMascotaJugador() {
  sectionSeleccionarMascota.style.display = "none";
  sectionSeleccionarAtaque.style.display = "flex";

  if (inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = "Hipodoge";
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = "Capipepo";
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = "Ratigueya";
  } else {
    alert("Elige una mascota");
    location.reload();
  }
  seleccionarMascotaEnemigo();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function seleccionarMascotaEnemigo() {
  let mascotaAleatoria = aleatorio(1, 3);

  if (mascotaAleatoria == 1) {
    spanMascotaEnemigo.innerHTML = "Hipodoge";
  } else if (mascotaAleatoria == 2) {
    spanMascotaEnemigo.innerHTML = "Capipepo";
  } else {
    spanMascotaEnemigo.innerHTML = "Ratigueya";
  }
}

function ataqueFuego() {
  ataqueJugador = "Fuego";
  ataqueAleatorioEnemigo();
}

function ataqueAgua() {
  ataqueJugador = "Agua";
  ataqueAleatorioEnemigo();
}

function ataqueTierra() {
  ataqueJugador = "Tierra";
  ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(1, 3);

  if (ataqueAleatorio == 1) {
    ataqueEnemigo = "Fuego";
  } else if (ataqueAleatorio == 2) {
    ataqueEnemigo = "Agua";
  } else {
    ataqueEnemigo = "Tierra";
  }
  combate();
}

function combate() {
  if (ataqueEnemigo == ataqueJugador) {
    crearMensaje("Empate");
  } else if (
    (ataqueJugador == "Fuego" && ataqueEnemigo == "Tierra") ||
    (ataqueJugador == "Tierra" && ataqueEnemigo == "Agua") ||
    (ataqueJugador == "Agua" && ataqueEnemigo == "Fuego")
  ) {
    crearMensaje("Ganaste");
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = "♥️ " + vidasEnemigo;
  } else {
    crearMensaje("Perdiste");
    vidasJugador--;
    spanVidasJugador.innerHTML = "♥️ " + vidasJugador;
  }
  revisarVidas();
}

function revisarVidas() {
  if (vidasEnemigo == 0) {
    crearMensajeFinal("Ganaste🥳👌");
  } else if (vidasJugador == 0) {
    crearMensajeFinal("Perdiste 👎😖");
  }
}

function crearMensaje(resultado) {
  let nuevoAtaqueDelJugador = document.createElement("p"); // en comillas se pone la etiqueta que se quiere crear (p o div etc)
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;

  botonFuego.disabled = true;
  botonAgua.disabled = true;
  botonTierra.disabled = true;
  sectionReiniciar.style.display = "block";
}

function reiniciarJuego() {
  location.reload();
}
