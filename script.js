/**
 * NUE — A Quieter Way To Dress
 * Premium Minimal Fashion Website JavaScript
 */

'use strict';

// GTM/GA4 dataLayer Initialization
window.dataLayer = window.dataLayer || [];

/* ─── State ──────────────────────────────────────────────── */
const state = {
  cart: [],
  wishlist: [],
  lifestyleMode: false,
  currentSlide: 0,
  totalSlides: 4,
};

const products = [
  { id: 1, name: 'The Linen Coat',   price: 490, img: 'assets/images/product1.webp', category: 'Outerwear', desc: 'Unstructured, undyed, unapologetic. Our flagship coat is cut from heavyweight organic linen in its most natural state.', sizes: ['XS', 'S', 'M', 'L', 'XL'], material: '100% Organic Linen. Unbleached, undyed. Made in Japan.' },
  { id: 2, name: 'Wide Trousers',    price: 320, img: 'assets/images/product2.webp', category: 'Bottoms',   desc: 'Architecture for the body. A wide-leg silhouette cut in dense charcoal fabric that holds its shape beautifully over years.', sizes: ['XS', 'S', 'M', 'L', 'XL'], material: '80% Wool, 20% Silk. Dry clean only. Made in Italy.' },
  { id: 3, name: 'Knit Sweater',     price: 280, img: 'assets/images/product3.webp', category: 'Tops',      desc: 'Stone grey. Silence woven in. A densely knit, relaxed-fit sweater made from extra-fine merino wool.', sizes: ['XS', 'S', 'M', 'L', 'XL'], material: '100% Extra-Fine Merino Wool. Hand wash cold. Made in Scotland.' },
  { id: 4, name: 'Linen Shirt',      price: 195, img: 'assets/images/product4.webp', category: 'Tops',      desc: 'The one you\'ll reach for every day. A slightly oversized shirt in natural ivory linen with intentional, minimal construction.', sizes: ['XS', 'S', 'M', 'L', 'XL'], material: '100% Organic Linen. Machine wash on gentle. Made in Portugal.' },
];

/* ─── Utility Functions ──────────────────────────────────── */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ─── Loader ──────────────────────────────────────────────── */
(function initLoader() {
  const loader = $('#loader');
  // Reveal page after animation completes (~3.5s)
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    initScrollAnimations();
  }, 3500);

  document.body.style.overflow = 'hidden';
})();

/* ─── Custom Cursor ──────────────────────────────────────── */
(function initCursor() {
  const cursor = $('#cursor');
  const follower = $('#cursor-follower');
  if (!cursor || !follower) return;

  let mouseX = -100, mouseY = -100;
  let followerX = -100, followerY = -100;
  let active = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!active) {
      active = true;
      requestAnimationFrame(animateFollower);
    }
  }, { passive: true });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;

    cursor.style.setProperty('--cursor-x', `${mouseX}px`);
    cursor.style.setProperty('--cursor-y', `${mouseY}px`);
    follower.style.setProperty('--follower-x', `${followerX}px`);
    follower.style.setProperty('--follower-y', `${followerY}px`);

    requestAnimationFrame(animateFollower);
  }

  // Hover states
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('a, button, [data-tilt], .product-card, .journal-card, .lifestyle-block, .social-item');
    if (target) {
      cursor.classList.add('is-hovering');
      follower.classList.add('is-hovering');
    }
  }, { passive: true });
  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('a, button, [data-tilt], .product-card, .journal-card, .lifestyle-block, .social-item');
    if (target) {
      cursor.classList.remove('is-hovering');
      follower.classList.remove('is-hovering');
    }
  }, { passive: true });
  document.addEventListener('mousedown', () => cursor.classList.add('is-clicking'), { passive: true });
  document.addEventListener('mouseup',   () => cursor.classList.remove('is-clicking'), { passive: true });
})();

