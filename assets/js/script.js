document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. PAGE LOADER
  // ============================================================
  const loader = document.querySelector('.loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 600);
      
    });
  }

  // ============================================================
  // 2. NAV SCROLL STATE
  // ============================================================
  const nav = document.querySelector('nav');

  const updateNav = () => {
    if (window.scrollY > 60) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // mark active link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPage) link.classList.add('active');
  });

  // HAMBURGER MENU
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
});
  // ============================================================
  // 3. SCROLL REVEAL
  // ============================================================
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));

  // ============================================================
  // 4. HERO SLIDESHOW
  // ============================================================
  const slides = document.querySelectorAll('.hero-slide');

  if (slides.length > 1) {
    let current = 0;

    setInterval(() => {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 6000);
  }

// ============================================================
// 6. GALLERY FILTER
// ============================================================
const filterBtns = document.querySelectorAll('.filter-btn');
const masonryItems = document.querySelectorAll('.masonry-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    document.querySelector('.gallery-empty')?.remove();

    masonryItems.forEach(item => {
      const show = filter === 'all' || item.dataset.category === filter;
      item.style.display = show ? 'block' : 'none';
    });

    if (filter !== 'all') {
      const anyVisible = [...masonryItems].some(item => item.dataset.category === filter);
      if (!anyVisible) {
        const msg = document.createElement('p');
        msg.className = 'gallery-empty';
        msg.textContent = 'Nothing yet — be the first!';
        document.querySelector('.gallery-masonry').appendChild(msg);
      }
    }
  });
});

// auto-filter from URL param
const params = new URLSearchParams(window.location.search);
const preFilter = params.get('filter');
if (preFilter) {
  const btn = document.querySelector(`.filter-btn[data-filter="${preFilter}"]`);
  if (btn) btn.click();
}


  // ============================================================
  // 7. LIGHTBOX
  // ============================================================
  const lightbox    = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (lightbox && lightboxImg) {
    document.querySelectorAll('.masonry-item img').forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };

    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
  }

  // ============================================================
// 8. PAGE TRANSITIONS
// ============================================================
const overlay = document.querySelector('.page-transition');

if (overlay) {
  overlay.classList.add('exiting');
  setTimeout(() => overlay.classList.remove('exiting'), 700);

  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      overlay.classList.remove('entering');
      overlay.classList.remove('exiting');
    }
  });

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    const isInternal = href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto');

    if (isInternal) {
      link.addEventListener('click', e => {
        e.preventDefault();
        overlay.classList.add('entering');
        setTimeout(() => { window.location.href = href; }, 600);
      });
    }
  });
}
});