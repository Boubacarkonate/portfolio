/* =========================================================
   ORVELLE — site de démonstration (restaurant fictif)
   ========================================================= */
const CONFIG = {
  // Démonstration : laisse vide. Pour un vrai client, colle ici l'adresse
  // d'un webhook (n8n, Make...) qui reçoit la demande de réservation.
  reservationEndpoint: ''
};

/* Horaires : minutes depuis minuit, par jour (0 = dimanche). */
const OPENING = {
  0: [],
  1: [],
  2: [[720, 870], [1140, 1350]],
  3: [[720, 870], [1140, 1350]],
  4: [[720, 870], [1140, 1350]],
  5: [[720, 870], [1140, 1350]],
  6: [[720, 900], [1140, 1380]]
};
/* Dernière arrivée possible : 45 minutes avant la fermeture. */
const LAST_SEATING = 45;
const DAY_NAMES = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

function parisNow() {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris' }));
}
function toMinutes(d) { return d.getHours() * 60 + d.getMinutes(); }
function formatTime(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${String(m).padStart(2, '0')}` : `${h} h`;
}
function isoDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/* ---------- En-tête ---------- */
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Ouvert ou fermé, maintenant ---------- */
(function openingStatus() {
  const status = document.getElementById('status');
  const text = status?.querySelector('.status-text');
  if (!status || !text) return;

  const now = parisNow();
  const day = now.getDay();
  const minutes = toMinutes(now);

  document.querySelector(`.hours tr[data-day="${day}"]`)?.classList.add('is-today');

  const current = OPENING[day].find(([start, end]) => minutes >= start && minutes < end);
  if (current) {
    text.textContent = `Ouvert maintenant · jusqu'à ${formatTime(current[1])}`;
    return;
  }

  status.classList.add('is-closed');
  const laterToday = OPENING[day].find(([start]) => start > minutes);
  if (laterToday) {
    text.textContent = `Fermé pour le moment · ouvre à ${formatTime(laterToday[0])}`;
    return;
  }
  for (let i = 1; i <= 7; i++) {
    const next = (day + i) % 7;
    if (OPENING[next].length) {
      const when = i === 1 ? 'demain' : DAY_NAMES[next];
      text.textContent = `Fermé pour le moment · ouvre ${when} à ${formatTime(OPENING[next][0][0])}`;
      return;
    }
  }
})();

/* ---------- Carte : onglets et filtres ---------- */
(function menu() {
  const tablist = document.querySelector('.menu-tabs');
  const filters = document.querySelector('.menu-filters');
  const tabs = [...document.querySelectorAll('.menu-tabs [role="tab"]')];
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
  const empty = document.getElementById('menu-empty');
  if (!tablist || !tabs.length) return;

  tablist.hidden = false;
  filters.hidden = false;
  const active = new Set();

  function refreshEmpty() {
    const panel = panels.find(p => !p.hidden);
    const visible = panel ? panel.querySelectorAll('.dish:not([hidden])').length : 1;
    empty.hidden = visible > 0;
  }

  function select(tab, focus = false) {
    tabs.forEach((t, i) => {
      const selected = t === tab;
      t.setAttribute('aria-selected', String(selected));
      t.tabIndex = selected ? 0 : -1;
      panels[i].hidden = !selected;
    });
    if (focus) tab.focus();
    refreshEmpty();
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', e => {
      const keys = { ArrowRight: 1, ArrowLeft: -1, Home: 'first', End: 'last' };
      if (!(e.key in keys)) return;
      e.preventDefault();
      let next;
      if (keys[e.key] === 'first') next = 0;
      else if (keys[e.key] === 'last') next = tabs.length - 1;
      else next = (i + keys[e.key] + tabs.length) % tabs.length;
      select(tabs[next], true);
    });
  });

  document.querySelectorAll('.chip[data-filter]').forEach(chip => {
    chip.addEventListener('click', () => {
      const key = chip.dataset.filter;
      const on = chip.getAttribute('aria-pressed') !== 'true';
      chip.setAttribute('aria-pressed', String(on));
      on ? active.add(key) : active.delete(key);
      document.querySelectorAll('.dish').forEach(dish => {
        const tags = (dish.dataset.tags || '').split(' ');
        dish.hidden = ![...active].every(f => tags.includes(f));
      });
      refreshEmpty();
    });
  });

  select(tabs[0]);
})();

