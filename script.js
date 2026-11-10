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
    heroLead: 'Software Engineering student. I design and build complete systems: the API, the web app and the mobile app.',
    ctaProjects: 'View projects',
    ctaContact: 'Email me',
    nodeMobile: 'Mobile app',
    nodeS3Tech: 'Files',
    nodeDbTech: 'Data',
    nodePushTech: 'Alerts',
    diagramCaption: 'The real architecture of VetCare. Tap each piece to see how it is built.',
    aboutTitle: 'About me',
    aboutBody: 'I am a Software Engineering student and I learn by building complete projects, from the domain model to deployment: APIs in FastAPI, web apps in React and Vue, and mobile apps with Expo and Kotlin.',
    aboutLink: 'View my LinkedIn',
    buildTitle: 'What I build',
    buildApi: 'FastAPI with hexagonal architecture and DDD.',
    buildWeb: 'Admin panels in React and Vue.',
    buildMobileTitle: 'Mobile',
    buildMobile: 'Client apps with Expo and Kotlin.',
    projectsTitle: 'Projects',
    vetThumb: 'Illustration: the schedule in the VetCare admin web app and the mobile app',
    vetLead: 'A platform for a veterinary clinic: an admin web app for the staff and a mobile app for pet owners, both connected to one shared API.',
    vetBody: 'The API is a modular monolith with hexagonal architecture. The web and mobile apps use TypeScript types generated from the OpenAPI contract, and CI blocks merging an API change without updating them.',
    vetStatus: 'v0.1.0: authentication, roles and permissions working across API, web and mobile.',
    vetLink: 'View VetCare on GitHub',
    landhaThumb: 'Illustration: the LandhaApp web panel',
    landhaBody: 'A web application organized by domain contexts: a FastAPI API with SQLAlchemy, Alembic and JWT authentication, and a Vue 3 frontend with Pinia and Vue Router.',
    landhaLink: 'View LandhaApp on GitHub',
    furnitureThumb: 'Illustration: the furniture store sales dashboard',
    furnitureTitle: 'Furniture store admin',
    furnitureBody: 'An admin dashboard to manage products, orders and sales for a furniture accessories store.',
    chipProducts: 'Products',
    chipOrders: 'Orders',
    chipSales: 'Sales',
    furnitureLink: 'View the dashboard on GitHub',
    stackTitle: 'What I work with',
    stackIntro: 'Everything listed here is in use in one of my repositories.',
    stackMobile: 'Mobile',
    stackPractices: 'Architecture & delivery',
    stackHex: 'Hexagonal architecture',
    contactTitle: 'Let’s talk',
    contactLead: 'I am looking for internships and projects where I can keep learning. Reach me through any of these.',
    contactCta: 'Send an email'
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

  function all(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector));
  }

  /* Language */
  var lang = 'es';
  var selected = 'api';
  var es = {};
  var textEls = all('[data-i18n]');
  var attrEls = all('[data-i18n-attr]');
  var switchEl = document.getElementById('lang-switch');
  var descEl = document.querySelector('meta[name="description"]');

  textEls.forEach(function (el) { es[el.dataset.i18n] = el.textContent; });
  attrEls.forEach(function (el) {
    var pair = el.dataset.i18nAttr.split(':');
    es[pair[1]] = el.getAttribute(pair[0]);
  });

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

  function applyLang(next) {
    lang = next;
    var dict = lang === 'en' ? en : es;
    document.documentElement.lang = lang;
    textEls.forEach(function (el) {
      var value = dict[el.dataset.i18n];
      if (value != null) el.textContent = value;
    });
    attrEls.forEach(function (el) {
      var pair = el.dataset.i18nAttr.split(':');
      if (dict[pair[1]] != null) el.setAttribute(pair[0], dict[pair[1]]);
    });
    document.title = meta[lang].title;
    if (descEl) descEl.setAttribute('content', meta[lang].description);
    switchEl.textContent = meta[lang].switchText;
    switchEl.lang = meta[lang].switchLang;
    switchEl.hreflang = meta[lang].switchLang;
    switchEl.setAttribute('href', '?lang=' + meta[lang].switchLang);
    renderDetail();
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

  applyLang(initialLang());
  selectNode(selected);

  /* Scroll motion */
  var reduceMotion = !document.documentElement.classList.contains('motion');
  var revealEls = all('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
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

  if (reduceMotion) return;

  // Each [data-speed] element drifts relative to its (static) parent as the page scrolls.
  var movers = all('[data-speed]').map(function (el) {
    return {
      el: el,
      anchor: el.parentElement,
      speed: parseFloat(el.dataset.speed),
      rotate: parseFloat(el.dataset.rotate || '0')
    };
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
      var transform = 'translate3d(0,' + (offset * m.speed).toFixed(1) + 'px,0)';
      if (m.rotate) transform += ' rotate(' + (scrolled * m.rotate).toFixed(2) + 'deg)';
      m.el.style.transform = transform;
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
