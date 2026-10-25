// Черновик цеха 8 (манга): спрайты и сцена. В игру ещё не вставлено, вставляется в те же места, что и drafts/workshops-6-7.js.
// Цены и скорости станков не выбраны: value: 1 и desc: 'x' — заглушки. Манга — индекс цеха 7.

// ===== LOCS: после цеха голубей =====
    { name: 'Манга', sign: 'ЦЕХ 8 · МАНГА', cost: 1e14, wall: '#efe6cf', mortar: '#9a7650', floor: '#cfc890', grid: '#cfc890', plate: '#fbf8f0', frame: '#2b2135', item: '#fbf8f0', board: '#c8323c', boardHi: '#e05a5a', goods: 'manga', unit: 'Манга', unit1: 'Цена тома', start: 'sketch', desc: 'x', opened: 'x' }

// ===== LAYOUTS: после голубей =====
    // a cross of manga panels: a row of four, one below the second; the top one sits apart over the gap between the second and third
    // and touches nobody, so it gets no neighbour bonuses
    [[1.5, 0], [0, 1.25], [1, 1.25], [2, 1.25], [3, 1.25], [1, 2.25]]

// ===== MACH: перед belt =====
    sketch: { loc: 7, name: 'Стол набросков', short: 'НАБРОСКИ', rate: 0.9, value: 1, max: 3, desc: 'x' },
    ink: { loc: 7, name: 'Тушевальня', short: 'ТУШЬ', rate: 0.5, value: 1, max: 2, desc: 'x' },
    printer: { loc: 7, name: 'Печатный пресс', short: 'ПРЕСС', rate: 0.3, value: 1, max: 1, desc: 'x' },

// ===== ICON_DRAW: иконки карт станков 16×16 =====
    sketch: r => { r(1, 1, 13, 12, K); r(2, 2, 11, 10, '#fbf8f0'); r(3, 3, 9, 1, '#8f8aa0'); r(4, 5, 2, 3, K); r(8, 5, 2, 3, K); r(4, 5, 1, 1, '#ffffff'); r(8, 5, 1, 1, '#ffffff'); r(6, 9, 2, 1, '#e8737a'); r(2, 13, 2, 3, K); r(11, 13, 2, 3, K); for (let k = 0; k < 6; k++) { r(9 + k, 11 - k, 1, 1, k ? '#f2c94c' : K); r(10 + k, 11 - k, 1, 1, '#c98a2a'); } },
    ink: r => { r(3, 7, 10, 9, K); r(4, 8, 8, 7, '#1d1629'); r(4, 10, 8, 3, '#e9e2d0'); r(6, 11, 4, 1, '#c8323c'); r(5, 5, 6, 3, K); r(6, 6, 4, 1, '#3a3346'); r(5, 8, 1, 2, '#6a6280'); r(8, 4, 1, 2, '#9aa3ad'); for (let k = 2; k < 8; k++) { r(8 + (k >> 1), 6 - k, 1, 1, '#c98a52'); r(9 + (k >> 1), 6 - k, 1, 1, '#8a5a32'); } },
    printer: (r, d) => { r(0, 13, 16, 3, K); r(7, 2, 8, 12, K); r(8, 3, 6, 10, '#4a6a6a'); d(11, 6, 2, '#c9d0d6'); d(11, 10, 2, '#3a3346'); d(5, 8, 5, K); d(5, 8, 4, '#c8323c'); d(5, 8, 1, K); r(1, 7, 1, 1, '#f2c94c'); r(12, 7, 4, 3, K); r(13, 8, 3, 1, '#fbf8f0'); },

