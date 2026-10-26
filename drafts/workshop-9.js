// Черновик цеха 9 (живые бутылки пепси): спрайты и сцены уже вставлены в игру, цены и скорости станков в docs/workshops.md (заглушки ниже устарели).
// Цены и скорости станков не выбраны: value: 1 и desc: 'x' — заглушки. Пепси — индекс цеха 8.
// Особенность цеха: Экстрактор пепси занимает место высотой в три ряда, открывается вместе с цехом
// и соседствует сразу со всеми тремя местами слева.

// ===== LOCS: после цеха манги =====
    { name: 'Пепси', sign: 'ЦЕХ 9 · ЖИВЫЕ БУТЫЛКИ', cost: 8e15, wall: '#cfe3ee', mortar: '#a8c4d4', floor: '#8fa3ae', grid: '#7e929d', plate: '#dfe7ec', frame: '#44505c', item: '#3f7ac2', board: '#13439a', boardHi: '#3f7ac2', goods: 'bottles', unit: 'Бутылки', unit1: 'Цена бутылки', start: 'extract', desc: 'x', opened: 'x' }

// ===== LAYOUTS: после манги =====
    // a column of three on the left, the extractor on the right: its slot is three rows tall, so it is anchored at row 0
    [[0, 0], [0, 1], [0, 2], [1, 0]]

// ===== adjacent(): экстрактор касается всех мест своего цеха =====
// const adjacent = (l, i, j) => {
//   if (l === 8 && (i === 3 || j === 3)) return true; // the extractor arms reach all three slots of its column
//   const [a, b] = [LAYOUTS[l][i], LAYOUTS[l][j]]; return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) === 1;
// };

// ===== MACH: перед belt =====
    extract: { loc: 8, name: 'Экстрактор пепси', short: 'ЭКСТРАКТОР', rate: 0.4, value: 1, max: 1, desc: 'x' },
    vat: { loc: 8, name: 'Чан брожения', short: 'ЧАН', rate: 0.9, value: 1, max: 1, desc: 'x' },
    fizz: { loc: 8, name: 'Газировочная помпа', short: 'ПОМПА', rate: 0.6, value: 1, max: 1, desc: 'x' },
    hatch: { loc: 8, name: 'Инкубатор', short: 'ИНКУБАТОР', rate: 0.35, value: 1, max: 1, desc: 'x' },

// ===== ICON_DRAW: иконки карт станков 16×16 =====
    extract: (r, d) => { r(2, 0, 12, 16, K); r(3, 1, 10, 14, '#d8dee4'); r(3, 1, 10, 2, '#13439a'); r(3, 12, 10, 3, '#d9453f'); r(5, 4, 6, 8, K); r(6, 5, 4, 7, '#1b2230'); r(6, 8, 4, 4, '#2f5fc4'); r(7, 6, 1, 1, '#8fd3f0'); r(0, 6, 3, 3, K); r(0, 7, 2, 1, '#9aa3ad'); r(14, 3, 2, 2, '#f2c94c'); },
    vat: (r, d) => { r(3, 2, 10, 14, K); r(4, 3, 8, 12, '#cfe8f2'); r(4, 7, 8, 8, '#3a2a2a'); r(4, 7, 8, 1, '#6a4a3a'); r(6, 9, 4, 6, K); r(7, 10, 2, 4, '#1d4a9a'); r(7, 11, 2, 1, '#f4efe6'); r(7, 9, 1, 1, '#ffffff'); r(2, 0, 12, 3, K); r(3, 1, 10, 1, '#9aa3ad'); r(6, 4, 1, 1, '#c9a26a'); r(9, 5, 1, 1, '#c9a26a'); },
    fizz: (r, d) => { r(1, 3, 6, 13, K); r(2, 4, 4, 11, '#3f7ac2'); r(2, 7, 4, 2, '#f4efe6'); r(8, 6, 8, 10, K); r(9, 7, 6, 8, '#c9963a'); r(10, 1, 3, 6, K); r(11, 2, 1, 5, '#c9d0d6'); d(12, 11, 3, '#f4efe6'); r(12, 9, 1, 3, K); r(0, 1, 2, 2, '#e9eef2'); },
    hatch: (r, d) => { r(0, 4, 16, 12, K); r(1, 5, 14, 10, '#9aa3ad'); r(3, 7, 10, 7, '#2a3a46'); r(6, 0, 4, 4, K); r(7, 1, 2, 2, '#ffd54a'); r(6, 8, 5, 6, K); r(7, 9, 3, 4, '#f4efe6'); r(7, 10, 3, 1, '#d9453f'); r(7, 9, 1, 1, '#2b2135'); r(9, 9, 1, 1, '#2b2135'); r(12, 9, 2, 1, '#7ee081'); },

