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
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let mascotaJugador;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let botonFuego;
let botonAgua;
let botonTierra;
let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
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

//por que se pueden agregar dos nombres de clase y por que despues de {ataque.nombre} si se agrega un espacio, antes de cerrar el boton este queda guardado con este
function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesMokepon = `
     <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button> 
`;
    contenedorAtaques.innerHTML += ataquesMokepon;
  });

  botonFuego = document.getElementById("Boton-fuego");
  botonAgua = document.getElementById("Boton-agua");
  botonTierra = document.getElementById("Boton-tierra");
  botones = document.querySelectorAll(".BAtaque");
}

function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (e.target.textContent === "🔥") {
        ataqueJugador.push("Fuego");
        console.log(ataqueJugador);
        boton.style.background = "#112f58";
        boton.disabled = true;
      } else if (e.target.textContent === "🌊") {
        ataqueJugador.push("Agua");
        console.log(ataqueJugador);
        boton.style.background = "#112f58";
        boton.disabled = true;
      } else {
        ataqueJugador.push("Tierra");
        console.log(ataqueJugador);
        boton.style.background = "#112f58";
        boton.disabled = true;
        //debugger;
      }
      ataqueAleatorioEnemigo();
    });
  });
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function seleccionarMascotaEnemigo() {
  let mascotaAleatoria = aleatorio(0, mokepones.length - 1);

  spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre;
  ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques;
  secuenciaAtaque();
}

//no entendi por que se salta el dos en las condiciones.
function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);

  if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    ataqueEnemigo.push("Fuego");
  } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
    ataqueEnemigo.push("Agua");
  } else {
    ataqueEnemigo.push("Tierra");
  }
  console.log(ataqueEnemigo);
  iniciarPelea();
}

function iniciarPelea() {
  if (ataqueJugador.length === 5) {
    combate();
  }
}

function indexAmbosOponentes(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador];
  indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {
  for (let index = 0; index < ataqueJugador.length; index++) {
    if (ataqueJugador[index] === ataqueEnemigo[index]) {
      indexAmbosOponentes(index, index);
      crearMensaje("Empate");
    } else if (
      (ataqueJugador[index] === "Fuego" && ataqueEnemigo[index] === "Tierra") ||
      (ataqueJugador[index] === "Tierra" && ataqueEnemigo[index] === "Agua") ||
      (ataqueJugador[index] === "Agua" && ataqueEnemigo[index] === "Fuego")
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje("Ganaste");
      victoriasJugador++;
      spanVidasJugador.innerHTML = "🥇 " + victoriasJugador;
    } else {
      indexAmbosOponentes(index, index);
      crearMensaje("Perdiste");
      victoriasEnemigo++;
      spanVidasEnemigo.innerHTML = "🥇 " + victoriasEnemigo;
    }
  }
  revisarVidas();
}

function revisarVidas() {
  if (victoriasJugador === victoriasEnemigo) {
    crearMensajeFinal("Empate 😲🤙");
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("Ganaste🥳👌");
  } else {
    crearMensajeFinal("Perdiste 😖👎");
  }
}

function crearMensaje(resultado) {
  let nuevoAtaqueDelJugador = document.createElement("p"); // en comillas se pone la etiqueta que se quiere crear (p o div etc)
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;

  sectionReiniciar.style.display = "block";
}

function reiniciarJuego() {
  location.reload();
}
