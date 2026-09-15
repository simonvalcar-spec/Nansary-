const WHATSAPP = "573142717862";

const products = [
  {
    id: 1,
    name: "Bolso Ejecutivo Café",
    price: 244000,
    image: "assets/bolso-cafe.jpeg",
    desc: "Diseño amplio y elegante para acompañarte todos los días."
  },
  {
    id: 2,
    name: "Bolso Café Compacto",
    price: 140000,
    image: "assets/bolso-cafe-pequeno.jpeg",
    desc: "Un diseño versátil para llevar lo esencial con estilo."
  },
  {
    id: 3,
    name: "Bolso Trenzado Negro",
    price: 170000,
    image: "assets/bolso-negro.jpeg",
    desc: "Textura trenzada y detalles dorados para un look sofisticado."
  }
];

let cart = JSON.parse(localStorage.getItem("nansary-cart") || "[]");

const money = value => new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0
}).format(value);

function saveCart() {
  localStorage.setItem("nansary-cart", JSON.stringify(cart));
  renderCart();
}

function renderProducts() {
  document.getElementById("products").innerHTML = products.map(p => `
    <article class="product">
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-info">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-row">
          <span class="price">${money(p.price)}</span>
          <button class="add-button" onclick="addToCart(${p.id})">Agregar</button>
        </div>
      </div>
    </article>
  `).join("");
}

function addToCart(id) {
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, qty: 1 });
  }

  saveCart();

  const product = products.find(p => p.id === id);

  showAddedMessage(product.name);
  openCart();
}

function showAddedMessage(productName) {
  const message = document.createElement("div");

  message.className = "added-message";

  message.innerHTML = `
    <strong>✓ Agregado al carrito</strong>
    <span>${productName}</span>
  `;

  document.body.appendChild(message);

  setTimeout(() => {
    message.classList.add("hide");
  }, 2200);

  setTimeout(() => {
    message.remove();
  }, 2600);

}

function changeQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(x => x.id !== id);
  saveCart();
}

function removeItem(id) {
  cart = cart.filter(x => x.id !== id);
  saveCart();
}

function renderCart() {
  const container = document.getElementById("cartItems");
  const count = cart.reduce((sum, x) => sum + x.qty, 0);
  document.getElementById("cartCount").textContent = count;

  if (!cart.length) {
    container.innerHTML = `<div class="empty">Tu carrito está vacío.<br>Descubre nuestra colección.</div>`;
  } else {
    container.innerHTML = cart.map(item => {
      const p = products.find(x => x.id === item.id);
      return `
        <div class="cart-item">
          <img src="${p.image}" alt="${p.name}">
          <div>
            <h3>${p.name}</h3>
            <p>${money(p.price)}</p>
            <div class="qty">
              <button onclick="changeQty(${p.id}, -1)">−</button>
              <span>${item.qty}</span>
              <button onclick="changeQty(${p.id}, 1)">+</button>
              <button class="remove" onclick="removeItem(${p.id})">Eliminar</button>
            </div>
          </div>
          <strong>${money(p.price * item.qty)}</strong>
        </div>
      `;
    }).join("");
  }

  const total = cart.reduce((sum, item) => {
    const p = products.find(x => x.id === item.id);
    return sum + p.price * item.qty;
  }, 0);
  document.getElementById("cartTotal").textContent = money(total);
}

function openCart() {
  document.getElementById("cartPanel").classList.add("open");
  document.getElementById("cartBackdrop").classList.add("show");
  document.getElementById("cartPanel").setAttribute("aria-hidden", "false");
}

function closeCart() {
  document.getElementById("cartPanel").classList.remove("open");
  document.getElementById("cartBackdrop").classList.remove("show");
  document.getElementById("cartPanel").setAttribute("aria-hidden", "true");
}

document.getElementById("openCart").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
document.getElementById("cartBackdrop").addEventListener("click", closeCart);

document.getElementById("clearCart").addEventListener("click", () => {
  cart = [];
  saveCart();
});

document.getElementById("checkout").addEventListener("click", () => {
  if (!cart.length) {
    alert("Agrega al menos un producto al carrito.");
    return;
  }
  const lines = cart.map(item => {
    const p = products.find(x => x.id === item.id);
    return `• ${p.name} x${item.qty} — ${money(p.price * item.qty)}`;
  });
  const total = cart.reduce((sum, item) => {
    const p = products.find(x => x.id === item.id);
    return sum + p.price * item.qty;
  }, 0);
  const message =
`Hola, Nansary. Quiero realizar este pedido:

${lines.join("\n")}

Total: ${money(total)}

¿Me pueden confirmar disponibilidad y costo de envío?`;

  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank");
});

renderProducts();
renderCart();
