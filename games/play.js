/* Wavelength Psychology games: shared kit.
   The buddy, icons, sound, and small bits of motion every game uses.
   Privacy: nothing here stores, sends, or tracks anything. */
(function () {
  var d = document, W = window, P = {};
  P.reduced = !!(W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches);
  P.$ = function (id) { return d.getElementById(id); };
  P.all = function (sel, root) { return [].slice.call((root || d).querySelectorAll(sel)); };

  /* ---------- sound: a tiny synth, no audio files ---------- */
  var ac = null; P.sound = true;
  function ctx() {
    var A = W.AudioContext || W.webkitAudioContext; if (!A) return null;
    if (!ac) ac = new A(); if (ac.state !== 'running') { try { ac.resume(); } catch (e) {} } return ac;
  }
  P.tone = function (f, t, dur, type, vol) {
    if (!P.sound) return; var c = ctx(); if (!c) return;
    var o = c.createOscillator(), g = c.createGain(), s = c.currentTime + (t || 0);
    o.type = type || 'triangle'; o.frequency.setValueAtTime(f, s);
    g.gain.setValueAtTime(0, s); g.gain.linearRampToValueAtTime(vol || 0.1, s + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, s + dur);
    o.connect(g); g.connect(c.destination); o.start(s); o.stop(s + dur + 0.05);
  };
  /* a soft tone that slides from one pitch to another; returns a stop function */
  P.glide = function (f1, f2, dur, vol) {
    if (!P.sound) return function () {}; var c = ctx(); if (!c) return function () {};
    var o = c.createOscillator(), g = c.createGain(), s = c.currentTime, v = vol || 0.05;
    o.type = 'sine'; o.frequency.setValueAtTime(f1, s); o.frequency.linearRampToValueAtTime(f2, s + dur);
    g.gain.setValueAtTime(0, s); g.gain.linearRampToValueAtTime(v, s + 0.4);
    g.gain.setValueAtTime(v, s + Math.max(0.5, dur - 0.6)); g.gain.linearRampToValueAtTime(0, s + dur);
    o.connect(g); g.connect(c.destination); o.start(s); o.stop(s + dur + 0.1);
    return function () { try { g.gain.cancelScheduledValues(c.currentTime); g.gain.setTargetAtTime(0, c.currentTime, 0.06); o.stop(c.currentTime + 0.4); } catch (e) {} };
  };
  P.sfx = {
    tap: function () { P.tone(520, 0, 0.07, 'triangle', 0.07); },
    pop: function (k) { P.tone(620 + (k || 0) * 70, 0, 0.1, 'sine', 0.1); },
    good: function () { P.tone(660, 0, 0.12); P.tone(880, 0.09, 0.18); },
    bad: function () { P.tone(196, 0, 0.22, 'sine', 0.12); P.tone(156, 0.1, 0.28, 'sine', 0.1); },
    chime: function () { P.tone(523, 0, 0.4, 'sine', 0.1); P.tone(659, 0.13, 0.4, 'sine', 0.1); P.tone(784, 0.26, 0.6, 'sine', 0.1); },
    win: function () { [523, 659, 784, 1047].forEach(function (f, i) { P.tone(f, i * 0.12, 0.35, 'triangle', 0.1); }); }
  };
  P.buzz = function (ms) { try { if (navigator.vibrate) navigator.vibrate(ms || 12); } catch (e) {} };
  var soundSubs = []; P.onSound = function (fn) { soundSubs.push(fn); };

  /* ---------- icons: drawn here so they look the same on every device ---------- */
  var S = 'fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"';
  var I = P.icons = {
    back: '<path ' + S + ' d="M29 12 17 24l12 12"/>',
    soundOn: '<path fill="currentColor" d="M7 19h7l10-8.5v27L14 29H7a1.5 1.5 0 0 1-1.5-1.5v-7A1.5 1.5 0 0 1 7 19Z"/><path ' + S + ' d="M31 17.5a9 9 0 0 1 0 13M36.5 12a17 17 0 0 1 0 24"/>',
    soundOff: '<path fill="currentColor" d="M7 19h7l10-8.5v27L14 29H7a1.5 1.5 0 0 1-1.5-1.5v-7A1.5 1.5 0 0 1 7 19Z"/><path ' + S + ' d="m32 19 10 10M42 19 32 29"/>',
    check: '<path ' + S + ' stroke-width="5" d="m11 25 9 9 17-19"/>',
    star: '<path fill="currentColor" d="M24 4.5 29.9 17l13.6 1.7-10 9.4 2.6 13.5L24 34.9 11.900 41.6l2.6-13.500-10-9.400L18.100 17Z"/>',
    wind: '<path ' + S + ' stroke-width="5" d="M5 17h21a6 6 0 1 0-6-6M5 26h31a6.500 6.500 0 1 1-6.500 6.500M5 35h13"/>',
    sun: '<circle cx="24" cy="24" r="9" fill="currentColor"/><path ' + S + ' d="M24 4v5M24 39v5M4 24h5M39 24h5M9.900 9.900l3.500 3.500M34.600 34.600l3.500 3.500M9.900 38.100l3.500-3.500M34.600 13.400l3.500-3.500"/>',
    music: '<path fill="currentColor" d="M17 10.500 39 6v8.500l-22 4.500Z"/><path ' + S + ' d="M17 12v22M39 8v22"/><ellipse cx="12" cy="35" rx="6" ry="5" fill="currentColor"/><ellipse cx="34" cy="31" rx="6" ry="5" fill="currentColor"/>',
    hand: '<path fill="currentColor" d="M13.500 26V12.500a3 3 0 0 1 6 0V22h1V8a3 3 0 0 1 6 0v14h1V10.500a3 3 0 0 1 6 0V24h1v-7a3 3 0 0 1 6 0v12.500C40.500 38 35 44 27 44c-6 0-9.500-2.500-12.500-7L7.800 26.800a3 3 0 0 1 4.700-3.700Z"/>',
    eye: '<path ' + S + ' d="M4 24s7.500-12.500 20-12.500S44 24 44 24s-7.500 12.500-20 12.500S4 24 4 24Z"/><circle cx="24" cy="24" r="6.500" fill="currentColor"/>',
    ear: '<path ' + S + ' d="M14 31c-3.500-3.500-5-8-5-12.500a14.500 14.500 0 0 1 29 0c0 6.500-4 8.500-7 11.500s-2.500 11-9.500 11c-3.500 0-6-2.500-6-6"/><path ' + S + ' stroke-width="3.500" d="M17.500 19a6.500 6.500 0 0 1 12.500-1.500c.500 3.500-3 4.500-4 7"/>',
    nose: '<path ' + S + ' d="M27 6c0 9-1 14 4 20 2.500 3 4 5 4 8 0 5-5 6.500-11 6.500S13 39 13 34c0-3 2-5 4.500-6.500"/><path ' + S + ' stroke-width="3.500" d="M20 33.500h.100M29 33.500h.100"/>',
    snow: '<path ' + S + ' stroke-width="3.500" d="M24 5v38M7.500 14.500l33 19M7.500 33.500l33-19M19 8l5 5 5-5M19 40l5-5 5 5M8 21.500l7-2-2-7M40 26.500l-7 2 2 7M8 26.500l7 2-2 7M40 21.500l-7-2 2-7"/>',
    flag: '<path ' + S + ' d="M11 44V5"/><path fill="currentColor" d="M11 7c9-5 15 5 26 0v19c-11 5-17-5-26 0Z"/>',
    sparkle: '<path fill="currentColor" d="M21 5c1.800 10 6.200 14.200 16 16-9.800 1.800-14.200 6.200-16 16-1.800-9.800-6.200-14.200-16-16 9.800-1.800 14.200-6.200 16-16Z"/><path fill="currentColor" d="M37 28c.800 4.500 2.500 6.200 7 7-4.500.800-6.200 2.500-7 7-.800-4.500-2.500-6.200-7-7 4.500-.800 6.200-2.500 7-7Z"/>',
    cards: '<rect x="6" y="11" width="22" height="30" rx="5" fill="currentColor" opacity=".45" transform="rotate(-10 17 26)"/><rect x="20" y="8" width="22" height="30" rx="5" fill="currentColor" transform="rotate(8 31 23)"/><path fill="#fff" d="M31 30.500s-6.500-4-6.500-8.300a3.400 3.400 0 0 1 6.500-1.300 3.400 3.400 0 0 1 6.500 1.300c0 4.300-6.500 8.300-6.500 8.300Z" transform="rotate(8 31 23)"/>',
    grid: '<path ' + S + ' stroke-width="3.500" d="M18 6v36M30 6v36M6 18h36M6 30h36"/><path ' + S + ' stroke-width="3" d="m8 8 6 6M14 8l-6 6"/><circle cx="24" cy="24" r="3.500" ' + S + ' stroke-width="3"/>',
    light: '<rect x="14" y="3" width="20" height="42" rx="10" fill="currentColor"/><circle cx="24" cy="13" r="4.600" fill="#ef8263"/><circle cx="24" cy="24" r="4.600" fill="#f3bd4a"/><circle cx="24" cy="35" r="4.600" fill="#6fd09a"/>',
    /* happy-thought pictures: two-tone, drawn to sit on white */
    house: '<path fill="#ef8263" d="M4.500 24 24 6.500 43.500 24l-3 3.200L24 12.500 7.500 27.200Z"/><path fill="#f3bd4a" d="M10 25.500 24 13l14 12.500V40a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2Z"/><rect x="20" y="29" width="8" height="13" rx="2" fill="#16253f"/>',
    tree: '<rect x="21" y="28" width="6" height="15" rx="2" fill="#a8683f"/><circle cx="24" cy="18" r="12.500" fill="#5fb9ad"/><circle cx="14" cy="24" r="8" fill="#5fb9ad"/><circle cx="34" cy="24" r="8" fill="#5fb9ad"/><circle cx="19" cy="15" r="2" fill="#fff" opacity=".6"/>',
    song: '<path fill="#3a4fa3" d="M17 10.500 39 6v8.500l-22 4.500Z"/><path fill="none" stroke="#3a4fa3" stroke-width="4" stroke-linecap="round" d="M17 12v22M39 8v22"/><ellipse cx="12" cy="35" rx="6" ry="5" fill="#8496e6"/><ellipse cx="34" cy="31" rx="6" ry="5" fill="#8496e6"/>',
    heart: '<path fill="#ef8263" d="M24 42S5 30.500 5 17.500a10 10 0 0 1 19-4.300 10 10 0 0 1 19 4.300C43 30.500 24 42 24 42Z"/><path fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7" d="M12 17a4.500 4.500 0 0 1 4.500-4.500"/>',
    treat: '<path fill="#eeb088" d="M13 23h22L24 45Z"/><circle cx="24" cy="16" r="11.500" fill="#f29a8e"/><circle cx="20" cy="12" r="2.200" fill="#fff" opacity=".7"/><path fill="none" stroke="#a8683f" stroke-width="2" stroke-linecap="round" opacity=".5" d="m18 26 9 12M30 26l-9 12"/>',
    paw: '<ellipse cx="24" cy="32" rx="10.500" ry="8.500" fill="#a8683f"/><ellipse cx="9.500" cy="22" rx="4.500" ry="5.500" fill="#a8683f"/><ellipse cx="38.500" cy="22" rx="4.500" ry="5.500" fill="#a8683f"/><ellipse cx="18" cy="12.500" rx="4.500" ry="5.500" fill="#a8683f"/><ellipse cx="30" cy="12.500" rx="4.500" ry="5.500" fill="#a8683f"/>'
  };
  P.icon = function (name, cls) { return '<svg class="ic ' + (cls || '') + '" viewBox="0 0 48 48" aria-hidden="true" focusable="false">' + (I[name] || '') + '</svg>'; };

  /* ---------- the brain buddy ----------
     Moods: worry, ok, calm, happy, oops, freeze, think. Set with Play.mood(el, 'calm'). */
  P.BUDDY =
    '<ellipse class="b-shadow" cx="60" cy="134" rx="30" ry="4"/>' +
    '<g class="b-all">' +
    '<path class="limb" d="M46 116v16M74 116v16"/>' +
    '<path class="limb" data-m="worry ok think" d="M17 80q-10 7-7 19M103 80q10 7 7 19"/>' +
    '<path class="limb" data-m="calm" d="M17 82q-7 10-1 19M103 82q7 10 1 19"/>' +
    '<path class="limb b-arms-up" data-m="happy" d="M18 70q-13-8-12-23M102 70q13-8 12-23"/>' +
    '<path class="limb" data-m="freeze" d="M16 74 2 68M104 74l14-6"/>' +
    '<path class="limb" data-m="oops" d="M19 84q-13-3-9-17M101 84q13-3 9-17"/>' +
    '<path class="body" d="M60 8C90 8 108 42 108 74c0 30-20 48-48 48S12 104 12 74C12 42 30 8 60 8Z"/>' +
    '<path class="b-fold" d="M50 17q9 5 2 12M68 15q-8 7 3 13"/>' +
    '<path class="b-hi" d="M30 44q6-17 19-23"/>' +
    '<circle class="cheek" cx="33" cy="82" r="8"/><circle class="cheek" cx="87" cy="82" r="8"/>' +
    '<g class="b-buzz" data-m="worry"><path d="M13 30 5 25M9 42H0M107 30l8-5M111 42h9"/></g>' +
    '<g data-m="worry"><g class="b-look"><g class="b-eyes"><circle class="ink" cx="44" cy="68" r="5"/><circle class="ink" cx="76" cy="68" r="5"/><circle class="glint" cx="45.800" cy="66.200" r="1.600"/><circle class="glint" cx="77.800" cy="66.200" r="1.600"/></g></g><path class="line" d="M35 59l13-6M85 59l-13-6"/><path class="line" d="M48 93q6-6 12-1t12-1"/></g>' +
    '<g data-m="ok"><g class="b-look"><g class="b-eyes"><circle class="ink" cx="44" cy="68" r="5"/><circle class="ink" cx="76" cy="68" r="5"/><circle class="glint" cx="45.800" cy="66.200" r="1.600"/><circle class="glint" cx="77.800" cy="66.200" r="1.600"/></g></g><path class="line" d="M50 90q10 5 20 0"/></g>' +
    '<g data-m="think"><g class="b-eyes"><circle class="ink" cx="47" cy="65" r="5"/><circle class="ink" cx="79" cy="65" r="5"/><circle class="glint" cx="48.800" cy="63.200" r="1.600"/><circle class="glint" cx="80.800" cy="63.200" r="1.600"/></g><path class="line" d="M38 55q6-4 12-2M72 53q6-2 12 2"/><path class="line" d="M53 91q6 3 12-1"/></g>' +
    '<g data-m="calm"><path class="line" d="M38 67q6 5 12 0M70 67q6 5 12 0"/><path class="line" d="M49 88q11 9 22 0"/></g>' +
    '<g data-m="happy"><path class="line" d="M38 69q6-8 12 0M70 69q6-8 12 0"/><path class="ink" d="M46 86q14 17 28 0Z"/></g>' +
    '<g data-m="oops"><circle class="eye-w" cx="44" cy="67" r="7.500"/><circle class="eye-w" cx="76" cy="67" r="7.500"/><circle class="ink" cx="44" cy="67" r="3.800"/><circle class="ink" cx="76" cy="67" r="3.800"/><path class="line" d="M36 54q8-5 15-1M69 53q7-4 15 1"/><ellipse class="ink" cx="60" cy="93" rx="5" ry="6"/></g>' +
    '<g data-m="freeze"><circle class="eye-w" cx="44" cy="67" r="7.500"/><circle class="eye-w" cx="76" cy="67" r="7.500"/><circle class="ink" cx="44" cy="67" r="3.800"/><circle class="ink" cx="76" cy="67" r="3.800"/><path class="line" d="M53 92h14"/></g>' +
    '</g>';
  P.mood = function (el, m) { if (el && el.getAttribute('data-mood') !== m) el.setAttribute('data-mood', m); };
  /* play a one-shot move: hop, shake, nod, spin, squish, wave */
  P.react = function (el, cls) {
    if (!el) return; el.classList.remove('r-' + cls); void el.getBoundingClientRect(); el.classList.add('r-' + cls);
    var off = function () { el.classList.remove('r-' + cls); el.removeEventListener('animationend', off); };
    el.addEventListener('animationend', off); setTimeout(off, 1400);
  };
  /* set text with a little pop */
  P.say = function (el, text) {
    if (!el) return; if (el.textContent === text) return; el.textContent = text;
    el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');
  };

  /* ---------- little bits of delight ---------- */
  var COLS = ['#ef8263', '#f3bd4a', '#5fb9ad', '#8496e6', '#f29a8e'];
  P.confetti = function (n) {
    if (P.reduced) return; var box = d.createElement('div'); box.className = 'confetti'; n = n || 70;
    for (var i = 0; i < n; i++) {
      var c = d.createElement('i'), s = 7 + Math.random() * 8;
      c.style.cssText = 'left:' + (Math.random() * 100) + '%;width:' + s + 'px;height:' + (s * (0.5 + Math.random())) + 'px;background:' + COLS[i % COLS.length] +
        ';border-radius:' + (Math.random() < 0.3 ? '50%' : '2px') + ';--dx:' + ((Math.random() - 0.5) * 220) + 'px;--rot:' + (360 + Math.random() * 720) + 'deg;--t:' + (2.2 + Math.random() * 1.6) + 's;--d:' + (Math.random() * 0.7) + 's';
      box.appendChild(c);
    }
    d.body.appendChild(box); setTimeout(function () { box.remove(); }, 4800);
  };
  P.clearConfetti = function () { P.all('.confetti').forEach(function (b) { b.remove(); }); };
  /* a burst of dots from a point, or from the middle of an element */
  P.burst = function (at, opt) {
    if (P.reduced) return; opt = opt || {}; var x, y;
    if (at && at.getBoundingClientRect) { var r = at.getBoundingClientRect(); x = r.left + r.width / 2; y = r.top + r.height / 2; } else { x = at.x; y = at.y; }
    var n = opt.n || 10, box = d.createElement('div'); box.className = 'burst';
    for (var i = 0; i < n; i++) {
      var p = d.createElement('i'), a = (Math.PI * 2 * i) / n + Math.random() * 0.5, dist = (opt.r || 46) * (0.6 + Math.random() * 0.6), s = 5 + Math.random() * 6;
      p.style.cssText = 'left:' + x + 'px;top:' + y + 'px;width:' + s + 'px;height:' + s + 'px;background:' + (opt.color || COLS[i % COLS.length]) + ';--bx:' + (Math.cos(a) * dist) + 'px;--by:' + (Math.sin(a) * dist) + 'px';
      box.appendChild(p);
    }
    d.body.appendChild(box); setTimeout(function () { box.remove(); }, 800);
  };
  /* 3, 2, 1, Go! shown over a host element */
  P.countdown = function (host, done) {
    var n = 3, el = d.createElement('div'); el.className = 'count3'; el.setAttribute('aria-live', 'assertive'); host.appendChild(el);
    (function tick() {
      el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');
      if (n === 0) { el.textContent = 'Go!'; P.tone(784, 0, 0.3); setTimeout(function () { el.remove(); done(); }, 550); return; }
      el.textContent = n; P.tone(440, 0, 0.12); n--; setTimeout(tick, 720);
    })();
    return function () { el.remove(); };
  };

  /* ---------- wire up the page ---------- */
  function init() {
    P.all('svg.buddy').forEach(function (s) { s.innerHTML = P.BUDDY; if (!s.getAttribute('viewBox')) s.setAttribute('viewBox', '0 0 120 138'); });
    P.all('[data-icon]').forEach(function (el) { el.innerHTML = P.icon(el.getAttribute('data-icon')); });
    var snd = P.$('snd');
    if (snd) {
      snd.innerHTML = '<span class="on">' + P.icon('soundOn') + '</span><span class="off">' + P.icon('soundOff') + '</span>';
      var paint = function () { snd.setAttribute('aria-pressed', P.sound ? 'true' : 'false'); snd.setAttribute('aria-label', P.sound ? 'Sound is on. Turn sound off' : 'Sound is off. Turn sound on'); };
      paint();
      snd.addEventListener('click', function () { P.sound = !P.sound; paint(); if (P.sound) P.sfx.tap(); soundSubs.forEach(function (f) { f(P.sound); }); });
    }
    /* the buddy's eyes follow your finger or mouse */
    if (!P.reduced) {
      var raf = 0, px = 0, py = 0;
      var move = function () {
        raf = 0;
        P.all('svg.buddy').forEach(function (b) {
          var r = b.getBoundingClientRect(); if (!r.width) return;
          var dx = px - (r.left + r.width / 2), dy = py - (r.top + r.height * 0.45), m = Math.max(40, Math.hypot(dx, dy));
          b.style.setProperty('--lx', (dx / m * 2.400).toFixed(2)); b.style.setProperty('--ly', (dy / m * 2).toFixed(2));
        });
      };
      d.addEventListener('pointermove', function (e) { px = e.clientX; py = e.clientY; if (!raf) raf = requestAnimationFrame(move); }, { passive: true });
      d.addEventListener('pointerdown', function (e) { px = e.clientX; py = e.clientY; if (!raf) raf = requestAnimationFrame(move); }, { passive: true });
    }
  }
  W.Play = P;
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init); else init();
})();
