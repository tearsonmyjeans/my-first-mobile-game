// Черновик цеха 10 (калибровка туалетов и аэрогрилей): спрайты. В игру ещё не вставлено.
// Цены и скорости станков не выбраны: value: 1 и desc: 'x' — заглушки. Цех 10 — индекс цеха 9.
// Особенность цеха: в центре Эталон на широком месте (два столбца). Сотрудник ему не нужен,
// своих скорости и цены нет (0), доход растёт от числа работающих соседей (максимум 4).
// Статус: Эталон и четыре станка вокруг него нарисованы и одобрены, сцена цеха ещё не нарисована (будет белой).

// ===== LAYOUTS: после пепси =====
    // a pair on top, the etalon across both columns in the middle (anchored at column 0), a pair below
    [[0, 0], [1, 0], [0, 1], [0, 2], [1, 2]]

// ===== adjacent(): Эталон касается всех мест своего цеха =====
// const adjacent = (l, i, j) => {
//   if (l === 9 && i !== j && (i === 2 || j === 2)) return true; // the etalon spans both columns, so all four slots touch it
//   ...
// };

// ===== MACH: перед belt =====
    etalon: { loc: 9, name: 'Эталон', short: 'ЭТАЛОН', rate: 0, value: 0, max: 1, desc: 'x' },
    toilet: { loc: 9, name: 'Унитаз', short: 'УНИТАЗ', rate: 0.5, value: 1, max: 1, desc: 'x' },
    airfryer: { loc: 9, name: 'Аэрогриль', short: 'АЭРОГРИЛЬ', rate: 0.5, value: 1, max: 1, desc: 'x' },
    shorts: { loc: 9, name: 'Студия коротких видео', short: 'ШОРТСЫ', rate: 0.8, value: 1, max: 1, desc: 'x' },
    drinks: { loc: 9, name: 'Автомат с пивом и колой', short: 'ПИВО-КОЛА', rate: 0.6, value: 1, max: 1, desc: 'x' },

// ===== ICON_DRAW: иконки карт станков 16×16 =====
    toilet: (r, d) => { r(3, 0, 10, 7, K); r(4, 1, 8, 5, '#f4f7f9'); r(10, 1, 2, 5, '#d8dee4'); r(1, 2, 2, 2, K); r(1, 7, 14, 4, K); r(2, 8, 12, 2, '#ffffff'); r(4, 8, 8, 1, '#5aa9e6'); r(4, 11, 8, 5, K); r(5, 11, 6, 4, '#e9eef2'); r(9, 11, 2, 4, '#c9d0d6'); r(14, 0, 2, 9, '#f2c94c'); r(14, 4, 2, 1, '#d9453f'); },
    airfryer: (r, d) => { r(2, 0, 12, 16, K); r(3, 1, 10, 14, '#2e2e38'); r(3, 1, 1, 14, '#4a4a58'); r(5, 2, 6, 3, '#141419'); r(6, 3, 1, 1, '#ff8a3a'); r(8, 3, 1, 1, '#ff8a3a'); r(3, 9, 10, 1, K); r(0, 10, 3, 3, K); r(1, 11, 1, 1, '#55556a'); for (let k = 0; k < 4; k++) r(5 + k * 2, 6 + (k % 2), 1, 3, '#f2c94c'); },
    shorts: (r, d) => { d(8, 7, 7, K); d(8, 7, 6, '#fff1b0'); d(8, 7, 5, K); r(5, 1, 7, 13, K); r(6, 2, 5, 11, '#ff6fa8'); r(7, 5, 3, 4, '#ffd6e6'); r(8, 6, 1, 2, K); r(6, 12, 3, 1, '#ffffff'); r(7, 14, 3, 2, K); r(12, 1, 1, 1, '#ff5f87'); r(14, 1, 1, 1, '#ff5f87'); r(12, 2, 3, 1, '#ff5f87'); r(13, 3, 1, 1, '#ff5f87'); },
    drinks: (r, d) => { r(2, 0, 12, 16, K); r(3, 1, 10, 14, '#e9eef2'); r(3, 1, 5, 3, '#d9453f'); r(4, 2, 3, 1, '#ffffff'); r(8, 1, 5, 3, '#e0a32e'); r(8, 1, 5, 1, '#fff6e0'); r(4, 5, 8, 8, '#1b2230'); r(5, 7, 1, 1, '#5a3410'); r(5, 6, 1, 1, '#f2c94c'); r(4, 8, 3, 3, '#7a4a1a'); r(4, 9, 3, 1, '#f2c94c'); r(8, 7, 3, 1, '#c9d0d6'); r(8, 8, 3, 3, '#d9453f'); r(8, 9, 3, 1, '#ffffff'); r(4, 11, 8, 1, '#44505c'); r(12, 6, 1, 1, '#7ee081'); r(4, 13, 8, 2, '#1b2230'); },

