// Черновик альтернативного цеха 9: цех снов (вместо живых бутылок пепси). В игру НЕ вставлен, ботом не проверен, вставка в другой сессии.
// Блоки ниже — готовый код в стиле игры (R, disc, K, t, W, FL, colX, rowY, SW, SH из game/index.html).
// Индекс цеха здесь G: при вставке заменить на настоящий индекс цеха снов.
// Схема игрока (по рисунку): пять станков и в центре Башня снов в виде золотой звезды на большом месте 2×2 (SW + 78 на SH + 78).
// Башня открывается вместе с цехом, её карты нет, переставить её нельзя, сотрудник ей не нужен (как Эталон).
// Места по кругу: 0 левое, 1 левое нижнее, 2 нижнее, 3 правое, 4 правое верхнее, 5 башня.
// Соседство задано списком, а не по клеткам (как у ледников): цепочка 0–1–2–3–4 и башня с местами 0, 1, 3, 4. Нижнее место 2 башни не касается.
// Синие полоски на рисунке — «нити снов»: в цеху они нарисованы между соседями и бегут светлячками, когда оба конца работают.
// Механика башни (решено, docs/workshops.md): башня держит один луч на одном из четырёх соседей, run.beam (место 0, 1, 3 или 4),
// run.beamCd — заряд 0..1. Нажатие на другого соседа перенаводит луч, пока заряд полный. На башне пять лучей звезды:
// верхний горит, когда работают все четыре соседа, остальные четыре — по одному на каждого соседа.
// Превью: node drafts/dream-preview.js снимает цех в копии игры, где цех снов стоит вместо пепси.

// ===== LOCS =====
//    { name: 'Цех снов', tab: 'Сны', sign: 'ЦЕХ 9 · ЦЕХ СНОВ', cost: 2e13, wall: '#1b2160', mortar: '#2a2f7c', floor: '#6c6ab4', grid: '#6c6ab4', plate: '#e7defa', frame: '#5b3f93', item: '#cfc6ff', board: '#4b3b9a', boardHi: '#7b6bd0', goods: 'dreams', unit: 'Сны', unit1: 'Цена сна', start: 'dreamtower', startSlot: 5, desc: 'x', opened: 'Цех снов открыт! Поставь к станку сотрудника' },

// ===== LAYOUTS =====
//    // five machines in a ring round the tower: left, lower left, bottom, right, upper right; the tower (2×2 slot) in the middle
//    [[0, 1.35], [0.2, 3], [2.4, 3.6], [3.55, 2], [2.6, 0], [1.3, 1.3]],
//    BIG[G] = 5 (слот башни 2×2), TALL и WIDE для G не заводить. Сетка 4,55 × 4,5 клетки: сцена шире привычных, зато нити видны.

// ===== SIZE: в начале правил (рядом с TALL и WIDE) и в SLOT_W / SLOT_H ===== (только описание, код ниже)
//    const BIG = { [G]: 5 };
//    const SLOT_W = (l, i) => WIDE[l] === i || BIG[l] === i ? SW + 78 : SW, SLOT_H = (l, i) => TALL[l] === i ? SH + 156 : BIG[l] === i ? SH + 78 : SH;
//    в местах, где проверяется «слот встроенный» (fixed, drag, выбор сотрудника): добавить BIG[l] === k, как у TALL и WIDE.

// ===== MACH =====
//    fluffer: { loc: G, name: 'Взбивалка подушек', short: 'ПОДУШКИ', rate: 0.9, value: 3e8, max: 1, desc: 'Взбивает перья и набивает подушки.' },
//    sheep: { loc: G, name: 'Овцесчётчик', short: 'ОВЦЫ', rate: 0.7, value: 5e8, max: 1, desc: 'Овцы прыгают через забор, пока кто-нибудь не уснёт.' },
//    dreamcatcher: { loc: G, name: 'Ловец снов', short: 'ЛОВЕЦ', rate: 0.5, value: 8e8, max: 1, desc: 'Ловит сны в паутину.' },
//    lullaby: { loc: G, name: 'Шарманка колыбельных', short: 'ШАРМАНКА', rate: 0.4, value: 1.2e9, max: 1, desc: 'Играет колыбельную, медленно, но дорого.' },
//    nightmare: { loc: G, name: 'Кошмароварка', short: 'КОШМАРЫ', rate: 0.25, value: 2e9, max: 1, desc: 'Варит кошмары, очень медленно, но очень дорого.' },
//    dreamtower: { loc: G, name: 'Башня снов', short: 'БАШНЯ', rate: 0, value: 0, max: 1, auto: ?, desc: 'Стартовая, на месте 2×2, без сотрудника. Механика: луч (docs/workshops.md).' },

// ===== ADJ: в начало adjacent() после if (i === j) return false; =====
    // the dream workshop: a chain 0–1–2–3–4 round the tower and the tower (5) touches 0, 1, 3 and 4
    if (l === G) { const a = Math.min(i, j), b = Math.max(i, j); return b === 5 ? a !== 2 : b - a === 1; }