// ===== machine(): ветки перед 'sew' =====
    } else if (type === 'vat') {
      // a glass fermenter: dark cola turns, bubbles climb, a half-grown bottle paddles about inside
      R(x + 2, y + 27, 28, 4, K); R(x + 3, y + 28, 26, 2, '#5f6878');
      R(x + 4, y + 5, 24, 23, K); R(x + 5, y + 6, 22, 21, '#cfe8f2'); R(x + 5, y + 6, 3, 21, '#eaf6fb');
      R(x + 5, y + 12, 22, 15, '#3a2a28'); R(x + 5, y + 12, 22, 1, '#6a4a3a');
      for (let k = 0; k < 7; k++) { const by = 26 - ((k * 5 + Math.floor(t * 13)) % 14); R(x + 7 + ((k * 7) % 19), y + by, 1, 1, '#c9a26a'); }
      // the young bottle: blue label, white band, big eyes, it paddles with one arm
      const bb = Math.round(Math.sin(t * 2) * 2), pad = Math.floor(t * 4) % 2;
      R(x + 13 + bb, y + 15, 7, 10, K); R(x + 14 + bb, y + 16, 5, 8, '#1d4a9a'); R(x + 14 + bb, y + 19, 5, 3, '#f4efe6'); R(x + 15 + bb, y + 20, 3, 1, '#d9453f');
      R(x + 15 + bb, y + 12, 3, 3, K); R(x + 16 + bb, y + 13, 1, 2, '#2f5fc4'); R(x + 15 + bb, y + 11, 3, 1, '#d9453f');
      R(x + 15 + bb, y + 17, 1, 1, '#ffffff'); R(x + 17 + bb, y + 17, 1, 1, '#ffffff');
      R(x + 12 + bb - pad, y + 18 + pad, 2, 2, K); R(x + 19 + bb + pad, y + 18 - pad, 2, 2, K);
      R(x + 2, y + 2, 28, 4, K); R(x + 3, y + 3, 26, 2, '#9aa3ad'); R(x + 3, y + 3, 26, 1, '#c9d0d6');
      R(x + 22, y - 3, 4, 5, K); R(x + 23, y - 2, 2, 4, '#c9d0d6'); R(x + 20, y - 5, 8, 3, K); R(x + 21, y - 4, 6, 1, '#e9eef2');
      disc(x + 9, y + 3, 3, K); disc(x + 9, y + 3, 2, '#f4efe6'); R(x + 9, y + 2, 1, 2, Math.floor(t * 3) % 2 ? '#d9453f' : '#2b2135');
    } else if (type === 'fizz') {
      // a brass carbonator: the piston pumps, the needle swings, the hose hisses gas into a waiting bottle
      R(x + 1, y + 24, 30, 6, K); R(x + 2, y + 25, 28, 4, '#5f6878'); R(x + 2, y + 25, 28, 1, '#7f8a94');
      R(x + 2, y + 5, 11, 19, K); R(x + 3, y + 6, 9, 17, '#3f7ac2'); R(x + 3, y + 6, 2, 17, '#7fb0e8'); R(x + 3, y + 11, 9, 4, '#f4efe6'); R(x + 5, y + 12, 5, 2, '#d9453f');
      R(x + 4, y + 2, 7, 4, K); R(x + 5, y + 3, 5, 2, '#9aa3ad');
      R(x + 15, y + 9, 15, 15, K); R(x + 16, y + 10, 13, 13, '#c9963a'); R(x + 16, y + 10, 13, 1, '#e8bc62'); R(x + 16, y + 20, 13, 1, '#a87a2a');
      const pp = Math.floor(t * 7) % 2 * 4;
      R(x + 20, y + 1 + pp, 5, 9, K); R(x + 21, y + 2 + pp, 3, 8, '#c9d0d6'); R(x + 19, y, 7, 3, K); R(x + 20, y + 1, 5, 1, '#e9eef2');
      disc(x + 23, y + 16, 5, K); disc(x + 23, y + 16, 4, '#f4efe6');
      const ang = -2.2 + (Math.sin(t * 5) + 1) * 1.1; R(x + 23 + Math.round(Math.cos(ang) * 3), y + 16 + Math.round(Math.sin(ang) * 3), 1, 1, '#d9453f'); R(x + 23, y + 16, 1, 1, K);
      for (let k = 0; k < 6; k++) R(x + 15 - k * 2, y + 24 + Math.round(Math.sin(k * 0.9) * 2), 2, 2, K);
      const hs = Math.floor(t * 6) % 3;
      for (let k = 0; k < 3; k++) if (k <= hs) R(x + 1 - k * 2, y + 22 - k, 2, 1, `rgba(220,240,255,${(0.8 - k * 0.2).toFixed(2)})`);
    } else if (type === 'hatch') {
      // the incubator: the lamp glows, the bottle egg rocks, a hatchling peeks through the crack and blinks
      R(x + 1, y + 10, 30, 20, K); R(x + 2, y + 11, 28, 18, '#9aa3ad'); R(x + 2, y + 11, 28, 1, '#c9d0d6');
      R(x + 4, y + 13, 24, 14, K); R(x + 5, y + 14, 22, 12, '#2a3a46');
      const warm = Math.floor(t * 2) % 2 ? '#ffd54a' : '#ffb35a';
      R(x + 5, y + 14, 22, 3, `rgba(255,190,90,.35)`);
      R(x + 12, y + 2, 8, 6, K); R(x + 13, y + 3, 6, 4, warm); R(x + 15, y + 8, 2, 2, K); R(x + 10, y + 8, 12, 1, 'rgba(255,200,110,.45)');
      // the egg: a fat bottle shape that rocks, cracks grow, a hatchling looks out of the top
      const rk = Math.round(Math.sin(t * 3) * 1.5), op = Math.floor(t * 2.5) % 4 === 0;
      R(x + 11 + rk, y + 17, 10, 9, K); R(x + 12 + rk, y + 18, 8, 7, '#f4efe6'); R(x + 12 + rk, y + 21, 8, 2, '#d9453f'); R(x + 12 + rk, y + 18, 2, 7, '#ffffff');
      R(x + 14 + rk, y + 14, 4, 3, K); R(x + 15 + rk, y + 15, 2, 2, '#e9e2d0');
      for (const [a, b] of [[3, 2], [4, 3], [5, 2], [6, 3]]) R(x + 11 + rk + a, y + 17 + b, 1, 1, '#9aa3ad');
      if (op) { R(x + 15 + rk, y + 13, 1, 1, '#2b2135'); R(x + 17 + rk, y + 13, 1, 1, '#2b2135'); R(x + 13 + rk, y + 12, 2, 2, '#d9453f'); }
      R(x + 25, y + 16, 4, 9, K); R(x + 26, y + 17, 2, 7, '#1b2230'); R(x + 26, y + 17 + (Math.floor(t * 4) % 3), 2, 1, '#7ee081');
      R(x + 4, y + 28, 24, 2, K); for (let k = 0; k < 4; k++) R(x + 6 + k * 6, y + 28, 3, 1, k === Math.floor(t * 2) % 4 ? '#7ee081' : '#4a5560');

// ===== extractor(): высокий станок, рядом с furnace() =====
  // the pepsi extractor fills a slot three rows tall: a tower of blue and red casing with a cola column
  // inside, three nozzle arms that feed the slots on its left, and a hatch where the live bottles come out
  function extractor(x, y, h) {
    const ell = (cx, cy, rx, ry, col) => { for (let dy = -ry; dy <= ry; dy++) { const w = Math.round(rx * Math.sqrt(1 - (dy / ry) ** 2)); R(cx - w, cy + dy, w * 2 + 1, 1, col); } };
    const bot = y + h;
    R(x + 2, bot - 4, 68, 4, 'rgba(30,20,40,.3)');
    // the intake pipe and funnel on top, steam puffs out of the vent beside it
    R(x + 28, y + 18, 18, 5, K); R(x + 29, y + 19, 16, 3, '#7f8a94'); R(x + 29, y + 19, 16, 1, '#a9b2bc');
    for (let dy = 0; dy < 7; dy++) R(x + 30 + dy, y + 23 + dy, 14 - dy * 2, 1, dy % 2 ? '#9aa3ad' : '#c9d0d6');
    R(x + 40, y + 12, 5, 8, K); R(x + 41, y + 13, 3, 7, '#5f6878');
    for (let k = 0; k < 3; k++) { const s2 = (t * 0.5 + k / 3) % 1; ell(x + 42 + Math.round(Math.sin(s2 * 6) * 3), y + 8 - s2 * 10, 2 + Math.round(s2 * 2), 1 + Math.round(s2 * 2), `rgba(210,225,235,${(0.65 * (1 - s2)).toFixed(2)})`); }
    // plinth with vents
    R(x + 4, bot - 28, 64, 28, K); R(x + 5, bot - 27, 62, 26, '#4a5560'); R(x + 5, bot - 27, 62, 2, '#6a7580');
    for (let k = 0; k < 5; k++) R(x + 10 + k * 11, bot - 22, 7, 12, '#374049');
    // the tower: white casing, a blue shoulder and a red foot, rivets and a cooling coil down the right side
    R(x + 12, y + 32, 48, h - 60, K); R(x + 13, y + 33, 46, h - 62, '#d8dee4'); R(x + 13, y + 33, 3, h - 62, '#f2f6f8'); R(x + 56, y + 33, 3, h - 62, '#b8c2ca');
    R(x + 13, y + 33, 46, 15, '#13439a'); R(x + 13, y + 33, 46, 2, '#3f7ac2'); R(x + 13, bot - 44, 46, 16, '#d9453f'); R(x + 13, bot - 44, 46, 2, '#ef8a8a');
    for (let yy = y + 54; yy < bot - 46; yy += 14) { R(x + 15, yy, 2, 2, '#9aa3ad'); R(x + 55, yy, 2, 2, '#9aa3ad'); }
    for (let yy = y + 56; yy < bot - 48; yy += 8) { R(x + 50, yy, 7, 3, K); R(x + 51, yy + 1, 5, 1, '#9aa3ad'); }
    // the glass column: the cola stays high, bubbles stream up, a bottle silhouette drifts past the sprayer
    const gy = y + 52, gh = h - 114;
    R(x + 21, gy - 3, 26, 3, '#9aa3ad'); R(x + 21, gy + gh, 26, 3, '#9aa3ad');
    R(x + 22, gy, 24, gh, K); R(x + 23, gy + 1, 22, gh - 2, '#101722');
    R(x + 26, gy + 1, 16, 4, K); R(x + 27, gy + 2, 14, 2, '#7f8a94');
    for (let k = 0; k < 5; k++) { const sp = Math.floor(t * 9 + k) % 3; R(x + 28 + k * 3, gy + 5 + sp, 1, 3 - sp, 'rgba(160,120,90,.8)'); }
    const lvl = Math.round((0.82 + 0.08 * Math.sin(t * 0.8)) * (gh - 10));
    R(x + 23, gy + gh - 1 - lvl, 22, lvl, '#3a2820'); R(x + 23, gy + gh - 1 - lvl, 22, 2, '#6a4a34'); R(x + 23, gy + gh - 1 - lvl, 4, lvl, '#4a362c');
    for (let k = 0; k < 16; k++) { const bx2 = x + 25 + (k * 7) % 19, by2 = gy + gh - 3 - ((k * 11 + Math.floor(t * 22)) % Math.max(10, lvl)); R(bx2, by2, 1, 1, k % 3 ? '#9a7a56' : '#c9a26a'); }
    const dft = (t * 0.25) % 1, dy2 = gy + gh - 14 - Math.round(dft * (gh - 26));
    R(x + 32, dy2, 6, 9, 'rgba(70,130,215,.55)'); R(x + 33, dy2 - 3, 4, 3, 'rgba(70,130,215,.55)'); R(x + 33, dy2 + 3, 4, 2, 'rgba(240,245,250,.5)');
    for (let k = 0; k < 4; k++) R(x + 24, gy + 8 + k * 9, 1, 4, 'rgba(255,255,255,.35)');
    // the three arms: one per slot on the left, each ends in a nozzle that drips
    for (const dy of [37, 115, 193]) {
      const ay = y + dy;
      R(x + 2, ay - 4, 12, 9, K); R(x + 3, ay - 3, 10, 7, '#7f8a94'); R(x + 3, ay - 3, 10, 1, '#a9b2bc');
      R(x - 4, ay - 3, 6, 7, K); R(x - 3, ay - 2, 4, 5, '#5f6878'); R(x - 3, ay - 2, 4, 1, '#9aa3ad');
      for (let k = 0; k < 4; k++) R(x + 4 + k * 3, ay - 5, 2, 1, '#9aa3ad');
      const dp = (t * 0.9 + dy / 90) % 1; R(x - 5, ay + 4 + Math.round(dp * 7), 1, 2, '#6a4a3a');
      disc(x + 16, ay, 3, K); disc(x + 16, ay, 2, Math.floor(t * 3 + dy) % 2 ? '#7ee081' : '#3f8a4f');
    }
    // the gauge cluster on the blue shoulder and the name plate on the red foot
    for (let k = 0; k < 3; k++) { const cx2 = x + 21 + k * 11; disc(cx2, y + 42, 4, K); disc(cx2, y + 42, 3, '#e9eef2'); const a2 = t * (2 + k) + k; R(cx2 + Math.round(Math.cos(a2) * 2), y + 42 + Math.round(Math.sin(a2) * 2), 1, 1, '#d9453f'); }
    R(x + 48, y + 38, 8, 8, K); R(x + 49, y + 39, 6, 6, '#f2c94c'); R(x + 51, y + 40, 2, 3, K); R(x + 51, y + 44, 2, 1, K);
    R(x + 17, bot - 41, 38, 10, K); R(x + 18, bot - 40, 36, 8, '#f4efe6'); R(x + 18, bot - 40, 36, 3, '#13439a');
    for (let k = 0; k < 6; k++) R(x + 21 + k * 6, bot - 36, 4, 2, '#d9453f'); R(x + 21, bot - 34, 30, 1, '#9aa3ad');
    // the hatch at the foot: a live bottle pops up, looks around and ducks back in
    const up = Math.max(0, Math.min(1, Math.sin(t * 0.9) * 2.5 - 0.9)), pk = Math.round(up * 13);
    R(x + 28, bot - 24, 26, 20, K); R(x + 29, bot - 23, 24, 18, '#1b2230'); R(x + 29, bot - 7, 24, 2, '#2f3a46');
    if (pk > 2) {
      const bx3 = x + 41, by3 = bot - 6 - pk, st = Math.floor(t * 7) % 2;
      R(bx3 - 4, by3, 9, pk, K); R(bx3 - 3, by3 + 1, 7, pk - 1, '#1d4a9a');
      if (pk > 7) { R(bx3 - 3, by3 + 4, 7, 3, '#f4efe6'); R(bx3 - 2, by3 + 5, 5, 1, '#d9453f'); }
      R(bx3 - 2, by3 - 4, 5, 4, K); R(bx3 - 1, by3 - 3, 3, 3, '#2f5fc4'); R(bx3 - 2, by3 - 5, 5, 1, '#d9453f');
      R(bx3 - 2 + st, by3 + 2, 1, 1, '#ffffff'); R(bx3 + 1 + st, by3 + 2, 1, 1, '#ffffff');
      if (pk > 9) { R(bx3 - 7, by3 + 3 + st, 3, 2, K); R(bx3 + 4, by3 + 3 - st, 3, 2, K); }
    }
    R(x + 24, bot - 24, 3, 20, K); R(x + 55, bot - 24, 3, 20, K);
  }

// ===== drawWorld(): места — высокое место экстрактора =====
// рядом с SW/SH:
//   // the pepsi extractor owns a slot three rows tall, so its frame and machine cover the whole column
//   const SLOT_H = (l, i) => l === 8 && i === 3 ? SH + 156 : SH;
// в цикле рисования мест и в цикле подсветки SH заменяется на hh = SLOT_H(l, i):
    sl.forEach((s, i) => {
      const x = SX(i), y = SY(i), hh = SLOT_H(l, i), tall = hh !== SH;
      if (LT.plates) { R(x, y, SW, hh, K); R(x + 1, y + 1, SW - 2, hh - 2, LT.plates[i]); R(x + 1, y + 1, SW - 2, 1, 'rgba(255,255,255,.3)'); for (let k = 0; k < 5; k++) R(x + 6 + k * 14, y + 1 + (k % 2) * 30, 1, 1, 'rgba(255,255,255,.5)'); }
      else { R(x, y, SW, hh, LT.frame || '#857d72'); R(x + 1, y + 1, SW - 2, hh - 2, LT.plate); }
      for (const [ax, ay, dx, dy] of [[x + 2, y + 2, 1, 1], [x + SW - 3, y + 2, -1, 1], [x + 2, y + hh - 3, 1, -1], [x + SW - 3, y + hh - 3, -1, -1]]) {
        R(dx > 0 ? ax : ax - 5, ay, 6, 1, '#e9c046'); R(ax, dy > 0 ? ay : ay - 5, 1, 6, '#e9c046');
      }
      if (!s.machine) { const pc = LT.plates ? 'rgba(255,255,255,.45)' : '#b2a99c'; R(x + SW / 2 - 1, y + hh / 2 - 7, 2, 14, pc); R(x + SW / 2 - 7, y + hh / 2 - 1, 14, 2, pc); }
      else {
        if (tall) extractor(x, y, hh); else machine(s.machine, x + 36, y + 18);
        if (s.worker && s.machine !== 'belt' && !tall) pile(x + 52, y + 63, 1 + Math.floor((t * 0.3 + i) % 3), LT.item);
        s.upg.forEach((u, k) => { R(x + 4 + k * 5, y + 4, 4, 6, K); R(x + 5 + k * 5, y + 5, 2, 4, RAR_COL[CARDS[u].rar]); });
      }
      if (s.worker) {
        const bob = Math.floor(t * 2 + i) % 2, on = skillOn(s.worker), w = state.workers[s.worker], wy = y + hh - 34;
        if (on) for (let k = 0; k < 6; k++) { const a = t * 4 + k * Math.PI / 3; R(x + 17 + Math.round(Math.cos(a) * 13), wy + 16 + Math.round(Math.sin(a) * 15), 2, 2, k % 2 ? '#ffd54a' : '#fff1b0'); }
        gx.drawImage(sprOf(s.worker), x + 6, wy - bob);
        if (w.skill) {
          const f = skillBar(s.worker)[1];
          R(x + 5, y + hh - 5, 25, 3, K); R(x + 6, y + hh - 4, Math.round(23 * f), 1, on ? '#ffd54a' : '#6fa3b5');
        }
      }
    });

// ===== drawWorld(): стены, ветки перед последним else =====
    else if (l === 8) {
      // a sealed lab: pale tiles, a pipe run along the top, a round tank window where a bottle floats, a hazard plate
      R(0, 0, W, 29, '#cfe3ee');
      for (let yy = 0; yy < 29; yy += 7) R(0, yy, W, 1, '#a8c4d4');
      for (let xx = 0; xx < W; xx += 14) R(xx, 0, 1, 29, '#a8c4d4');
      R(0, 0, W, 5, K); R(0, 1, W, 3, '#7f8a94'); R(0, 1, W, 1, '#a9b2bc');
      for (let xx = 6; xx < W; xx += 34) { R(xx, 0, 3, 5, '#5f6878'); R(xx + 1, 5, 1, 3, '#5f6878'); }
      // the tank window: green brine, bubbles, a bottle hangs in it and watches the room
      disc(36, 15, 14, '#44505c'); disc(36, 15, 12, K); disc(36, 15, 11, '#1f4a44');
      for (let k = 0; k < 8; k++) { const a = (k * 97 + t * 40) % 360 * Math.PI / 180, rr = 3 + (k % 4) * 2; R(36 + Math.round(Math.cos(a) * rr), 15 + Math.round(Math.sin(a) * rr), 1, 1, '#6fbf9a'); }
      const fl2 = Math.round(Math.sin(t * 1.3) * 2), blink = (t % 3.4) < 0.18;
      R(33, 11 + fl2, 7, 10, K); R(34, 12 + fl2, 5, 8, '#1d4a9a'); R(34, 15 + fl2, 5, 2, '#f4efe6'); R(35, 16 + fl2, 3, 1, '#d9453f');
      R(35, 8 + fl2, 3, 3, K); R(36, 9 + fl2, 1, 2, '#2f5fc4');
      if (!blink) { R(35, 13 + fl2, 1, 1, '#ffffff'); R(37, 13 + fl2, 1, 1, '#ffffff'); } else R(35, 13 + fl2, 3, 1, K);
      for (let k = 0; k < 4; k++) R(40, 20 - ((k * 5 + Math.floor(t * 11)) % 12), 1, 1, '#9fe6c4');
      R(24, 8, 3, 1, 'rgba(255,255,255,.5)'); R(22, 10, 1, 4, 'rgba(255,255,255,.5)');
      // the hazard plate and a shelf of sample bottles on the right
      R(W - 48, 7, 16, 14, K); R(W - 47, 8, 14, 12, '#f2c94c'); R(W - 41, 10, 2, 6, K); R(W - 41, 17, 2, 2, K);
      R(W - 28, 18, 24, 2, K); R(W - 27, 18, 22, 1, '#9aa3ad');
      for (let k = 0; k < 4; k++) { const sx2 = W - 26 + k * 6, sh2 = 9 + (k % 2) * 2; R(sx2, 18 - sh2, 4, sh2, K); R(sx2 + 1, 19 - sh2, 2, sh2 - 1, ['#2f5fc4', '#d9453f', '#6fbf9a', '#9a6ac2'][k]); R(sx2 + 1, 16 - sh2, 2, 1, '#e9eef2'); }
    }

// ===== drawWorld(): пол и декор, перед 'if (l === 3)' =====
    if (l === 8) {
      // sealed lab floor: big grey plates with a drain, cola puddles fizz, the side strips hold the lab kit
      for (let ty = 31; ty < FL; ty += 26) for (let tx = 0; tx < W; tx += 26) { R(tx, ty, 26, 26, '#8fa3ae'); R(tx, ty, 26, 1, '#9eb1bb'); R(tx, ty + 25, 26, 1, '#7e929d'); R(tx + 25, ty, 1, 26, '#7e929d'); }
      const ell = (cx, cy, rx, ry, col) => { for (let dy = -ry; dy <= ry; dy++) { const w = Math.round(rx * Math.sqrt(1 - (dy / ry) ** 2)); R(cx - w, cy + dy, w * 2 + 1, 1, col); } };
      const shadow = (x, y, w) => R(x, y, w, 3, 'rgba(30,20,40,.28)');
      // a live bottle, used for the ones loose on the floor
      const bottle = (bx, by, dir, blink) => {
        R(bx - 4, by, 9, 12, K); R(bx - 3, by + 1, 7, 10, '#1d4a9a'); R(bx - 3, by + 4, 7, 3, '#f4efe6'); R(bx - 2, by + 5, 5, 1, '#d9453f');
        R(bx - 2, by - 4, 5, 4, K); R(bx - 1, by - 3, 3, 3, '#2f5fc4'); R(bx - 2, by - 5, 5, 1, '#d9453f');
        if (blink) R(bx - 2, by + 2, 4, 1, K); else { R(bx - 2, by + 2, 1, 1, '#ffffff'); R(bx + 1, by + 2, 1, 1, '#ffffff'); }
        R(bx - 4 + dir, by + 12, 2, 2, K); R(bx + 2 + dir, by + 12, 2, 2, K);
      };
      // the drain in the middle of the floor, a puddle of cola creeps out of it and fizzes
      const dx = Math.round(W / 2), dy = FL - 12;
      ell(dx, dy, 14, 5, '#7e929d'); ell(dx, dy, 10, 3, '#44505c');
      for (let k = -2; k <= 2; k++) R(dx + k * 3, dy - 3, 1, 7, '#2a333c');
      ell(dx - 22, dy - 2, 11, 4, 'rgba(60,35,30,.55)'); for (let k = 0; k < 5; k++) R(dx - 30 + (k * 7 + Math.floor(t * 6)) % 18, dy - 4 - (k % 2), 1, 1, '#c9a26a');

      // left strip: a gas cylinder rack and a tall specimen tube where a bottle floats upside down and waves
      const gx2 = 6, gy2 = 44;
      shadow(gx2 - 2, gy2 + 52, 38);
      R(gx2 - 2, gy2 + 46, 38, 5, K); R(gx2 - 1, gy2 + 47, 36, 3, '#5f6878');
      for (let k = 0; k < 3; k++) {
        const cx2 = gx2 + 2 + k * 12, col = ['#3f7ac2', '#d9453f', '#6fbf9a'][k];
        R(cx2, gy2 + 8, 9, 38, K); R(cx2 + 1, gy2 + 9, 7, 36, col); R(cx2 + 1, gy2 + 9, 2, 36, 'rgba(255,255,255,.35)');
        R(cx2 + 1, gy2 + 22, 7, 4, '#f4efe6'); R(cx2 + 3, gy2 + 3, 3, 6, K); R(cx2 + 4, gy2 + 4, 1, 5, '#c9d0d6'); R(cx2 + 2, gy2, 5, 4, K); R(cx2 + 3, gy2 + 1, 3, 2, '#9aa3ad');
      }
      R(gx2 - 1, gy2 + 16, 38, 2, K); R(gx2, gy2 + 16, 36, 1, '#9aa3ad');
      const tx2 = 14, ty2 = FL - 92;
      shadow(tx2 - 10, ty2 + 74, 26);
      R(tx2 - 10, ty2 + 66, 26, 8, K); R(tx2 - 9, ty2 + 67, 24, 6, '#44505c'); R(tx2 - 9, ty2 + 67, 24, 1, '#6a7580');
      R(tx2 - 7, ty2, 20, 68, K); R(tx2 - 6, ty2 + 1, 18, 66, '#cfe8f2'); R(tx2 - 6, ty2 + 1, 3, 66, '#eaf6fb');
      R(tx2 - 6, ty2 + 8, 18, 59, 'rgba(60,140,120,.5)');
      for (let k = 0; k < 9; k++) R(tx2 - 4 + (k * 5) % 15, ty2 + 62 - ((k * 9 + Math.floor(t * 14)) % 52), 1, 1, '#9fe6c4');
      const fb = Math.round(Math.sin(t * 1.1) * 3), wv = Math.floor(t * 4) % 2;
      R(tx2 - 2, ty2 + 26 + fb, 9, 13, K); R(tx2 - 1, ty2 + 27 + fb, 7, 11, '#1d4a9a'); R(tx2 - 1, ty2 + 31 + fb, 7, 3, '#f4efe6'); R(tx2, ty2 + 32 + fb, 5, 1, '#d9453f');
      R(tx2, ty2 + 39 + fb, 5, 4, K); R(tx2 + 1, ty2 + 39 + fb, 3, 3, '#2f5fc4');
      R(tx2, ty2 + 29 + fb, 1, 1, '#ffffff'); R(tx2 + 3, ty2 + 29 + fb, 1, 1, '#ffffff'); R(tx2, ty2 + 35 + fb, 3, 1, '#f4efe6');
      R(tx2 - 5, ty2 + 24 + fb + wv, 3, 2, K); R(tx2 + 6, ty2 + 24 + fb - wv, 3, 2, K);
      R(tx2 - 9, ty2 - 4, 24, 5, K); R(tx2 - 8, ty2 - 3, 22, 3, '#7f8a94'); R(tx2 - 1, ty2 - 9, 6, 5, K); R(tx2, ty2 - 8, 4, 4, '#5f6878');

      // right strip: a cage of caught bottles, one rattles the bars, a clipboard of escapes and a mop in a bucket
      const cx3 = W - 40, cy3 = 48;
      shadow(cx3 - 2, cy3 + 62, 38);
      R(cx3 - 2, cy3 + 56, 38, 6, K); R(cx3 - 1, cy3 + 57, 36, 4, '#44505c');
      R(cx3, cy3, 34, 56, K); R(cx3 + 1, cy3 + 1, 32, 54, '#2a333c');
      for (let k = 0; k < 7; k++) R(cx3 + 2 + k * 5, cy3 + 1, 2, 54, '#8a949e');
      for (const yy of [cy3 + 1, cy3 + 27, cy3 + 53]) R(cx3 + 1, yy, 32, 2, '#8a949e');
      const sh3 = Math.floor(t * 9) % 2;
      bottle(cx3 + 10 + sh3, cy3 + 10, Math.floor(t * 6) % 2, (t % 2.6) < 0.16);
      bottle(cx3 + 24, cy3 + 36, 1 - sh3, (t % 3.9) < 0.16);
      R(cx3 + 4, cy3 + 40, 7, 10, K); R(cx3 + 5, cy3 + 41, 5, 8, '#9a3a3a'); R(cx3 + 5, cy3 + 44, 5, 2, '#f4efe6');
      R(cx3 + 12, cy3 - 6, 10, 7, K); R(cx3 + 13, cy3 - 5, 8, 5, '#f2c94c'); R(cx3 + 15, cy3 - 4, 4, 1, K); R(cx3 + 15, cy3 - 2, 4, 1, K);
      const px2 = W - 30, py2 = FL - 78;
      shadow(px2 - 6, py2 + 44, 26);
      R(px2 - 4, py2, 20, 26, K); R(px2 - 3, py2 + 1, 18, 24, '#e9eef2'); R(px2 - 3, py2 + 1, 18, 4, '#9aa3ad');
      for (let k = 0; k < 5; k++) { R(px2 - 1, py2 + 8 + k * 4, 11 - (k % 3) * 2, 1, '#7e929d'); R(px2 + 12, py2 + 8 + k * 4, 2, 1, k < 2 ? '#d9453f' : '#7ee081'); }
      R(px2 + 1, py2 - 3, 8, 4, K); R(px2 + 2, py2 - 2, 6, 2, '#c9d0d6');
      const bx3 = W - 34, by3 = FL - 40;
      shadow(bx3 - 2, by3 + 22, 26);
      R(bx3, by3 + 6, 22, 16, K); R(bx3 + 1, by3 + 7, 20, 14, '#3f7ac2'); R(bx3 + 1, by3 + 7, 20, 2, '#7fb0e8'); R(bx3 + 2, by3 + 9, 18, 2, '#2b1f22');
      R(bx3 + 12, by3 - 22, 2, 28, K); R(bx3 + 13, by3 - 21, 1, 26, '#c98a52');
      for (let k = 0; k < 7; k++) R(bx3 + 8 + k * 2, by3 + 2 + (k % 3), 1, 5, '#d8cfc0');
      // a bottle that got out sneaks along the bottom of the room
      const esc = (t * 0.22) % 1, ex = Math.round(40 + esc * (W - 110)), ey = FL - 18;
      bottle(ex, ey, Math.floor(t * 7) % 2, (t % 4.3) < 0.16);
      for (let k = 0; k < 3; k++) { const s = (esc * 3 + k / 3) % 1; R(ex - 10 - k * 5, ey + 12, 2, 1, `rgba(60,35,30,${(0.4 * (1 - s)).toFixed(2)})`); }
    }

// ===== drawWorld(): прочие правки =====
// окна:        добавить l !== 8
// сетка пола:  добавить l !== 8
// клики по местам: попадание в высокое место считать по SLOT_H, а не по SH
