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
desc: "Diseño tejido en negro con detalles elegantes y correa ajustable. Un bolso versátil para complementar cualquier look."
},
{
id: 8,
name: "Bolso Cala Menta",
price: 170000,
image: "assets/Cala-menta.png",
desc: "Diseño tejido en un delicado tono menta, acompañado de detalles en café y correa ajustable."
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
desc: "Diseño tejido en tono crema con detalles en café y cierre decorativo. Elegancia y versatilidad para tu día a día."
},
{
id: 11,
name: "Bolso Camelia Verde Pino",
price: 170000,
image: "assets/Camelia-verde-pino.png",
desc: "Una elegante combinación de verde pino y detalles café, con un diseño tejido lleno de personalidad."
},
{
id: 12,
name: "Bolso Camelia Café",
price: 170000,
image: "assets/Camelia-cafe.png",
desc: "Un clásico diseño en tono café con textura tejida y detalles cuidadosamente pensados para un estilo elegante."
},
{
id: 13,
name: "Bolso Camelia Negro",
price: 170000,
image: "assets/Camelia-negro.png",
desc: "Diseño tejido completamente en negro con detalles dorados. Elegante, sofisticado y fácil de combinar."
}
];

let cart = JSON.parse(localStorage.getItem("nansary-cart") || "[]");

const money = value => new Intl.NumberFormat("es-CO", {
style: "currency",
currency: "COP",
maximumFractionDigits: 0
}).format(value);

function saveCart() {
localStorage.setItem("nansary-cart
