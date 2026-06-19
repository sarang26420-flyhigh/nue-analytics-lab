/**
 * NUE — A Quieter Way To Dress
 * Premium Minimal Fashion Website JavaScript
 */

'use strict';

// GTM/GA4 dataLayer Initialization
window.dataLayer = window.dataLayer || [];
function trackGA4Event(eventName, params = {}) {
  if (typeof gtag === 'function') {
    gtag('event', eventName, params);
  }
  window.dataLayer.push({
    event: eventName,
    ...params
  });
}

/* ─── State & Persistence ─────────────────────────────────── */
const state = {
  cart: [],
  wishlist: [],
  lifestyleMode: false,
  currentSlide: 0,
  totalSlides: 4,
};

function saveState() {
  localStorage.setItem('nue_cart', JSON.stringify(state.cart));
  localStorage.setItem('nue_wishlist', JSON.stringify(state.wishlist));
}

function loadState() {
  try {
    const savedCart = localStorage.getItem('nue_cart');
    if (savedCart) state.cart = JSON.parse(savedCart);
    const savedWishlist = localStorage.getItem('nue_wishlist');
    if (savedWishlist) state.wishlist = JSON.parse(savedWishlist);
  } catch (e) {
    console.error('Error loading state from localStorage:', e);
  }
}
loadState();