/* ---------- Réservation ---------- */
(function reservation() {
  const form = document.getElementById('resa-form');
  if (!form) return;

  const date = form.querySelector('#r-date');
  const service = form.querySelector('#r-service');
  const time = form.querySelector('#r-time');
  const guests = form.querySelector('#r-guests');
  const guestsNote = document.getElementById('r-guests-note');
  const name = form.querySelector('#r-name');
  const phone = form.querySelector('#r-phone');
  const done = document.getElementById('resa-done');
  const summary = document.getElementById('resa-summary');

  const today = parisNow();
  date.min = isoDate(today);
  const max = new Date(today);
  max.setDate(max.getDate() + 60);
  date.max = isoDate(max);

  function setError(input, message) {
    const error = document.getElementById(`${input.id}-error`);
    if (message) {
      input.setAttribute('aria-invalid', 'true');
      if (error) error.textContent = message;
    } else {
      input.removeAttribute('aria-invalid');
      if (error) error.textContent = '';
    }
  }

  function selectedDay() {
    if (!date.value) return null;
    return new Date(`${date.value}T12:00:00`);
  }

  function dateProblem() {
    const d = selectedDay();
    if (!d) return 'Choisissez une date.';
    if (date.value < date.min) return 'Cette date est déjà passée.';
    if (date.value > date.max) return 'Les réservations sont ouvertes 60 jours à l\'avance.';
    if (!OPENING[d.getDay()].length) return 'Nous sommes fermés le dimanche et le lundi.';
    return '';
  }

  function fillTimes() {
    const previous = time.value;
    time.innerHTML = '';
    const d = selectedDay();
    const problem = dateProblem();

    if (!d || problem) {
      time.add(new Option(d ? 'Aucun créneau ce jour-là' : 'Choisissez d\'abord une date', ''));
      time.disabled = true;
      return;
    }

    const ranges = OPENING[d.getDay()];
    const [start, end] = service.value === 'midi' ? ranges[0] : ranges[1];
    const isToday = date.value === isoDate(parisNow());
    const earliest = isToday ? toMinutes(parisNow()) + 30 : 0;

    for (let m = start; m <= end - LAST_SEATING; m += 15) {
      if (m < earliest) continue;
      const label = `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
      time.add(new Option(formatTime(m), label));
    }

    if (!time.options.length) {
      time.add(new Option('Plus de créneau pour ce service', ''));
      time.disabled = true;
      return;
    }
    time.disabled = false;
    if ([...time.options].some(o => o.value === previous)) time.value = previous;
  }

  date.addEventListener('change', () => {
    setError(date, dateProblem());
    fillTimes();
    setError(time, '');
  });
  service.addEventListener('change', () => { fillTimes(); setError(time, ''); });
  guests.addEventListener('change', () => { guestsNote.hidden = guests.value !== '9+'; });
  [name, phone].forEach(input => input.addEventListener('input', () => {
    if (input.getAttribute('aria-invalid') === 'true') setError(input, '');
  }));

  fillTimes();

  const phonePattern = /^(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const problems = [];

    const dp = dateProblem();
    setError(date, dp);
    if (dp) problems.push(date);

    const tp = !dp && !time.value ? 'Choisissez un horaire.' : '';
    setError(time, tp);
    if (tp) problems.push(time);

    if (guests.value === '9+') {
      guestsNote.hidden = false;
      problems.push(guests);
    }

    const np = name.value.trim().length < 2 ? 'Indiquez votre nom.' : '';
    setError(name, np);
    if (np) problems.push(name);

    const pp = !phonePattern.test(phone.value.trim()) ? 'Indiquez un numéro de téléphone valide.' : '';
    setError(phone, pp);
    if (pp) problems.push(phone);

    if (problems.length) {
      problems[0].focus();
      return;
    }

    const day = selectedDay().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    const people = Number(guests.value);
    const text = `${day.charAt(0).toUpperCase()}${day.slice(1)} · ${time.options[time.selectedIndex].text} · ${people} ${people > 1 ? 'personnes' : 'personne'}`;

    if (CONFIG.reservationEndpoint) {
      try {
        await fetch(CONFIG.reservationEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(form)))
        });
      } catch (err) { /* démonstration : on affiche quand même le récapitulatif */ }
    }

    summary.textContent = text;
    form.hidden = true;
    done.hidden = false;
    done.focus();
  });

  document.getElementById('resa-again')?.addEventListener('click', () => {
    form.reset();
    guestsNote.hidden = true;
    fillTimes();
    done.hidden = true;
    form.hidden = false;
    date.focus();
  });
})();
