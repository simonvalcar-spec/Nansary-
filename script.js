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
},
{
id: 4,
name: "Bolso Vianca Beige",
price: 171000,
image: "assets/Vianca-beige.png",
desc: "Diseño elegante y versátil en un tono beige que combina con todo."
},
{
id: 5,
name: "Bolso Tote Firme Verde Pino",
price: 205000,
image: "assets/Tote-firme-verde-pino.png",
desc: "Un bolso amplio y sofisticado, ideal para acompañarte todos los días."
},
{
id: 6,
name: "Bolso Lía Compacto Miel",
price: 265000,
image: "assets/Lia-compacto-miel.png",
desc: "Diseño compacto y elegante con un acabado en tono miel."
},
{
id: 7,
name: "Bolso Cala Negro",
price: 170000,
image: "assets/Cala-negro.png",
desc: "Diseño tejido en negro con detalles elegantes y correa ajustable."
},
{
id: 8,
name: "Bolso Cala Menta",
price: 170000,
image: "assets/Cala-menta.png",
desc: "Diseño tejido en un delicado tono menta, acompañado de detalles en café."
},
{
id: 9,
name: "Bolso Tote Dalia Café",
price: 170000,
image: "assets/Tote-dalia-cafe.png",
desc: "Diseño amplio y sofisticado con textura tejida y un elegante acabado en tonos café."
},
{
id: 10,
name: "Bolso Camelia Crema",
price: 170000,
image: "assets/Camelia-crema.png",
desc: "Diseño tejido en tono crema con detalles en café y cierre decorativo."
},
{
id: 11,
name: "Bolso Camelia Verde Pino",
price: 170000,
image: "assets/Camelia-verde-pino.png",
desc: "Una elegante combinación de verde pino y detalles café."
},
{
id: 12,
name: "Bolso Camelia Café",
price: 170000,
image: "assets/Camelia-cafe.png",
desc: "Un clásico diseño en tono café con textura tejida."
},
{
id: 13,
name: "Bolso Camelia Negro",
price: 170000,
image: "assets/Camelia-negro.png",
desc: "Diseño tejido completamente en negro con detalles dorados."
}
];

let cart = JSON.parse(localStorage.getItem("nansary-cart") || "[]");

const money = (value) => {
return new Intl.NumberFormat("es-CO", {
style: "currency",
currency: "COP",
maximumFractionDigits: 0
}).format(value);
};

/* =========================
PRODUCTOS
========================= */

function renderProducts() {
const container = document.getElementById("products");

if (!container) {
console.error("NANSARY: No existe el elemento #products");
return;
}

container.innerHTML = products.map((product) => {
return ` <article class="product" onclick="openProductModal(${product.id})">

```
    <div class="product-image">
      <img
        src="${product.image}"
        alt="${product.name}"
        loading="lazy"
      >
    </div>

    <div class="product-info">

      <h3 class="product-name">
        ${product.name}
      </h3>

      <p class="product-desc">
        ${product.desc}
      </p>

      <div class="product-row">

        <span class="price">
          ${money(product.price)}
        </span>

        <button
          class="add-button"
          onclick="event.stopPropagation(); addToCart(${product.id})">
          Agregar
        </button>

      </div>

    </div>

  </article>
`;
```

}).join("");

console.log("NANSARY: productos cargados:", products.length);
}

/* =========================
MODAL PRODUCTO
========================= */