const products = [
  { 
    id: 1, 
    name: 'The Essential Set', 
    price: 42000, 
    img: 'assets/images/essential_set_new.png', 
    category: 'Dawn Collection', 
    collection: 'Dawn Collection',
    desc: 'A matching set of refined ease, cut from unbleached organic linen for natural texture. A quiet study in silhouette and comfort, designed to drape effortlessly.', 
    sizes: ['XS', 'S', 'M', 'L', 'XL'], 
    material: '100% Organic Linen. Unbleached, undyed. Made in Japan.',
    fabric: '100% Organic Linen. Unbleached, undyed, preserving the raw texture of flax. Made in Japan.',
    lifestyle: 'Ideal for slow morning rituals, quiet reading rooms, and intentional starts to the day.'
  },
  { 
    id: 2, 
    name: 'The Coastal Trouser', 
    price: 28000, 
    img: 'assets/images/yacht.webp', 
    category: 'Coastal Collection', 
    collection: 'Coastal Collection',
    desc: 'Tailored for elegant leisure. A structured yet relaxed trouser cut from breathable linen, perfect for breezy seaside afternoons and coastal travel.', 
    sizes: ['XS', 'S', 'M', 'L', 'XL'], 
    material: '80% Organic Linen, 20% Silk. Dry clean only. Made in Italy.',
    fabric: '80% Organic Linen, 20% Mulberry Silk. Structured yet light. Made in Italy.',
    lifestyle: 'Designed for beachside walks, open-deck voyages, and warm-weather dining.'
  },
  { 
    id: 3, 
    name: 'The Olive Shirt', 
    price: 24500, 
    img: 'assets/images/forest.webp', 
    category: 'Forest Collection', 
    collection: 'Forest Collection',
    desc: 'An earth-toned essential crafted in olive linen. Featuring a relaxed drape, clean minimal stitching, and a silhouette that speaks of organic simplicity.', 
    sizes: ['XS', 'S', 'M', 'L', 'XL'], 
    material: '100% Organic Linen. Hand wash cold. Made in Portugal.',
    fabric: '100% Organic Flax Linen. Eco-certified dyes. Hand wash cold. Made in Portugal.',
    lifestyle: 'Perfect for afternoon strolls in quiet botanical gardens, garden lunches, and forest escapes.'
  },
  { 
    id: 4, 
    name: 'The Linen Shirt', 
    price: 18000, 
    img: 'assets/images/product4.webp', 
    category: 'Dawn Collection', 
    collection: 'Dawn Collection',
    desc: 'The cornerstone of a timeless wardrobe, cut from light ivory linen. Offers a classic collar and a clean, lightweight drape that moves with you.', 
    sizes: ['XS', 'S', 'M', 'L', 'XL'], 
    material: '100% Organic Linen. Machine wash on gentle. Made in Portugal.',
    fabric: '100% Fine Irish Linen. Machine wash on gentle. Made in Portugal.',
    lifestyle: 'A daily uniform piece, suitable from dawn till dusk for standard city days and quiet workspaces.'
  },
  { 
    id: 5, 
    name: 'The Dune Trench', 
    price: 56000, 
    img: 'assets/images/product5.webp', 
    category: 'Forest Collection', 
    collection: 'Forest Collection',
    desc: 'An unstructured trench coat in heavyweight linen, featuring raw edges and a relaxed, draped silhouette. A statement of effortless luxury.', 
    sizes: ['S', 'M', 'L', 'XL'], 
    material: '100% Belgian Linen. Unlined structure. Dry clean only. Made in France.',
    fabric: '100% Heavyweight Belgian Linen. Unlined structure. Dry clean only. Made in France.',
    lifestyle: 'Layered over linen shifts for cool evening walks or crisp autumn afternoons.',
    outOfStock: true 
  },
  { 
    id: 6, 
    name: 'The Linen Slip', 
    price: 22000, 
    img: 'assets/images/product6.webp', 
    category: 'Dawn Collection', 
    collection: 'Dawn Collection',
    desc: 'A fluid silhouette bias-cut from soft, pre-washed linen. Effortless elegance for warm summer evenings, hanging beautifully on the body.', 
    sizes: ['XS', 'S', 'M', 'L'], 
    material: '100% Fine Irish Linen. Adjustable silk straps. Hand wash cold. Made in Japan.',
    fabric: '100% Fine Irish Linen. Adjustable silk straps. Hand wash cold. Made in Japan.',
    lifestyle: 'Designed for intimate gatherings, candlelit dinners, and balmy summer nights.'
  },
  { 
    id: 7, 
    name: 'The Resort Knit', 
    price: 32000, 
    img: 'assets/images/product7.webp', 
    category: 'Coastal Collection', 
    collection: 'Coastal Collection',
    desc: 'A dry-hand open-knit polo crafted from an organic linen-cotton blend. Delivers a highly breathable texture that catches the sea breeze.', 
    sizes: ['S', 'M', 'L', 'XL'], 
    material: '65% Organic Linen, 35% Organic Cotton. Hand wash flat. Made in Italy.',
    fabric: '65% Organic Linen, 35% Organic Cotton. Open stitch. Hand wash flat. Made in Italy.',
    lifestyle: 'A relaxed choice for seaside resort dinners and coastal sunset walks.'
  },
  { 
    id: 8, 
    name: 'The Evening Blazer', 
    price: 48000, 
    img: 'assets/images/product8.webp', 
    category: 'Midnight Collection', 
    collection: 'Midnight Collection',
    desc: 'A double-breasted relaxed blazer cut from a structured linen-wool blend, offering an architectural drape that redefines formal elegance.', 
    sizes: ['S', 'M', 'L', 'XL'], 
    material: '60% Organic Linen, 40% Virgin Wool. Full Bemberg lining. Dry clean. Made in Italy.',
    fabric: '60% Organic Linen, 40% Virgin Wool. Full Bemberg lining. Dry clean. Made in Italy.',
    lifestyle: 'Tailored for private gallery openings, late-night dinners, and evening gatherings.'
  },
  { 
    id: 9, 
    name: 'The Studio Vest', 
    price: 19500, 
    img: 'assets/images/product9.webp', 
    category: 'Forest Collection', 
    collection: 'Forest Collection',
    desc: 'A tailored linen vest with a clean, buttonless front and adjustable back tab. A minimalist layering piece that completes any ensemble.', 
    sizes: ['XS', 'S', 'M', 'L', 'XL'], 
    material: '100% Organic Linen. Mother of pearl hardware on back. Made in Portugal.',
    fabric: '100% Organic Linen. Mother of pearl hardware on back. Made in Portugal.',
    lifestyle: 'Designed for creative studio work, gallery curation, and elegant daytime styling.'
  },
  { 
    id: 10, 
    name: 'The Silk Linen Trouser', 
    price: 34000, 
    img: 'assets/images/product10.webp', 
    category: 'Midnight Collection', 
    collection: 'Midnight Collection',
    desc: 'A wide-leg trouser cut from a premium silk-linen blend, highlighting structural pleats and fluid movement. Exudes an air of quiet sophistication.', 
    sizes: ['XS', 'S', 'M', 'L', 'XL'], 
    material: '55% Silk, 45% Organic Linen. Side seam pockets. Dry clean. Made in Japan.',
    fabric: '55% Silk, 45% Organic Linen. Side seam pockets. Dry clean. Made in Japan.',
    lifestyle: 'Worn at midnight lounges, rooftop gatherings, and quiet evening celebrations.',
    outOfStock: true 
  },
  { 
    id: 11, 
    name: 'The Modern Trench', 
    price: 46000, 
    img: 'assets/images/mens_trench.png', 
    category: 'Midnight Collection', 
    collection: 'Midnight Collection',
    desc: 'A clean, overcoat silhouette tailored from raw linen, featuring structural seam detailing and raw elegance. A protective yet light layer.', 
    sizes: ['S', 'M', 'L', 'XL'], 
    material: '100% Belgian Linen. Unlined structure. Dry clean only. Made in France.',
    fabric: '100% Belgian Linen. Unlined structure. Dry clean only. Made in France.',
    lifestyle: 'Perfect for transitioning from late-night city walks to evening dinners.'
  },
  { 
    id: 12, 
    name: 'The Ivory Resort Shirt', 
    price: 19000, 
    img: 'assets/images/10-Best-White-Outfits-For-Men-in-2022-930x620.jpg.webp', 
    category: 'Coastal Collection', 
    collection: 'Coastal Collection',
    desc: 'Designed for optimal seasonal breathability. A premium loose-draping linen shirt with a modern cuban collar and clean placket.', 
    sizes: ['S', 'M', 'L', 'XL'], 
    material: '100% Fine Flax Linen. Made in Italy.',
    fabric: '100% Fine Flax Linen. Made in Italy.',
    lifestyle: 'Perfect for coastal retreats, boat rides, and daytime sun loungers.'
  },
  { 
    id: 13, 
    name: 'The Classic Knit Polo', 
    price: 22500, 
    img: 'assets/images/James-perce.jpg.webp', 
    category: 'Coastal Collection', 
    collection: 'Coastal Collection',
    desc: 'A lightweight and dry-textured cotton-linen knit polo in neutral slate, designed with a clean placket and structured collar.', 
    sizes: ['S', 'M', 'L', 'XL'], 
    material: '80% Organic Cotton, 20% Linen. Made in Japan.',
    fabric: '80% Organic Cotton, 20% Linen. Made in Japan.',
    lifestyle: 'Perfect for casual resort dressing, yacht cruises, and outdoor dinners.'
  },
  { 
    id: 14, 
    name: 'The Linen Wrap Dress', 
    price: 31000, 
    img: 'assets/images/womens_wrap_dress.png', 
    category: 'Midnight Collection', 
    collection: 'Midnight Collection',
    desc: 'A beautiful wrapped silhouette in structured flax linen, designed to drape naturally around the body for an elegant evening presence.', 
    sizes: ['XS', 'S', 'M', 'L'], 
    material: '100% Organic Linen. Made in Italy.',
    fabric: '100% Organic Linen. Made in Italy.',
    lifestyle: 'Designed for garden soirées, twilight dinner parties, and evening receptions.'
  },
  { 
    id: 15, 
    name: 'The Summer Camisole', 
    price: 14500, 
    img: 'assets/images/womens_camisole.png', 
    category: 'Dawn Collection', 
    collection: 'Dawn Collection',
    desc: 'A delicate, fluid bias-cut top in soft cream linen, highlighting a low cowl back and adjustable straps for a minimalist finish.', 
    sizes: ['XS', 'S', 'M', 'L'], 
    material: '100% Fine Irish Linen. Made in Japan.',
    fabric: '100% Fine Irish Linen. Made in Japan.',
    lifestyle: 'Perfect for warm sunny mornings, patio brunches, and layering under light trenches.'
  },
  { 
    id: 16, 
    name: 'The Organic Tee', 
    price: 9500, 
    img: 'assets/images/essential_tee.png', 
    category: 'Dawn Collection', 
    collection: 'Dawn Collection',
    desc: 'A heavyweight organic cotton tee, cut with a relaxed shoulder and dense, dry texture. A premium upgrade to the basic daily uniform.', 
    sizes: ['XS', 'S', 'M', 'L', 'XL'], 
    material: '100% Heavyweight Organic Cotton. Made in Portugal.',
    fabric: '100% Heavyweight Organic Cotton. Made in Portugal.',
    lifestyle: 'Ideal for everyday comfort, travel, and intentional lounging.'
  },
  { 
    id: 17, 
    name: 'The Linen Scarf', 
    price: 11000, 
    img: 'assets/images/about.webp', 
    category: 'Forest Collection', 
    collection: 'Forest Collection',
    desc: 'A soft, open-weave raw linen scarf finished with clean eyelash fringe, perfect for neutral layering and soft textures.', 
    sizes: ['One Size'], 
    material: '100% Belgian Flax. Raw finish. Made in France.',
    fabric: '100% Belgian Flax. Raw finish. Made in France.',
    lifestyle: 'An accessory for cool garden mornings, travel layering, and transitional seasons.'
  }
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
    followerX += (mouseX - followerX) * 0.32;
    followerY += (mouseY - followerY) * 0.32;

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
  document.addEventListener('mouseup', () => cursor.classList.remove('is-clicking'), { passive: true });
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
  const heroBg = $('#hero-bg');
  const heroContent = $('#hero-content');
  const heroSection = $('#hero');
  if (!heroBg) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroH = heroSection.offsetHeight;
        if (scrollY <= heroH) {
          const progress = scrollY / heroH;
          // Zoom out effect
          const scale = 1.1 - (progress * 0.08);
          heroBg.style.transform = `scale(${Math.max(scale, 1)})`;
          // Fade content upward
          heroContent.style.opacity = 1 - (progress * 2.2);
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
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(8px)`;

      // Move spotlight
      const spotlight = card.querySelector('.essential-spotlight');
      if (spotlight) {
        spotlight.style.left = ((e.clientX - rect.left) / rect.width * 100) + '%';
        spotlight.style.top = ((e.clientY - rect.top) / rect.height * 100) + '%';
      }
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ─── Search ─────────────────────────────────────────────── */
(function initSearch() {
  const btn = $('#search-btn');
  const overlay = $('#search-overlay');
  const close = $('#search-close');
  const input = $('#search-input');
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
      results.innerHTML = '<p style="color:var(--stone);font-size:0.8rem;letter-spacing:0.1em;text-transform:uppercase;">No pieces found in the archive.</p>';
      return;
    }

    matches.forEach(p => {
      const el = document.createElement('div');
      el.style.cssText = 'display:flex;align-items:center;gap:1rem;padding:1rem 0;border-bottom:1px solid var(--border);cursor:pointer;transition:opacity 0.2s;';
      el.innerHTML = `
        <img src="${p.img}" alt="${p.name}" style="width:50px;height:62px;object-fit:cover;flex-shrink:0;"/>
        <div>
          <p style="font-family:var(--font-serif);font-size:1rem;">${p.name}</p>
          <p style="font-size:0.75rem;color:var(--stone);">₹${p.price.toLocaleString('en-IN')} — ${p.category}</p>
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
  const cartBtn = $('#cart-btn');
  const cartSidebar = $('#cart-sidebar');
  const cartOverlay = $('#cart-overlay');
  const cartClose = $('#cart-close');
  const cartItems = $('#cart-items');
  const cartFooter = $('#cart-footer');
  const cartCount = $('#cart-count');
  const cartTotal = $('#cart-total-price');

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
    if (cartCount) {
      cartCount.textContent = count;
      cartCount.classList.toggle('visible', count > 0);
    }
    if (cartTotal) {
      cartTotal.textContent = '₹' + total.toLocaleString('en-IN');
    }

    if (state.cart.length === 0) {
      cartItems.innerHTML = `
        <div class="cart-empty">
          <p>Your selection is empty.</p>
          <span>Begin curating your personal archive.</span>
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
          <div class="cart-item-qty-row">
            <div class="qty-adjuster">
              <button class="qty-btn qty-minus" data-id="${item.id}">−</button>
              <span class="qty-val">${item.qty}</span>
              <button class="qty-btn qty-plus" data-id="${item.id}">+</button>
            </div>
            <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove ${item.name}">Remove</button>
          </div>
          <p class="cart-item-price" style="margin-top:0.4rem;font-size:0.75rem;">₹${(item.price * item.qty).toLocaleString('en-IN')}</p>
        </div>
      </div>
    `).join('');

    // Quantity buttons click bindings
    cartItems.querySelectorAll('.qty-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        const item = state.cart.find(i => i.id === id);
        if (item) {
          if (item.qty > 1) {
            item.qty--;
          } else {
            state.cart = state.cart.filter(i => i.id !== id);
          }
          saveState();
          renderCart();
          if (typeof renderCartPage === 'function' && $('#cart-page-items-container')) {
            renderCartPage();
          }
        }
      });
    });

    cartItems.querySelectorAll('.qty-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        const item = state.cart.find(i => i.id === id);
        if (item) {
          item.qty++;
          saveState();
          renderCart();
          if (typeof renderCartPage === 'function' && $('#cart-page-items-container')) {
            renderCartPage();
          }
        }
      });
    });

    // Remove buttons
    cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        state.cart = state.cart.filter(i => i.id !== id);
        saveState();
        renderCart();
        if (typeof renderCartPage === 'function' && $('#cart-page-items-container')) {
          renderCartPage();
        }
      });
    });
  }

  // Add to cart
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart');
    if (!btn) return;

    const id = parseInt(btn.dataset.id);
    const name = btn.dataset.name;
    const price = parseInt(btn.dataset.price);
    const product = products.find(p => p.id === id);

    const existing = state.cart.find(i => i.id === id);
    if (existing) {
      existing.qty++;
    } else {
      state.cart.push({ id, name, price, qty: 1, img: product?.img || '' });
    }

    saveState();
    renderCart();

    // GA4 eCommerce tracking for add_to_cart
    trackGA4Event('add_to_cart', {
      currency: 'INR',
      value: price,
      items: [{
        item_id: id.toString(),
        item_name: name,
        price: price,
        item_category: product?.category || '',
        quantity: 1
      }]
    });

    // Animate button
    btn.textContent = '✓';
    btn.style.opacity = '0.5';
    setTimeout(() => {
      btn.textContent = btn.classList.contains('p-add-button') ? 'Add to Selection' : 'Add';
      btn.style.opacity = '';
    }, 1400);

    showToast(`${name} added to your selection`);

    // Open cart briefly
    openCart();
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

    saveState();

    // GA4 eCommerce tracking for add_to_wishlist
    window.dataLayer.push({
      event: isAdding ? 'add_to_wishlist' : 'remove_from_wishlist',
      ecommerce: {
        currency: 'INR',
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

  // GA4 eCommerce tracking for view_product
  trackGA4Event('view_product', {
    item_id: product.id.toString(),
    item_name: product.name,
    price: product.price,
    item_category: product.category,
    currency: 'INR'
  });

  const modal = $('#quickview-modal');
  const overlay = $('#modal-overlay');
  const gallery = $('#qv-gallery');
  const details = $('#qv-details');

  gallery.innerHTML = `<img src="${product.img}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;" />`;

  details.innerHTML = `
    <p class="qv-category">${product.category}</p>
    <h3 class="qv-name">${product.name}</h3>
    <p class="qv-price">₹${product.price.toLocaleString('en-IN')}</p>
    <p class="qv-desc">${product.desc}</p>
    <div>
      <p class="qv-label">Select Size</p>
      <div class="qv-sizes">
        ${product.sizes.map((s, i) => `<button class="size-btn${i === 1 ? ' active' : ''}" data-size="${s}">${s}</button>`).join('')}
      </div>
    </div>
    <div>
      <p class="qv-label">Material & Origin</p>
      <p class="qv-material">${product.fabric}</p>
    </div>
    <div style="margin-top: 1rem;">
      <p class="qv-label">Lifestyle</p>
      <p class="qv-material" style="font-style: italic;">${product.lifestyle}</p>
    </div>
    <button class="btn-primary add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" style="margin-top:1.25rem;">
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
  const modal = $('#quickview-modal');
  const overlay = $('#modal-overlay');
  const close = $('#modal-close');

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
  const overlay = $('#lifestyle-mode');
  const exitBtn = $('#lm-exit');
  const prevBtn = $('#lm-prev');
  const nextBtn = $('#lm-next');
  const dots = $$('.lm-dot');
  const slides = $$('.lm-slide');

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
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'Escape') closeMode();
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
  const form = $('#newsletter-form');
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
  const social = $('#social-track');

  const pauseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target.style !== undefined) {
        entry.target.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
      }
    });
  }, { threshold: 0 });

  if (marquee) pauseObserver.observe(marquee);
  if (social) pauseObserver.observe(social);
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
  const collectionEl = $('#p-collection');
  const lifestyleEl = $('#p-lifestyle');

  if (nameEl) nameEl.textContent = product.name;
  if (priceEl) priceEl.textContent = `₹${product.price.toLocaleString('en-IN')}`;
  if (descEl) descEl.textContent = product.desc;
  if (materialEl) materialEl.textContent = product.material;
  if (collectionEl) collectionEl.textContent = product.collection || product.category;
  if (lifestyleEl) lifestyleEl.textContent = product.lifestyle || '';
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
    const related = products
      .filter(p => p.id !== product.id)
      .sort((a, b) => {
        const aMatch = a.category === product.category ? 1 : 0;
        const bMatch = b.category === product.category ? 1 : 0;
        return bMatch - aMatch;
      })
      .slice(0, 3);

    relatedGrid.innerHTML = related.map(p => `
      <article class="product-card reveal" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-category="${p.category}" data-analytics-product-id="${p.id}">
        <div class="product-image-wrap">
          <img src="${p.img}" alt="${p.name} — NUE" class="product-img" loading="lazy" />
          <div class="product-overlay">
            <button class="quick-view-btn" data-id="${p.id}" aria-label="Quick View ${p.name}">Quick View</button>
            <a href="product.html?id=${p.id}" class="view-product-btn" aria-label="View ${p.name} Details">View Product</a>
          </div>
          <button class="wishlist-btn-card${state.wishlist.includes(p.id) ? ' wishlisted' : ''}" data-id="${p.id}" aria-label="Add to wishlist" title="Add to wishlist">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
        <div class="product-info">
          <a href="product.html?id=${p.id}"><h3 class="product-name">${p.name}</h3></a>
          <p class="product-desc">${p.category}</p>
          <div class="product-footer">
            <span class="product-price">₹${p.price.toLocaleString('en-IN')}</span>
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

/* ─── Collection Filtering ────────────────────────────────── */
(function initCollectionFilter() {
  const filterBtns = $$('.col-nav-btn');
  const cards = $$('.collection-grid .product-card');
  if (filterBtns.length === 0 || cards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards
      cards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });

      // Trigger GA4 analytics event for category filtering
      window.dataLayer.push({
        event: 'collection_filter',
        collection_category: filter
      });
    });
  });
})();

