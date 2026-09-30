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

  // NUEVA COLECCIÓN

  {
    id: 4,
    name: "Bolso Cala Negro",
    price: 170000,
   image: "assets/Cala-negro.png",
    desc: "Diseño tejido en negro con detalles elegantes y correa ajustable. Un bolso versátil para complementar cualquier look."
  },
  {
    id: 5,
    name: "Bolso Cala Menta",
    price: 170000,
image: "assets/Cala-menta.png",
    desc: "Diseño tejido en un delicado tono menta, acompañado de detalles en café y correa ajustable."
  },
  {
    id: 6,
    name: "Bolso Tote Dalia Café",
    price: 170000,
   image: "assets/Tote-dalia-cafe.png",
    desc: "Diseño amplio y sofisticado con textura tejida y un elegante acabado en tonos café."
  },
  {
    id: 7,
    name: "Bolso Camelia Crema",
    price: 170000,
   image: "assets/Camelia-crema.png",
    desc: "Diseño tejido en tono crema con detalles en café y cierre decorativo. Elegancia y versatilidad para tu día a día."
  },
  {
    id: 8,
    name: "Bolso Camelia Verde Pino",
    price: 170000,
    image: "assets/Camelia-verde-pino.png",
    desc: "Una elegante combinación de verde pino y detalles café, con un diseño tejido lleno de personalidad."
  },
  {
    id: 9,
    name: "Bolso Camelia Café",
    price: 170000,
    image: "assets/Camelia-cafe.png",
    desc: "Un clásico diseño en tono café con textura tejida y detalles cuidadosamente pensados para un estilo elegante."
  },
  {
    id: 10,
    name: "Bolso Camelia Negro",
    price: 170000,
    image: "assets/Camelia-negro.png",
    desc: "Diseño tejido completamente en negro con detalles dorados. Elegante, sofisticado y fácil de combinar."
  },
  {
    id: 11,
    name: "Bolso Vianca Beige",
    price: 171000,
   image: "assets/Vianca-beige.png",
    desc: "Diseño compacto y elegante en tono beige, con detalles dorados, borla lateral y correa ajustable."
  },
  {
    id: 12,
    name: "Bolso Tote Firme Verde Pino",
    price: 205000,
   image: "assets/Tote-firme-verde-pino.png",
    desc: "Diseño estructurado en verde pino con bolsillo frontal y detalles dorados. Una opción práctica y sofisticada."
  },
  {
    id: 13,
    name: "Bolso Lía Compacto Miel",
    price: 265000,
    image: "assets/Lia-compacto-miel.png",
    desc: "Diseño compacto en tono miel con detalles dorados y correa ajustable. Ideal para llevar lo esencial con elegancia."
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
    <article class="product" onclick="openProductModal(${p.id})">
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </div>

      <div class="product-info">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>

        <div class="product-row">
          <span class="price">${money(p.price)}</span>

          <button
            class="add-button"
            onclick="event.stopPropagation(); addToCart(${p.id})">
            Agregar
          </button>
        </div>
      </div>
    </article>
  `).join("");
}


function openProductModal(id) {
  const product = products.find(p => p.id === id);

  if (!product) return;

  document.getElementById("modalProductImage").src = product.image;
  document.getElementById("modalProductImage").alt = product.name;
  document.getElementById("modalProductName").textContent = product.name;
  document.getElementById("modalProductPrice").textContent = money(product.price);
  document.getElementById("modalProductDescription").textContent = product.desc;
let modalQuantity = 1;

document.getElementById("modalQuantity").textContent = modalQuantity;

document.getElementById("modalMinus").onclick = function() {
  if (modalQuantity > 1) {
    modalQuantity--;
    document.getElementById("modalQuantity").textContent = modalQuantity;
  }
};

document.getElementById("modalPlus").onclick = function() {
  modalQuantity++;
  document.getElementById("modalQuantity").textContent = modalQuantity;
};
 document.getElementById("modalAddCart").onclick = function() {
  for (let i = 0; i < modalQuantity; i++) {
    addToCart(product.id);
  }

  closeProductModal();
};

  document.getElementById("modalBuyWhatsApp").onclick = function() {
   const total = product.price * modalQuantity;

const message = `Hola Nansary 👋

Estoy interesado/a en realizar este pedido:

👜 ${product.name}
Cantidad: ${modalQuantity}
Precio unitario: ${money(product.price)}
Total: ${money(total)}

¿Está disponible?`;

    window.open(
      `https://wa.me/573142717862?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  document.getElementById("productModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  document.getElementById("productModal").classList.remove("active");
  document.body.style.overflow = "";
}


document.getElementById("closeProductModal")
  .addEventListener("click", closeProductModal);


document.getElementById("productModal")
  .addEventListener("click", function(event) {
    if (event.target === this) {
      closeProductModal();
    }
  });
 

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

  document.getElementById("checkoutModal").classList.add("active");
  document.body.style.overflow = "hidden";
});


document.getElementById("closeCheckoutModal").addEventListener("click", () => {
  document.getElementById("checkoutModal").classList.remove("active");
  document.body.style.overflow = "";
});


document.getElementById("checkoutModal").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    document.getElementById("checkoutModal").classList.remove("active");
    document.body.style.overflow = "";
  }
});


document.getElementById("checkoutForm").addEventListener("submit", (event) => {
  event.preventDefault();

  if (!cart.length) {
    alert("Agrega al menos un producto al carrito.");
    return;
  }

  const name = document.getElementById("customerName").value.trim();
  const city = document.getElementById("customerCity").value.trim();
  const address = document.getElementById("customerAddress").value.trim();
  const note = document.getElementById("customerNote").value.trim();

  const lines = cart.map(item => {
    const p = products.find(x => x.id === item.id);

    return `👜 ${p.name}
Cantidad: ${item.qty}
Subtotal: ${money(p.price * item.qty)}`;
  });

  const total = cart.reduce((sum, item) => {
    const p = products.find(x => x.id === item.id);

    return sum + p.price * item.qty;
  }, 0);

  const message =
`Hola Nansary 👋

Quiero realizar el siguiente pedido:

${lines.join("\n\n")}

━━━━━━━━━━━━━━
TOTAL: ${money(total)}
━━━━━━━━━━━━━━

👤 Nombre: ${name}
📍 Ciudad: ${city}
🏠 Dirección: ${address}
${note ? `📝 Indicación: ${note}` : ""}

¿Me pueden confirmar disponibilidad y costo de envío? 😊`;

  window.open(
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
    "_blank"
  );

  document.getElementById("checkoutModal").classList.remove("active");
  document.body.style.overflow = "";
});

renderProducts();
renderCart();