/* ===== WALL: ветка стены в drawWorld (else if (l === G) { ... }) ===== */
      // a night sky: stars twinkle, a sleepy moon in a nightcap, a sea of clouds on the horizon,
      // a garland of paper stars, moons and dream catchers sways along the top, now and then a shooting star
      R(0, 0, W, 29, '#161b4c'); R(0, 0, W, 8, '#0f1340'); R(0, 8, W, 9, '#1b2160'); R(0, 17, W, 12, '#2a2f7c');
      for (let k = 0; k < 34; k++) R((k * 47 + 11) % W, 7 + (k * 29) % 15, 1, 1, Math.floor(t * 2 + k) % 5 ? '#9fb0ff' : '#ffffff');
      for (let k = 0; k < 5; k++) { const sx = (k * 71 + 23) % (W - 6), sy = 10 + (k * 13) % 11, tw = Math.floor(t * 1.5 + k * 2) % 4; if (tw === 0) { R(sx - 1, sy, 3, 1, '#ffffff'); R(sx, sy - 1, 1, 3, '#ffffff'); } }
      // the moon: a crescent with a closed eye and a blue nightcap with a pompom
      const mx = W - 30, my = 15;
      disc(mx, my, 9, '#2f3690'); disc(mx, my, 8, '#fff1b0'); disc(mx + 4, my - 2, 8, '#1b2160'); disc(mx + 4, my - 2, 7, '#1b2160');
      R(mx - 7, my - 1, 3, 1, '#c2a24a'); R(mx - 6, my + 2, 2, 1, '#e8789a');
      R(mx - 7, my - 11, 11, 3, K); R(mx - 6, my - 10, 9, 1, '#ffffff'); R(mx - 4, my - 13, 7, 3, K); R(mx - 3, my - 12, 5, 2, '#5b8fd6'); R(mx + 1, my - 15 + Math.floor(t * 2) % 2, 3, 3, K); R(mx + 2, my - 14 + Math.floor(t * 2) % 2, 1, 1, '#ffffff');
      // a sea of clouds on the horizon
      for (let xx = 0; xx < W; xx++) { const h = 3 + Math.round(Math.sin(xx / 7 + 1) * 2 + Math.sin(xx / 3.1) * 1); R(xx, 27 - h, 1, h + 2, '#4a4fa0'); R(xx, 27 - h, 1, 1, '#8c93e6'); }
      for (let k = 0; k < 3; k++) { const cx = ((t * 3 + k * 130) % (W + 60)) - 30, cy = 18 + k * 2; R(cx, cy, 22, 4, '#6a70c8'); R(cx + 3, cy - 2, 12, 2, '#6a70c8'); R(cx + 3, cy - 2, 12, 1, '#a9b0f4'); R(cx, cy + 3, 22, 1, '#4a4fa0'); }
      R(0, 27, W, 2, '#3a3f94'); R(0, 28, W, 1, K);
      // the garland: a sagging string, a star, a moon and a dream catcher hang from it and swing
      for (let xx = 0; xx < W; xx++) R(xx, 1 + Math.round(Math.sin(xx / W * Math.PI) * 4), 1, 1, '#c9a26a');
      for (let k = 0; k < 7; k++) {
        const gx = 14 + k * Math.round((W - 40) / 6), gy = 2 + Math.round(Math.sin(gx / W * Math.PI) * 4), sw = Math.round(Math.sin(t * 1.5 + k));
        if (gx > W - 50) continue;
        R(gx, gy + 1, 1, 3, '#c9a26a');
        if (k % 3 === 0) { R(gx + sw - 2, gy + 4, 5, 1, '#ffd54a'); R(gx + sw - 1, gy + 3, 3, 3, '#ffd54a'); R(gx + sw, gy + 6, 1, 1, '#ffd54a'); R(gx + sw, gy + 2, 1, 1, '#fff1a8'); }
        else if (k % 3 === 1) { R(gx + sw - 1, gy + 4, 3, 5, '#fff1b0'); R(gx + sw, gy + 5, 3, 3, '#161b4c'); R(gx + sw - 2, gy + 5, 1, 3, '#fff1b0'); }
        else { R(gx + sw - 2, gy + 4, 5, 5, '#5ee6e6'); R(gx + sw - 1, gy + 5, 3, 3, '#161b4c'); R(gx + sw, gy + 6, 1, 1, '#ffffff'); R(gx + sw - 1, gy + 9, 1, 3, '#f29ab5'); R(gx + sw + 1, gy + 9, 1, 2, '#ffffff'); }
      }
      const ss = (t * 0.12) % 1;
      if (ss < 0.18) { const sp = ss / 0.18; for (let k = 0; k < 7; k++) R(W * 0.1 + sp * 70 - k * 2, 6 + sp * 14 - k, 2, 1, `rgba(255,255,255,${(0.9 - k * 0.12).toFixed(2)})`); }