// ===== machine(): ветки перед 'sew' =====
    } else if (type === 'sketch') {
      // a drawing board on a desk, the pencil scribbles a big-eyed face, a red lamp leans over
      R(x + 3, y + 22, 2, 8, K); R(x + 25, y + 22, 2, 8, K); R(x + 3, y + 26, 24, 1, K);
      R(x, y + 20, 31, 3, K); R(x + 1, y + 21, 29, 1, '#c98a52');
      R(x + 2, y + 5, 22, 16, K); R(x + 3, y + 6, 20, 14, '#8a5a32'); R(x + 5, y + 7, 16, 12, '#fbf8f0');
      // the face: spiky hair, round head, huge eyes with shines, the chin is still a dashed guess
      const G = '#8f8aa0';
      R(x + 9, y + 9, 8, 1, G); R(x + 8, y + 10, 1, 4, G); R(x + 17, y + 10, 1, 4, G); R(x + 9, y + 14, 1, 2, G); R(x + 16, y + 14, 1, 2, G);
      R(x + 10, y + 16, 1, 1, G); R(x + 12, y + 17, 2, 1, G); R(x + 15, y + 16, 1, 1, G);
      R(x + 7, y + 8, 2, 1, G); R(x + 11, y + 8, 1, 1, G); R(x + 15, y + 8, 2, 1, G); R(x + 18, y + 9, 1, 1, G);
      R(x + 10, y + 11, 2, 3, K); R(x + 14, y + 11, 2, 3, K); R(x + 10, y + 11, 1, 1, '#ffffff'); R(x + 14, y + 11, 1, 1, '#ffffff'); R(x + 12, y + 15, 2, 1, '#e8737a');
      // the pencil circles over the chin
      const px = x + 15 + Math.round(Math.cos(t * 7) * 2), py = y + 16 + Math.round(Math.sin(t * 7));
      R(px, py, 1, 1, K); for (let k = 1; k < 7; k++) { R(px + k, py - k, 1, 1, '#f2c94c'); R(px + k + 1, py - k, 1, 1, '#c98a2a'); } R(px + 7, py - 8, 2, 2, '#e8a0a0');
      R(x + 4, y + 20, 1, 1, '#e8a0a0'); R(x + 8, y + 20, 1, 1, '#e8a0a0'); R(x + 20, y + 20, 1, 1, '#e8a0a0');
      R(x + 25, y + 18, 6, 2, K); R(x + 27, y + 6, 2, 12, K); R(x + 21, y + 4, 7, 2, K);
      R(x + 17, y + 1, 7, 5, K); R(x + 18, y + 2, 5, 3, '#d9535a'); R(x + 18, y + 2, 5, 1, '#ef8a8a'); R(x + 18, y + 6, 5, 1, 'rgba(255,241,176,.8)');
    } else if (type === 'ink') {
      // an inking stand: the page fills with speed lines one by one, a G-pen dips into a big ink pot, blots on the floor
      R(x + 3, y + 29, 5, 2, K); R(x + 1, y + 30, 2, 1, K); R(x + 20, y + 30, 3, 1, K);
      R(x + 4, y + 21, 2, 9, K); R(x + 16, y + 21, 2, 9, K); R(x + 5, y + 26, 12, 1, K);
      R(x + 1, y + 1, 21, 22, K); R(x + 2, y + 2, 19, 20, '#fbf8f0');
      R(x + 2, y + 10, 19, 1, K); R(x + 11, y + 2, 1, 8, K);
      for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) R(x + 3 + i * 2 + (j % 2), y + 4 + j * 2, 1, 1, '#9a9aa8');
      R(x + 13, y + 3, 7, 5, K); R(x + 14, y + 4, 5, 3, '#fbf8f0'); R(x + 15, y + 5, 3, 1, '#9a9aa8'); R(x + 14, y + 8, 1, 1, K);
      const n = Math.floor(t * 3) % 7;
      [15, 9, 13, 6, 17].forEach((len, k) => { if (k < n) R(x + 20 - len, y + 12 + k * 2, len, 1, K); });
      R(x + 24, y + 16, 6, 3, K); R(x + 25, y + 17, 4, 2, '#3a3346');
      R(x + 22, y + 19, 10, 11, K); R(x + 23, y + 20, 8, 9, '#1d1629'); R(x + 23, y + 23, 8, 4, '#e9e2d0'); R(x + 25, y + 24, 4, 2, '#c8323c'); R(x + 24, y + 20, 1, 2, '#6a6280');
      const dip = Math.floor(t * 2) % 2 * 2;
      R(x + 26, y + 15 + dip, 1, 2, '#9aa3ad'); for (let k = 2; k < 13; k++) { R(x + 26 + Math.floor(k / 3), y + 15 - k + dip, 1, 1, '#c98a52'); R(x + 27 + Math.floor(k / 3), y + 15 - k + dip, 1, 1, '#8a5a32'); }
    } else if (type === 'printer') {
      // a cast iron press: the red flywheel turns, the rollers spin, printed pages slide onto the stack of volumes
      R(x, y + 22, 26, 8, K); R(x + 1, y + 23, 24, 6, '#3f5a5a'); R(x + 1, y + 23, 24, 1, '#5f7a7a'); R(x + 3, y + 26, 3, 2, '#2a3a3a'); R(x + 19, y + 26, 3, 2, '#2a3a3a');
      R(x + 7, y + 3, 16, 20, K); R(x + 8, y + 4, 14, 18, '#4a6a6a'); R(x + 8, y + 4, 14, 1, '#6f8f8f');
      const a = t * 6;
      disc(x + 15, y + 9, 4, K); disc(x + 15, y + 9, 3, '#c9d0d6'); R(x + 15 + Math.round(Math.cos(a) * 2), y + 9 + Math.round(Math.sin(a) * 2), 1, 1, K);
      disc(x + 15, y + 17, 4, K); disc(x + 15, y + 17, 3, '#3a3346'); R(x + 15 + Math.round(Math.cos(-a) * 2), y + 17 + Math.round(Math.sin(-a) * 2), 1, 1, '#9aa3ad');
      disc(x + 5, y + 13, 6, K); disc(x + 5, y + 13, 5, '#c8323c'); disc(x + 5, y + 13, 2, K);
      for (let k = 0; k < 4; k++) { const b = a * 0.5 + k * Math.PI / 2; for (let r = 2; r < 5; r++) R(x + 5 + Math.round(Math.cos(b) * r), y + 13 + Math.round(Math.sin(b) * r), 1, 1, K); }
      R(x + 5 + Math.round(Math.cos(a * 0.5) * 5) - 1, y + 13 + Math.round(Math.sin(a * 0.5) * 5) - 1, 2, 2, '#f2c94c');
      // the stack of volumes on the right, a fresh page slides out between the rollers
      R(x + 23, y + 18, 9, 12, K);
      ['#c8323c', '#f4efe6', '#3f7ac2', '#f2c94c', '#f4efe6'].forEach((c, k) => { R(x + 24, y + 19 + k * 2, 7, 2, c); R(x + 24, y + 19 + k * 2, 7, 1, 'rgba(255,255,255,.35)'); });
      const p = (t * 0.8) % 1, sx = x + 17 + Math.round(p * 8);
      R(sx, y + 11, 9, 5, K); R(sx + 1, y + 12, 7, 3, '#fbf8f0'); R(sx + 2, y + 12, 2, 2, K); R(sx + 5, y + 13, 2, 1, K);

// ===== drawWorld(): стены, ветки перед последним else =====
    else if (l === 7) {
      // a manga studio behind shoji: paper panels in a wooden lattice, a round window with Fuji and sakura, a cork board of storyboards
      R(0, 0, W, 29, '#efe6cf'); for (let xx = 0; xx < W; xx += 16) R(xx, 0, 1, 28, '#9a7650'); for (const yy of [9, 19]) R(0, yy, W, 1, '#9a7650'); R(0, 0, W, 2, '#6a4a30');
      disc(30, 14, 13, '#6a4a30'); disc(30, 14, 12, K);
      for (let yy = 3; yy <= 25; yy++) for (let xx = 19; xx <= 41; xx++) {
        if ((xx - 30) ** 2 + (yy - 14) ** 2 > 121) continue;
        const fuji = yy >= 9 && Math.abs(xx - 34) <= (yy - 9) * 1.3;
        R(xx, yy, 1, 1, fuji ? (yy < 13 ? '#ffffff' : '#5b6fa8') : yy > 21 ? '#c9d9a8' : yy < 12 ? '#f6c9c4' : '#fbe3d6');
      }
      for (let k = 0; k < 12; k++) R(19 + k, 6 + Math.round(k * 0.6), 1, 1, '#5a3420');
      for (const [a, b] of [[21, 6], [25, 8], [28, 9], [23, 10]]) { R(a, b, 2, 2, '#f19ab2'); R(a, b, 1, 1, '#ffd6e2'); }
      const bx = W - 66; R(bx, 3, 54, 20, '#6a4a30'); R(bx + 1, 4, 52, 18, '#c9965a');
      for (let k = 0; k < 14; k++) R(bx + 2 + (k * 17) % 50, 5 + (k * 7) % 16, 1, 1, '#b5824a');
      for (let k = 0; k < 3; k++) { const px = bx + 3 + k * 12, py = 6 + (k % 2); R(px, py, 10, 13, '#fbf8f0'); R(px, py + 6, 10, 1, K); R(px + 5, py, 1, 6, K); R(px + 1, py + 8, 3, 3, '#9a9aa8'); R(px + 4, py - 1, 2, 2, '#d9535a'); }
      R(bx + 40, 5, 10, 14, '#fbf8f0'); R(bx + 40, 5, 10, 3, '#c8323c');
      for (let k = 0; k < 9; k++) R(bx + 41 + (k % 3) * 3, 10 + Math.floor(k / 3) * 3, 1, 1, k < 5 ? '#c8323c' : '#9a9aa8');
      R(bx + 46, 15, 3, 1, '#c8323c'); R(bx + 46, 17, 3, 1, '#c8323c'); R(bx + 45, 16, 1, 1, '#c8323c'); R(bx + 49, 16, 1, 1, '#c8323c');
    }

// ===== drawWorld(): пол и декор, перед 'if (l === 3)' =====
    if (l === 7) {
      // tatami: 40×20 mats laid like bricks, a dark green cloth edge along the long side, a faint weave
      for (let ty = 31, r = 0; ty < FL; ty += 20, r++) for (let tx = (r % 2) * -20; tx < W; tx += 40) {
        R(tx, ty, 40, 20, '#cfc890'); for (let k = 2; k < 40; k += 3) R(tx + k, ty + 2, 1, 17, '#c4bd84');
        R(tx, ty, 40, 2, '#4f6a42'); R(tx, ty, 1, 20, '#b5ae74');
      }
      const ell = (cx, cy, rx, ry, col) => { for (let dy = -ry; dy <= ry; dy++) { const w = Math.round(rx * Math.sqrt(1 - (dy / ry) ** 2)); R(cx - w, cy + dy, w * 2 + 1, 1, col); } };
      const shadow = (x, y, w) => R(x, y, w, 3, 'rgba(30,20,40,.28)');

      // top left: a kotatsu with mikans, cup ramen and energy cans; the mangaka sleeps half under the quilt in a hachimaki, a snot bubble swells
      const kx = 42, ky = 68;
      shadow(kx - 34, ky + 38, 116);
      R(kx - 5, ky + 6, 82, 32, K); R(kx - 4, ky + 7, 80, 30, '#d9734a');
      for (let i = 0; i < 10; i++) for (let j = 0; j < 4; j++) if ((i + j) % 2) { R(kx - 2 + i * 8, ky + 10 + j * 7, 3, 3, '#e8956a'); R(kx - 1 + i * 8, ky + 11 + j * 7, 1, 1, '#fbe3d6'); }
      R(kx - 4, ky + 7, 80, 2, '#e8956a');
      R(kx - 2, ky, 76, 8, K); R(kx - 1, ky + 1, 74, 6, '#a8693a'); R(kx - 1, ky + 1, 74, 1, '#c98a52');
      R(kx + 3, ky - 5, 15, 5, K); R(kx + 4, ky - 4, 13, 3, '#5b7fa8'); R(kx + 4, ky - 4, 13, 1, '#8fb8ea');
      for (const [a, b] of [[7, -7], [11, -9], [15, -7]]) { disc(kx + a, ky + b, 3, K); disc(kx + a, ky + b, 2, '#f29a3a'); R(kx + a - 1, ky + b - 1, 1, 1, '#ffc27a'); R(kx + a, ky + b - 3, 2, 1, '#57b04f'); }
      R(kx + 23, ky - 12, 11, 12, K); R(kx + 24, ky - 11, 9, 10, '#f4efe6'); R(kx + 24, ky - 8, 9, 3, '#c8323c'); R(kx + 23, ky - 13, 11, 2, K);
      R(kx + 30, ky - 19, 1, 7, '#c98a52'); R(kx + 32, ky - 18, 1, 6, '#c98a52');
      for (let k = 0; k < 3; k++) { const s = (t * 0.6 + k / 3) % 1; R(kx + 25 + k * 3 + Math.round(Math.sin(s * 7 + k) * 2), ky - 16 - s * 14, 1, 3, `rgba(255,255,255,${(0.9 * (1 - s)).toFixed(2)})`); }
      R(kx + 38, ky - 9, 5, 9, K); R(kx + 39, ky - 8, 3, 7, '#57b04f'); R(kx + 39, ky - 6, 3, 2, '#f2c94c');
      R(kx + 44, ky - 4, 8, 4, K); R(kx + 45, ky - 3, 6, 2, '#3fb6b0'); R(kx + 46, ky - 3, 1, 2, '#9a9aa8');
      R(kx + 54, ky - 8, 18, 8, K); for (let k = 0; k < 3; k++) R(kx + 55, ky - 7 + k * 2, 16, 1, k ? '#e9e2d0' : '#fbf8f0'); R(kx + 57, ky - 11, 13, 4, K); R(kx + 58, ky - 10, 11, 3, '#fbf8f0'); R(kx + 60, ky - 10, 3, 2, '#9a9aa8');
      // the mangaka: the hoodie goes under the quilt, the head lies on the tatami
      R(kx - 20, ky + 20, 17, 15, K); R(kx - 19, ky + 21, 16, 13, '#5b6fa8'); R(kx - 19, ky + 25, 16, 2, '#7f94c8');
      R(kx - 24, ky + 31, 10, 4, K); R(kx - 23, ky + 32, 8, 2, '#f2c7a5'); R(kx - 34, ky + 33, 9, 1, K); R(kx - 26, ky + 33, 2, 1, '#9aa3ad');
      const hx = kx - 33, hy = ky + 16;
      R(hx, hy, 14, 14, K); R(hx + 1, hy + 2, 12, 11, '#f2c7a5');
      R(hx - 1, hy - 3, 16, 7, K); R(hx - 3, hy - 1, 4, 3, K); R(hx + 3, hy - 6, 3, 4, K); R(hx + 9, hy - 5, 3, 3, K); R(hx + 13, hy - 4, 3, 3, K);
      R(hx + 1, hy + 4, 12, 2, '#f4efe6'); R(hx + 6, hy + 4, 2, 2, '#c8323c');
      R(hx + 3, hy + 8, 3, 1, K); R(hx + 8, hy + 8, 3, 1, K); R(hx + 6, hy + 11, 2, 1, '#9c4a4a'); R(hx + 2, hy + 10, 1, 1, '#e8968a'); R(hx + 11, hy + 10, 1, 1, '#e8968a');
      const bub = (t * 0.7) % 1, br = 1 + Math.floor(bub * 4);
      if (bub < 0.9) { disc(hx + 5, hy + 12 + br, br, K); disc(hx + 5, hy + 12 + br, br - 1, '#cfe8f2'); R(hx + 4, hy + 11 + br, 1, 1, '#ffffff'); }
      else for (const [a, b] of [[-3, 0], [3, -1], [0, 3], [5, 3]]) R(hx + 5 + a, hy + 15 + b, 1, 1, '#cfe8f2');
      for (let k = 0; k < 3; k++) {
        const s = (t * 0.5 + k / 3) % 1, zx = hx + 14 + Math.round(s * 12), zy = ky - 4 - Math.round(s * 18), c = `rgba(43,33,53,${(1 - s).toFixed(2)})`;
        R(zx, zy, 3, 1, c); R(zx + 1, zy + 1, 1, 1, c); R(zx, zy + 2, 3, 1, c);
      }

      // top right: a shelf of tankobon with a waving maneki-neko on top, a red phone on a stool rings with the deadline
      const sx = W - 72, sy = 56;
      shadow(sx, sy + 62, 66);
      R(sx, sy, 66, 63, K); R(sx + 1, sy + 1, 64, 61, '#8a5a32'); R(sx + 1, sy + 1, 2, 61, '#a8693a');
      const BC = ['#c8323c', '#f2c94c', '#3f7ac2', '#57b04f', '#f4efe6', '#9a6ac2', '#ff8a3a', '#3a3346'];
      for (let r = 0; r < 3; r++) {
        const by = sy + 20 + r * 21; R(sx + 1, by, 64, 2, K);
        for (let xx = sx + 4, k = r * 5; xx < sx + 60; k++) {
          const w = 4 + (k * 7) % 3, h = 14 + (k * 5) % 5, c = BC[(k * 3 + r) % BC.length];
          if (r === 1 && k === 9) { for (let d = 0; d < h; d++) R(xx + Math.floor(d / 3), by - 1 - d, w, 1, d ? c : K); xx += w + 6; continue; }
          R(xx, by - h, w, h, K); R(xx + 1, by - h + 1, w - 2, h - 1, c); R(xx + 1, by - h + 3, w - 2, 1, '#fbf8f0'); xx += w;
        }
      }
      const mx = sx + 40, my = sy - 16, wave = Math.floor(t * 3) % 2;
      R(mx, my + 6, 15, 10, K); R(mx + 1, my + 7, 13, 8, '#fbf8f0');
      R(mx + 1, my, 13, 8, K); R(mx + 2, my + 1, 11, 6, '#fbf8f0'); R(mx + 1, my - 2, 3, 3, K); R(mx + 11, my - 2, 3, 3, K); R(mx + 2, my - 1, 1, 1, '#f2a0a8'); R(mx + 12, my - 1, 1, 1, '#f2a0a8');
      R(mx + 9, my + 1, 3, 2, '#e8954a'); R(mx + 2, my + 9, 3, 3, '#3a3346');
      R(mx + 4, my + 3, 2, 1, K); R(mx + 9, my + 3, 2, 1, K); R(mx + 7, my + 5, 1, 1, '#e8737a');
      R(mx + 2, my + 7, 11, 1, '#c8323c'); R(mx + 6, my + 8, 3, 2, '#f2c94c');
      R(mx + 5, my + 11, 7, 4, K); R(mx + 6, my + 12, 5, 2, '#f2c94c');
      R(mx - 3, my + 1 + wave * 2, 4, 6, K); R(mx - 2, my + 2 + wave * 2, 2, 4, '#fbf8f0'); R(mx - 2, my + 2 + wave * 2, 2, 1, '#f2a0a8');
      // the phone: a red rotary set, the handset jumps on its cradle while it rings, the coiled cord hangs off the stool
      const px = W - 112, py = 90, ring = t % 4 < 1.2, sh = ring ? (Math.floor(t * 20) % 2 ? 1 : -1) : 0, lift = ring ? 2 : 0;
      shadow(px, py + 30, 30);
      R(px, py + 12, 30, 4, K); R(px + 1, py + 13, 28, 2, '#a8693a'); R(px + 3, py + 16, 2, 15, K); R(px + 25, py + 16, 2, 15, K); R(px + 4, py + 24, 22, 1, K);
      for (let k = 0; k < 6; k++) R(px + 26 + (k % 2), py + 14 + k * 2, 2, 1, '#c8323c');
      R(px + 6 + sh, py + 4, 18, 9, K); R(px + 5 + sh, py + 8, 20, 5, K); R(px + 7 + sh, py + 5, 16, 7, '#d9453f'); R(px + 6 + sh, py + 9, 18, 3, '#d9453f'); R(px + 7 + sh, py + 5, 16, 1, '#ef8a8a');
      disc(px + 15 + sh, py + 8, 3, K); disc(px + 15 + sh, py + 8, 2, '#f4efe6'); R(px + 15 + sh, py + 8, 1, 1, K);
      for (const [a, b] of [[-2, -1], [0, -2], [2, -1], [-2, 1]]) R(px + 15 + sh + a, py + 8 + b, 1, 1, '#9aa3ad');
      R(px + 8 + sh, py + 1 - lift, 14, 3, K); R(px + 9 + sh, py + 2 - lift, 12, 1, '#d9453f');
      for (const ex of [3, 21]) { R(px + ex + sh, py + 1 - lift, 6, 5, K); R(px + ex + 1 + sh, py + 2 - lift, 4, 3, '#d9453f'); R(px + ex + 1 + sh, py + 2 - lift, 4, 1, '#ef8a8a'); }
      if (ring) for (const [a, b, w, h] of [[-3, -2, 1, 4], [-5, -1, 1, 2], [33, -2, 1, 4], [35, -1, 1, 2]]) R(px + a, py + b, w, h, K);

      // bottom left: a glowing vending machine, now and then a can drops into the tray
      const vx = 16, vy = rowY(2.25) + 4, flick = Math.floor(t * 7) % 23 === 0;
      R(vx - 6, vy + 74, 56, 4, 'rgba(160,210,255,.3)');
      R(vx, vy, 44, 74, K); R(vx + 1, vy + 1, 42, 72, '#e9eef2'); R(vx + 1, vy + 1, 2, 72, '#ffffff'); R(vx + 41, vy + 1, 2, 72, '#c9d0d6');
      R(vx + 3, vy + 3, 38, 6, K); R(vx + 4, vy + 4, 36, 4, flick ? '#5b7fa8' : '#8fd3f0'); R(vx + 6, vy + 5, 14, 2, '#ffffff'); R(vx + 24, vy + 5, 14, 2, '#c8323c');
      R(vx + 3, vy + 11, 28, 34, K); R(vx + 4, vy + 12, 26, 32, flick ? '#3a4a5a' : '#cfeaf6');
      const CAN = ['#c8323c', '#3f7ac2', '#f2c94c', '#57b04f', '#f4efe6', '#ff8a3a', '#9a6ac2', '#3a3346'];
      for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) {
        const cx = vx + 6 + c * 6, cy = vy + 13 + r * 10, col = CAN[(r * 4 + c * 3) % CAN.length];
        R(cx, cy, 4, 7, K); R(cx + 1, cy + 1, 2, 5, col); R(cx + 1, cy + 2, 2, 1, '#ffffff');
        R(cx + 1, cy + 8, 2, 1, (r + c) % 5 ? '#7ee081' : '#ff5040');
      }
      R(vx + 33, vy + 12, 8, 24, K); R(vx + 34, vy + 13, 6, 22, '#c9d0d6'); R(vx + 36, vy + 15, 2, 5, K);
      R(vx + 35, vy + 23, 4, 3, '#1d1629'); R(vx + 35, vy + 24, 1, 1, '#ff5040'); R(vx + 37, vy + 24, 1, 1, '#ff5040'); R(vx + 36, vy + 29, 2, 4, K);
      R(vx + 5, vy + 52, 34, 14, K); R(vx + 6, vy + 53, 32, 12, '#3a3346');
      const drop = (t * 0.25) % 1;
      if (drop > 0.1 && drop < 0.7) { R(vx + 15, vy + 59, 10, 5, K); R(vx + 16, vy + 60, 8, 3, '#c8323c'); R(vx + 17, vy + 60, 6, 1, '#ff8a80'); }
      R(vx + 6, vy + 53, 32, 4, '#5a5662'); R(vx + 6, vy + 53, 32, 1, '#7a7682');

      // bottom right: a shiba sleeps on a purple zabuton, a cardboard standee of the magical girl heroine, crumpled drafts fly into the bin
      const dx = 176, dy = rowY(2.25) + 44, br2 = Math.round(Math.sin(t * 2));
      shadow(dx - 6, dy + 27, 54);
      R(dx - 6, dy + 14, 52, 13, K); R(dx - 5, dy + 15, 50, 11, '#7a3a8a'); R(dx - 5, dy + 15, 50, 2, '#9a5aaa'); for (const a of [-7, 45]) { R(dx + a, dy + 13, 2, 2, '#f2c94c'); R(dx + a, dy + 26, 2, 2, '#f2c94c'); }
      ell(dx + 22, dy + 12 - br2, 17, 9 + br2, K); ell(dx + 22, dy + 12 - br2, 16, 8 + br2, '#d98a3a'); ell(dx + 20, dy + 16, 10, 4, '#fbf3e4');
      ell(dx + 33, dy + 6 - br2, 6, 5, K); ell(dx + 33, dy + 6 - br2, 5, 4, '#d98a3a'); ell(dx + 33, dy + 6 - br2, 2, 2, '#fbf3e4');
      ell(dx + 6, dy + 14, 9, 7, K); ell(dx + 6, dy + 14, 8, 6, '#d98a3a'); ell(dx + 3, dy + 17, 5, 3, '#fbf3e4');
      const twitch = Math.floor(t * 0.8) % 5 === 0 ? 1 : 0;
      R(dx + 2, dy + 4 + twitch, 4, 5, K); R(dx + 3, dy + 5 + twitch, 2, 3, '#d98a3a'); R(dx + 9, dy + 4, 4, 5, K); R(dx + 10, dy + 5, 2, 3, '#d98a3a');
      R(dx + 3, dy + 13, 3, 1, K); R(dx + 9, dy + 13, 3, 1, K); R(dx - 2, dy + 16, 3, 2, K); R(dx + 1, dy + 19, 2, 1, K);
      // the standee: pink twin tails, huge blue eyes, a star wand that sparkles
      const gx0 = 226, gy0 = rowY(2.25) + 8;
      shadow(gx0, gy0 + 64, 34);
      R(gx0 + 3, gy0 + 60, 28, 4, K); R(gx0 + 4, gy0 + 61, 26, 2, '#c9a26a');
      ell(gx0 + 4, gy0 + 24, 5, 14, K); ell(gx0 + 30, gy0 + 24, 5, 14, K); ell(gx0 + 4, gy0 + 24, 4, 13, '#f58bb8'); ell(gx0 + 30, gy0 + 24, 4, 13, '#f58bb8');
      ell(gx0 + 17, gy0 + 13, 13, 12, K); ell(gx0 + 17, gy0 + 13, 12, 11, '#f58bb8');
      R(gx0 + 8, gy0 + 12, 18, 14, K); R(gx0 + 9, gy0 + 13, 16, 12, '#fbe3d6'); R(gx0 + 9, gy0 + 12, 16, 3, '#f58bb8'); R(gx0 + 12, gy0 + 15, 3, 1, '#f58bb8');
      for (const ex of [10, 19]) { R(gx0 + ex, gy0 + 16, 5, 6, K); R(gx0 + ex + 1, gy0 + 17, 3, 4, '#3f7ac2'); R(gx0 + ex + 1, gy0 + 19, 3, 2, '#8fd3f0'); R(gx0 + ex + 1, gy0 + 17, 1, 1, '#ffffff'); }
      R(gx0 + 16, gy0 + 23, 2, 1, '#e8737a'); R(gx0 + 10, gy0 + 22, 2, 1, '#f2a0a8'); R(gx0 + 23, gy0 + 22, 2, 1, '#f2a0a8');
      R(gx0 + 14, gy0 + 1, 6, 3, K); R(gx0 + 15, gy0 + 2, 4, 1, '#c8323c');
      for (let d = 0; d < 20; d++) { const w = 3 + Math.floor(d * 0.6); R(gx0 + 17 - w, gy0 + 26 + d, w * 2 + 1, 1, d === 19 ? K : d % 6 === 5 ? '#f58bb8' : '#fbf8f0'); R(gx0 + 16 - w, gy0 + 26 + d, 1, 1, K); R(gx0 + 18 + w, gy0 + 26 + d, 1, 1, K); }
      R(gx0 + 15, gy0 + 26, 5, 3, '#c8323c'); R(gx0 + 12, gy0 + 46, 3, 14, K); R(gx0 + 20, gy0 + 46, 3, 14, K); R(gx0 + 13, gy0 + 46, 1, 10, '#fbe3d6'); R(gx0 + 21, gy0 + 46, 1, 10, '#fbe3d6');
      R(gx0 + 29, gy0 + 22, 1, 18, K); R(gx0 + 27, gy0 + 15, 5, 5, K); R(gx0 + 28, gy0 + 14, 3, 7, K); R(gx0 + 28, gy0 + 16, 3, 3, '#f2c94c'); R(gx0 + 29, gy0 + 15, 1, 5, '#f2c94c');
      for (let k = 0; k < 4; k++) { const a = t * 3 + k * Math.PI / 2, sx2 = gx0 + 29 + Math.round(Math.cos(a) * 7), sy2 = gy0 + 17 + Math.round(Math.sin(a) * 7); R(sx2, sy2 - 1, 1, 3, k % 2 ? '#ffd54a' : '#fff1b0'); R(sx2 - 1, sy2, 3, 1, k % 2 ? '#ffd54a' : '#fff1b0'); }
      const pb = (cx, cy, r) => { disc(cx, cy, r + 1, K); disc(cx, cy, r, '#fbf8f0'); R(cx - 1, cy - 1, 2, 1, '#c9c2b4'); R(cx, cy + 1, 1, 1, '#c9c2b4'); };
      const tb = W - 40, tby = rowY(2.25) + 30;
      shadow(tb - 2, tby + 40, 30);
      R(tb, tby + 10, 26, 32, K); R(tb + 1, tby + 11, 24, 30, '#9aa3ad'); R(tb + 1, tby + 11, 3, 30, '#c9d0d6'); for (let k = 0; k < 4; k++) R(tb + 7 + k * 5, tby + 13, 1, 27, '#7f8a94');
      for (const [a, b, r] of [[6, 6, 4], [14, 4, 4], [21, 7, 3], [10, 0, 3]]) pb(tb + a, tby + b, r);
      R(tb - 1, tby + 8, 28, 4, K); R(tb, tby + 9, 26, 2, '#c9d0d6');
      for (const [a, b] of [[-8, 42], [-16, 46], [12, 52]]) pb(tb + a, tby + b, 2);
      const f = (t * 0.45) % 1, fx = 170 + (tb + 12 - 170) * f, fy = tby - 22 + 20 * f - Math.sin(f * Math.PI) * 26;
      pb(Math.round(fx), Math.round(fy), 2);

      // sakura petals drift across the tatami
      for (let k = 0; k < 6; k++) { const px2 = (k * 61 + t * 10) % W, py2 = 40 + (k * 47 + Math.round(Math.sin(t + k) * 6)) % (FL - 50); R(px2, py2, 2, 1, '#f6b8c8'); R(px2 + 1, py2 + 1, 1, 1, '#f19ab2'); }
    }

// ===== drawWorld(): прочие правки =====
// окна:        добавить l !== 7
// сетка пола:  добавить l !== 7
// colX/rowY:   округлять (c => OX + Math.round(c * 78), r => 36 + Math.round(r * 78)), иначе дробные ряды манги рисуются между пикселями