/* ─── Navigation ──────────────────────────────────────────── */
(function initNav() {
  const nav = $('#nav');
  const toggle = $('#nav-toggle');
  const mobileMenu = $('#mobile-menu');
  const mobileLinks = $$('.mobile-nav-link');

  // Scroll state
  let lastScroll = 0;
  let navTicking = false;
  window.addEventListener('scroll', () => {
    if (!navTicking) {
      requestAnimationFrame(() => {
        const current = window.scrollY;
        if (current > 60) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
        lastScroll = current;
        navTicking = false;
      });
      navTicking = true;
    }
  }, { passive: true });

  // Mobile toggle
  toggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
    document.body.classList.toggle('no-scroll', isOpen);
  });

  // Close mobile menu on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('no-scroll');
    });
  });
})();

/* ─── Hero Parallax ──────────────────────────────────────── */
(function initHeroParallax() {
  const heroBg      = $('#hero-bg');
  const heroContent = $('#hero-content');
  const heroSection = $('#hero');
  if (!heroBg) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroH   = heroSection.offsetHeight;
        if (scrollY <= heroH) {
          const progress = scrollY / heroH;
          // Zoom out effect
          const scale = 1.1 - (progress * 0.08);
          heroBg.style.transform = `scale(${Math.max(scale, 1)})`;
          // Fade content upward
          heroContent.style.opacity  = 1 - (progress * 2.2);
          heroContent.style.transform = `translateY(${-scrollY * 0.35}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ─── About Image Parallax ───────────────────────────────── */
(function initAboutParallax() {
  const aboutSection = $('#about');
  const aboutImg = $('.about-editorial-img');
  if (!aboutSection || !aboutImg) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const rect = aboutSection.getBoundingClientRect();
        const winHeight = window.innerHeight;
        if (rect.top < winHeight && rect.bottom > 0) {
          const scrollProgress = (winHeight - rect.top) / (winHeight + rect.height);
          const translateY = (scrollProgress - 0.5) * 60;
          aboutImg.style.transform = `scale(1.08) translateY(${translateY}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ─── Scroll Animations ─────────────────────────────────── */
function initScrollAnimations() {
  // Reveal elements
  const revealEls = $$('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger within groups
        const delay = (entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach((el, i) => {
    // Add stagger within same parent
    const siblings = el.parentElement.querySelectorAll('.reveal');
    siblings.forEach((sib, j) => {
      if (!sib.dataset.delay) sib.dataset.delay = j * 100;
    });
    revealObserver.observe(el);
  });

  // Statement words
  const words = $$('.reveal-word');
  const wordObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      words.forEach((w, i) => {
        setTimeout(() => w.classList.add('visible'), i * 150);
      });
      wordObserver.disconnect();
    }
  }, { threshold: 0.3 });

  if (words[0]) wordObserver.observe(words[0].closest('.statement-section'));

  // Tilt effect on essentials
  initTiltCards();
}

/* ─── Tilt Cards ─────────────────────────────────────────── */
function initTiltCards() {
  const tiltCards = $$('[data-tilt]');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect  = card.getBoundingClientRect();
      const x     = (e.clientX - rect.left) / rect.width  - 0.5;
      const y     = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(8px)`;

      // Move spotlight
      const spotlight = card.querySelector('.essential-spotlight');
      if (spotlight) {
        spotlight.style.left = ((e.clientX - rect.left) / rect.width * 100) + '%';
        spotlight.style.top  = ((e.clientY - rect.top)  / rect.height * 100) + '%';
      }
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ─── Search ─────────────────────────────────────────────── */
(function initSearch() {
  const btn     = $('#search-btn');
  const overlay = $('#search-overlay');
  const close   = $('#search-close');
  const input   = $('#search-input');
  const results = $('#search-results');

  function openSearch() {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    setTimeout(() => input.focus(), 300);
  }

  function closeSearch() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    input.value = '';
    results.innerHTML = '';
  }

  btn.addEventListener('click', openSearch);
  close.addEventListener('click', closeSearch);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeSearch();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
  });

  let searchTrackTimeout;
  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    results.innerHTML = '';
    if (!query) return;

    // GA4 tracking for search with 1s debounce
    clearTimeout(searchTrackTimeout);
    searchTrackTimeout = setTimeout(() => {
      window.dataLayer.push({
        event: 'search',
        search_term: query
      });
    }, 1000);

    const matches = products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      results.innerHTML = '<p style="color:var(--stone);font-size:0.8rem;letter-spacing:0.1em;">No results found.</p>';
      return;
    }

    matches.forEach(p => {
      const el = document.createElement('div');
      el.style.cssText = 'display:flex;align-items:center;gap:1rem;padding:1rem 0;border-bottom:1px solid var(--border);cursor:pointer;transition:opacity 0.2s;';
      el.innerHTML = `
        <img src="${p.img}" alt="${p.name}" style="width:50px;height:62px;object-fit:cover;flex-shrink:0;"/>
        <div>
          <p style="font-family:var(--font-serif);font-size:1rem;">${p.name}</p>
          <p style="font-size:0.75rem;color:var(--stone);">$${p.price} — ${p.category}</p>
        </div>
      `;
      el.addEventListener('click', () => {
        closeSearch();
        openQuickView(p.id);
      });
      el.addEventListener('mouseenter', () => el.style.opacity = '0.7');
      el.addEventListener('mouseleave', () => el.style.opacity = '1');
      results.appendChild(el);
    });
  });
})();

/* ─── Cart System ─────────────────────────────────────────── */
(function initCart() {
  const cartBtn     = $('#cart-btn');
  const cartSidebar = $('#cart-sidebar');
  const cartOverlay = $('#cart-overlay');
  const cartClose   = $('#cart-close');
  const cartItems   = $('#cart-items');
  const cartFooter  = $('#cart-footer');
  const cartCount   = $('#cart-count');
  const cartTotal   = $('#cart-total-price');

  function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
    cartSidebar.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  }

  function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
    cartSidebar.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }

  cartBtn.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  function renderCart() {
    const count = state.cart.reduce((sum, item) => sum + item.qty, 0);
    const total = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    // Update count badge
    cartCount.textContent = count;
    cartCount.classList.toggle('visible', count > 0);
    cartTotal.textContent = '$' + total;

    if (state.cart.length === 0) {
      cartItems.innerHTML = `
        <div class="cart-empty">
          <p>Your cart is empty.</p>
          <span>Begin curating your wardrobe.</span>
        </div>`;
      cartFooter.style.display = 'none';
      return;
    }

    cartFooter.style.display = 'block';
    cartItems.innerHTML = state.cart.map(item => `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}" class="cart-item-img" />
        <div class="cart-item-details">
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-price">$${item.price} &times; ${item.qty}</p>
          <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove ${item.name}">Remove</button>
        </div>
      </div>
    `).join('');

    // Remove buttons
    cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        state.cart = state.cart.filter(i => i.id !== id);
        renderCart();
      });
    });
  }

  // Add to cart
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart');
    if (!btn) return;

    const id    = parseInt(btn.dataset.id);
    const name  = btn.dataset.name;
    const price = parseInt(btn.dataset.price);
    const product = products.find(p => p.id === id);

    const existing = state.cart.find(i => i.id === id);
    if (existing) {
      existing.qty++;
    } else {
      state.cart.push({ id, name, price, qty: 1, img: product?.img || '' });
    }

    renderCart();

    // GA4 eCommerce tracking for add_to_cart
    window.dataLayer.push({
      event: 'add_to_cart',
      ecommerce: {
        currency: 'USD',
        value: price,
        items: [{
          item_id: id.toString(),
          item_name: name,
          price: price,
          item_category: product?.category || '',
          quantity: 1
        }]
      }
    });

    // Animate button
    btn.textContent = '✓';
    btn.style.opacity = '0.5';
    setTimeout(() => {
      btn.textContent = 'Add';
      btn.style.opacity = '';
    }, 1400);

    showToast(`${name} added to your selection`);

    // Open cart briefly
    openCart();
  });

  // Checkout
  $('#checkout-btn').addEventListener('click', () => {
    showToast('Checkout coming soon — stay minimal.');
  });

  renderCart();
})();

/* ─── Wishlist ────────────────────────────────────────────── */
(function initWishlist() {
  const wishlistBtn = $('#wishlist-btn');

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.wishlist-btn-card');
    if (!btn) return;

    const id = parseInt(btn.dataset.id);
    const product = products.find(p => p.id === id);
    const isAdding = !state.wishlist.includes(id);

    if (state.wishlist.includes(id)) {
      state.wishlist = state.wishlist.filter(i => i !== id);
      btn.classList.remove('wishlisted');
      showToast('Removed from wishlist');
    } else {
      state.wishlist.push(id);
      btn.classList.add('wishlisted');
      showToast(`${product?.name} added to wishlist`);
    }

    // GA4 eCommerce tracking for add_to_wishlist
    window.dataLayer.push({
      event: isAdding ? 'add_to_wishlist' : 'remove_from_wishlist',
      ecommerce: {
        currency: 'USD',
        value: product?.price || 0,
        items: [{
          item_id: id.toString(),
          item_name: product?.name || '',
          price: product?.price || 0,
          item_category: product?.category || '',
          quantity: 1
        }]
      }
    });
  });

    if (wishlistBtn) {
      wishlistBtn.addEventListener('click', () => {
        showToast(`Wishlist — ${state.wishlist.length} item${state.wishlist.length !== 1 ? 's' : ''}`);
      });
    }
  })();

/* ─── Quick View Modal ───────────────────────────────────── */
function openQuickView(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  // GA4 eCommerce tracking for view_item
  window.dataLayer.push({
    event: 'view_item',
    ecommerce: {
      currency: 'USD',
      value: product.price,
      items: [{
        item_id: product.id.toString(),
        item_name: product.name,
        price: product.price,
        item_category: product.category,
        quantity: 1
      }]
    }
  });

  const modal   = $('#quickview-modal');
  const overlay = $('#modal-overlay');
  const gallery = $('#qv-gallery');
  const details = $('#qv-details');

  gallery.innerHTML = `<img src="${product.img}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;" />`;

  details.innerHTML = `
    <p class="qv-category">${product.category}</p>
    <h3 class="qv-name">${product.name}</h3>
    <p class="qv-price">$${product.price}</p>
    <p class="qv-desc">${product.desc}</p>
    <div>
      <p class="qv-label">Select Size</p>
      <div class="qv-sizes">
        ${product.sizes.map((s, i) => `<button class="size-btn${i === 1 ? ' active' : ''}" data-size="${s}">${s}</button>`).join('')}
      </div>
    </div>
    <div>
      <p class="qv-label">Material</p>
      <p class="qv-material">${product.material}</p>
    </div>
    <button class="btn-primary add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" style="margin-top:0.5rem;">
      <span>Add to Selection</span>
    </button>
  `;

  // Size selection
  details.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      details.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  modal.classList.add('open');
  overlay.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}

(function initQuickView() {
  const modal   = $('#quickview-modal');
  const overlay = $('#modal-overlay');
  const close   = $('#modal-close');

  function closeModal() {
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
    if (overlay) {
      overlay.classList.remove('open');
    }
    document.body.classList.remove('no-scroll');
  }

  if (close) {
    close.addEventListener('click', closeModal);
  }
  if (overlay) {
    overlay.addEventListener('click', closeModal);
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Trigger from product cards
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.quick-view-btn');
    if (!btn) return;
    e.preventDefault(); // Prevent navigating to product.html when opening modal
    const card = btn.closest('.product-card');
    const idAttr = btn.dataset.id || (card ? card.dataset.id : null);
    let id = parseInt(idAttr);
    if (isNaN(id)) {
      // Fallback: parse from href
      const href = btn.getAttribute('href');
      if (href) {
        const urlParams = new URLSearchParams(href.split('?')[1]);
        id = parseInt(urlParams.get('id'));
      }
    }
    openQuickView(id);
  });
})();

/* ─── Lifestyle Mode ─────────────────────────────────────── */
(function initLifestyleMode() {
  const toggleBtn = $('#lifestyle-toggle');
  const overlay   = $('#lifestyle-mode');
  const exitBtn   = $('#lm-exit');
  const prevBtn   = $('#lm-prev');
  const nextBtn   = $('#lm-next');
  const dots      = $$('.lm-dot');
  const slides    = $$('.lm-slide');

  function goToSlide(idx) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[idx].classList.add('active');
    dots[idx].classList.add('active');
    state.currentSlide = idx;
  }

  function openMode() {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    state.lifestyleMode = true;
    goToSlide(0);

    // GA4 tracking for lifestyle mode open
    window.dataLayer.push({
      event: 'lifestyle_mode_toggle',
      lifestyle_mode_state: 'open'
    });

    // Auto advance
    state.autoSlide = setInterval(() => {
      const next = (state.currentSlide + 1) % state.totalSlides;
      goToSlide(next);
    }, 5000);
  }

  function closeMode() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    state.lifestyleMode = false;
    clearInterval(state.autoSlide);

    // GA4 tracking for lifestyle mode close
    window.dataLayer.push({
      event: 'lifestyle_mode_toggle',
      lifestyle_mode_state: 'close'
    });
  }

  toggleBtn.addEventListener('click', openMode);
  exitBtn.addEventListener('click', closeMode);

  prevBtn.addEventListener('click', () => {
    clearInterval(state.autoSlide);
    goToSlide((state.currentSlide - 1 + state.totalSlides) % state.totalSlides);
  });

  nextBtn.addEventListener('click', () => {
    clearInterval(state.autoSlide);
    goToSlide((state.currentSlide + 1) % state.totalSlides);
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(state.autoSlide);
      goToSlide(parseInt(dot.dataset.slide));
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!state.lifestyleMode) return;
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft')  prevBtn.click();
    if (e.key === 'Escape')     closeMode();
  });

  // Touch/swipe
  let touchStartX = 0;
  overlay.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  overlay.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      clearInterval(state.autoSlide);
      if (diff > 0) nextBtn.click();
      else prevBtn.click();
    }
  }, { passive: true });
})();

/* ─── Newsletter ─────────────────────────────────────────── */
(function initNewsletter() {
  const form  = $('#newsletter-form');
  const input = $('#newsletter-email');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.');
      return;
    }
    showToast('Thank you. We will write when it matters.');
    input.value = '';
  });
})();

/* ─── Smooth Anchor Scrolling ────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

/* ─── Social Wall Interaction ────────────────────────────── */
(function initSocialWall() {
  const track = $('#social-track');
  if (!track) return;

  // Duplicate items for infinite scroll
  const items = track.innerHTML;
  track.innerHTML = items + items;

  // Pause on hover
  track.parentElement.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });
  track.parentElement.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
})();

/* ─── Lazy Loading Image Enhancement ─────────────────────── */
(function initLazyImages() {
  const images = $$('img[loading="lazy"]');
  images.forEach(img => {
    img.addEventListener('load', () => {
      img.style.transition = 'filter 0.6s ease';
    });
    img.addEventListener('error', () => {
      // Graceful fallback for missing images
      img.style.background = 'var(--beige)';
    });
  });
})();

/* ─── Cursor Magnetic Effect ─────────────────────────────── */
(function initMagnetic() {
  const magnetTargets = $$('.btn-primary, .hero-cta, .lifestyle-mode-btn');

  magnetTargets.forEach(target => {
    let rect = null;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let isHovered = false;
    let rafId = null;

    target.addEventListener('mouseenter', () => {
      rect = target.getBoundingClientRect();
      isHovered = true;
      if (!rafId) {
        animate();
      }
    }, { passive: true });

    target.addEventListener('mousemove', (e) => {
      if (!rect) rect = target.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetX = (e.clientX - cx) * 0.22;
      targetY = (e.clientY - cy) * 0.22;
    }, { passive: true });

    target.addEventListener('mouseleave', () => {
      isHovered = false;
      targetX = 0;
      targetY = 0;
      rect = null;
    }, { passive: true });

    function animate() {
      if (!isHovered && Math.abs(currentX) < 0.01 && Math.abs(currentY) < 0.01) {
        target.style.transform = '';
        currentX = 0;
        currentY = 0;
        rafId = null;
        return;
      }
      
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      target.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      
      rafId = requestAnimationFrame(animate);
    }
  });
})();

/* ─── Keyboard Accessibility ─────────────────────────────── */
(function initAccessibility() {
  // Nav toggle keyboard support
  const toggle = $('#nav-toggle');
  toggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle.click();
    }
  });
})();

/* ─── Performance: Pause animations off-screen ───────────── */
(function initPerformance() {
  const marquee = $('.marquee-inner');
  const social  = $('#social-track');

  const pauseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target.style !== undefined) {
        entry.target.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
      }
    });
  }, { threshold: 0 });

  if (marquee) pauseObserver.observe(marquee);
  if (social)  pauseObserver.observe(social);
})();

/* ─── GTM/GA4 Tracking Integration ───────────────────────── */
(function initGtmTracking() {
  // 1. Navigation clicks
  document.addEventListener('click', (e) => {
    const navLink = e.target.closest('[data-analytics-nav]');
    if (navLink) {
      window.dataLayer.push({
        event: 'navigation_click',
        navigation_label: navLink.getAttribute('data-analytics-nav')
      });
    }
  });

  // 2. Hero CTA click
  document.addEventListener('click', (e) => {
    const cta = e.target.closest('[data-analytics="hero_cta"]');
    if (cta) {
      window.dataLayer.push({
        event: 'hero_cta_click'
      });
    }
  });

  // 3. Footer link click
  document.addEventListener('click', (e) => {
    const footerLink = e.target.closest('[data-analytics-footer]');
    if (footerLink) {
      window.dataLayer.push({
        event: 'footer_link_click',
        footer_label: footerLink.getAttribute('data-analytics-footer')
      });
    }
  });
  
  // 4. Newsletter Signup form submit (footer)
  document.addEventListener('submit', (e) => {
    const form = e.target.closest('[data-analytics="newsletter_signup"]');
    if (form) {
      window.dataLayer.push({
        event: 'newsletter_signup'
      });
    }
  });

  // 5. Product card hover tracking
  let hoverTimeout;
  document.addEventListener('mouseover', (e) => {
    const card = e.target.closest('[data-analytics-product-id]');
    if (card) {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        const id = card.getAttribute('data-analytics-product-id');
        const name = card.getAttribute('data-name');
        const price = card.getAttribute('data-price');
        const category = card.getAttribute('data-category');
        window.dataLayer.push({
          event: 'product_hover',
          item_id: id,
          item_name: name,
          price: price,
          category: category
        });
      }, 800);
    }
  });
  document.addEventListener('mouseout', (e) => {
    const card = e.target.closest('[data-analytics-product-id]');
    if (card) {
      clearTimeout(hoverTimeout);
    }
  });

  // 6. Scroll depth tracking (25%, 50%, 75%, 90%)
  const thresholds = [25, 50, 75, 90];
  const trackedScrolls = {};
  let scrollDepthTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollDepthTicking) {
      requestAnimationFrame(() => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          const progress = Math.round((window.scrollY / docHeight) * 100);
          thresholds.forEach(t => {
            if (progress >= t && !trackedScrolls[t]) {
              trackedScrolls[t] = true;
              window.dataLayer.push({
                event: 'scroll_depth',
                scroll_percentage: t
              });
            }
          });
        }
        scrollDepthTicking = false;
      });
      scrollDepthTicking = true;
    }
  }, { passive: true });
})();

/* ─── Product Page Dynamic Injection ─────────────────────── */
(function initProductPage() {
  const container = $('#product-detail-container');
  if (!container) return; // Not on the product details page

  // Parse product ID from URL
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id')) || 1;
  const product = products.find(p => p.id === id);

  if (!product) {
    container.innerHTML = `
      <div style="padding: 10rem 2rem; text-align: center;">
        <h2 style="font-family: var(--font-serif); font-size: 2rem; margin-bottom: 1rem;">Product Not Found</h2>
        <a href="index.html" class="btn-primary" style="display: inline-block;">Return to Collection</a>
      </div>
    `;
    return;
  }

  // GA4 tracking for view_item on load of product details page
  window.dataLayer.push({
    event: 'view_item',
    ecommerce: {
      currency: 'USD',
      value: product.price,
      items: [{
        item_id: product.id.toString(),
        item_name: product.name,
        price: product.price,
        item_category: product.category,
        quantity: 1
      }]
    }
  });

  // Inject product details
  const nameEl = $('#p-name');
  const priceEl = $('#p-price');
  const descEl = $('#p-desc');
  const materialEl = $('#p-material');
  const galleryEl = $('#p-gallery');
  const addToCartBtn = $('#p-add-btn');
  const wishlistBtn = $('#p-wishlist-btn');

  if (nameEl) nameEl.textContent = product.name;
  if (priceEl) priceEl.textContent = `$${product.price}`;
  if (descEl) descEl.textContent = product.desc;
  if (materialEl) materialEl.textContent = product.material;
  if (galleryEl) {
    galleryEl.innerHTML = `<img src="${product.img}" alt="${product.name}" class="product-detail-img" loading="eager" />`;
  }
  
  if (addToCartBtn) {
    addToCartBtn.dataset.id = product.id;
    addToCartBtn.dataset.name = product.name;
    addToCartBtn.dataset.price = product.price;
  }

  if (wishlistBtn) {
    wishlistBtn.dataset.id = product.id;
    if (state.wishlist.includes(product.id)) {
      wishlistBtn.classList.add('wishlisted');
    }
  }

  // Sizes selection
  const sizesContainer = $('#p-sizes');
  if (sizesContainer) {
    sizesContainer.innerHTML = product.sizes.map((s, i) => `
      <button class="size-btn${i === 1 ? ' active' : ''}" data-size="${s}">${s}</button>
    `).join('');

    sizesContainer.querySelectorAll('.size-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sizesContainer.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  // Related products (excluding active one)
  const relatedGrid = $('#related-grid');
  if (relatedGrid) {
    const related = products.filter(p => p.id !== product.id);
    relatedGrid.innerHTML = related.map(p => `
      <article class="product-card reveal" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-category="${p.category}" data-analytics-product-id="${p.id}">
        <div class="product-image-wrap">
          <img src="${p.img}" alt="${p.name} — NUE" class="product-img" loading="lazy" />
          <div class="product-overlay">
            <a href="product.html?id=${p.id}" class="quick-view-btn" data-id="${p.id}" aria-label="View ${p.name}">View</a>
          </div>
          <button class="wishlist-btn-card${state.wishlist.includes(p.id) ? ' wishlisted' : ''}" data-id="${p.id}" aria-label="Add to wishlist" title="Add to wishlist">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
        <div class="product-info">
          <a href="product.html?id=${p.id}"><h3 class="product-name">${p.name}</h3></a>
          <p class="product-desc">${p.category}</p>
          <div class="product-footer">
            <span class="product-price">$${p.price}</span>
            <button class="add-to-cart" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" aria-label="Add ${p.name} to cart">Add</button>
          </div>
        </div>
      </article>
    `).join('');
  }
})();

/* ─── Debug helper (dev only) ─────────────────────────────── */
if (window.location.search.includes('debug')) {
  console.log('NUE — Website initialized. State:', state);
}
