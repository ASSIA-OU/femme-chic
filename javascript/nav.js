// ========================
// NAV.JS - Menu de navigation injecté
// ========================

function getNavHTML(basePath = '') {
  return `
  <header>
    <div class="nav-inner">
      <a href="${basePath}index.html" class="nav-logo">Femme<span>Chic</span></a>
      <nav id="main-nav">
        <ul>
          <li><a href="${basePath}index.html">Accueil</a></li>
          <li><a href="${basePath}content/products.html">Boutique</a></li>
          <li><a href="${basePath}content/commande.html">Commande</a></li>
          <li><a href="${basePath}content/login.html" class="nav-login-link">Connexion</a></li>
          <li class="nav-user-menu">
            <span class="user-btn">👤 <span class="nav-user-name"></span></span>
            <button class="logout-btn" onclick="destroySession();window.location.href='${basePath}content/login.html'">Déconnexion</button>
          </li>
        </ul>
      </nav>
      <div class="nav-actions">
        <button class="nav-icon-btn" id="cart-icon-btn" aria-label="Panier">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          <span id="cart-badge"></span>
        </button>
        <button class="hamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>
  <!-- Cart Drawer -->
  <div class="cart-overlay" id="cart-overlay"></div>
  <aside class="cart-drawer" id="cart-drawer">
    <div class="cart-header">
      <h3>Mon Panier 🛍️</h3>
      <button id="close-cart-btn" style="font-size:1.2rem;color:var(--soft);cursor:pointer">✕</button>
    </div>
    <div class="cart-body" id="cart-body"></div>
    <div class="cart-footer" id="cart-footer"></div>
  </aside>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const navPlaceholder = document.getElementById('nav-placeholder');
  if (navPlaceholder) {
    const isRoot = !window.location.pathname.includes('/content/');
    navPlaceholder.outerHTML = getNavHTML(isRoot ? '' : '../');
  }

  // Highlight active page
  const links = document.querySelectorAll('nav a');
  links.forEach(link => {
    if (link.href === window.location.href) link.classList.add('active');
  });
});