/* ===== FLOOR: блок пола и декора (if (l === G) { ... }), после R(0, 31, W, FL - 31, LT.floor) ===== */
      // a patchwork quilt: stitched squares in four lilacs, a little star in some of them
      const PATCH = ['#6c6ab4', '#7b76c4', '#665fae', '#8680cf'];
      for (let ty = 31; ty < FL; ty += 16) for (let tx = 0; tx < W; tx += 16) {
        const q = ((tx / 16) * 3 + ((ty - 31) / 16) * 2 + Math.floor(tx / 48)) % 4;
        R(tx, ty, 16, 16, PATCH[q]); R(tx, ty, 16, 1, 'rgba(255,255,255,.12)'); R(tx, ty + 15, 16, 1, 'rgba(20,10,60,.18)');
        for (let k = 0; k < 16; k += 4) { R(tx + k, ty + 1, 2, 1, '#b7b2ec'); R(tx + 1, ty + k, 1, 2, '#b7b2ec'); }
        if ((tx / 16 + (ty - 31) / 16) % 3 === 0) { R(tx + 7, ty + 6, 2, 4, '#c9c4f4'); R(tx + 6, ty + 7, 4, 2, '#c9c4f4'); }
      }
      const ell = (cx, cy, rx, ry, col) => { for (let dy = -ry; dy <= ry; dy++) { const w = Math.round(rx * Math.sqrt(1 - (dy / ry) ** 2)); R(cx - w, cy + dy, w * 2 + 1, 1, col); } };
      const shadow = (x, y, w) => R(x, y, w, 3, 'rgba(20,10,50,.28)');
      const zzz = (zx, zy, n) => { for (let k = 0; k < n; k++) { const s = (t * 0.35 + k / n) % 1, zs = 3 + Math.round(s * 2), px = zx + Math.round(s * 12) + (k % 2) * 3, py = zy - Math.round(s * 24), a = (0.9 * (1 - s)).toFixed(2); R(px, py, zs, 1, `rgba(255,255,255,${a})`); R(px, py + zs - 1, zs, 1, `rgba(255,255,255,${a})`); for (let d = 1; d < zs - 1; d++) R(px + zs - 1 - d, py + d, 1, 1, `rgba(255,255,255,${a})`); } };

      // dream threads: where two places touch a glowing thread runs between them, sparks travel along it when both ends work
      const P = LAYOUTS[G], SLS = state.locs[G].slots;
      const rc = i => i === 5 ? [colX(P[i][0]) + SW / 2 + 39, rowY(P[i][1]) + SH / 2 + 39] : [colX(P[i][0]) + SW / 2, rowY(P[i][1]) + SH / 2];
      const run = i => i === 5 || (SLS[i].machine && SLS[i].worker);
      for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) if (adjacent(G, i, j)) {
        const [ax, ay] = rc(i), [bx, by] = rc(j), len = Math.hypot(bx - ax, by - ay), n = Math.ceil(len / 2), on = run(i) && run(j);
        for (let k = 0; k <= n; k++) {
          const f = k / n, wv = Math.round(Math.sin(k * 0.35 - t * 3) * 1.4), px = ax + (bx - ax) * f + wv * (ay - by) / len, py = ay + (by - ay) * f + wv * (bx - ax) / len;
          R(px - 1, py, 4, 3, '#1d2b6b'); R(px, py, 2, 2, on ? '#5ee6e6' : '#3a6a9a');
          if (on && (k + Math.floor(t * 14)) % 9 === 0) R(px, py, 2, 2, '#ffffff');
        }
        if (on) { const f = (t * 0.6 + i * 0.37) % 1; R(ax + (bx - ax) * f - 2, ay + (by - ay) * f - 2, 5, 5, 'rgba(110,240,240,.4)'); R(ax + (bx - ax) * f - 1, ay + (by - ay) * f - 1, 3, 3, '#ffffff'); }
      }

      // the tower's beam: a bright braid of light from the star to the machine it aims at (run.beam, a place index 0, 1, 3 or 4);
      // while the tower recharges (run.beamCd < 1) the beam is thin and pale, the target glows once it is ready
      const bm = state.run.beam;
      if (bm != null && SLS[bm] && SLS[bm].machine) {
        const [ax, ay] = rc(5), [bx, by] = rc(bm), len = Math.hypot(bx - ax, by - ay), n = Math.ceil(len / 2), rd = (state.run.beamCd ?? 1) >= 1;
        for (let k = 0; k <= n; k++) {
          const f = k / n, wv = Math.round(Math.sin(k * 0.5 - t * 8) * (rd ? 2 : 1)), px = ax + (bx - ax) * f + wv * (ay - by) / len, py = ay + (by - ay) * f + wv * (bx - ax) / len;
          if (rd) { R(px - 3, py - 2, 7, 6, 'rgba(255,200,240,.35)'); R(px - 2, py - 1, 5, 4, '#ff9ac4'); R(px - 1, py, 3, 2, '#ffffff'); if ((k + Math.floor(t * 12)) % 5 === 0) R(px, py, 2, 2, '#ffffff'); }
          else R(px, py, 2, 2, 'rgba(255,214,230,.5)');
        }
        if (rd) { const [tx, ty] = [colX(P[bm][0]) + SW / 2, rowY(P[bm][1]) + SH / 2], g = 40 + Math.round(Math.sin(t * 4) * 2); disc(tx, ty, g, 'rgba(255,200,240,.16)'); disc(tx, ty, g - 8, 'rgba(255,200,240,.14)'); }
      }

      // dream bubbles drift up across the quilt, each with a little picture inside: a heart, a fish, a star, a note
      for (let k = 0; k < 6; k++) {
        const p = (t * 0.045 + k * 0.17) % 1, bx = (k * 67 + 40) % (W - 20) + 8 + Math.round(Math.sin(t * 0.8 + k * 2) * 4), by = FL - 8 - Math.round(p * (FL - 50)), br = 5 + k % 2;
        disc(bx, by, br, 'rgba(235,240,255,.35)'); disc(bx, by, br - 1, 'rgba(150,160,240,.35)'); R(bx - br + 2, by - br + 2, 2, 1, 'rgba(255,255,255,.8)');
        if (k % 4 === 0) { R(bx - 2, by - 1, 2, 2, '#f29ab5'); R(bx + 1, by - 1, 2, 2, '#f29ab5'); R(bx - 1, by + 1, 3, 1, '#f29ab5'); }
        else if (k % 4 === 1) { R(bx - 2, by, 4, 2, '#7fd0f0'); R(bx + 2, by - 1, 2, 4, '#7fd0f0'); }
        else if (k % 4 === 2) { R(bx - 1, by - 2, 2, 5, '#ffd54a'); R(bx - 2, by, 4, 1, '#ffd54a'); }
        else { R(bx - 1, by - 2, 1, 4, '#c98ae0'); R(bx - 2, by + 1, 2, 2, '#c98ae0'); R(bx, by - 2, 2, 1, '#c98ae0'); }
      }

      // top left: a heap of pillows with a sleeping tabby on top, it breathes and dreams
      const px0 = Math.round(colX(0) + 40), py0 = rowY(0) + 38;
      shadow(px0 - 38, py0 + 38, 78);
      const pillow = (cx, cy, w, h, col, hi, pip) => { R(cx - w / 2, cy, w, h, K); R(cx - w / 2 + 1, cy + 1, w - 2, h - 2, col); R(cx - w / 2 + 1, cy + 1, w - 2, 2, hi); R(cx - w / 2 + 1, cy + h - 3, w - 2, 1, pip); R(cx - w / 2 - 1, cy + 1, 3, 3, K); R(cx + w / 2 - 2, cy + 1, 3, 3, K); R(cx - w / 2 - 1, cy + h - 3, 3, 3, K); R(cx + w / 2 - 2, cy + h - 3, 3, 3, K); R(cx - 1, cy + h / 2 - 1, 3, 3, pip); };
      pillow(px0 - 6, py0 + 22, 62, 16, '#f29ab5', '#f8c2d3', '#d7739a'); pillow(px0 + 12, py0 + 12, 44, 14, '#b9a6f0', '#d8ccff', '#8f7ccf'); pillow(px0 - 14, py0 + 6, 38, 14, '#fff6ea', '#ffffff', '#e0c8a0');
      const br2 = Math.floor(t * 1.2) % 2;
      ell(px0 - 4, py0 - 1, 13, 6 + br2, K); ell(px0 - 4, py0, 12, 5 + br2, '#c98f4a'); R(px0 - 8, py0 - 4, 2, 4, '#8a5a2a'); R(px0 - 2, py0 - 5, 2, 4, '#8a5a2a'); R(px0 + 4, py0 - 3, 2, 3, '#8a5a2a');
      R(px0 - 18, py0 - 7, 11, 9, K); R(px0 - 17, py0 - 6, 9, 7, '#c98f4a'); R(px0 - 18, py0 - 10, 3, 4, K); R(px0 - 17, py0 - 9, 1, 2, '#f2a7c3'); R(px0 - 10, py0 - 10, 3, 4, K); R(px0 - 9, py0 - 9, 1, 2, '#f2a7c3');
      R(px0 - 16, py0 - 3, 3, 1, K); R(px0 - 12, py0 - 3, 3, 1, K); R(px0 - 14, py0 - 1, 1, 1, '#e8789a');
      for (let k = 0; k < 8; k++) R(px0 + 6 + Math.round(Math.cos(k * 0.45) * 10), py0 + 2 - Math.round(Math.sin(k * 0.45 + 0.4) * 8), 3, 3, K);
      for (let k = 0; k < 8; k++) R(px0 + 7 + Math.round(Math.cos(k * 0.45) * 10), py0 + 3 - Math.round(Math.sin(k * 0.45 + 0.4) * 8), 1, 1, '#c98f4a');
      zzz(px0 - 14, py0 - 14, 3);

      // top right: a bedside table with an alarm clock that never rings, it only twitches now and then; a glass of water
      const bx0 = W - 44, by0 = rowY(0) + 30;
      shadow(bx0 - 4, by0 + 76, 38);
      R(bx0, by0 + 30, 32, 46, K); R(bx0 + 1, by0 + 31, 30, 44, '#a8693a'); R(bx0 + 1, by0 + 31, 30, 3, '#d99a62'); R(bx0 + 3, by0 + 38, 26, 14, K); R(bx0 + 4, by0 + 39, 24, 12, '#8a5530'); R(bx0 + 14, by0 + 43, 4, 3, '#f2c94c');
      R(bx0 + 3, by0 + 56, 26, 14, K); R(bx0 + 4, by0 + 57, 24, 12, '#8a5530'); R(bx0 + 14, by0 + 61, 4, 3, '#f2c94c'); R(bx0 + 2, by0 + 76, 4, 3, K); R(bx0 + 26, by0 + 76, 4, 3, K);
      const tw = Math.floor(t * 0.4) % 9 === 0 ? Math.floor(t * 14) % 2 : 0;
      disc(bx0 + 10 + tw, by0 + 20, 9, K); disc(bx0 + 10 + tw, by0 + 20, 8, '#f29ab5'); disc(bx0 + 10 + tw, by0 + 20, 6, '#fff6ea');
      R(bx0 + 3 + tw, by0 + 10, 4, 4, K); R(bx0 + 4 + tw, by0 + 11, 2, 2, '#ffd54a'); R(bx0 + 13 + tw, by0 + 10, 4, 4, K); R(bx0 + 14 + tw, by0 + 11, 2, 2, '#ffd54a'); R(bx0 + 8 + tw, by0 + 10, 4, 2, K);
      R(bx0 + 10 + tw, by0 + 17, 1, 4, K); const ca = t * 0.5; R(bx0 + 10 + tw, by0 + 20, 1, 1, K); R(bx0 + 10 + tw + Math.round(Math.cos(ca) * 3), by0 + 20 + Math.round(Math.sin(ca) * 3), 1, 1, K);
      R(bx0 + 7 + tw, by0 + 28, 2, 3, K); R(bx0 + 12 + tw, by0 + 28, 2, 3, K);
      R(bx0 + 20, by0 + 14, 9, 16, K); R(bx0 + 21, by0 + 15, 7, 14, 'rgba(200,225,255,.55)'); R(bx0 + 21, by0 + 22, 7, 7, 'rgba(120,180,240,.7)'); R(bx0 + 22, by0 + 16, 1, 12, '#ffffff');

      // bottom right: a big teddy bear in a nightcap, sitting; the pompom swings, it opens one eye now and then
      const tx0 = W - 40, ty0 = rowY(3.2) + 28;
      shadow(tx0 - 22, ty0 + 40, 48);
      disc(tx0 - 16, ty0 + 30, 6, K); disc(tx0 - 16, ty0 + 30, 5, '#c98f4a'); disc(tx0 + 16, ty0 + 30, 6, K); disc(tx0 + 16, ty0 + 30, 5, '#c98f4a');
      disc(tx0, ty0 + 22, 15, K); disc(tx0, ty0 + 22, 14, '#c98f4a'); disc(tx0, ty0 + 25, 9, '#e8c07a'); R(tx0 - 10, ty0 + 12, 4, 6, '#e0a868');
      disc(tx0 - 11, ty0 + 4, 5, K); disc(tx0 - 11, ty0 + 4, 4, '#c98f4a'); disc(tx0 + 11, ty0 + 4, 5, K); disc(tx0 + 11, ty0 + 4, 4, '#c98f4a'); disc(tx0 - 11, ty0 + 5, 2, '#f2a7c3'); disc(tx0 + 11, ty0 + 5, 2, '#f2a7c3');
      disc(tx0, ty0 + 3, 11, K); disc(tx0, ty0 + 3, 10, '#c98f4a'); disc(tx0, ty0 + 7, 5, '#e8c07a'); R(tx0 - 1, ty0 + 5, 3, 2, K);
      const open = Math.floor(t * 0.6) % 5 === 0;
      R(tx0 - 6, ty0 + 1, 3, open ? 3 : 1, K); R(tx0 + 3, ty0 + 1, 3, 1, K); if (open) R(tx0 - 5, ty0 + 2, 1, 1, '#ffffff');
      const sw3 = Math.round(Math.sin(t * 1.5) * 2);
      for (let k = 0; k < 9; k++) { R(tx0 - 10 + k * 2 + (k > 6 ? sw3 : 0), ty0 - 6 - Math.round(k * 0.8) + (k > 5 ? 2 : 0), 6, 2, K); R(tx0 - 10 + k * 2 + 1 + (k > 6 ? sw3 : 0), ty0 - 6 - Math.round(k * 0.8), 4, 2, k % 2 ? '#ffffff' : '#5b8fd6'); }
      R(tx0 + 7 + sw3, ty0 - 12, 5, 5, K); R(tx0 + 8 + sw3, ty0 - 11, 3, 3, '#ffffff');
      R(tx0 - 24, ty0 + 34, 12, 6, K); R(tx0 - 23, ty0 + 35, 10, 4, '#e0a868'); R(tx0 + 13, ty0 + 34, 12, 6, K); R(tx0 + 14, ty0 + 35, 10, 4, '#e0a868');

      // bottom left: bunny slippers and a stack of storybooks with a cup of cocoa, steam curls up
      const sl0 = Math.round(colX(0)) + 8, sl1 = rowY(3.0) + 104;
      shadow(sl0 - 4, sl1 + 16, 90);
      for (const dx of [0, 24]) {
        R(sl0 + dx, sl1 + 2, 18, 10, K); R(sl0 + dx + 1, sl1 + 3, 16, 8, '#f8c2d3'); R(sl0 + dx + 1, sl1 + 3, 16, 2, '#ffffff'); R(sl0 + dx + 3, sl1 + 6, 8, 3, '#f29ab5');
        R(sl0 + dx + 11, sl1 - 6, 3, 8, K); R(sl0 + dx + 12, sl1 - 5, 1, 6, '#f2a7c3'); R(sl0 + dx + 4, sl1 - 6, 3, 8, K); R(sl0 + dx + 5, sl1 - 5, 1, 6, '#f2a7c3');
        R(sl0 + dx + 14, sl1 + 5, 2, 2, K);
      }
      const bk0 = sl0 + 56;
      for (let k = 0; k < 3; k++) { const bw = 26 - k * 3, bkx = bk0 + (k % 2) * 3, bky = sl1 + 6 - k * 6; R(bkx, bky, bw, 7, K); R(bkx + 1, bky + 1, bw - 2, 5, ['#d64545', '#5b8fd6', '#57b04f'][k]); R(bkx + 1, bky + 5, bw - 2, 1, '#fff6ea'); R(bkx + 3, bky + 2, 6, 1, '#ffd54a'); }
      R(bk0 + 6, sl1 - 20, 10, 8, K); R(bk0 + 7, sl1 - 19, 8, 6, '#ffffff'); R(bk0 + 7, sl1 - 17, 8, 3, '#7a4a2a'); R(bk0 + 16, sl1 - 18, 3, 4, K); R(bk0 + 17, sl1 - 17, 1, 2, '#ffffff');
      for (let k = 0; k < 3; k++) { const s2 = (t * 0.5 + k / 3) % 1; R(bk0 + 9 + Math.round(Math.sin(s2 * 6 + k) * 2), sl1 - 22 - Math.round(s2 * 14), 2, 2, `rgba(255,255,255,${(0.7 * (1 - s2)).toFixed(2)})`); }