/* ─── Phase 3 dedicated Pages Controller ───────────────────── */
(function initPhase3Pages() {
  const cartContainer = $('#cart-page-items-container');
  const checkoutContainer = $('#checkout-container');
  const inquiriesContainer = $('#inquiries-container');

  if (cartContainer) {
    window.renderCartPage = function () {
      const total = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
      if (state.cart.length === 0) {
        cartContainer.innerHTML = `
          <div style="padding: 6rem 2rem; text-align: center; background: var(--beige); border-radius: 1px; margin-top: 2rem;">
            <p style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 1.5rem; color: var(--charcoal);">Your selection is empty.</p>
            <a href="index.html#collection" class="btn-primary" style="display: inline-block; padding: 1rem 2rem; letter-spacing: 0.2em; font-size: 0.72rem; text-transform: uppercase; color: var(--ivory); background: var(--charcoal);">Return to Collection</a>
          </div>
        `;
        return;
      }

      cartContainer.innerHTML = `
        <div class="cart-page-grid">
          <div class="cart-page-items">
            <div class="cart-table-header">
              <span>Garment</span>
              <span style="text-align:center;">Quantity</span>
              <span style="text-align:right; padding-right:1rem;">Subtotal</span>
            </div>
            ${state.cart.map(item => {
        const product = products.find(p => p.id === item.id);
        return `
                <div class="cart-page-item">
                  <div class="cart-page-item-info">
                    <img src="${item.img}" alt="${item.name}" class="cart-page-item-img" />
                    <div class="cart-page-item-meta">
                      <h3 class="item-name">${item.name}</h3>
                      <p class="item-category">${product?.category || ''}</p>
                      <button class="item-remove-link page-item-remove" data-id="${item.id}">Remove</button>
                    </div>
                  </div>
                  <div style="display:flex; justify-content:center;">
                    <div class="qty-adjuster">
                      <button class="qty-btn page-qty-minus" data-id="${item.id}">−</button>
                      <span class="qty-val">${item.qty}</span>
                      <button class="qty-btn page-qty-plus" data-id="${item.id}">+</button>
                    </div>
                  </div>
                  <div class="cart-page-item-price" style="text-align:right; padding-right:1rem;">
                    ₹${(item.price * item.qty).toLocaleString('en-IN')}
                  </div>
                </div>
              `;
      }).join('')}
          </div>

          <div class="order-summary-card">
            <h2 class="summary-title">Order Summary</h2>
            <div class="summary-row">
              <span>Subtotal</span>
              <span>₹${total.toLocaleString('en-IN')}</span>
            </div>
            <div class="summary-row">
              <span>Shipping</span>
              <span>Complimentary</span>
            </div>
            <div class="summary-row">
              <span>Duties & Taxes</span>
              <span>Complimentary</span>
            </div>
            <div class="summary-row total-row">
              <span>Total Request Value</span>
              <span>₹${total.toLocaleString('en-IN')}</span>
            </div>
            <a href="checkout.html" class="btn-primary" style="display:block; text-align:center; padding: 1.1rem 0; letter-spacing: 0.2em; font-size: 0.72rem; text-transform: uppercase; color: var(--ivory); background: var(--charcoal);">Proceed to Checkout</a>
          </div>
        </div>
      `;

      // Bind Page Qty Adjustment buttons
      cartContainer.querySelectorAll('.page-qty-minus').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.dataset.id);
          const item = state.cart.find(i => i.id === id);
          if (item) {
            if (item.qty > 1) {
              item.qty--;
            } else {
              state.cart = state.cart.filter(i => i.id !== id);
            }
            saveState();
            renderCartPage();
            renderCart();
          }
        });
      });

      cartContainer.querySelectorAll('.page-qty-plus').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.dataset.id);
          const item = state.cart.find(i => i.id === id);
          if (item) {
            item.qty++;
            saveState();
            renderCartPage();
            renderCart();
          }
        });
      });

      cartContainer.querySelectorAll('.page-item-remove').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.dataset.id);
          state.cart = state.cart.filter(i => i.id !== id);
          saveState();
          renderCartPage();
          renderCart();
        });
      });
    };
    renderCartPage();
  }

  if (checkoutContainer) {
    const renderCheckoutPage = function () {
      const total = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
      if (state.cart.length === 0) {
        checkoutContainer.innerHTML = `
          <div style="grid-column: 1 / -1; padding: 6rem 2rem; text-align: center; background: var(--beige); border-radius: 1px; width:100%;">
            <p style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 1.5rem; color: var(--charcoal);">Your selection is empty.</p>
            <a href="index.html#collection" class="btn-primary" style="display: inline-block; padding: 1rem 2rem; letter-spacing: 0.2em; font-size: 0.72rem; text-transform: uppercase; color: var(--ivory); background: var(--charcoal);">Return to Collection</a>
          </div>
        `;
        return;
      }

      // Trigger GA4 begin_checkout tracking
      trackGA4Event('begin_checkout', {
        value: total,
        currency: 'INR',
        items: state.cart.map(item => ({
          item_id: item.id.toString(),
          item_name: item.name,
          price: item.price,
          quantity: item.qty
        }))
      });

      checkoutContainer.innerHTML = `
        <div class="checkout-form-wrapper">
          <form class="checkout-form" id="checkout-form-element">
            <div class="form-group">
              <label for="c-name">Full Name</label>
              <input type="text" id="c-name" class="form-input" placeholder="e.g., Alexander Cole" required />
            </div>
            <div class="form-group-row">
              <div class="form-group">
                <label for="c-email">Email Address</label>
                <input type="email" id="c-email" class="form-input" placeholder="e.g., alex@minimal.com" required />
              </div>
              <div class="form-group">
                <label for="c-phone">Phone Number</label>
                <input type="tel" id="c-phone" class="form-input" placeholder="e.g., +91 98765 43210" required />
              </div>
            </div>
            <div class="form-group-row">
              <div class="form-group">
                <label for="c-city">City</label>
                <input type="text" id="c-city" class="form-input" placeholder="e.g., Mumbai" required />
              </div>
              <div class="form-group">
                <label for="c-state">State</label>
                <input type="text" id="c-state" class="form-input" placeholder="e.g., Maharashtra" required />
              </div>
            </div>
            <div class="form-group">
              <label for="c-notes">Notes / Special Requests</label>
              <textarea id="c-notes" class="form-textarea" placeholder="Specify any sizing adjustments, custom tailoring requests, or delivery preferences..."></textarea>
            </div>
            <button type="submit" class="btn-primary full-width" style="padding:1.2rem 0; letter-spacing: 0.25em; text-transform: uppercase; font-size: 0.72rem; color: var(--ivory); background: var(--charcoal); margin-top:1rem; border:none; cursor:pointer;">
              Place Order Request
            </button>
            <div class="cardniti-checkout-link-wrap">
              <a href="https://cardniti.com/" target="_blank" rel="noopener noreferrer" class="cardniti-checkout-link" id="cardniti-checkout-cta">
                Explore our gifting partner:&nbsp;<span class="cardniti-brand">Cardniti</span>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          </form>
        </div>

        <div class="order-summary-card">
          <h2 class="summary-title">Summary</h2>
          <div class="checkout-summary-items">
            ${state.cart.map(item => `
              <div class="checkout-summary-item">
                <span class="checkout-item-name">${item.name} <span class="checkout-item-qty">&times; ${item.qty}</span></span>
                <span class="checkout-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
              </div>
            `).join('')}
          </div>
          <div class="summary-row">
            <span>Subtotal</span>
            <span>₹${total.toLocaleString('en-IN')}</span>
          </div>
          <div class="summary-row">
            <span>Shipping</span>
            <span>Complimentary</span>
          </div>
          <div class="summary-row total-row">
            <span>Total Request Value</span>
            <span>₹${total.toLocaleString('en-IN')}</span>
          </div>
          <div class="partner-interlink">
            <a href="https://cardniti.com" target="_blank" rel="noopener noreferrer">
              Explore our partner experience
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
          <div class="checkout-trust-badges">
            <span class="badge-item"><span class="badge-check">✓</span> Secure Checkout</span>
            <span class="badge-item"><span class="badge-check">✓</span> Premium Linen</span>
            <span class="badge-item"><span class="badge-check">✓</span> Limited Production</span>
            <span class="badge-item"><span class="badge-check">✓</span> Slow Fashion</span>
          </div>
        </div>
      `;

      // Handle checkout submission
      const checkoutForm = $('#checkout-form-element');
      checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const customerName = $('#c-name').value;
        const customerEmail = $('#c-email').value;
        const customerPhone = $('#c-phone').value;
        const customerCity = $('#c-city').value;
        const customerState = $('#c-state').value;
        const customerNotes = $('#c-notes').value || 'None';

        const newInquiry = {
          id: Date.now(),
          date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
          city: customerCity,
          state: customerState,
          notes: customerNotes,
          items: state.cart.map(item => `${item.name} (Qty: ${item.qty}, Price: ₹${item.price.toLocaleString('en-IN')})`).join(', '),
          total: state.cart.reduce((sum, item) => sum + item.price * item.qty, 0)
        };

        // Save to localStorage
        try {
          const savedInquiries = localStorage.getItem('nue_inquiries');
          const inquiriesList = savedInquiries ? JSON.parse(savedInquiries) : [];
          inquiriesList.push(newInquiry);
          localStorage.setItem('nue_inquiries', JSON.stringify(inquiriesList));
          localStorage.setItem('nue_last_inquiry', JSON.stringify(newInquiry));
        } catch (err) {
          console.error('Error saving inquiries:', err);
        }

        // Trigger GA4 submit_inquiry tracking
        trackGA4Event('submit_inquiry', {
          inquiry_id: newInquiry.id,
          customer_city: customerCity,
          customer_state: customerState,
          value: newInquiry.total,
          currency: 'INR',
          items: state.cart.map(item => ({
            item_id: item.id.toString(),
            item_name: item.name,
            price: item.price,
            quantity: item.qty
          }))
        });

        // Trigger GA4 eCommerce purchase tracking log
        trackGA4Event('purchase_request', {
          inquiry_id: newInquiry.id,
          customer_city: customerCity,
          value: newInquiry.total,
          items: state.cart.map(item => ({
            item_name: item.name,
            price: item.price,
            quantity: item.qty
          }))
        });

        // Clear Cart
        state.cart = [];
        saveState();
        renderCart();

        // Redirect
        window.location.href = 'success.html';
      });
    };
    renderCheckoutPage();
  }

  if (inquiriesContainer) {
    const renderInquiriesPage = function () {
      let inquiries = [];
      try {
        const savedInquiries = localStorage.getItem('nue_inquiries');
        if (savedInquiries) inquiries = JSON.parse(savedInquiries);
      } catch (err) {
        console.error('Error parsing inquiries:', err);
      }

      if (inquiries.length === 0) {
        inquiriesContainer.innerHTML = `
          <div class="inquiries-empty-state" style="background:var(--beige); padding:5rem 2rem; text-align:center; border-radius:1px; margin-top:2rem;">
            <p style="font-family:var(--font-serif); font-size:1.3rem; color:var(--stone);">No customer inquiries recorded in the archive yet.</p>
          </div>
        `;
        return;
      }

      inquiriesContainer.innerHTML = `
        <div class="inquiries-meta-row">
          <p style="font-size: 0.85rem; color: var(--stone); letter-spacing:0.05em;">Total Requests Captured: <strong>${inquiries.length}</strong></p>
          <button class="item-remove-link" id="clear-inquiries-btn" style="color: #c94a4a; border-bottom: 1px solid #c94a4a; background:none; border:none; cursor:pointer; font-size: 0.72rem; letter-spacing:0.1em; text-transform:uppercase;">Clear Archive</button>
        </div>
        <div class="inquiries-table-container">
          <table class="inquiries-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer Profile</th>
                <th>Location</th>
                <th>Items Requested</th>
                <th>Special Notes</th>
                <th>Total Value</th>
              </tr>
            </thead>
            <tbody>
              ${inquiries.map(inq => `
                <tr>
                  <td style="white-space:nowrap;">${inq.date}</td>
                  <td>
                    <strong>${inq.name}</strong><br/>
                    <span style="color:var(--stone);font-size:0.75rem;">${inq.email}</span><br/>
                    <span style="color:var(--stone);font-size:0.75rem;">${inq.phone}</span>
                  </td>
                  <td>${inq.city}, ${inq.state}</td>
                  <td>${inq.items}</td>
                  <td><span style="font-style:italic;color:var(--stone);">${inq.notes}</span></td>
                  <td><strong>₹${inq.total.toLocaleString('en-IN')}</strong></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;

      // Clear inquiries logic
      const clearBtn = $('#clear-inquiries-btn');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          if (confirm('Are you sure you want to permanently clear the captured inquiry logs?')) {
            localStorage.removeItem('nue_inquiries');
            renderInquiriesPage();
            showToast('Inquiry logs cleared successfully');
          }
        });
      }
    };
    renderInquiriesPage();
  }
})();

