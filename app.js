const productos = [
  { id:1, nombre:"WD-40", precio:7.5 },
  { id:2, nombre:"Guantes", precio:1.35 },
  { id:3, nombre:"Ventilador", precio:64 }
];

let carrito = {};

function render() {
  const grid = document.getElementById("productosGrid");
  grid.innerHTML = "";

  productos.forEach(p => {
    const qty = carrito[p.id] || 0;

    grid.innerHTML += `
      <div class="producto">
        <h3>${p.nombre}</h3>
        <p class="precio">${p.precio}€</p>

        <button onclick="sumar(${p.id})">+</button>
        <span>${qty}</span>
        <button onclick="restar(${p.id})">-</button>
      </div>
    `;
  });

  actualizarTotal();
}

function sumar(id) {
  carrito[id] = (carrito[id] || 0) + 1;
  render();
}

function restar(id) {
  carrito[id] = (carrito[id] || 0) - 1;
  if (carrito[id] <= 0) delete carrito[id];
  render();
}

function actualizarTotal() {
  let total = 0;

  productos.forEach(p => {
    const q = carrito[p.id] || 0;
    total += q * p.precio;
  });

  document.getElementById("total").textContent = total.toFixed(2) + "€";
}

function enviarWhatsApp() {
  const nombre = document.getElementById("clienteNombre").value;

  if (!nombre) {
    alert("Introduce tu nombre");
    return;
  }

  let mensaje = `Pedido de ${nombre}\n\n`;

  productos.forEach(p => {
    const q = carrito[p.id] || 0;
    if (q > 0) {
      mensaje += `${q}x ${p.nombre}\n`;
    }
  });

  const url = `https://wa.me/34600000000?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

render();