/* ===== MARK: в цикле по местам, сразу после угловых уголков плиты (перед if (!s.machine)) ===== */
      if (i === state.run.beam && s.machine && (state.run.beamCd ?? 1) >= 1) { const g = Math.floor(t * 4) % 2; R(x, y, ww, 2, '#ff9ac4'); R(x, y + hh - 2, ww, 2, '#ff9ac4'); R(x, y, 2, hh, '#ff9ac4'); R(x + ww - 2, y, 2, hh, '#ff9ac4'); R(x + 2, y + 2, ww - 4, 1, g ? '#ffffff' : '#ffd6e6'); }

/* ===== TOWER: функция рядом с extractor/etalon, рисует Башню снов на слоте 2×2; on = [верхний луч, правый верхний, правый нижний, левый нижний, левый верхний] ===== */
  function tower(x, y, w, h, on, cd) {
    const cx = x + Math.round(w / 2), cy = y + 50, ell = (ex, ey, rx, ry, col) => { for (let dy = -ry; dy <= ry; dy++) { const ww = Math.round(rx * Math.sqrt(1 - (dy / ry) ** 2)); R(ex - ww, ey + dy, ww * 2 + 1, 1, col); } };
    const tri = (a, b, c, col) => {
      for (let yy = Math.ceil(Math.min(a[1], b[1], c[1])); yy <= Math.floor(Math.max(a[1], b[1], c[1])); yy++) {
        const xs = [];
        for (const [p, q] of [[a, b], [b, c], [c, a]]) if ((p[1] <= yy && q[1] > yy) || (q[1] <= yy && p[1] > yy)) xs.push(p[0] + (yy - p[1]) / (q[1] - p[1]) * (q[0] - p[0]));
        if (xs.length > 1) { const x0 = Math.floor(Math.min(...xs)), x1 = Math.ceil(Math.max(...xs)); R(x0, yy, x1 - x0, 1, col); }
      }
    };
    const verts = (r, ri) => Array.from({ length: 10 }, (_, k) => { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? ri : r; return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]; });
    // the night panel with a golden glow round the star
    R(x + 1, y + 1, w - 2, h - 2, '#171c52'); R(x + 1, y + 1, w - 2, 34, '#12164a'); R(x + 1, y + h - 50, w - 2, 49, '#222873');
    for (let k = 0; k < 18; k++) R(x + 5 + (k * 37) % (w - 10), y + 4 + (k * 23) % 100, 1, 1, Math.floor(t * 2 + k) % 4 ? '#9fb0ff' : '#ffffff');
    const pulse = Math.round(Math.sin(t * 1.4) * 2);
    disc(cx, cy, 58 + pulse, 'rgba(255,213,74,.07)'); disc(cx, cy, 50 + pulse, 'rgba(255,213,74,.09)'); disc(cx, cy, 42 + pulse, 'rgba(255,213,74,.12)');
    // the shaft: a round tower of indigo brick with a gold ring, a glowing arched window with a crescent in it
    const top = y + 86, bot = y + 122;
    for (let yy = top; yy <= bot; yy++) { const half = 14 + Math.round((yy - top) * 9 / (bot - top)); R(cx - half - 1, yy, half * 2 + 3, 1, K); R(cx - half, yy, half * 2 + 1, 1, '#3d4299'); R(cx - half, yy, 4, 1, '#5a60c0'); R(cx + half - 3, yy, 4, 1, '#2b2f78'); if ((yy - top) % 6 === 5) R(cx - half, yy, half * 2 + 1, 1, '#2f3380'); }
    for (let yy = top + 5, r = 0; yy < bot; yy += 6, r++) for (let bx = cx - 24 + (r % 2) * 5; bx < cx + 24; bx += 10) if (Math.abs(bx - cx) < 14 + (yy - top) * 9 / (bot - top) - 2) R(bx, yy - 5, 1, 5, '#2f3380');
    R(cx - 17, top - 1, 35, 5, K); R(cx - 16, top, 33, 3, '#e0a020'); R(cx - 16, top, 33, 1, '#ffd54a');
    const wg = 0.6 + 0.4 * Math.sin(t * 2);
    R(cx - 6, y + 96, 13, 17, K); R(cx - 5, y + 97, 11, 15, '#2b2f78'); R(cx - 5, y + 97, 11, 3, '#2b2f78');
    R(cx - 4, y + 98, 9, 14, `rgb(${Math.round(255 * wg)},${Math.round(225 * wg)},${Math.round(140 * wg)})`);
    disc(cx, y + 104, 3, '#2b2f78'); disc(cx + 1, y + 103, 3, `rgb(${Math.round(255 * wg)},${Math.round(225 * wg)},${Math.round(140 * wg)})`);
    // the star: black outline, then ten facets, each ray of its own colour
    const O = verts(43, 19), V = verts(40, 17);
    for (let k = 0; k < 10; k++) tri([cx, cy], O[k], O[(k + 1) % 10], K);
    const ray = (i, lit) => {
      const p = V[(2 * i + 9) % 10], q = V[2 * i], r = V[(2 * i + 1) % 10], m = [(p[0] + r[0]) / 2, (p[1] + r[1]) / 2];
      tri(p, q, m, lit ? '#ffe27a' : '#9c8742'); tri(m, q, r, lit ? '#ffc82e' : '#7c6a34');
    };
    for (let i = 0; i < 5; i++) ray(i, on[i]);
    for (let k = 0; k < 5; k++) { const a = V[2 * k + 1], b = V[(2 * k + 3) % 10]; tri([cx, cy], a, b, '#ffd54a'); }
    for (let i = 0; i < 5; i++) { const q = V[2 * i]; if (on[i] && Math.floor(t * 3 + i) % 3 === 0) { R(q[0] - 1, q[1] - 1, 3, 3, '#ffffff'); } }
    // the beam's lens in the middle of the star: a glowing orb that breathes, pink when the beam is ready, grey while it recharges
    const DR = cd >= 1 ? ['#f59ac0', '#ffd6e6'] : ['#9a86b8', '#cfc6e0'], ob = 6 + Math.round(Math.sin(t * 2.2));
    disc(cx, cy + 2, ob + 3, 'rgba(255,255,255,.25)'); disc(cx, cy + 2, ob + 1, K); disc(cx, cy + 2, ob, DR[0]); disc(cx - 1, cy + 1, Math.max(2, ob - 3), DR[1]); R(cx - 3, cy - 1, 2, 2, '#ffffff');
    // recharge ring round the orb: fills clockwise while the beam recharges, flashes when ready
    for (let k = 0; k < 24; k++) { const a = -Math.PI / 2 + k / 24 * Math.PI * 2, full = k / 24 < cd; R(cx + Math.round(Math.cos(a) * 11), cy + 2 + Math.round(Math.sin(a) * 11), 1, 1, full ? (cd >= 1 && Math.floor(t * 4) % 2 ? '#ffffff' : '#ff9ac4') : '#6a5a2a'); }
    // twinkles round the star
    for (let k = 0; k < 6; k++) { const a = k * 1.05 + 0.3, rr = 52 + (k % 2) * 5, tx = cx + Math.round(Math.cos(a) * rr), ty = cy + Math.round(Math.sin(a) * rr * 0.9), ph = Math.floor(t * 2 + k * 1.7) % 4; if (ph === 0 && tx > x + 4 && tx < x + w - 5) { R(tx - 1, ty, 3, 1, '#fff1a8'); R(tx, ty - 1, 1, 3, '#fff1a8'); } }
    // the pillow base: two pillows, tassels on the corners, a button; a Z drifts up from them
    const pill = (px, py, pw, ph2, col, hi, pip) => { R(px, py, pw, ph2, K); R(px + 1, py + 1, pw - 2, ph2 - 2, col); R(px + 1, py + 1, pw - 2, 2, hi); R(px + 1, py + ph2 - 3, pw - 2, 1, pip); for (const ex of [px - 1, px + pw - 3]) { R(ex, py + 1, 4, 4, K); R(ex + 1, py + 2, 2, 2, '#ffd54a'); R(ex, py + ph2 - 5, 4, 4, K); R(ex + 1, py + ph2 - 4, 2, 2, '#ffd54a'); } R(px + pw / 2 - 1, py + ph2 / 2 - 1, 3, 3, pip); };
    pill(cx - 44, y + h - 30, 88, 20, '#f29ab5', '#f8c2d3', '#d7739a');
    pill(cx - 32, y + h - 42, 64, 14, '#b9a6f0', '#d8ccff', '#8f7ccf');
    R(x + 5, y + h - 8, w - 10, 3, 'rgba(10,5,40,.35)');
    for (let k = 0; k < 2; k++) { const s = (t * 0.3 + k / 2) % 1, zs = 3 + Math.round(s * 2), px = cx + 30 + Math.round(s * 10), py = y + h - 46 - Math.round(s * 20), a = (0.9 * (1 - s)).toFixed(2); R(px, py, zs, 1, `rgba(255,255,255,${a})`); R(px, py + zs - 1, zs, 1, `rgba(255,255,255,${a})`); for (let d = 1; d < zs - 1; d++) R(px + zs - 1 - d, py + d, 1, 1, `rgba(255,255,255,${a})`); }
  }