function openProductModal(id) {
const product = products.find((p) => p.id === id);

if (!product) {
return;
}

const modal = document.getElementById("productModal");

if (!modal) {
return;
}

const image = document.getElementById("modalProductImage");
const name = document.getElementById("modalProductName");
const price = document.getElementById("modalProductPrice");
const description = document.getElementById("modalProductDescription");

if (image) {
image.src = product.image;
image.alt = product.name;
}

if (name) {
name.textContent = product.name;
}

if (price) {
price.textContent = money(product.price);
}

if (description) {
description.textContent = product.desc;
}

let quantity = 1;

const quantityText = document.getElementById("modalQuantity");
const minus = document.getElementById("modalMinus");
const plus = document.getElementById("modalPlus");
const addButton = document.getElementById("modalAddCart");
const whatsappButton = document.getElementById("modalBuyWhatsApp");

if (quantityText) {
quantityText.textContent = quantity;
}

if (minus) {
minus.onclick = function () {
if (quantity > 1) {
quantity--;
quantityText.textContent = quantity;
}
};
}

if (plus) {
plus.onclick = function () {
quantity++;
quantityText.textContent = quantity;
};
}

if (addButton) {
addButton.onclick = function () {
for (let i = 0; i < quantity; i++) {
addToCart(product.id);
}

```
  closeProductModal();
};
```

}

if (whatsappButton) {
whatsappButton.onclick = function () {
const total = product.price * quantity;

```
  const message =
```

`Hola Nansary 👋

Estoy interesado/a en realizar este pedido:

👜 ${product.name}
Cantidad: ${quantity}
Precio unitario: ${money(product.price)}
Total: ${money(total)}

¿Está disponible?`;

```
  window.open(
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
};
```

}

modal.classList.add("active");
document.body.style.overflow = "hidden";
}

function closeProductModal() {
const modal = document.getElementById("productModal");

if (modal) {
modal.classList.remove("active");
}

document.body.style.overflow = "";
}

/* =========================
CARRITO
========================= */

function saveCart() {
localStorage.setItem(
"nansary-cart",
JSON.stringify(cart)
);

renderCart();
}

function addToCart(id) {
const product = products.find((p) => p.id === id);

if (!product) {
return;
}

const existing = cart.find((item) => item.id === id);

if (existing) {
existing.qty++;
} else {
cart.push({
id: id,
qty: 1
});
}

saveCart();

showAddedMessage(product.name);
openCart();
}

function showAddedMessage(productName) {
const message = document.createElement("div");

message.className = "added-message";

message.innerHTML = `     <strong>✓ Agregado al carrito</strong>     <span>${productName}</span>
  `;

document.body.appendChild(message);

setTimeout(function () {
message.classList.add("hide");
}, 2200);

setTimeout(function () {
message.remove();
}, 2600);
}

function changeQty(id, delta) {
const item = cart.find((item) => item.id === id);

if (!item) {
return;
}

item.qty += delta;

if (item.qty <= 0) {
cart = cart.filter((item) => item.id !== id);
}

saveCart();
}

function removeItem(id) {
cart = cart.filter((item) => item.id !== id);
saveCart();
}

function renderCart() {
const container = document.getElementById("cartItems");
const countElement = document.getElementById("cartCount");
const totalElement = document.getElementById("cartTotal");

if (!container) {
return;
}

const count = cart.reduce(
(sum, item) => sum + item.qty,
0
);

if (countElement) {
countElement.textContent = count;
}

if (!cart.length) {
container.innerHTML = `       <div class="empty">
        Tu carrito está vacío.<br>
        Descubre nuestra colección.       </div>
    `;
} else {
container.innerHTML = cart.map((item) => {
const product = products.find(
(p) => p.id === item.id
);

```
  if (!product) {
    return "";
  }

  return `
    <div class="cart-item">

      <img
        src="${product.image}"
        alt="${product.name}"
      >

      <div>

        <h3>
          ${product.name}
        </h3>

        <p>
          ${money(product.price)}
        </p>

        <div class="qty">

          <button
            onclick="changeQty(${product.id}, -1)">
            −
          </button>

          <span>
            ${item.qty}
          </span>

          <button
            onclick="changeQty(${product.id}, 1)">
            +
          </button>

          <button
            class="remove"
            onclick="removeItem(${product.id})">
            Eliminar
          </button>

        </div>

      </div>

      <strong>
        ${money(product.price * item.qty)}
      </strong>

    </div>
  `;
}).join("");
```

}

const total = cart.reduce(
(sum, item) => {
const product = products.find(
(p) => p.id === item.id
);

```
  if (!product) {
    return sum;
  }

  return sum + product.price * item.qty;
},
0
```

);

if (totalElement) {
totalElement.textContent = money(total);
}
}

/* =========================
CARRITO ABRIR / CERRAR
========================= */

function openCart() {
const panel = document.getElementById("cartPanel");
const backdrop = document.getElementById("cartBackdrop");

if (panel) {
panel.classList.add("open");
panel.setAttribute("aria-hidden", "false");
}

if (backdrop) {
backdrop.classList.add("show");
}
}

function closeCart() {
const panel = document.getElementById("cartPanel");
const backdrop = document.getElementById("cartBackdrop");

if (panel) {
panel.classList.remove("open");
panel.setAttribute("aria-hidden", "true");
}

if (backdrop) {
backdrop.classList.remove("show");
}
}

/* =========================
CHECKOUT
========================= */

function openCheckout() {
if (!cart.length) {
alert("Agrega al menos un producto al carrito.");
return;
}

const modal = document.getElementById("checkoutModal");

if (modal) {
modal.classList.add("active");
document.body.style.overflow = "hidden";
}
}

function closeCheckout() {
const modal = document.getElementById("checkoutModal");

if (modal) {
modal.classList.remove("active");
}

document.body.style.overflow = "";
}

/* =========================
EVENTOS
========================= */

document.addEventListener("DOMContentLoaded", function () {

renderProducts();
renderCart();

const closeProduct =
document.getElementById("closeProductModal");

if (closeProduct) {
closeProduct.addEventListener(
"click",
closeProductModal
);
}

const productModal =
document.getElementById("productModal");

if (productModal) {
productModal.addEventListener(
"click",
function (event) {
if (event.target === productModal) {
closeProductModal();
}
}
);
}

const openCartButton =
document.getElementById("openCart");

if (openCartButton) {
openCartButton.addEventListener(
"click",
openCart
);
}

const closeCartButton =
document.getElementById("closeCart");

if (closeCartButton) {
closeCartButton.addEventListener(
"click",
closeCart
);
}

const cartBackdrop =
document.getElementById("cartBackdrop");

if (cartBackdrop) {
cartBackdrop.addEventListener(
"click",
closeCart
);
}

const clearCart =
document.getElementById("clearCart");

if (clearCart) {
clearCart.addEventListener(
"click",
function () {
cart = [];
saveCart();
}
);
}

const checkout =
document.getElementById("checkout");

if (checkout) {
checkout.addEventListener(
"click",
openCheckout
);
}

const closeCheckoutButton =
document.getElementById("closeCheckoutModal");

if (closeCheckoutButton) {
closeCheckoutButton.addEventListener(
"click",
closeCheckout
);
}

const checkoutModal =
document.getElementById("checkoutModal");

if (checkoutModal) {
checkoutModal.addEventListener(
"click",
function (event) {
if (event.target === checkoutModal) {
closeCheckout();
}
}
);
}

const checkoutForm =
document.getElementById("checkoutForm");

if (checkoutForm) {
checkoutForm.addEventListener(
"submit",
function (event) {

```
    event.preventDefault();

    if (!cart.length) {
      alert("Agrega al menos un producto al carrito.");
      return;
    }

    const name =
      document.getElementById("customerName").value.trim();

    const city =
      document.getElementById("customerCity").value.trim();

    const address =
      document.getElementById("customerAddress").value.trim();

    const note =
      document.getElementById("customerNote").value.trim();


    const lines = cart
      .map((item) => {

        const product =
          products.find(
            (p) => p.id === item.id
          );

        if (!product) {
          return "";
        }

        return `👜 ${product.name}
```

Cantidad: ${item.qty}
Subtotal: ${money(product.price * item.qty)}`;

```
      })
      .filter(Boolean);


    const total = cart.reduce(
      (sum, item) => {

        const product =
          products.find(
            (p) => p.id === item.id
          );

        if (!product) {
          return sum;
        }

        return sum + product.price * item.qty;

      },
      0
    );


    const message =
```

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

```
    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    closeCheckout();
  }
);
```

}

});
