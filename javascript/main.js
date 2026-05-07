// ========================
// MAIN.JS - UI partagée
// ========================

// ---- Header scroll ----
window.addEventListener('scroll', () => {
  document.querySelector('header')?.classList.toggle('scrolled', window.scrollY > 10);
});

// ---- Hamburger menu ----
document.addEventListener('DOMContentLoaded', () => {
  const ham = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  ham?.addEventListener('click', () => nav?.classList.toggle('mobile-open'));

  // Fade-in observer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: .12 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});

// ---- Toast ----
function showToast(message, type = 'info', duration = 3000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: '✓', error: '✕', info: '♥' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.animation = 'none'; toast.style.opacity = '0'; toast.style.transform = 'translateX(100px)'; toast.style.transition = '.3s'; setTimeout(() => toast.remove(), 300); }, duration);
}

// ---- Cart Drawer ----
function openCartDrawer() {
  document.getElementById('cart-drawer')?.classList.add('open');
  document.getElementById('cart-overlay')?.classList.add('open');
  renderCartDrawer();
}
function closeCartDrawer() {
  document.getElementById('cart-drawer')?.classList.remove('open');
  document.getElementById('cart-overlay')?.classList.remove('open');
}
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('cart-overlay')?.addEventListener('click', closeCartDrawer);
  document.getElementById('close-cart-btn')?.addEventListener('click', closeCartDrawer);
  document.getElementById('cart-icon-btn')?.addEventListener('click', openCartDrawer);
});

