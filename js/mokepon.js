const sectionSeleccionarAtaque = document.getElementById("selectionar-ataque");
const sectionReiniciar = document.getElementById("reiniciar");
const botonMascotaJugador = document.getElementById("boton-mascota");
const botonReiniciar = document.getElementById("boton-reiniciar");
const sectionSeleccionarMascota = document.getElementById(
  "selectionar-mascota"
);
const spanMascotaJugador = document.getElementById("mascota-jugador");

const spanMascotaEnemigo = document.getElementById("mascota-enemigo");

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const sectionMensajes = document.getElementById("resultado");
const ataquesDelJugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");
const contenedorTarjetas = document.getElementById("contenedor-tarjetas");
const contenedorAtaques = document.getElementById("contenedor-ataques");

let mokepones = [];
let ataqueJugador;
let ataqueEnemigo;
let opcionDeMokepones;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let mascotaJugador;
let ataquesMokepon;
let botonFuego;
let botonAgua;
let botonTierra;
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
  { nombre: "🌊", id: "Boton-agua" },
  { nombre: "🌊", id: "Boton-agua" },
  { nombre: "🌊", id: "Boton-agua" },
  { nombre: "🔥", id: "Boton-fuego" },
  { nombre: "🌴", id: "Boton-tierra" }
);

Capipepo.ataques.push(
  { nombre: "🌴", id: "Boton-tierra" },
  { nombre: "🌴", id: "Boton-tierra" },
  { nombre: "🌴", id: "Boton-tierra" },
  { nombre: "🔥", id: "Boton-fuego" },
  { nombre: "🌊", id: "Boton-agua" }
);

Ratigueya.ataques.push(
  { nombre: "🔥", id: "Boton-fuego" },
  { nombre: "🔥", id: "Boton-fuego" },
  { nombre: "🔥", id: "Boton-fuego" },
  { nombre: "🌴", id: "Boton-tierra" },
  { nombre: "🌊", id: "Boton-agua" }
);

mokepones.push(Hipodoge, Capipepo, Ratigueya);

window.addEventListener("load", iniciarJuego);

function iniciarJuego() {
  sectionSeleccionarAtaque.style.display = "none";
  sectionReiniciar.style.display = "none";

  mokepones.forEach((Mokepon) => {
    opcionDeMokepones = `
<input type="radio" name="mascota" id=${Mokepon.nombre} />
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

  inputHipodoge = document.getElementById("Hipodoge");
  inputCapipepo = document.getElementById("Capipepo");
  inputRatigueya = document.getElementById("Ratigueya");

  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
  botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarMascotaJugador() {
  sectionSeleccionarMascota.style.display = "none";
  sectionSeleccionarAtaque.style.display = "flex";

  if (inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = inputHipodoge.id;
    mascotaJugador = inputHipodoge.id;
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = inputCapipepo.id;
    mascotaJugador = inputCapipepo.id;
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = inputRatigueya.id;
    mascotaJugador = inputRatigueya.id;
  } else {
    alert("Elige una mascota");
    location.reload();
  }
  extraerAtaques(mascotaJugador);
  seleccionarMascotaEnemigo();
}

function extraerAtaques(mascotaJugador) {
  let ataques;
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      ataques = mokepones[i].ataques;
    }
  }
  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesMokepon = `
     <button id=${ataque.id} class="boton-de-ataque">${ataque.nombre} </button>
`;
    contenedorAtaques.innerHTML += ataquesMokepon;
  });

  botonFuego = document.getElementById("Boton-fuego");
  botonAgua = document.getElementById("Boton-agua");
  botonTierra = document.getElementById("Boton-tierra");

  botonFuego.addEventListener("click", ataqueFuego);
  botonAgua.addEventListener("click", ataqueAgua);
  botonTierra.addEventListener("click", ataqueTierra);
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function seleccionarMascotaEnemigo() {
  let mascotaAleatoria = aleatorio(0, mokepones.length - 1);

  spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre;
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
