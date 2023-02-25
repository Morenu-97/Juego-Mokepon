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

const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");

let mokepones = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let mascotaJugador;
let mascotaJugadorObjeto;
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
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = "./assets/mokemap.png";
let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 20;
const anchoMaximoDelMapa = 350;

if (anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa - 20;
}

alturaQueBuscamos = (anchoDelMapa * 600) / 800;

mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

class Mokepon {
  constructor(nombre, foto, vida, fotoMapa) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.ancho = 40;
    this.alto = 40;
    this.x = aleatorio(0, mapa.width - this.ancho);
    this.y = aleatorio(0, mapa.height - this.alto);
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoMapa;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }

  pintarMokepon() {
    lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
  }
}

let Hipodoge = new Mokepon(
  "Hipodoge",
  "./assets/mokepons_mokepon_hipodoge_attack.png",
  "5",
  "./assets/hipodoge.png"
);

let Capipepo = new Mokepon(
  "Capipepo",
  "./assets/mokepons_mokepon_capipepo_attack.png",
  "5",
  "./assets/capipepo.png"
);

let Ratigueya = new Mokepon(
  "Ratigueya",
  "./assets/mokepons_mokepon_ratigueya_attack.png",
  "5",
  "./assets/ratigueya.png"
);

let HipodogeEnemigo = new Mokepon(
  "Hipodoge",
  "./assets/mokepons_mokepon_hipodoge_attack.png",
  "5",
  "./assets/hipodoge.png"
);

let CapipepoEnemigo = new Mokepon(
  "Capipepo",
  "./assets/mokepons_mokepon_capipepo_attack.png",
  "5",
  "./assets/capipepo.png"
);

let RatigueyaEnemigo = new Mokepon(
  "Ratigueya",
  "./assets/mokepons_mokepon_ratigueya_attack.png",
  "5",
  "./assets/ratigueya.png"
);

Hipodoge.ataques.push(
  { nombre: "🌊", id: "Boton-agua" },
  { nombre: "🌊", id: "Boton-agua" },
  { nombre: "🌊", id: "Boton-agua" },
  { nombre: "🔥", id: "Boton-fuego" },
  { nombre: "🌴", id: "Boton-tierra" }
);

HipodogeEnemigo.ataques.push(
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

CapipepoEnemigo.ataques.push(
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

RatigueyaEnemigo.ataques.push(
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

  sectionVerMapa.style.display = "none";

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

  sectionVerMapa.style.display = "flex";
  iniciarMapa();
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

function seleccionarMascotaEnemigo(enemigo) {
  spanMascotaEnemigo.innerHTML = enemigo.nombre;
  ataquesMokeponEnemigo = enemigo.ataques;
  secuenciaAtaque();
}

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

function moverIzquierda() {
  mascotaJugadorObjeto.velocidadX = -5;
}

function moverDerecha() {
  mascotaJugadorObjeto.velocidadX = 5;
}

function moverAbajo() {
  mascotaJugadorObjeto.velocidadY = 5;
}

function moverArriba() {
  mascotaJugadorObjeto.velocidadY = -5;
}

function detenerMovimiento() {
  mascotaJugadorObjeto.velocidadX = 0;
  mascotaJugadorObjeto.velocidadY = 0;
}

function pintarCanvas() {
  mascotaJugadorObjeto.x =
    mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
  mascotaJugadorObjeto.y =
    mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;
  lienzo.clearRect(0, 0, mapa.width, mapa.height);
  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);

  mascotaJugadorObjeto.pintarMokepon();
  HipodogeEnemigo.pintarMokepon();
  CapipepoEnemigo.pintarMokepon();
  RatigueyaEnemigo.pintarMokepon();

  if (
    mascotaJugadorObjeto.velocidadX !== 0 ||
    mascotaJugadorObjeto.velocidadY !== 0
  ) {
    revisarColision(HipodogeEnemigo);
    revisarColision(CapipepoEnemigo);
    revisarColision(RatigueyaEnemigo);
  }
}

function sePresionoUnaTecla(event) {
  switch (event.key) {
    case "ArrowUp":
      moverArriba();
      break;
    case "ArrowDown":
      moverAbajo();
      break;
    case "ArrowLeft":
      moverIzquierda();
      break;
    case "ArrowRight":
      moverDerecha();
      break;
    default:
      break;
  }
}

function obtenerObjetoMascota() {
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      return mokepones[i];
    }
  }
}

function iniciarMapa() {
  mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador);
  intervalo = setInterval(pintarCanvas, 50);
  window.addEventListener("keydown", sePresionoUnaTecla);
  window.addEventListener("keyup", detenerMovimiento);
}

function revisarColision(enemigo) {
  const arribaEnemigo = enemigo.y;
  const abajoEnemigo = enemigo.y + enemigo.alto;
  const derechaEnemigo = enemigo.x + enemigo.ancho;
  const izquierdaEnemigo = enemigo.x;

  const arribaMascota = mascotaJugadorObjeto.y;
  const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
  const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
  const izquierdaMascota = mascotaJugadorObjeto.x;
  if (
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ) {
    return;
  }
  detenerMovimiento();
  clearInterval(intervalo);
  sectionSeleccionarAtaque.style.display = "flex";
  sectionVerMapa.style.display = "none";
  seleccionarMascotaEnemigo(enemigo);
}