// Render Success Page details
(function initSuccessPage() {
  const successSummary = $('#success-summary');
  if (successSummary) {
    const lastInquiry = localStorage.getItem('nue_last_inquiry');
    if (lastInquiry) {
      try {
        const inq = JSON.parse(lastInquiry);
        successSummary.innerHTML = `
          <div class="success-receipt" style="margin: 2rem 0; border-top: 1px solid var(--border); padding-top: 1.5rem; text-align: left; animation: fade-up 0.5s var(--ease-out);">
            <p style="font-family: var(--font-serif); font-size: 1.1rem; margin-bottom: 1.25rem; text-align: center; color: var(--charcoal); letter-spacing: 0.05em;">Request Details</p>
            <div style="font-size: 0.8rem; line-height: 2; color: var(--text); background: var(--beige); padding: 1.5rem; border-radius: 1px;">
              <p style="margin-bottom: 0.5rem; border-bottom: 1px solid rgba(42,42,42,0.06); padding-bottom: 0.5rem;"><strong>Customer Name:</strong> ${inq.name}</p>
              <p style="margin-bottom: 0.5rem; border-bottom: 1px solid rgba(42,42,42,0.06); padding-bottom: 0.5rem;"><strong>Email:</strong> ${inq.email}</p>
              <p style="margin-bottom: 0.5rem; border-bottom: 1px solid rgba(42,42,42,0.06); padding-bottom: 0.5rem;"><strong>Items:</strong> ${inq.items}</p>
              <p style="margin-top: 0.5rem; font-size: 0.9rem; color: var(--charcoal);"><strong>Total Value:</strong> ₹${inq.total.toLocaleString('en-IN')}</p>
            </div>
          </div>
        `;
      } catch (e) {
        console.error(e);
      }
    }
  }
})();