/* в цикле по местам, перед веткой extractor: if (s.machine === 'dreamtower' && big) { const S2 = sl, ok = j => !!(S2[j].machine && S2[j].worker); tower(x, y, ww, hh, [ok(0) && ok(1) && ok(3) && ok(4), ok(4), ok(3), ok(1), ok(0)], state.run.beamCd ?? 1); } else */

/* ===== MACHINES: ветки machine(type, x, y), коробка около 32×30, вставлять перед } else if (type === 'dough') ===== */
    } else if (type === 'fluffer') {
      // a lavender drum fluffs feathers behind a round window, tufts puff out of the funnel, a plump pillow sits on the belt and plumps up
      const pl = Math.floor(t * 2) % 2;
      R(x + 1, y + 26, 30, 4, K); R(x + 2, y + 27, 28, 2, '#7d6bb8'); R(x + 2, y + 27, 28, 1, '#a396dc');
      R(x + 4, y + 3, 16, 6, K); R(x + 5, y + 4, 14, 4, '#d8ccff'); R(x + 5, y + 4, 14, 1, '#ffffff'); R(x + 8, y + 8, 8, 2, K);
      R(x + 1, y + 9, 21, 18, K); R(x + 2, y + 10, 19, 16, '#b9a6f0'); R(x + 2, y + 10, 19, 2, '#d8ccff'); R(x + 2, y + 10, 2, 16, '#d8ccff'); R(x + 19, y + 11, 2, 15, '#8f7ccf');
      disc(x + 11, y + 18, 6, K); disc(x + 11, y + 18, 5, '#2f2a5a');
      for (let k = 0; k < 7; k++) { const a = t * 5 + k * 0.9, rr = 1 + (k % 3); R(x + 11 + Math.round(Math.cos(a) * rr * 1.2), y + 18 + Math.round(Math.sin(a) * rr), 2, 1, k % 2 ? '#ffffff' : '#f8c2d3'); }
      R(x + 7, y + 14, 2, 1, 'rgba(255,255,255,.6)');
      R(x + 4, y + 11, 3, 2, K); R(x + 5, y + 11, 1, 1, '#ff7b7b'); R(x + 14, y + 11, 4, 2, K); R(x + 15, y + 11, 2, 1, Math.floor(t * 3) % 2 ? '#7ee081' : '#3d7a4a');
      R(x + 21, y + 22, 11, 5, K); R(x + 21, y + 23, 11, 3, '#5a5060'); for (let k = 0; k < 4; k++) R(x + 22 + (k * 3 + Math.floor(t * 6)) % 10, y + 24, 1, 1, '#9aa3ad');
      R(x + 22, y + 14 - pl, 9, 9 + pl, K); R(x + 23, y + 15 - pl, 7, 7 + pl, '#fff6ea'); R(x + 23, y + 15 - pl, 7, 1, '#ffffff'); R(x + 23, y + 20, 7, 1, '#f29ab5'); R(x + 26, y + 17, 1, 1, '#f29ab5');
      for (let k = 0; k < 3; k++) { const s = (t * 0.7 + k / 3) % 1; R(x + 7 + k * 4 + Math.round(Math.sin(s * 6 + k) * 2), y + 1 - Math.round(s * 12), 2, 2, `rgba(255,255,255,${(0.85 * (1 - s)).toFixed(2)})`); }
    } else if (type === 'sheep') {
      // a little night-sky screen: a sheep jumps the fence again and again, a counter under it ticks up
      const DG = ['111,101,101,101,111', '010,110,010,010,111', '111,001,111,100,111', '111,001,111,001,111', '101,101,111,001,001', '111,100,111,001,111', '111,100,111,101,111', '111,001,001,001,001', '111,101,111,101,111', '111,101,111,001,111'];
      const dig = (n, dx, dy, col) => DG[n].split(',').forEach((row, yy) => [...row].forEach((c, xx) => { if (c === '1') R(dx + xx, dy + yy, 1, 1, col); }));
      R(x + 1, y + 2, 30, 20, K); R(x + 2, y + 3, 28, 18, '#9b8fd8'); R(x + 4, y + 5, 24, 14, K); R(x + 5, y + 6, 22, 12, '#26307a');
      R(x + 5, y + 6, 22, 5, '#1f2766'); for (let k = 0; k < 4; k++) R(x + 7 + k * 5, y + 7 + (k % 2) * 2, 1, 1, Math.floor(t * 2 + k) % 3 ? '#9fb0ff' : '#ffffff');
      R(x + 22, y + 7, 3, 3, '#fff1b0'); R(x + 23, y + 7, 2, 2, '#26307a');
      R(x + 5, y + 15, 22, 3, '#3f9a5a'); R(x + 5, y + 15, 22, 1, '#7ee081');
      R(x + 14, y + 11, 2, 5, '#c9965a'); R(x + 18, y + 11, 2, 5, '#c9965a'); R(x + 13, y + 12, 8, 1, '#e3b47c'); R(x + 13, y + 14, 8, 1, '#e3b47c');
      const jp = (t * 0.5) % 1, sx = x + 4 + Math.round(jp * 20), sy = y + 14 - Math.round(Math.sin(jp * Math.PI) * 6);
      R(sx, sy - 3, 6, 4, '#ffffff'); R(sx + 1, sy - 4, 4, 1, '#ffffff'); R(sx + 5, sy - 3, 2, 3, K); R(sx + 1, sy + 1, 1, 1, K); R(sx + 4, sy + 1, 1, 1, K);
      R(x + 3, y + 22, 26, 8, K); R(x + 4, y + 23, 24, 6, '#7d6bb8'); R(x + 4, y + 23, 24, 1, '#a396dc');
      R(x + 6, y + 24, 20, 5, K); R(x + 7, y + 25, 18, 3, '#0f1a3a');
      const cnt = Math.floor(t * 0.5) % 100; dig(Math.floor(cnt / 10), x + 9, y + 24, '#5ee6e6'); dig(cnt % 10, x + 14, y + 24, '#5ee6e6'); dig(0, x + 19, y + 24, '#3a8a9a');
      R(x + 23, y + 25, 2, 2, Math.floor(t * 2) % 2 ? '#ff7b7b' : '#8a3a3a');
    } else if (type === 'dreamcatcher') {
      // a dream catcher in a wooden stand: a glowing dream floats in, sticks in the web and pulses, beads and feathers sway under the ring
      const cx = x + 16, cy = y + 12, sw = Math.round(Math.sin(t * 1.5));
      R(x + 5, y + 28, 22, 2, K); R(x + 6, y + 28, 20, 1, '#a8693a'); R(x + 12, y + 24, 8, 4, K); R(x + 13, y + 25, 6, 3, '#8a5530');
      disc(cx, cy, 12, K); disc(cx, cy, 11, '#e8789a'); disc(cx, cy, 10, '#f29ab5'); disc(cx, cy, 9, K); disc(cx, cy, 8, '#1f2461');
      for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + 0.4; for (let r = 1; r <= 8; r++) R(cx + Math.round(Math.cos(a) * r), cy + Math.round(Math.sin(a) * r), 1, 1, '#9fb0ff'); }
      for (const rr of [3, 5, 7]) for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8; R(cx + Math.round(Math.cos(a) * rr), cy + Math.round(Math.sin(a) * rr), 1, 1, '#c9d0ff'); }
      const dp = (t * 0.4) % 1, dx = dp < 0.5 ? Math.round((1 - dp * 2) * 9) : 0, dy2 = dp < 0.5 ? -Math.round((1 - dp * 2) * 9) : 0, gl = dp >= 0.5 ? Math.round(Math.sin(t * 8) * 1) : 0;
      disc(cx + dx, cy + dy2, 3 + gl, 'rgba(255,200,240,.45)'); disc(cx + dx, cy + dy2, 2, '#ffd6e6'); R(cx + dx - 1, cy + dy2 - 1, 1, 1, '#ffffff');
      R(cx - 1, cy - 1, 2, 2, '#ffd54a');
      R(x + 6 + sw, y + 23, 1, 4, '#c9d0d6'); R(x + 5 + sw, y + 27, 3, 3, K); R(x + 6 + sw, y + 28, 1, 1, '#f29ab5');
      R(x + 16 - sw, y + 23, 1, 3, '#c9d0d6'); R(x + 15 - sw, y + 26, 3, 4, K); R(x + 16 - sw, y + 27, 1, 2, '#7fd0f0');
      R(x + 25 + sw, y + 23, 1, 4, '#c9d0d6'); R(x + 24 + sw, y + 27, 3, 3, K); R(x + 25 + sw, y + 28, 1, 1, '#ffffff');
      R(cx - 1, y, 2, 1, K);
    } else if (type === 'lullaby') {
      // a wooden music box with a golden star: the crank turns, pins run over the comb, a little moon rocks on a spring, notes float up
      const rk = Math.round(Math.sin(t * 2) * 1.5), a = t * 4;
      R(x + 1, y + 14, 30, 16, K); R(x + 2, y + 15, 28, 14, '#a8693a'); R(x + 2, y + 15, 28, 2, '#d99a62'); R(x + 2, y + 27, 28, 2, '#7a4a2a');
      R(x + 4, y + 18, 16, 8, K); R(x + 5, y + 19, 14, 6, '#8a5530'); R(x + 11, y + 20, 2, 4, '#ffd54a'); R(x + 9, y + 21, 6, 2, '#ffd54a'); R(x + 11, y + 21, 2, 2, '#fff1a8');
      R(x + 3, y + 9, 22, 6, K); R(x + 4, y + 10, 20, 4, '#c9d0d6'); R(x + 4, y + 10, 20, 1, '#e9eef2'); for (let k = 0; k < 10; k++) R(x + 5 + k * 2, y + 13, 1, 2, '#7d8794');
      for (let k = 0; k < 7; k++) R(x + 5 + (k * 3 + Math.floor(t * 8)) % 20, y + 11, 1, 2, '#e8789a');
      disc(x + 27, y + 21, 4, K); disc(x + 27, y + 21, 3, '#f2c94c'); R(x + 27 + Math.round(Math.cos(a) * 3), y + 21 + Math.round(Math.sin(a) * 3), 3, 3, K); R(x + 28 + Math.round(Math.cos(a) * 3), y + 22 + Math.round(Math.sin(a) * 3), 1, 1, '#e8789a');
      R(x + 6 + rk, y + 3, 7, 2, '#fff1b0'); R(x + 6 + rk, y + 3, 7, 6, K); R(x + 7 + rk, y + 4, 5, 4, '#fff1b0'); R(x + 9 + rk, y + 4, 4, 4, '#1b2160'); R(x + 7 + rk, y + 6, 1, 1, '#e8789a');
      R(x + 9, y + 8, 2, 2, '#9aa3ad');
      for (let k = 0; k < 3; k++) { const s = (t * 0.6 + k / 3) % 1, nx = x + 14 + k * 5 + Math.round(Math.sin(s * 6 + k) * 2), ny = y + 8 - Math.round(s * 16), col = `rgba(${['255,213,74', '127,208,240', '248,194,211'][k]},${(0.95 * (1 - s)).toFixed(2)})`; R(nx, ny, 2, 2, col); R(nx + 1, ny - 3, 1, 3, col); R(nx + 2, ny - 3, 1, 1, col); }
    } else if (type === 'nightmare') {
      // a cauldron over a flame: purple brew bubbles, yellow eyes open in the brew, green vapour curls up, a ladle stirs on its own
      const st = Math.round(Math.sin(t * 2) * 2), fl = Math.floor(t * 8) % 3;
      R(x + 5, y + 28, 22, 3, K); R(x + 7, y + 28 - fl % 2, 3, 2, '#e0533a'); R(x + 13, y + 27 - (fl + 1) % 2, 4, 3, '#f2a64a'); R(x + 21, y + 28 - fl % 2, 3, 2, '#e0533a'); R(x + 14, y + 27, 2, 1, '#fff1a8');
      for (let dy = -9; dy <= 9; dy++) { const ww = Math.round(14 * Math.sqrt(1 - (dy / 10) ** 2)); R(x + 16 - ww - 1, y + 19 + dy, ww * 2 + 3, 1, K); R(x + 16 - ww, y + 19 + dy, ww * 2 + 1, 1, '#3a3346'); R(x + 16 - ww, y + 19 + dy, 3, 1, '#5a5060'); }
      R(x + 3, y + 26, 5, 4, K); R(x + 24, y + 26, 5, 4, K);
      R(x + 1, y + 11, 30, 5, K); R(x + 2, y + 12, 28, 3, '#5a5060'); R(x + 2, y + 12, 28, 1, '#7d7388');
      R(x + 4, y + 12, 24, 3, '#8a3fd0'); R(x + 4, y + 12, 24, 1, '#c28af0');
      for (let k = 0; k < 4; k++) { const b = Math.floor(t * 3 + k * 2) % 5; R(x + 6 + k * 6, y + 12 + (b === 0 ? 0 : 1), b === 0 ? 3 : 2, b === 0 ? 1 : 2, '#c28af0'); }
      if (Math.floor(t * 0.7) % 3 !== 2) { R(x + 12, y + 12, 2, 2, '#ffd54a'); R(x + 18, y + 12, 2, 2, '#ffd54a'); R(x + 13, y + 12, 1, 1, K); R(x + 19, y + 12, 1, 1, K); }
      R(x + 23 + st, y + 4, 2, 9, K); R(x + 24 + st, y + 5, 1, 8, '#c9965a'); R(x + 21 + st, y + 3, 5, 3, K); R(x + 22 + st, y + 4, 3, 1, '#a8693a');
      for (let k = 0; k < 3; k++) { const s = (t * 0.55 + k / 3) % 1; R(x + 8 + k * 7 + Math.round(Math.sin(s * 6 + k) * 3), y + 9 - Math.round(s * 12), 3, 2, `rgba(126,224,129,${(0.7 * (1 - s)).toFixed(2)})`); }
/* ===== ICONS: иконки карточек 16×16 в ICON_DRAW, в карты: m_fluffer: 'fluffer', m_sheep: 'sheep', m_dreamcatcher: 'dreamcatcher', m_lullaby: 'lullaby', m_nightmare: 'nightmare'. Строки: drafts/dream-icons.js ===== */
/* ===== END ===== */
