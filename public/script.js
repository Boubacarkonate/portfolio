/* =========================================================
   CONFIGURATION
   ========================================================= */
const CONFIG = {
  // Adresse qui reçoit les demandes (à remplacer par ton adresse pro).
  email: 'boubacar.konate@outlook.fr',
  // Laisse vide : le formulaire ouvre la messagerie du visiteur avec le message prêt.
  // Pour recevoir les demandes directement, crée un formulaire gratuit
  // (Formspree, Web3Forms...) et colle ici son adresse d'envoi.
  formEndpoint: ''
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* =========================================================
   ANNÉE COURANTE
   ========================================================= */
document.querySelectorAll('.js-year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

/* =========================================================
   EN-TÊTE AU DÉFILEMENT
   ========================================================= */
const header = document.getElementById('navbar');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* =========================================================
   MENU MOBILE
   ========================================================= */
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawer-overlay');
const drawerClose = document.getElementById('drawer-close');
const pageRegions = [document.getElementById('navbar'), document.getElementById('main'), document.querySelector('.site-footer')]
  .filter(Boolean);

function setPageInert(isInert) {
  pageRegions.forEach(region => { region.inert = isInert; });
}

function openMenu() {
  drawer.classList.add('open');
  drawerOverlay.classList.add('open');
  burger.setAttribute('aria-expanded', 'true');
  drawer.inert = false;
  setPageInert(true);
  document.body.style.overflow = 'hidden';
  drawerClose.focus();
}

function closeMenu({ restoreFocus = true } = {}) {
  drawer.classList.remove('open');
  drawerOverlay.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  drawer.inert = true;
  setPageInert(false);
  document.body.style.overflow = '';
  if (restoreFocus) burger.focus();
}

if (burger && drawer && drawerOverlay && drawerClose) {
  burger.addEventListener('click', openMenu);
  drawerClose.addEventListener('click', () => closeMenu());
  drawerOverlay.addEventListener('click', () => closeMenu());
  drawer.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => closeMenu({ restoreFocus: false }));
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeMenu();
  });
  // Même point de rupture que le CSS (53.75em) : on ferme le menu si l'écran s'élargit.
  window.matchMedia('(min-width: 53.8125em)').addEventListener('change', e => {
    if (e.matches && drawer.classList.contains('open')) closeMenu({ restoreFocus: false });
  });
}

/* =========================================================
   APPARITION AU DÉFILEMENT
   ========================================================= */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const siblings = [...entry.target.parentElement.querySelectorAll(':scope > .reveal:not(.visible)')];
        const delay = Math.max(0, siblings.indexOf(entry.target)) * 90;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0% 0% -8% 0%' }
  );
  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

/* =========================================================
   LIEN ACTIF DANS LA NAVIGATION
   ========================================================= */
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
if (navLinks.length && 'IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      });
    },
    { rootMargin: '-45% 0% -50% 0%' }
  );
  document.querySelectorAll('main section[id]').forEach(s => sectionObserver.observe(s));
}

/* =========================================================
   TRADUCTION FR / EN
   Le français est lu dans la page ; l'anglais vient de translations.js.
   data-i18n          -> texte
   data-i18n-html     -> texte avec balises simples (<em>)
   data-i18n-placeholder / -alt / -aria-label -> attributs
   ========================================================= */
const I18N = window.TRANSLATIONS || { fr: {}, en: {} };
let currentLang = 'fr';

const ATTRS = [
  ['i18nPlaceholder', 'placeholder'],
  ['i18nAlt', 'alt'],
  ['i18nAriaLabel', 'aria-label']
];

const frText = new Map();
const frHtml = new Map();
const frAttr = new Map();
const frMeta = {
  title: document.title,
  description: document.querySelector('meta[name="description"]')?.content || ''
};

document.querySelectorAll('[data-i18n]').forEach(el => {
  frText.set(el, el.textContent.trim().replace(/\s+/g, ' '));
});
document.querySelectorAll('[data-i18n-html]').forEach(el => {
  frHtml.set(el, el.innerHTML.trim().replace(/\s+/g, ' '));
});
ATTRS.forEach(([dataKey, attr]) => {
  document.querySelectorAll(`[data-${dataKey.replace(/[A-Z]/g, c => `-${c.toLowerCase()}`)}]`).forEach(el => {
    if (!frAttr.has(el)) frAttr.set(el, {});
    frAttr.get(el)[attr] = el.getAttribute(attr) || '';
  });
});

function t(key, vars = {}) {
  const text = I18N[currentLang]?.[key] ?? I18N.fr?.[key] ?? key;
  return text.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? '');
}