// Wishlist Page Dynamic Injection
(function initWishlistPage() {
  const wishlistContainer = $('#wishlist-page-container');
  const wishlistCountBadge = $('#wishlist-count');
  
  function updateWishlistBadge() {
    if (wishlistCountBadge) {
      wishlistCountBadge.textContent = state.wishlist.length;
      wishlistCountBadge.classList.toggle('visible', state.wishlist.length > 0);
    }
  }
  
  if (wishlistContainer) {
    window.renderWishlistPage = function () {
      updateWishlistBadge();
      if (state.wishlist.length === 0) {
        wishlistContainer.innerHTML = `
          <div style="padding: 6rem 2rem; text-align: center; background: var(--beige); border-radius: 1px; margin-top: 2rem;">
            <p style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 1.5rem; color: var(--charcoal);">Your wishlist is empty.</p>
            <a href="index.html#collection" class="btn-primary" style="display: inline-block; padding: 1rem 2rem; letter-spacing: 0.2em; font-size: 0.72rem; text-transform: uppercase; color: var(--ivory); background: var(--charcoal);">Return to Collection</a>
          </div>
        `;
        return;
      }

      wishlistContainer.innerHTML = `
        <div class="collection-grid" style="margin-top: 2rem;">
          ${state.wishlist.map(id => {
            const p = products.find(prod => prod.id === id);
            if (!p) return '';
            return `
              <article class="product-card" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-category="${p.category}" data-analytics-product-id="${p.id}">
                <div class="product-image-wrap">
                  <img src="${p.img}" alt="${p.name} — NUE" class="product-img" loading="lazy" />
                  <div class="product-overlay">
                    <button class="quick-view-btn" data-id="${p.id}" aria-label="Quick View ${p.name}">Quick View</button>
                    <a href="product.html?id=${p.id}" class="view-product-btn" aria-label="View ${p.name} Details">View Product</a>
                  </div>
                  <button class="wishlist-btn-card wishlisted" data-id="${p.id}" aria-label="Remove from wishlist" title="Remove from wishlist">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  </button>
                </div>
                <div class="product-info">
                  <a href="product.html?id=${p.id}"><h3 class="product-name">${p.name}</h3></a>
                  <p class="product-desc">${p.category}</p>
                  <div class="product-footer">
                    <span class="product-price">₹${p.price.toLocaleString('en-IN')}</span>
                    <button class="add-to-cart" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" aria-label="Add ${p.name} to cart">Add</button>
                  </div>
                </div>
              </article>
            `;
          }).join('')}
        </div>
      `;
      
      if (typeof initTiltCards === 'function') initTiltCards();
    };

    renderWishlistPage();

    // Listen to changes in wishlist
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.wishlist-btn-card');
      if (btn) {
        setTimeout(() => {
          renderWishlistPage();
        }, 150);
      }
    });
  } else {
    // Just maintain the wishlist badge count on other pages
    updateWishlistBadge();
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.wishlist-btn-card');
      if (btn) {
        setTimeout(() => {
          updateWishlistBadge();
        }, 150);
      }
    });
  }
})();

// Track Cardniti partner click GA4 event
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href*="cardniti.com"]');
  if (link) {
    trackGA4Event('cardniti_click', {
      link_url: link.href,
      page_location: window.location.href
    });
  }
});