function renderCartDrawer() {
  const body = document.getElementById('cart-body');
  const footer = document.getElementById('cart-footer');
  if (!body || !footer) return;
  const cart = getCart();
  if (cart.length === 0) {
    body.innerHTML = `<div class="cart-empty"><div style="font-size:3rem;margin-bottom:1rem">🛍️</div><p>Votre panier est vide</p><br><a href="products.html" class="btn btn-primary btn-sm">Découvrir nos produits</a></div>`;
    footer.innerHTML = '';
    return;
  }
  body.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" loading="lazy">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">Taille: ${item.size} · ${item.color}</div>
        <div class="cart-item-price">${item.price.toLocaleString('fr-DZ')} DA</div>
        <div style="display:flex;align-items:center;gap:.5rem;margin-top:.3rem">
          <button onclick="changeQty('${item.key}', ${item.qty - 1})" style="width:22px;height:22px;border-radius:50%;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer">−</button>
          <span style="font-size:.88rem">${item.qty}</span>
          <button onclick="changeQty('${item.key}', ${item.qty + 1})" style="width:22px;height:22px;border-radius:50%;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeItem('${item.key}')">✕</button>
    </div>
  `).join('');
  const total = getCartTotal();
  footer.innerHTML = `
    <div class="cart-total-row"><span>Total</span><span style="color:var(--rose-dark);font-family:'Playfair Display',serif">${total.toLocaleString('fr-DZ')} DA</span></div>
    <a href="content/commande.html" class="btn btn-primary btn-full" onclick="closeCartDrawer()">Passer la commande</a>
  `;
}

function changeQty(key, qty) {
  if (qty < 1) { removeItem(key); return; }
  updateCartQty(key, qty);
  renderCartDrawer();
}

function removeItem(key) {
  removeFromCart(key);
  renderCartDrawer();
  showToast('Article retiré du panier', 'info');
}

// ---- Product card render ----
function renderProductCard(product) {
  const inWL = isInWishlist(product.id);
  const badgeClass = product.badge === 'Nouveau' || product.badge === 'Tendance' ? 'new' : (product.badge === 'Bestseller' || product.badge === 'Luxe' ? 'gold' : '');
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;
  return `
    <article class="product-card" data-id="${product.id}" data-category="${product.category}">
      <div class="product-img-wrap">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        ${product.badge ? `<span class="product-badge ${badgeClass}">${product.badge}${discount ? ` -${discount}%` : ''}</span>` : ''}
        <button class="product-wish ${inWL ? 'active' : ''}" onclick="handleWishlist(event, ${product.id})" aria-label="Wishlist">
          <svg viewBox="0 0 24 24" fill="${inWL ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <div class="product-actions-hover">
          <button class="btn btn-primary btn-sm btn-full" onclick="handleQuickAdd(event, ${product.id})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            Ajouter au panier
          </button>
        </div>
      </div>
      <div class="product-body">
        <div class="product-category">${product.category}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-price-row">
          <span class="product-price">${product.price.toLocaleString('fr-DZ')} DA</span>
          ${product.oldPrice ? `<span class="product-old-price">${product.oldPrice.toLocaleString('fr-DZ')} DA</span>` : ''}
        </div>
        <div class="product-rating">
          <span class="stars">${'★'.repeat(Math.round(product.rating))}${'☆'.repeat(5 - Math.round(product.rating))}</span>
          <span class="reviews-count">(${product.reviews})</span>
        </div>
      </div>
    </article>
  `;
}

function handleWishlist(e, id) {
  e.stopPropagation();
  const added = toggleWishlist(id);
  const btn = e.currentTarget;
  btn.classList.toggle('active', added);
  const svg = btn.querySelector('path');
  if (svg) svg.setAttribute('fill', added ? 'currentColor' : 'none');
  showToast(added ? '♥ Ajouté à vos favoris' : 'Retiré des favoris', added ? 'success' : 'info');
}

function handleQuickAdd(e, id) {
  e.stopPropagation();
  const product = products.find(p => p.id === id);
  if (!product) return;
  addToCart(id, product.sizes[0], product.colors[0]);
  showToast(`${product.name} ajouté au panier`, 'success');
}

// ---- Product Modal ----
function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  let modal = document.getElementById('product-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'product-modal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) closeProductModal(); });
  }
  modal.innerHTML = `
    <div class="modal">
      <button class="modal-close" onclick="closeProductModal()">✕</button>
      <div class="modal-inner">
        <div class="modal-img"><img src="${product.image}" alt="${product.name}"></div>
        <div class="modal-body">
          <div class="product-category" style="margin-bottom:.5rem">${product.category}</div>
          <h2 style="font-family:'Playfair Display',serif;font-size:1.6rem;margin-bottom:.5rem">${product.name}</h2>
          <div class="product-rating" style="margin-bottom:1rem">
            <span class="stars">${'★'.repeat(Math.round(product.rating))}${'☆'.repeat(5-Math.round(product.rating))}</span>
            <span class="reviews-count">(${product.reviews} avis)</span>
          </div>
          <div style="font-size:1.5rem;font-family:'Playfair Display',serif;color:var(--rose-dark);margin-bottom:.5rem">${product.price.toLocaleString('fr-DZ')} DA ${product.oldPrice ? `<span style="font-size:1rem;text-decoration:line-through;color:#bbb">${product.oldPrice.toLocaleString('fr-DZ')} DA</span>` : ''}</div>
          <p style="color:var(--soft);margin-bottom:1.5rem;font-size:.95rem">${product.description}</p>
          <div style="margin-bottom:1rem">
            <label style="font-size:.85rem;font-weight:600;color:var(--mid);display:block;margin-bottom:.5rem">Taille</label>
            <div style="display:flex;gap:.5rem;flex-wrap:wrap">
              ${product.sizes.map((s,i) => `<button onclick="selectOption(this,'size')" class="filter-btn${i===0?' active':''}" style="padding:.4rem .9rem;font-size:.82rem">${s}</button>`).join('')}
            </div>
          </div>
          <div style="margin-bottom:1.5rem">
            <label style="font-size:.85rem;font-weight:600;color:var(--mid);display:block;margin-bottom:.5rem">Couleur</label>
            <div style="display:flex;gap:.5rem;flex-wrap:wrap">
              ${product.colors.map((c,i) => `<button onclick="selectOption(this,'color')" class="filter-btn${i===0?' active':''}" style="padding:.4rem .9rem;font-size:.82rem">${c}</button>`).join('')}
            </div>
          </div>
          <button class="btn btn-primary btn-full" onclick="addFromModal(${product.id})">Ajouter au panier</button>
          <button class="btn btn-outline btn-full" style="margin-top:.6rem" onclick="handleWishlistModal(${product.id})">${isInWishlist(product.id)?'♥ Retiré des favoris':'♡ Ajouter aux favoris'}</button>
        </div>
      </div>
    </div>
  `;
  setTimeout(() => modal.classList.add('open'), 10);
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  modal?.classList.remove('open');
}

function selectOption(btn, type) {
  btn.closest('div').querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function addFromModal(id) {
  const modal = document.getElementById('product-modal');
  const sizeBtn = modal?.querySelector('[onclick*="\'size\'"].active');
  const colorBtn = modal?.querySelector('[onclick*="\'color\'"].active');
  const size = sizeBtn ? sizeBtn.textContent : 'M';
  const color = colorBtn ? colorBtn.textContent : 'Noir';
  addToCart(id, size, color);
  showToast('Article ajouté au panier ✓', 'success');
  closeProductModal();
}

function handleWishlistModal(id) {
  const added = toggleWishlist(id);
  showToast(added ? '♥ Ajouté aux favoris' : 'Retiré des favoris', added ? 'success' : 'info');
  closeProductModal();
}
