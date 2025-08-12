const track = document.getElementById('track');
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.carousel-button.next');
const prevBtn = document.querySelector('.carousel-button.prev');
let currentIndex = 0;

function updateSlide() {
  const slideWidth = slides[0].clientWidth;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

nextBtn.addEventListener('click', () => {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    updateSlide();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlide();
  }
});

window.addEventListener('load', updateSlide);
window.addEventListener('resize', updateSlide);

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function clearCart() {
  if (confirm("Очистить корзину?")) {
    cart = [];
    saveCart();
    renderCart();
  }
}

function checkout() {
  if (cart.length === 0) {
    alert("Корзина пуста!");
    return;
  }
  alert("Заказ оформлен! Спасибо 😊");
  cart = [];
  saveCart();
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById("cart");
  const totalEl = document.getElementById("total");
  const countEl = document.getElementById("cart-count");
  cartList.innerHTML = "";

  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ${item.price}$
      <button onclick="removeFromCart(${index})">❌</button>
    `;
    cartList.appendChild(li);
    total += item.price;
  });

  totalEl.textContent = total;
  countEl.textContent = cart.length;
}

function toggleCart() {
  document.getElementById("cart-box").classList.toggle("show");
}

function toggleMenu() {
  const menu = document.getElementById("nav-menu");
  menu.classList.toggle("active");
}

renderCart();