// ===== machine(): ветки перед 'sew' =====
    } else if (type === 'toilet') {
      // a toilet on the calibration stand: the flush lever kicks, the water swirls, a gauge and a ruler check the level
      const ell = (ex, ey, rx, ry, col) => { for (let dy = -ry; dy <= ry; dy++) { const w = Math.round(rx * Math.sqrt(1 - (dy / ry) ** 2)); R(ex - w, ey + dy, w * 2 + 1, 1, col); } };
      R(x + 4, y + 27, 24, 4, K); R(x + 5, y + 28, 22, 2, '#5f6878');
      R(x + 10, y + 20, 12, 8, K); R(x + 11, y + 20, 10, 8, '#e9eef2'); R(x + 18, y + 20, 3, 8, '#c9d0d6');
      R(x + 7, y + 1, 18, 3, K); R(x + 8, y + 2, 16, 1, '#ffffff');
      R(x + 8, y + 3, 16, 11, K); R(x + 9, y + 4, 14, 9, '#f4f7f9'); R(x + 20, y + 4, 3, 9, '#d8dee4');
      disc(x + 16, y + 8, 3, K); disc(x + 16, y + 8, 2, '#fff6d8');
      const ga = -2.4 + (Math.sin(t * 3) + 1) * 0.9; R(x + 16 + Math.round(Math.cos(ga) * 2), y + 8 + Math.round(Math.sin(ga) * 2), 1, 1, '#d9453f');
      const fl = Math.floor(t * 2) % 4 === 0;
      R(x + 5, y + 5 + (fl ? 2 : 0), 4, 2, K); R(x + 6, y + 5 + (fl ? 2 : 0), 2, 1, '#c9d0d6');
      ell(x + 16, y + 17, 12, 5, K); ell(x + 16, y + 17, 11, 4, '#ffffff'); ell(x + 16, y + 18, 11, 3, '#e9eef2');
      ell(x + 16, y + 17, 7, 2, '#5aa9e6');
      for (let k = 0; k < 5; k++) { const a = t * (fl ? 9 : 3) + k * 1.26; R(x + 16 + Math.round(Math.cos(a) * 5), y + 17 + Math.round(Math.sin(a) * 1.5), 1, 1, '#d8f0ff'); }
      R(x + 28, y + 2, 3, 21, K); R(x + 29, y + 3, 1, 19, '#f2c94c'); for (let k = 0; k < 6; k++) R(x + 28, y + 4 + k * 3, 2, 1, K);
      R(x + 27, y + 16 - Math.round((Math.sin(t * 3) + 1) * 2), 4, 1, '#d9453f');
    } else if (type === 'airfryer') {
      // a black air fryer: the display counts down, the basket slides out with fries and slides back, steam leaves the vent
      R(x + 6, y + 3, 21, 27, K); R(x + 7, y + 4, 19, 25, '#2e2e38'); R(x + 7, y + 4, 2, 25, '#4a4a58'); R(x + 7, y + 4, 19, 1, '#55556a');
      R(x + 10, y + 6, 13, 6, K); R(x + 11, y + 7, 11, 4, '#141419');
      const dg = Math.floor(t * 2) % 10;
      for (let k = 0; k < 3; k++) R(x + 12 + k * 3, y + 8, 2, 2, (k === 2 && dg % 2) ? '#7a3a1a' : '#ff8a3a');
      disc(x + 16, y + 15, 2, K); R(x + 16, y + 14, 1, 1, '#c9d0d6');
      const out = Math.max(0, Math.min(1, Math.sin(t * 0.8) * 2 - 0.6)), ox = Math.round(out * 7);
      R(x + 7 - ox, y + 18, 19, 10, K); R(x + 8 - ox, y + 19, 17, 8, '#26262e'); R(x + 8 - ox, y + 19, 17, 1, '#55556a');
      R(x + 1 - ox, y + 21, 7, 4, K); R(x + 2 - ox, y + 22, 5, 2, '#55556a');
      if (ox > 3) for (let k = 0; k < 5; k++) R(x + 9 - ox + k * 2, y + 16 - (k % 2), 1, 3, k % 2 ? '#f2c94c' : '#e0a32e');
      for (let k = 0; k < 2; k++) { const s = (t * 0.6 + k / 2) % 1; R(x + 21 + Math.round(Math.sin(s * 7) * 2), y + 1 - Math.round(s * 7), 2 + Math.round(s * 2), 2, `rgba(225,232,240,${(0.7 * (1 - s)).toFixed(2)})`); }
      R(x + 19, y + 2, 5, 2, K);
    } else if (type === 'shorts') {
      // short videos: a phone on a tripod in a ring light, clips swipe every second and hearts float up
      R(x + 15, y + 22, 3, 6, K); R(x + 16, y + 22, 1, 6, '#9aa3ad');
      for (const [a, b] of [[-1, 0], [1, 0]]) for (let k = 0; k < 7; k++) R(x + 16 + a * (k + 1), y + 24 + k, 2, 1, K);
      R(x + 15, y + 30, 3, 1, K);
      disc(x + 16, y + 12, 12, K); disc(x + 16, y + 12, 11, Math.floor(t * 2) % 2 ? '#fff6d8' : '#fff1b0'); disc(x + 16, y + 12, 9, K); disc(x + 16, y + 12, 8, 'rgba(255,246,216,.35)');
      R(x + 11, y + 2, 11, 20, K); R(x + 12, y + 3, 9, 18, '#141419');
      const clip = Math.floor(t * 1.2), sw = (t * 1.2) % 1, cols = [['#ff6fa8', '#ffd6e6'], ['#5aa9e6', '#d8f0ff'], ['#7ee081', '#e6ffd8'], ['#f2c94c', '#fff6d8']], [c1, c2] = cols[clip % 4];
      const so = sw > 0.85 ? Math.round((sw - 0.85) / 0.15 * 16) : 0;
      R(x + 12, y + 4 - so, 9, 16, c1); R(x + 13, y + 9 - so, 7, 6, c2); R(x + 15, y + 11 - so, 3, 2, K);
      if (so) { const [d1, d2] = cols[(clip + 1) % 4]; R(x + 12, y + 20 - so, 9, so, d1); R(x + 13, y + 25 - so, 7, Math.max(0, so - 5), d2); }
      R(x + 12, y + 3, 9, 1, '#141419'); R(x + 12, y + 20, 9, 1, '#141419'); R(x + 12, y + 19, Math.round(sw * 9), 1, '#ffffff');
      for (let k = 0; k < 3; k++) { const s = (t * 0.7 + k / 3) % 1, hx = x + 24 + Math.round(Math.sin(s * 6 + k) * 2), hy = y + 18 - Math.round(s * 18); R(hx, hy, 1, 1, '#ff5f87'); R(hx + 2, hy, 1, 1, '#ff5f87'); R(hx, hy + 1, 3, 1, '#ff5f87'); R(hx + 1, hy + 2, 1, 1, '#ff5f87'); }
      R(x + 13, y + 1, 7, 2, K); R(x + 15, y + 1, 3, 1, '#2e2e38');
    } else if (type === 'drinks') {
      // a fridge of beer and cola: the sign is half cola red, half beer gold with foam, a drink drops into the tray
      R(x + 5, y + 1, 23, 29, K); R(x + 6, y + 2, 21, 27, '#e9eef2'); R(x + 6, y + 2, 2, 27, '#ffffff'); R(x + 25, y + 2, 2, 27, '#c9d0d6');
      const buzz = (t % 2.3) < 0.12;
      R(x + 7, y + 3, 9, 5, buzz ? '#9a3a3a' : '#d9453f'); R(x + 8, y + 5, 7, 1, '#ffffff'); R(x + 9, y + 6, 4, 1, '#ffffff');
      R(x + 16, y + 3, 10, 5, buzz ? '#a87a2a' : '#e0a32e'); R(x + 16, y + 3, 10, 2, '#fff6e0'); R(x + 18, y + 5, 1, 1, '#fff6e0'); R(x + 22, y + 5, 1, 1, '#fff6e0');
      R(x + 8, y + 9, 14, 14, K); R(x + 9, y + 10, 12, 12, '#1b2230');
      // b is the bottom row of the drink: a beer is a brown bottle with a gold label, a cola a red can with a white band
      const beer = (bx, b) => { R(bx + 1, b - 4, 1, 1, '#f2c94c'); R(bx + 1, b - 3, 1, 1, '#5a3410'); R(bx, b - 2, 3, 3, '#7a4a1a'); R(bx, b - 1, 3, 1, '#f2c94c'); };
      const cola = (bx, b) => { R(bx, b - 3, 3, 1, '#c9d0d6'); R(bx, b - 2, 3, 3, '#d9453f'); R(bx, b - 1, 3, 1, '#ffffff'); };
      for (let r = 0; r < 2; r++) { for (let k = 0; k < 3; k++) ((r + k) % 2 ? cola : beer)(x + 10 + k * 4, y + 15 + r * 5); R(x + 9, y + 16 + r * 5, 12, 1, '#44505c'); }
      R(x + 9, y + 10, 1, 11, 'rgba(255,255,255,.25)');
      for (let k = 0; k < 3; k++) R(x + 23, y + 11 + k * 4, 2, 2, k === Math.floor(t * 3) % 3 ? '#7ee081' : '#9aa3ad');
      R(x + 23, y + 23, 2, 1, '#9aa3ad');
      R(x + 8, y + 24, 17, 4, K); R(x + 9, y + 25, 15, 2, '#1b2230');
      const dr = (t * 0.7) % 1, which = Math.floor(t * 0.7) % 2 ? cola : beer, fy = y + 13 + Math.round(dr / 0.4 * 12);
      if (dr < 0.4 && fy < y + 22) which(x + 14, fy);
      else { R(x + 12, y + 25, 5, 2, which === cola ? '#d9453f' : '#7a4a1a'); R(x + 12, y + 25, 5, 1, which === cola ? '#ffffff' : '#f2c94c'); }
      R(x + 5, y + 29, 23, 2, K);

// ===== etalon(): широкий станок, рядом с furnace() и extractor() (одобрен) =====
// n — число работающих соседей (0..4): каждый включает ещё один прибор, без соседей подопытный спит.
  // the etalon fills a slot two columns wide and runs with no worker: a test subject strapped to a board,
  // wired to screens on the left and a drip on the right. n is how many neighbours work (0..4):
  // every working neighbour switches on one more gadget, at 4 the whole rig hums
  function etalon(x, y, w, h, n) {
    const HAIR = '#4a3426', HAIRD = '#2e2018', HAIRL = '#6e5039', SKIN = '#f2c7a5', SKIND = '#d9a07f', STRAP = '#2a333c';
    const cx = x + 75, tw = Math.floor(t * 8) % 2, on1 = n >= 1, on2 = n >= 2, on3 = n >= 3, on4 = n >= 4;
    // a cable or tube along a quadratic curve; a lit one carries a bright pulse toward the subject
    const curve = (x0, y0, qx, qy, x1, y1, col, lit, off) => {
      const at = s => [Math.round((1 - s) * (1 - s) * x0 + 2 * (1 - s) * s * qx + s * s * x1), Math.round((1 - s) * (1 - s) * y0 + 2 * (1 - s) * s * qy + s * s * y1)];
      for (let k = 0; k <= 40; k++) { const [a, b] = at(k / 40); R(a - 1, b - 1, 3, 3, K); }
      for (let k = 0; k <= 40; k++) { const [a, b] = at(k / 40); R(a, b, 1, 1, col); }
      if (lit) for (let k = 0; k < 2; k++) { const [a, b] = at((t * 0.7 + off + k / 2) % 1); R(a - 1, b - 1, 3, 3, '#fff1b0'); }
    };
    R(x + 4, y + h - 5, w - 8, 3, 'rgba(30,20,40,.22)');

    // left stack, top: the anime generator, a pink-haired girl blinks on the screen
    R(x + 7, y + 5, 36, 20, K); R(x + 8, y + 6, 34, 18, '#5f6878'); R(x + 8, y + 6, 34, 1, '#8a949e');
    R(x + 10, y + 8, 30, 13, K); R(x + 11, y + 9, 28, 11, on1 ? '#ffe3ee' : '#1b2230');
    if (on1) {
      R(x + 17, y + 9, 16, 11, '#ff9ab3'); R(x + 19, y + 11, 12, 9, SKIN); R(x + 19, y + 11, 12, 2, '#ff9ab3'); R(x + 22, y + 11, 2, 3, '#ff9ab3');
      if ((t % 2.8) > 0.15) { R(x + 20, y + 14, 3, 3, '#3a6fb0'); R(x + 27, y + 14, 3, 3, '#3a6fb0'); R(x + 20, y + 14, 1, 1, '#ffffff'); R(x + 27, y + 14, 1, 1, '#ffffff'); }
      else { R(x + 20, y + 16, 3, 1, K); R(x + 27, y + 16, 3, 1, K); }
      R(x + 19, y + 17, 2, 1, '#ff8fa8'); R(x + 29, y + 17, 2, 1, '#ff8fa8'); R(x + 24, y + 18, 2, 1, '#d9453f');
      for (let k = 0; k < 3; k++) R(x + 12 + ((k * 9 + Math.floor(t * 5)) % 25), y + 10 + k * 3, 1, 1, '#ffffff');
      R(x + 11, y + 9 + Math.floor(t * 9) % 11, 28, 1, 'rgba(255,255,255,.35)');
    }
    R(x + 11, y + 22, 3, 1, on1 ? '#7ee081' : '#3a4450'); R(x + 21, y + 24, 8, 2, K);

    // middle: bugs into food, a cockroach crawls in on the left and a burger comes out on the right
    R(x + 5, y + 26, 40, 19, K); R(x + 6, y + 27, 38, 17, '#e9eef2'); R(x + 6, y + 27, 38, 1, '#ffffff');
    R(x + 8, y + 29, 34, 13, K); R(x + 9, y + 30, 32, 11, on2 ? '#f4efe6' : '#1b2230');
    if (on2) {
      const bx = x + 10 + Math.floor(t * 3) % 3;
      R(bx + 1, y + 33, 6, 4, '#7a4a2a'); R(bx + 2, y + 33, 3, 1, '#a8693a'); R(bx + 7, y + 34, 2, 2, '#4e2e1a');
      for (let k = 0; k < 3; k++) { R(bx + 2 + k * 2, y + 37, 1, 1 + (k + tw) % 2, K); R(bx + 2 + k * 2, y + 32, 1, 1, K); }
      R(bx + 9, y + 32, 2, 1, K); R(bx + 10, y + 31, 1, 1, K);
      if (Math.floor(t * 3) % 2) { R(x + 22, y + 35, 5, 1, K); R(x + 25, y + 34, 1, 3, K); }
      R(x + 30, y + 32, 9, 3, '#e0a32e'); R(x + 31, y + 31, 7, 1, '#e0a32e'); R(x + 32, y + 32, 1, 1, '#fff1b0'); R(x + 35, y + 32, 1, 1, '#fff1b0');
      R(x + 29, y + 35, 11, 1, '#7ee081'); R(x + 30, y + 36, 9, 2, '#6a3a2a'); R(x + 30, y + 38, 9, 2, '#e0a32e');
    }

    // bottom: the mind altering machine, its spiral spins, the knobs blink
    R(x + 5, y + 46, 40, 24, K); R(x + 6, y + 47, 38, 22, '#5f6878'); R(x + 6, y + 47, 38, 1, '#8a949e');
    disc(x + 17, y + 58, 8, K); disc(x + 17, y + 58, 7, '#1b2230');
    if (on3) for (let k = 0; k < 22; k++) { const a = -t * 5 + k * 0.62, rr = k * 0.3; R(x + 17 + Math.round(Math.cos(a) * rr), y + 58 + Math.round(Math.sin(a) * rr), 1, 1, k % 2 ? '#c47ae8' : '#7ee081'); }
    disc(x + 32, y + 52, 2, K); disc(x + 32, y + 52, 1, '#c9d0d6'); disc(x + 39, y + 52, 2, K); disc(x + 39, y + 52, 1, '#c9d0d6');
    R(x + 28, y + 58, 14, 8, K);
    for (let k = 0; k < 3; k++) R(x + 29 + k * 5, y + 59, 3, 6, on3 && (Math.floor(t * 4) + k) % 3 ? ['#d9453f', '#f2c94c', '#7ee081'][k] : '#3a4450');

    // right: the drip stand, a bag of cola and a bag of something green; it drips once all four work
    R(x + 120, y + 18, 3, 50, K); R(x + 121, y + 19, 1, 48, '#c9d0d6');
    R(x + 103, y + 18, 38, 3, K); R(x + 104, y + 19, 36, 1, '#c9d0d6');
    const bag = (bx, by, bw, bh, liq, hi) => {
      R(bx + bw / 2 - 1, by - 3, 2, 3, K);
      R(bx, by, bw, bh, K); R(bx + 1, by + 1, bw - 2, bh - 2, '#eef3f6');
      R(bx + 1, by + 5, bw - 2, bh - 6, liq); R(bx + 1, by + 5, 2, bh - 6, hi);
      R(bx + bw / 2 - 2, by + bh, 4, 5, K); R(bx + bw / 2 - 1, by + bh + 1, 2, 3, '#eef3f6');
      if (on4) R(bx + bw / 2 - 1, by + bh + 1 + Math.floor(t * 4 + bx) % 3, 2, 1, liq);
    };
    bag(x + 104, y + 22, 14, 17, '#3a2820', '#6a4a34'); R(x + 105, y + 30, 12, 3, '#1d4a9a'); R(x + 107, y + 31, 8, 1, '#d9453f');
    bag(x + 125, y + 22, 16, 19, on4 ? '#7ee081' : '#3f8a4f', on4 ? '#c8f7c9' : '#5faa6f');

    // the sealed crate under the drip: its four lamps count the working neighbours
    R(x + 100, y + 46, 46, 24, K); R(x + 101, y + 47, 44, 22, '#f4efe6'); R(x + 101, y + 47, 44, 1, '#ffffff');
    for (let k = 0; k < 4; k++) R(x + 105, y + 50 + k * 3, 24 - (k % 2) * 6, 1, '#9aa3ad');
    R(x + 133, y + 49, 8, 8, K); R(x + 134, y + 50, 6, 6, '#f2c94c'); R(x + 136, y + 51, 2, 3, K); R(x + 136, y + 55, 2, 1, K);
    for (let k = 0; k < 4; k++) { R(x + 105 + k * 9, y + 62, 7, 5, K); R(x + 106 + k * 9, y + 63, 5, 3, k < n ? (k === n - 1 && tw ? '#c8f7c9' : '#7ee081') : '#4a5560'); }

    // the board the subject is strapped to
    R(x + 57, y + 3, 36, 68, K); R(x + 58, y + 4, 34, 66, '#4a5560'); R(x + 58, y + 4, 1, 66, '#6a7580');
    for (let k = 0; k < 9; k++) R(x + 60, y + 26 + k * 4, 2, 2, '#6a7580');
    for (let k = 0; k < 7; k++) R(x + 89, y + 30 + k * 4, 2, 2, '#6a7580');

    // cables from the screens to the head, a mask hose, chest pads; the drip and crate feed the right arm
    curve(x + 43, y + 12, x + 54, y + 2, cx - 7, y + 13, '#9aa3ad', on1, 0);
    curve(x + 43, y + 19, x + 55, y + 22, cx - 7, y + 16, '#9aa3ad', on1, 0.5);
    curve(x + 45, y + 52, x + 54, y + 34, cx - 5, y + 28, '#c47ae8', on3, 0.4);
    curve(x + 45, y + 62, x + 60, y + 50, cx + 3, y + 28, '#9aa3ad', on3, 0.7);
    curve(x + 111, y + 44, x + 98, y + 40, cx + 10, y + 30, '#b59a86', on4, 0.1);
    curve(x + 133, y + 46, x + 112, y + 34, cx + 10, y + 33, on4 ? '#9fe6a8' : '#8fb59a', on4, 0.6);
    curve(x + 100, y + 50, x + 92, y + 46, cx + 10, y + 39, '#e9eef2', on4, 0.3);

    // the subject: skinny, in hospital shorts, curtain haircut parted in the middle, a VR visor and a mask
    const sh = on3 ? tw : 0;
    R(cx - 12, y + 25, 5, 20, K); R(cx - 11, y + 26, 3, 18, SKIN); R(cx - 9, y + 26, 1, 18, SKIND);
    R(cx + 7, y + 25, 5, 20, K); R(cx + 8, y + 26, 3, 18, SKIN); R(cx + 8, y + 26, 1, 18, SKIND);
    R(cx - 13, y + 33, 7, 3, STRAP); R(cx + 6, y + 33, 7, 3, STRAP); R(cx - 10, y + 34, 1, 1, '#c9d0d6'); R(cx + 9, y + 34, 1, 1, '#c9d0d6');
    R(cx + 8, y + 29, 3, 2, '#f4efe6');
    R(cx - 8, y + 24, 16, 21, K); R(cx - 7, y + 25, 14, 19, SKIN);
    for (let k = 0; k < 4; k++) { R(cx - 6, y + 28 + k * 3, 4 - (k > 2), 1, SKIND); R(cx + 2 + (k > 2), y + 28 + k * 3, 4 - (k > 2), 1, SKIND); }
    R(cx, y + 26, 1, 9, SKIND); R(cx, y + 40, 1, 1, SKIND);
    R(cx - 6, y + 27, 2, 2, '#e9eef2'); R(cx + 3, y + 27, 2, 2, '#e9eef2');
    R(cx - 8, y + 44, 16, 8, K); R(cx - 7, y + 45, 14, 6, '#9ec5dd'); for (let k = 0; k < 4; k++) R(cx - 6 + k * 4, y + 45, 1, 6, '#7fa9c4');
    R(cx - 7, y + 51, 6, 17, K); R(cx - 6, y + 51, 4, 16, SKIN); R(cx - 3, y + 51, 1, 16, SKIND);
    R(cx + 1, y + 51, 6, 17, K); R(cx + 2, y + 51, 4, 16, SKIN); R(cx + 2, y + 51, 1, 16, SKIND);
    R(cx - 8, y + 59, 16, 3, STRAP); R(cx - 1, y + 60, 2, 1, '#c9d0d6');
    R(cx - 7 - sh, y + 67, 6, 3, K); R(cx - 6 - sh, y + 67, 4, 2, SKIN); R(cx + 1 + sh, y + 67, 6, 3, K); R(cx + 2 + sh, y + 67, 4, 2, SKIN);
    R(cx - 2, y + 21, 4, 3, K); R(cx - 1, y + 22, 2, 2, SKIND);
    // head and hair: a shaggy dark mop, a heavy fringe down to the visor, sides past the ears to the jaw, a few flyaways
    R(cx - 6, y + 6, 12, 16, K); R(cx - 5, y + 7, 10, 14, SKIN);
    const glow = on1 ? (tw ? '#7fd0ff' : '#b8e8ff') : '#2f3a46';
    R(cx - 7, y + 12, 14, 6, K); R(cx - 6, y + 13, 12, 4, '#5f6878'); R(cx - 6, y + 13, 12, 1, '#8a949e');
    R(cx - 5, y + 15, 3, 1, glow); R(cx + 2, y + 15, 3, 1, glow); R(cx - 1, y + 14, 2, 1, '#e9eef2');
    const hp = [], row = (b, a0, a1) => { for (let a = a0; a <= a1; a++) hp.push([a, b]); };
    row(3, -4, 3); row(4, -6, 5); for (let b = 5; b <= 11; b++) row(b, -7, 6);
    for (const a of [-7, -6, -5, -2, -1, 2, 5, 6]) hp.push([a, 12]);
    for (let b = 12; b <= 15; b++) { row(b, -8, -6); row(b, 5, 7); }
    hp.push([-8, 16], [-7, 16], [6, 16], [7, 16]);
    for (const [a, b] of hp) R(cx + a - 1, y + b - 1, 3, 3, K);
    for (const [a, b] of hp) {
      const dark = (b >= 12 && (a === -6 || a === 5)) || (a === -3 && b >= 7 && b <= 11) || (a === 1 && b >= 6 && b <= 11) || (a === 4 && b >= 8 && b <= 11) || (a === -6 && b >= 12) || (a === 6 && b >= 12);
      const lite = (b === 5 && a >= -5 && a <= -3) || (b === 6 && a >= -6 && a <= -5) || (b === 5 && a >= 2 && a <= 3) || (b === 6 && a === 2) || (a === -8 && b >= 12 && b <= 15);
      R(cx + a, y + b, 1, 1, dark ? HAIRD : lite ? HAIRL : HAIR);
    }
    R(cx - 2, y + 1, 1, 1, HAIRD); R(cx - 1, y, 1, 1, HAIRD); R(cx + 1, y + 1, 1, 1, HAIRD); R(cx + 2, y, 1, 1, HAIRD);
    // the feeding tube: a fat clear hose from the bugs-to-food screen into the mask, fast food rides it to the mouth
    const fq = s => [Math.round((1 - s) * (1 - s) * (x + 47) + 2 * (1 - s) * s * (x + 58) + s * s * (cx - 2)), Math.round((1 - s) * (1 - s) * (y + 37) + 2 * (1 - s) * s * (y + 42) + s * s * (y + 21))];
    for (let k = 0; k <= 60; k++) { const [a, b] = fq(k / 60); R(a - 3, b - 3, 7, 7, K); }
    for (let k = 0; k <= 60; k++) { const [a, b] = fq(k / 60); R(a - 2, b - 2, 5, 5, '#dff0f5'); R(a - 2, b - 2, 2, 1, '#ffffff'); }
    for (let k = 0; k < 5; k++) {
      const [a, b] = fq(on2 ? (t * 0.4 + k / 5) % 1 : 0.06 + k * 0.05), f = k % 3;
      if (f === 0) { R(a - 2, b - 2, 5, 2, '#e0a32e'); R(a - 1, b - 2, 1, 1, '#fff1b0'); R(a - 2, b, 5, 1, '#7ee081'); R(a - 2, b + 1, 5, 1, '#6a3a2a'); R(a - 2, b + 2, 5, 1, '#e0a32e'); }
      else if (f === 1) { R(a - 2, b - 2, 5, 2, '#f2c94c'); R(a - 1, b - 2, 1, 1, '#fff1b0'); R(a - 2, b, 5, 3, '#d9453f'); R(a, b + 1, 1, 1, '#f2c94c'); }
      else { R(a - 2, b - 1, 5, 3, '#c9853a'); R(a - 1, b - 2, 3, 1, '#c9853a'); R(a - 1, b - 1, 2, 1, '#e8b062'); }
    }
    R(x + 43, y + 31, 7, 12, K); R(x + 44, y + 32, 5, 10, '#d9453f'); R(x + 44, y + 35, 5, 2, '#f2c94c');
    disc(cx, y + 20, 2, K); R(cx - 1, y + 19, 3, 3, '#e9eef2'); R(cx, y + 20, 1, 1, on2 && tw ? '#9aa3ad' : '#c9d0d6');
    // the auto fap: it came with the rig and nobody plugged it in, the plug lies on the floor and the lamp stays dark
    const ell = (ex, ey, rx, ry, col) => { for (let dy = -ry; dy <= ry; dy++) { const w = Math.round(rx * Math.sqrt(1 - (dy / ry) ** 2)); R(ex - w, ey + dy, w * 2 + 1, 1, col); } };
    ell(x + 92, y + 62, 7, 6, K); ell(x + 92, y + 62, 6, 5, '#f4efe6'); ell(x + 91, y + 60, 3, 2, '#ffffff'); R(x + 88, y + 66, 9, 1, '#c9d0d6');
    R(x + 88, y + 62, 8, 1, '#7e929d'); R(x + 89, y + 64, 6, 1, '#7e929d'); R(x + 96, y + 59, 1, 1, '#7a2a2a'); R(x + 87, y + 68, 3, 2, K); R(x + 94, y + 68, 3, 2, K);
    R(x + 92, y + 68, 1, 2, K); R(x + 92, y + 70, 5, 1, K); R(x + 96, y + 69, 3, 3, K); R(x + 97, y + 70, 1, 1, '#7e929d'); R(x + 99, y + 69, 1, 1, '#c9d0d6'); R(x + 99, y + 71, 1, 1, '#c9d0d6');
    if (n === 0) for (let k = 0; k < 2; k++) { const s = (t * 0.6 + k / 2) % 1, zx = cx + 9 + Math.round(s * 6), zy = y + 8 - Math.round(s * 6); R(zx, zy, 3, 1, '#c9d0d6'); R(zx + 1, zy + 1, 1, 1, '#c9d0d6'); R(zx, zy + 2, 3, 1, '#c9d0d6'); }
    if (on4) for (let k = 0; k < 6; k++) { const a = t * 3 + k * Math.PI / 3; R(cx + Math.round(Math.cos(a) * 18), y + 36 + Math.round(Math.sin(a) * 30), 2, 2, k % 2 ? '#ffd54a' : '#7ee081'); }
  }

// ===== drawWorld(): широкое место Эталона =====
// рядом с SLOT_H из цеха пепси:
//   // the etalon owns a slot two columns wide, the pepsi extractor one three rows tall
//   const SLOT_W = (l, i) => l === 9 && i === 2 ? SW + 78 : SW;
// в цикле рисования мест, подсветки и кликов SW заменяется на SLOT_W(l, i); подпись станка — по правому краю широкого места.
// вместо machine(): if (s.machine === 'etalon') etalon(x, y, ww, hh, neigh(l, i).filter(j => works(l, j)).length);
// стопка товара и место сотрудника на широкой плитке не рисуются.
