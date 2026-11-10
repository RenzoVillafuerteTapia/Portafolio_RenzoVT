(function () {
  'use strict';

  // English strings. Spanish is the markup itself and is read from the DOM on load.
  var en = {
    skip: 'Skip to content',
    navLabel: 'Main',
    navAbout: 'About',
    navProjects: 'Projects',
    navStack: 'Stack',
    navContact: 'Contact',
    heroTitle: 'Hi, I’m Renzo. I build complete systems.',
    heroLead: 'Software Engineering student. APIs in FastAPI, web apps in React and Vue, and mobile apps with Expo and Kotlin.',
    ctaProjects: 'View projects',
    heroNote: 'Or write to me at',
    marqueePause: 'Pause the motion',
    marqueePlay: 'Resume the motion',
    statsTitle: 'Projects thought through end to end, from the domain model to deployment',
    stat1: 'Routes in the VetCare API',
    stat2: 'Documented architecture decisions',
    stat3: 'Languages across my repositories',
    buildApi: 'FastAPI with hexagonal architecture and DDD, Alembic migrations and an OpenAPI contract.',
    buildWeb: 'Admin panels in React and Vue, with types generated from the API.',
    buildMobileTitle: 'Mobile',
    buildMobile: 'Client apps with Expo and React Native, and native projects in Kotlin.',
    photoAlt: 'Photo of Renzo Villafuerte Tapia',
    aboutTitle: 'About me',
    aboutBody: 'I’m Renzo Villafuerte Tapia, a Software Engineering student. I learn by building complete projects, from the domain model to deployment: APIs in FastAPI, web apps in React and Vue, and mobile apps with Expo and Kotlin.',
    aboutLink: 'View my LinkedIn',
    projectsTitle: 'Projects that show how I work',
    vetCard: 'A platform for a veterinary clinic: admin web app, mobile app and one shared API.',
    vetThumb: 'Screenshot of the VetCare home panel',
    vetLink: 'View VetCare on GitHub',
    landhaCard: 'A web app organized by domain contexts: FastAPI with JWT and a Vue 3 frontend with Pinia.',
    landhaThumb: 'Illustration of the LandhaApp web panel',
    landhaLink: 'View LandhaApp on GitHub',
    furnitureTitle: 'Furniture store admin',
    furnitureCard: 'A dashboard to manage products, orders and sales for an accessories store.',
    furnitureThumb: 'Illustration of the sales dashboard',
    furnitureLink: 'View the dashboard on GitHub',
    loginCard: 'Staff access: sign-in, account activation and invitations by role.',
    shotLoginAlt: 'Screenshot of the VetCare sign-in page',
    loginLink: 'See how VetCare is built',
    githubCard: 'The rest of my public repositories, with their code and history.',
    githubLink: 'View my GitHub profile',
    railPrev: 'Previous project',
    railNext: 'Next project',
    insideTitle: 'Inside VetCare',
    vetBody: 'The API is a modular monolith with hexagonal architecture. The web and mobile apps use TypeScript types generated from the OpenAPI contract, and CI blocks merging an API change without updating them.',
    vetStatus: 'v0.1.0: authentication, roles and permissions working across API, web and mobile.',
    nodeMobile: 'Mobile app',
    nodeS3Tech: 'Files',
    nodeDbTech: 'Data',
    nodePushTech: 'Alerts',
    diagramCaption: 'The real architecture of VetCare. Tap each piece to see how it is built.',
    stackTitle: 'What I work with',
    stackIntro: 'Everything listed here is in use in one of my repositories.',
    stackMobile: 'Mobile',
    stackPractices: 'Architecture & delivery',
    stackHex: 'Hexagonal architecture',
    contactTitle: 'Write to me and let’s talk',
    contactCta: 'Send an email',
    contactLead: 'I’m looking for internships and projects where I can keep learning.',
    footerTagline: 'From the API to the mobile app',
    footerSections: 'Sections'
  };

  var meta = {
    es: {
      title: 'Renzo Villafuerte Tapia | Portafolio',
      description: 'Portafolio de Renzo Villafuerte Tapia, estudiante de Ingeniería de Software. APIs, aplicaciones web y móviles con arquitectura hexagonal y DDD.',
      switchText: 'English', switchLang: 'en'
    },
    en: {
      title: 'Renzo Villafuerte Tapia | Portfolio',
      description: 'Portfolio of Renzo Villafuerte Tapia, Software Engineering student. APIs, web and mobile apps built with hexagonal architecture and DDD.',
      switchText: 'Español', switchLang: 'es'
    }
  };

  var nodes = {
    web: {
      es: ['Web de administración', 'React, TypeScript, Vite, TanStack Query y Tailwind con shadcn/ui. La usa el personal de la clínica: recepción, veterinarios y administración.'],
      en: ['Admin web app', 'React, TypeScript, Vite, TanStack Query and Tailwind with shadcn/ui. Used by the clinic staff: reception, vets and administration.']
    },
    mobile: {
      es: ['App de clientes', 'React Native con Expo y Expo Router. Para los dueños de las mascotas, con la sesión guardada en SecureStore. Habla con la API por JSON y SSE.'],
      en: ['Client app', 'React Native with Expo and Expo Router. For pet owners, with the session kept in SecureStore. Talks to the API over JSON and SSE.']
    },
    api: {
      es: ['API', 'Python 3.12, FastAPI, SQLAlchemy 2.0, Alembic y Pydantic v2. Un monolito modular con arquitectura hexagonal por bounded context.'],
      en: ['API', 'Python 3.12, FastAPI, SQLAlchemy 2.0, Alembic and Pydantic v2. A modular monolith with hexagonal architecture per bounded context.']
    },
    worker: {
      es: ['Worker', 'Procesa el outbox transaccional y los recordatorios, y envía las notificaciones push sin bloquear a la API.'],
      en: ['Worker', 'Processes the transactional outbox and reminders, and sends push notifications without blocking the API.']
    },
    s3: {
      es: ['S3 privado', 'Almacenamiento privado de archivos en AWS. Solo la API tiene acceso.'],
      en: ['Private S3', 'Private file storage on AWS. Only the API has access.']
    },
    db: {
      es: ['MySQL 8', 'La base de datos principal, con migraciones en Alembic. La comparten la API y el worker.'],
      en: ['MySQL 8', 'The main database, with Alembic migrations. Shared by the API and the worker.']
    },
    push: {
      es: ['Expo Push', 'El servicio que entrega las notificaciones a los teléfonos de los clientes.'],
      en: ['Expo Push', 'The service that delivers notifications to the clients’ phones.']
    }
  };

  function all(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  /* Language */
  var lang = 'es';
  var selected = 'api';
  var es = { marqueePlay: 'Reanudar el movimiento' };
  var textEls = all('[data-i18n]');
  var attrEls = all('[data-i18n-attr]');
  var switchEl = document.getElementById('lang-switch');
  var descEl = document.querySelector('meta[name="description"]');
  var marquee = document.getElementById('marquee');
  var marqueeToggle = document.getElementById('marquee-toggle');

  textEls.forEach(function (el) { es[el.dataset.i18n] = el.textContent; });
  attrEls.forEach(function (el) {
    var pair = el.dataset.i18nAttr.split(':');
    es[pair[1]] = el.getAttribute(pair[0]);
  });

  function dict() { return lang === 'en' ? en : es; }

  function stored() {
    try { return localStorage.getItem('lang'); } catch (e) { return null; }
  }

  function initialLang() {
    var param = new URLSearchParams(location.search).get('lang');
    if (param === 'es' || param === 'en') return param;
    var saved = stored();
    if (saved === 'es' || saved === 'en') return saved;
    var prefs = navigator.languages || [navigator.language || 'es'];
    for (var i = 0; i < prefs.length; i++) {
      var code = String(prefs[i]).slice(0, 2).toLowerCase();
      if (code === 'es' || code === 'en') return code;
    }
    return 'en';
  }

  function renderDetail() {
    var copy = nodes[selected][lang];
    document.getElementById('detail-title').textContent = copy[0];
    document.getElementById('detail-text').textContent = copy[1];
  }

  function renderMarqueeToggle() {
    var paused = marquee.classList.contains('is-paused');
    marqueeToggle.textContent = dict()[paused ? 'marqueePlay' : 'marqueePause'];
    marqueeToggle.setAttribute('aria-pressed', String(paused));
  }

  function applyLang(next) {
    lang = next;
    var d = dict();
    document.documentElement.lang = lang;
    textEls.forEach(function (el) {
      var value = d[el.dataset.i18n];
      if (value != null) el.textContent = value;
    });
    attrEls.forEach(function (el) {
      var pair = el.dataset.i18nAttr.split(':');
      if (d[pair[1]] != null) el.setAttribute(pair[0], d[pair[1]]);
    });
    document.title = meta[lang].title;
    if (descEl) descEl.setAttribute('content', meta[lang].description);
    switchEl.textContent = meta[lang].switchText;
    switchEl.lang = meta[lang].switchLang;
    switchEl.hreflang = meta[lang].switchLang;
    switchEl.setAttribute('href', '?lang=' + meta[lang].switchLang);
    renderDetail();
    renderMarqueeToggle();
  }

  switchEl.addEventListener('click', function (event) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    var next = meta[lang].switchLang;
    try { localStorage.setItem('lang', next); } catch (e) { /* storage unavailable */ }
    var url = new URL(location.href);
    url.searchParams.set('lang', next);
    history.replaceState(null, '', url);
    applyLang(next);
  });

  /* Architecture diagram */
  var nodeEls = all('.node');
  var linkEls = all('.edges line').concat(all('.dot'));

  function selectNode(id) {
    selected = id;
    nodeEls.forEach(function (el) {
      el.setAttribute('aria-pressed', String(el.dataset.node === id));
    });
    linkEls.forEach(function (el) {
      el.classList.toggle('is-active', el.dataset.from === id || el.dataset.to === id);
    });
    renderDetail();
  }

  nodeEls.forEach(function (el) {
    el.addEventListener('click', function () { selectNode(el.dataset.node); });
  });

  /* Marquee: duplicate each row once so the loop is seamless, and allow pausing. */
  var motion = document.documentElement.classList.contains('motion');
  if (motion) {
    all('.marquee-track').forEach(function (track) {
      all('li', track).forEach(function (item) { track.appendChild(item.cloneNode(true)); });
    });
  }
  marqueeToggle.addEventListener('click', function () {
    marquee.classList.toggle('is-paused');
    renderMarqueeToggle();
  });

  applyLang(initialLang());
  selectNode(selected);

  /* Projects rail */
  var rail = document.getElementById('rail');
  var cards = all('.pcard', rail);
  var dotsBox = document.getElementById('rail-dots');
  var prev = document.getElementById('rail-prev');
  var next = document.getElementById('rail-next');
  var dots = cards.map(function () {
    var dot = document.createElement('span');
    dotsBox.appendChild(dot);
    return dot;
  });

  function railStep() {
    return cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : rail.clientWidth;
  }

  function syncRail() {
    var max = rail.scrollWidth - rail.clientWidth;
    var index = Math.round(rail.scrollLeft / railStep());
    if (rail.scrollLeft >= max - 2) index = cards.length - 1;
    dots.forEach(function (dot, i) { dot.classList.toggle('is-current', i === index); });
    prev.disabled = rail.scrollLeft <= 2;
    next.disabled = rail.scrollLeft >= max - 2;
  }

  function moveRail(direction) {
    rail.scrollBy({ left: direction * railStep(), behavior: motion ? 'smooth' : 'auto' });
  }

  prev.addEventListener('click', function () { moveRail(-1); });
  next.addEventListener('click', function () { moveRail(1); });
  rail.addEventListener('scroll', function () { window.requestAnimationFrame(syncRail); }, { passive: true });
  window.addEventListener('resize', syncRail);
  syncRail();

  /* Scroll motion */
  var revealEls = all('.reveal');

  if (!motion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  if (!motion) return;

  // [data-speed] drifts vertically against its static parent; [data-shift] slides sideways with the page.
  var movers = all('[data-speed]').map(function (el) {
    return { el: el, anchor: el.parentElement, speed: parseFloat(el.dataset.speed) };
  });
  var shifters = all('[data-shift]').map(function (el) {
    return { el: el, anchor: el.parentElement, shift: parseFloat(el.dataset.shift) };
  });
  var progress = document.getElementById('progress');
  var ticking = false;

  function update() {
    ticking = false;
    var viewport = window.innerHeight;
    var scrolled = window.scrollY;
    var max = document.documentElement.scrollHeight - viewport;
    var rects = movers.map(function (m) { return m.anchor.getBoundingClientRect(); });

    movers.forEach(function (m, i) {
      var rect = rects[i];
      if (rect.bottom < -300 || rect.top > viewport + 300) return;
      var offset = rect.top + rect.height / 2 - viewport / 2;
      m.el.style.transform = 'translate3d(0,' + (offset * m.speed).toFixed(1) + 'px,0)';
    });
    var shiftRects = shifters.map(function (s) { return s.anchor.getBoundingClientRect(); });
    shifters.forEach(function (s, i) {
      var rect = shiftRects[i];
      if (rect.bottom < -300 || rect.top > viewport + 300) return;
      s.el.style.transform = 'translate3d(' + ((viewport - rect.top) * s.shift * -1).toFixed(1) + 'px,0,0)';
    });
    if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(scrolled / max, 1) : 0) + ')';
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  update();
})();
