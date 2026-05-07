// ========================
// AUTH.JS - Authentification simulée
// ========================

const AUTH_KEY = 'femmechic_session';

// ---- Session ----
function getSession() {
  const data = localStorage.getItem(AUTH_KEY);
  return data ? JSON.parse(data) : null;
}

function setSession(user) {
  const session = { email: user.email, name: user.name, role: user.role, loggedAt: Date.now() };
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
}

function destroySession() {
  localStorage.removeItem(AUTH_KEY);
}

function isLoggedIn() {
  return getSession() !== null;
}

// ---- Registered users (simulation) ----
function getRegisteredUsers() {
  const stored = localStorage.getItem('femmechic_users');
  const base = stored ? JSON.parse(stored) : [];
  return [...users, ...base];
}

function registerUser(name, email, password) {
  const all = getRegisteredUsers();
  if (all.find(u => u.email === email)) return { success: false, message: "Cet email est déjà utilisé." };
  const stored = localStorage.getItem('femmechic_users');
  const base = stored ? JSON.parse(stored) : [];
  base.push({ name, email, password, role: 'user' });
  localStorage.setItem('femmechic_users', JSON.stringify(base));
  return { success: true };
}

function loginUser(email, password) {
  const all = getRegisteredUsers();
  const user = all.find(u => u.email === email && u.password === password);
  if (user) {
    setSession(user);
    return { success: true, user };
  }
  return { success: false, message: "Email ou mot de passe incorrect." };
}

// ---- RegEx Validation ----
const REGEX = {
  email: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
  name: /^[a-zA-ZÀ-ÿ\s\-']{2,50}$/,
  phone: /^(\+213|0)[5-7][0-9]{8}$/
};

function validateField(type, value) {
  if (!value || value.trim() === '') return { valid: false, message: "Ce champ est obligatoire." };
  if (!REGEX[type].test(value.trim())) {
    const messages = {
      email: "Format d'email invalide.",
      password: "Min. 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 symbole (!@#$...).",
      name: "Nom invalide (lettres uniquement, 2-50 caractères).",
      phone: "Numéro algérien invalide (ex: 0661234567)."
    };
    return { valid: false, message: messages[type] };
  }
  return { valid: true };
}

// ---- Cart ----
function getCart() {
  const data = localStorage.getItem('femmechic_cart');
  return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
  localStorage.setItem('femmechic_cart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, size, color, qty = 1) {
  const cart = getCart();
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const key = `${productId}-${size}-${color}`;
  const existing = cart.find(item => item.key === key);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ key, productId, name: product.name, price: product.price, image: product.image, size, color, qty });
  }
  saveCart(cart);
}

function removeFromCart(key) {
  let cart = getCart();
  cart = cart.filter(item => item.key !== key);
  saveCart(cart);
}

function updateCartQty(key, qty) {
  const cart = getCart();
  const item = cart.find(i => i.key === key);
  if (item) item.qty = qty;
  saveCart(cart);
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

function clearCart() {
  localStorage.removeItem('femmechic_cart');
  updateCartBadge();
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (badge) {
    const count = getCart().reduce((sum, i) => sum + i.qty, 0);
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

// ---- Wishlist ----
function getWishlist() {
  const data = localStorage.getItem('femmechic_wishlist');
  return data ? JSON.parse(data) : [];
}

function toggleWishlist(productId) {
  let wl = getWishlist();
  const idx = wl.indexOf(productId);
  if (idx > -1) wl.splice(idx, 1);
  else wl.push(productId);
  localStorage.setItem('femmechic_wishlist', JSON.stringify(wl));
  return idx === -1; // true = added
}

function isInWishlist(productId) {
  return getWishlist().includes(productId);
}

// ---- Nav auth state ----
function updateNavAuth() {
  const session = getSession();
  const loginLinks = document.querySelectorAll('.nav-login-link');
  const userMenus = document.querySelectorAll('.nav-user-menu');
  const userNames = document.querySelectorAll('.nav-user-name');
  loginLinks.forEach(el => el.style.display = session ? 'none' : '');
  userMenus.forEach(el => el.style.display = session ? '' : 'none');
  userNames.forEach(el => el.textContent = session ? session.name.split(' ')[0] : '');
  updateCartBadge();
}

document.addEventListener('DOMContentLoaded', updateNavAuth);