function applyLanguage(lang) {
  const dict = lang === 'en' ? (I18N.en || {}) : null;
  currentLang = dict ? 'en' : 'fr';

  frText.forEach((original, el) => {
    el.textContent = dict?.[el.dataset.i18n] ?? original;
  });
  frHtml.forEach((original, el) => {
    el.innerHTML = dict?.[el.dataset.i18nHtml] ?? original;
  });
  frAttr.forEach((originals, el) => {
    ATTRS.forEach(([dataKey, attr]) => {
      const key = el.dataset[dataKey];
      if (key) el.setAttribute(attr, dict?.[key] ?? originals[attr]);
    });
  });

  document.documentElement.lang = currentLang;
  const titleKey = document.documentElement.dataset.i18nTitle || 'meta.title';
  const descKey = document.documentElement.dataset.i18nDesc || 'meta.description';
  document.title = dict?.[titleKey] ?? frMeta.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = dict?.[descKey] ?? frMeta.description;

  ['fr', 'en'].forEach(code => {
    const btn = document.getElementById(`${code}-btn`);
    if (!btn) return;
    btn.classList.toggle('active', code === currentLang);
    btn.setAttribute('aria-pressed', String(code === currentLang));
  });

  try { localStorage.setItem('lang', currentLang); } catch (e) { /* stockage indisponible */ }
}

document.getElementById('fr-btn')?.addEventListener('click', () => applyLanguage('fr'));
document.getElementById('en-btn')?.addEventListener('click', () => applyLanguage('en'));

try {
  if (localStorage.getItem('lang') === 'en' && document.getElementById('en-btn')) applyLanguage('en');
} catch (e) { /* stockage indisponible */ }

/* =========================================================
   FORMULAIRE DE CONTACT
   ========================================================= */
const serviceSelect = document.getElementById('cf-service');
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    if (serviceSelect) serviceSelect.value = link.dataset.service;
  });
});

(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('cf-status');
  const submitBtn = form.querySelector('button[type="submit"]');
  const fields = {
    name: form.querySelector('#cf-name'),
    email: form.querySelector('#cf-email'),
    message: form.querySelector('#cf-message')
  };

  const rules = {
    name: v => v.trim().length >= 2 || 'form.err.name',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'form.err.email',
    message: v => v.trim().length >= 15 || 'form.err.message'
  };

  function showError(name, key) {
    const input = fields[name];
    const error = document.getElementById(`cf-${name}-error`);
    if (key) {
      input.setAttribute('aria-invalid', 'true');
      error.textContent = t(key);
    } else {
      input.removeAttribute('aria-invalid');
      error.textContent = '';
    }
  }

  function validate() {
    let firstInvalid = null;
    Object.keys(rules).forEach(name => {
      const result = rules[name](fields[name].value);
      const key = result === true ? null : result;
      showError(name, key);
      if (key && !firstInvalid) firstInvalid = fields[name];
    });
    return firstInvalid;
  }

  Object.keys(fields).forEach(name => {
    fields[name].addEventListener('input', () => {
      if (fields[name].getAttribute('aria-invalid') === 'true' && rules[name](fields[name].value) === true) {
        showError(name, null);
      }
    });
  });

  function setStatus(message, type) {
    status.className = `form-status${type ? ` is-${type}` : ''}`;
    status.textContent = message;
  }

  function optionLabel(select) {
    return select?.options[select.selectedIndex]?.textContent.trim() || '';
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    setStatus('', null);

    const firstInvalid = validate();
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // Champ piège anti-robots : rempli = envoi ignoré.
    if (form.querySelector('#cf-gotcha')?.value) {
      setStatus(t('form.success'), 'success');
      form.reset();
      return;
    }

    const service = optionLabel(serviceSelect);
    const budget = optionLabel(document.getElementById('cf-budget'));

    if (CONFIG.formEndpoint) {
      submitBtn.disabled = true;
      setStatus(t('form.sending'), null);
      try {
        const data = new FormData(form);
        data.set('service', service);
        data.set('budget', budget);
        // Codes stables et langue, utiles au workflow n8n (voir demos/automatisation).
        data.set('service_id', serviceSelect.value);
        data.set('budget_id', document.getElementById('cf-budget').value);
        data.set('lang', document.documentElement.lang === 'en' ? 'en' : 'fr');
        const res = await fetch(CONFIG.formEndpoint, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        form.reset();
        setStatus(t('form.success'), 'success');
      } catch (err) {
        setStatus(t('form.error', { email: CONFIG.email }), 'error');
      } finally {
        submitBtn.disabled = false;
      }
      return;
    }

    const subject = `${t('form.mailSubject')} : ${service}`;
    const body = [
      `${t('form.name')} : ${fields.name.value.trim()}`,
      `${t('form.email')} : ${fields.email.value.trim()}`,
      `${t('form.service')} : ${service}`,
      `${t('form.budget')} : ${budget}`,
      '',
      fields.message.value.trim()
    ].join('\n');

    window.location.href =
      `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus(t('form.mailto', { email: CONFIG.email }), 'success');
  });
})();
