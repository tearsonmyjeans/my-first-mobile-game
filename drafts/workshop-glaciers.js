// Черновик альтернативного цеха 7: ледники. В игру НЕ вставлен, вставка в другой сессии.
// Блоки ниже — готовый код в стиле игры (R, disc, K, t, W, FL, colX, rowY, SW, SH из game/index.html).
// Индекс цеха здесь G: при вставке заменить на настоящий индекс ледников.
// Схема игрока: четыре льдины ромбом (верх, лево, право, низ), на каждой одно место. Льдины касаются по кругу:
// верхняя и нижняя касаются левой и правой, напротив друг друга не касаются. Каждую смену льдины дрейфуют:
// станки вместе с сотрудниками и улучшениями меняются местами, и соседи у каждого станка меняются.
// В цеху всегда холодно. В метель (run.storm) скорость сотрудников ×0,5, сила ×3, бонусы к скорости и удача не действуют (docs/workshops.md).

// ===== LOCS =====
//    { name: 'Ледники', sign: 'ЦЕХ 7 · ЛЕДНИКИ', tab: 'Ледники', cost: 2e10, wall: '#1e2a4a', mortar: '#2a3d63', floor: '#2f5a86', grid: '#2f5a86', plate: '#e3f1f8', frame: '#7fb6d6', item: '#bfe6f8', board: '#2a4f7a', boardHi: '#4f86b8', goods: 'ice', unit: 'Лёд', unit1: 'Цена глыбы', start: 'icesaw', desc: 'x', opened: 'x' },

// ===== LAYOUTS =====
//    // four floes in a diamond: top, left, right, bottom; they touch in a ring, not across
//    [[1, 0], [0, 1], [2, 1], [1, 2]],
// NEW_LOC_SLOTS: у цеха 4 места вместо 5 у голубей.

/* ===== ADJ: в начало adjacent() после if (i === j) return false; ===== */
    // floes touch in a ring: the top and bottom ones touch the left and right ones
    if (l === G) return (i === 0 || i === 3) !== (j === 0 || j === 3);

/* ===== DRIFT: в начале смены (startShift), станки уплывают на другие льдины вместе со всем, что на них стоит ===== */
    // the floes drift: a shuffle that always moves something, the slot objects travel whole
    if (state.locs[G].unlocked) { const S = state.locs[G].slots, keep = S.slice(); do { for (let k = S.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [S[k], S[j]] = [S[j], S[k]]; } } while (S.every((s, k) => s === keep[k])); }

/* ===== WALL: ветка стены в drawWorld (else if (l === G) { ... }) ===== */
      // polar night: stars, a green and violet aurora that ripples, icebergs on the horizon
      R(0, 0, W, 29, '#1e2a4a'); R(0, 0, W, 7, '#182240'); R(0, 18, W, 11, '#2a3d63');
      for (let k = 0; k < 26; k++) R((k * 47 + 13) % W, (k * 29) % 17, 1, 1, Math.floor(t * 2 + k) % 5 ? '#9fb0d8' : '#ffffff');
      for (let xx = 0; xx < W; xx++) {
        const a = 8 + Math.round(Math.sin(xx / 23 + t * 0.6) * 3 + Math.sin(xx / 9 - t) * 1), b = 3 + Math.round(Math.sin(xx / 31 - t * 0.4) * 2);
        R(xx, a, 1, 2, 'rgba(110,230,170,.6)'); R(xx, a + 2, 1, 4, 'rgba(110,230,170,.22)'); R(xx, b, 1, 2, 'rgba(190,130,235,.4)');
      }
      const berg = (bx, w, h) => { for (let k = 0; k < w; k++) { const hh = Math.max(1, Math.round(h * Math.pow(1 - Math.abs(k / w * 2 - 1), 0.6)) + (k % 7 === 3 ? 1 : 0)); R(bx + k, 27 - hh, 1, hh, k < w * 0.45 ? '#e8f4fa' : '#a9cde0'); R(bx + k, 27 - hh, 1, 1, '#ffffff'); } };
      for (const [bx, w, h] of [[2, 34, 10], [40, 16, 5], [W - 74, 24, 6], [W - 40, 38, 12]]) berg(bx, w, h);
      R(0, 27, W, 2, '#3a5a86'); for (let xx = (Math.floor(t * 4) % 6); xx < W; xx += 6) R(xx, 27, 3, 1, '#5a8ab8');

/* ===== FLOOR: блок пола и декора (if (l === G) { ... }), после R(0, 31, W, FL - 31, LT.floor) ===== */
      // icy sea: ripples drift past, slush floats
      for (let k = 0; k < 70; k++) { const wx = (k * 61 + Math.floor(t * 5) + (k % 4) * 17) % (W + 8) - 4, wy = 33 + (k * 37) % (FL - 36); R(wx, wy, 4, 1, k % 3 ? '#3f6e9c' : '#5a8ab8'); }
      for (let k = 0; k < 12; k++) { const sx = (k * 83 + Math.floor(t * 3)) % W, sy = 40 + (k * 53) % (FL - 50); R(sx, sy, 2, 1, '#cfe6f2'); }
      const ell = (cx, cy, rx, ry, col) => { for (let dy = -ry; dy <= ry; dy++) { const w = Math.round(rx * Math.sqrt(1 - (dy / ry) ** 2)); R(cx - w, cy + dy, w * 2 + 1, 1, col); } };
      // a floe: a ragged squarish slab, snow on top, a blue ice side, a pale ring of ice under the water
      const floe = (cx, cy, rx, ry, seed) => {
        const rows = [];
        for (let dy = -ry; dy <= ry; dy++) { const u = dy / ry; rows.push([cy + dy, Math.round(rx * Math.pow(1 - u ** 6, 0.5) + Math.sin(dy * 0.7 + seed) * 2 + Math.sin(dy * 0.21 + seed * 3) * 3)]); }
        for (const [yy, w] of rows) R(cx - w - 3, yy + 2, w * 2 + 7, 4, 'rgba(160,220,240,.18)');
        for (const [yy, w] of rows) R(cx - w - 1, yy - 1, w * 2 + 3, 7, K);
        for (const [yy, w] of rows) R(cx - w, yy + 1, w * 2 + 1, 4, '#6fa6cc');
        for (const [yy, w] of rows) { R(cx - w, yy, w * 2 + 1, 1, '#eef6fb'); R(cx - w, yy, 2, 1, '#ffffff'); R(cx + w - 3, yy, 4, 1, '#cfe4f0'); }
        for (let k = 0; k < 9; k++) { const [yy, w] = rows[(k * 7 + seed) % rows.length]; R(cx - w + 3 + (k * 13) % Math.max(1, w * 2 - 6), yy, 2, 1, '#d6e9f4'); }
        // a crack runs across
        for (let k = 0; k < 10; k++) R(cx - rx + 4 + k * 3, cy + ry - 8 + Math.round(Math.sin(k * 1.3 + seed) * 2), 3, 1, '#a9cde0');
      };
      const P = LAYOUTS[G], fx = i => colX(P[i][0]) + SW / 2, fy = i => rowY(P[i][1]) + SH / 2;
      // foam laps around every floe
      for (let i = 0; i < P.length; i++) for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + t * 0.3 + i, r = 46 + Math.round(Math.sin(t * 2 + k) * 1); R(fx(i) + Math.round(Math.cos(a) * r), fy(i) + Math.round(Math.sin(a) * r), 3, 1, 'rgba(230,245,255,.5)'); }
      for (let i = 0; i < P.length; i++) floe(fx(i), fy(i), 42, 41, i * 5 + 1);
      // where two floes touch, the ice heaps into a ridge and creaks
      for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) if (adjacent(G, i, j)) {
        const mx = Math.round((fx(i) + fx(j)) / 2), my = Math.round((fy(i) + fy(j)) / 2), c = Math.floor(t * 3 + i + j) % 3;
        for (const [a, b, w, h] of [[-7, 0, 6, 5], [-2, -4, 6, 8], [3, -1, 5, 6], [-4, 3, 9, 4]]) { R(mx + a - 1, my + b - 1, w + 2, h + 2, K); R(mx + a, my + b, w, h, '#dff0f8'); R(mx + a, my + b, w, 1, '#ffffff'); R(mx + a + w - 1, my + b + 1, 1, h - 1, '#9cc6de'); }
        if (!c) { R(mx - 10, my - 7, 2, 1, '#ffffff'); R(mx + 9, my - 6, 2, 1, '#ffffff'); R(mx, my - 9, 1, 2, '#ffffff'); }
      }
      // top left: penguins on a small floe, one waddles, one slides into the water and climbs back
      const px = 36, py = rowY(0) + 40;
      ell(px, py + 4, 30, 9, K); ell(px, py + 5, 29, 8, '#6fa6cc'); ell(px, py + 3, 29, 7, '#eef6fb'); R(px - 22, py + 1, 12, 1, '#ffffff');
      const peng = (x0, y0, dir, step) => {
        R(x0 - 4, y0 - 12, 9, 13, K); R(x0 - 3, y0 - 11, 7, 11, '#2b2b3a'); R(x0 - 2 + (dir > 0 ? 1 : 0), y0 - 8, 4, 8, '#f4f8fb');
        R(x0 + dir * 2, y0 - 9, 1, 1, '#ffffff'); R(x0 + dir * 4, y0 - 8, 2, 1, '#f29a3a'); R(x0 + (dir > 0 ? -4 : 4), y0 - 6 + step, 1, 4, '#2b2b3a');
        R(x0 - 3 + step, y0 + 1, 3, 1, '#f29a3a'); R(x0 + 1 - step, y0 + 1, 3, 1, '#f29a3a');
      };
      const wd = Math.sin(t * 0.9), st = Math.floor(t * 4) % 2;
      peng(px - 14, py, 1, 0); peng(px + Math.round(wd * 8), py + 1, wd > 0 ? 1 : -1, st);
      const sl = (t * 0.25) % 1;
      if (sl < 0.5) { const sx = px + 14 + Math.round(sl * 2 * 14); R(sx - 6, py - 2, 12, 5, K); R(sx - 5, py - 1, 10, 3, '#2b2b3a'); R(sx - 4, py + 1, 8, 1, '#f4f8fb'); R(sx + 5, py - 1, 2, 1, '#f29a3a'); R(sx - 9, py, 3, 1, '#ffffff'); }
      else { const k = Math.round(Math.sin((sl - 0.5) * 2 * Math.PI) * 4); R(px + 30, py + 8 - k, 5, 4, K); R(px + 31, py + 9 - k, 3, 2, '#2b2b3a'); R(px + 34, py + 9 - k, 1, 1, '#f29a3a'); for (let q = 0; q < 3; q++) R(px + 27 + q * 4, py + 12, 3, 1, '#cfe6f2'); }
      // top right: a seal on a floe balances a ball on its nose and claps
      const qx = W - 38, qy = rowY(0) + 46;
      ell(qx, qy + 4, 30, 9, K); ell(qx, qy + 5, 29, 8, '#6fa6cc'); ell(qx, qy + 3, 29, 7, '#eef6fb');
      ell(qx - 2, qy - 3, 13, 5, K); ell(qx - 2, qy - 3, 12, 4, '#8a93a6'); ell(qx - 2, qy - 2, 9, 2, '#aab3c3'); R(qx - 16, qy - 6, 5, 4, K); R(qx - 15, qy - 5, 3, 2, '#5f6878');
      R(qx + 7, qy - 13, 9, 10, K); R(qx + 8, qy - 12, 7, 8, '#8a93a6'); R(qx + 10, qy - 10, 1, 1, K); R(qx + 13, qy - 10, 1, 1, K); R(qx + 11, qy - 8, 2, 1, K); R(qx + 15, qy - 8, 3, 1, '#cfd5e0'); R(qx + 15, qy - 7, 3, 1, '#cfd5e0');
      const clap = Math.floor(t * 3) % 2; R(qx + 2, qy - 6 - clap * 2, 4, 3, K); R(qx + 3, qy - 5 - clap * 2, 2, 1, '#5f6878');
      const bb = Math.abs(Math.sin(t * 2.5)) * 6, bx = qx + 11, by = qy - 19 - Math.round(bb);
      disc(bx, by, 4, K); disc(bx, by, 3, '#d64545'); R(bx - 3, by - 1, 7, 2, '#f4efe6'); R(bx - 1, by - 2, 2, 1, '#ffffff');
      // between the floes: an orca fin circles, a spout now and then
      const cx = W / 2, cy = rowY(1) + SH / 2, oa = t * 0.5, ox = cx + Math.round(Math.cos(oa) * 14), oy = cy + Math.round(Math.sin(oa) * 6), od = Math.sin(oa) > 0 ? -1 : 1;
      for (let k = 0; k < 5; k++) R(ox - od * (4 + k * 3), oy + 6 + (k % 2), 3, 1, 'rgba(230,245,255,.55)');
      for (let k = 0; k < 9; k++) R(ox + (od > 0 ? -2 + Math.floor(k / 3) : 2 - Math.floor(k / 3)) - 1, oy + 5 - k, 4 - Math.floor(k / 3), 1, K);
      for (let k = 1; k < 8; k++) R(ox + (od > 0 ? -1 + Math.floor(k / 3) : 1 - Math.floor(k / 3)), oy + 5 - k, 2 - Math.floor(k / 4), 1, '#2b2b3a');
      if ((t * 0.3) % 1 < 0.15) for (let k = 0; k < 5; k++) R(ox - 2 + k, oy - 10 - (k % 2) * 3, 1, 3, 'rgba(230,245,255,.8)');
      // bottom left: a fish jumps out of the water in an arc, rings spread where it fell
      const jx = 34, jy = rowY(2) + 44, jp = (t * 0.45) % 1;
      if (jp < 0.4) { const u = jp / 0.4, fxx = jx - 12 + Math.round(u * 24), fyy = jy - Math.round(Math.sin(u * Math.PI) * 18); R(fxx - 4, fyy - 2, 8, 5, K); R(fxx - 3, fyy - 1, 6, 3, '#8fb6ec'); R(fxx - 3, fyy - 1, 6, 1, '#c4dcf6'); R(fxx + 1, fyy - 1, 1, 1, K); R(fxx - 6, fyy - 2, 3, 5, K); R(fxx - 5, fyy - 1, 1, 3, '#5b8fd6'); }
      else { const u = (jp - 0.4) / 0.6, r = 2 + Math.round(u * 10); ell(jx + 12, jy, r, Math.max(1, Math.round(r / 3)), `rgba(200,230,250,${(0.6 * (1 - u)).toFixed(2)})`); ell(jx + 12, jy, Math.max(0, r - 2), Math.max(1, Math.round(r / 3) - 1), LT.floor); }
      // bottom right: a polar bear cub sits on a floe and nibbles a fish, its ears twitch
      const ux = W - 36, uy = rowY(2) + 54;
      ell(ux, uy + 4, 28, 9, K); ell(ux, uy + 5, 27, 8, '#6fa6cc'); ell(ux, uy + 3, 27, 7, '#eef6fb');
      ell(ux, uy - 6, 9, 8, K); ell(ux, uy - 6, 8, 7, '#f4efe6'); ell(ux - 2, uy - 5, 5, 4, '#ffffff');
      const ear = Math.floor(t * 0.8) % 3 === 0 ? 1 : 0;
      ell(ux + 1, uy - 17, 7, 6, K); ell(ux + 1, uy - 17, 6, 5, '#f4efe6'); R(ux - 5, uy - 24 + ear, 4, 4, K); R(ux - 4, uy - 23 + ear, 2, 2, '#e3dccd'); R(ux + 4, uy - 24, 4, 4, K); R(ux + 5, uy - 23, 2, 2, '#e3dccd');
      R(ux - 2, uy - 18, 1, 1, K); R(ux + 3, uy - 18, 1, 1, K); R(ux, uy - 15, 2, 1, K);
      const nib = Math.floor(t * 4) % 2; R(ux + 2, uy - 12 + nib, 10, 4, K); R(ux + 3, uy - 11 + nib, 7, 2, '#8fb6ec'); R(ux + 10, uy - 13 + nib, 3, 6, K); R(ux + 11, uy - 12 + nib, 1, 4, '#5b8fd6');
      R(ux - 6, uy - 10, 4, 5, K); R(ux - 5, uy - 9, 2, 3, '#f4efe6'); R(ux - 6, uy, 6, 3, K); R(ux - 5, uy, 4, 2, '#f4efe6'); R(ux + 2, uy, 6, 3, K); R(ux + 3, uy, 4, 2, '#f4efe6');

/* ===== STORM: поверх цеха и сотрудников, в конце цикла по местам (после sl.forEach), пока идёт метель ===== */
    if (l === G && state.run.storm) {
      // a blizzard: a cold haze, flakes driven sideways by gusts, frost creeping in from the edges
      gx.fillStyle = 'rgba(215,232,246,.42)'; gx.fillRect(0, 29, W, FL - 29);
      const gust = 1 + Math.sin(t * 1.7) * 0.4;
      for (let k = 0; k < 220; k++) { const sx = ((k * 97 + t * (90 + (k % 5) * 20) * gust) % (W + 40)) - 20, sy = 31 + ((k * 53 + t * (30 + (k % 3) * 10)) % (FL - 31)), big = k % 5 === 0; R(Math.round(sx), Math.round(sy), big ? 2 : 3, big ? 2 : 1, k % 3 ? '#ffffff' : '#dff0f8'); }
      for (let k = 0; k < 10; k++) { const wy = 40 + ((k * 41 + t * 20) % (FL - 50)), wx = ((k * 67 + t * 160) % (W + 80)) - 40; R(Math.round(wx), Math.round(wy), 30, 1, 'rgba(255,255,255,.6)'); R(Math.round(wx) + 8, Math.round(wy) + 1, 18, 1, 'rgba(255,255,255,.35)'); }
      for (let yy = 31; yy < FL; yy += 3) { const d = 5 + Math.round(Math.sin(yy * 0.7) * 2 + Math.sin(yy * 0.13) * 2); R(0, yy, d, 3, 'rgba(240,250,255,.7)'); R(W - d, yy, d, 3, 'rgba(240,250,255,.7)'); }
    }
/* в цикле по местам: пока метель, сотрудник дрожит (x + 6 + (Math.floor(t * 20 + i) % 2)) и над ним облачко пара */

/* ===== MACHINES: ветки machine(type, x, y), коробка около 32×30, вставлять перед } else if (type === 'dough') ===== */
    } else if (type === 'icesaw') {
      // a block of ice on a sled under a steel gantry, a circular saw spins and cuts it, chips spray
      R(x + 1, y + 26, 30, 4, K); R(x + 2, y + 27, 28, 2, '#a8693a'); R(x, y + 29, 5, 2, K); R(x + 27, y + 29, 5, 2, K);
      R(x + 5, y + 13, 22, 14, K); R(x + 6, y + 14, 20, 12, '#9fd3ee'); R(x + 6, y + 14, 20, 2, '#dff3fb'); R(x + 7, y + 16, 2, 8, '#e9f7fd'); R(x + 20, y + 19, 5, 1, '#7fb6d6'); R(x + 21, y + 22, 4, 1, '#7fb6d6');
      R(x + 15, y + 16, 2, 10, '#5a9cc4');
      R(x + 1, y + 2, 3, 25, K); R(x + 2, y + 3, 1, 23, '#9aa3ad'); R(x + 28, y + 2, 3, 25, K); R(x + 29, y + 3, 1, 23, '#9aa3ad'); R(x + 1, y, 30, 4, K); R(x + 2, y + 1, 28, 2, '#c9d0d6'); R(x + 2, y + 1, 28, 1, '#e9eef2');
      R(x + 14, y + 3, 4, 4, K); R(x + 15, y + 3, 2, 3, '#5a5060');
      disc(x + 16, y + 12, 8, K); disc(x + 16, y + 12, 7, '#c9d0d6'); disc(x + 16, y + 12, 5, '#e9eef2'); disc(x + 16, y + 12, 2, K); R(x + 16, y + 12, 1, 1, '#f2c94c');
      for (let k = 0; k < 8; k++) { const a = t * 12 + k * Math.PI / 4; R(x + 16 + Math.round(Math.cos(a) * 7), y + 12 + Math.round(Math.sin(a) * 7), 1, 1, '#5a5060'); }
      for (let k = 0; k < 6; k++) { const ph = (t * 2 + k / 6) % 1, d = k % 2 ? 1 : -1; R(x + 16 + d * Math.round(ph * 15), y + 18 - Math.round(ph * 12 - ph * ph * 16), 1, 1, '#ffffff'); }
    } else if (type === 'icehole') {
      const ell = (cx, cy, rx, ry, col) => { for (let dy = -ry; dy <= ry; dy++) { const w = Math.round(rx * Math.sqrt(1 - (dy / ry) ** 2)); R(cx - w, cy + dy, w * 2 + 1, 1, col); } };
      // a hole in the ice with a rod stuck in the snow, the float bobs, now and then a fish leaps into the bucket
      ell(x + 13, y + 25, 12, 5, K); ell(x + 13, y + 25, 11, 4, '#cfe6f2'); ell(x + 13, y + 25, 8, 3, K); ell(x + 13, y + 25, 7, 2, '#1f3d66'); R(x + 9, y + 24, 4, 1, '#3f6e9c');
      for (let k = 0; k < 15; k++) R(x + 2 + k, y + 21 - Math.round(k * 1.25), 2, 1, k < 4 ? K : '#8a5a32');
      R(x + 1, y + 20, 4, 3, K); R(x + 2, y + 21, 2, 1, '#d64545');
      const fb = Math.round(Math.sin(t * 3) * 0.8);
      R(x + 16, y + 3, 1, 21 + fb, 'rgba(240,240,240,.75)'); R(x + 15, y + 22 + fb, 3, 3, K); R(x + 16, y + 22 + fb, 1, 1, '#d64545'); R(x + 16, y + 23 + fb, 1, 1, '#f4efe6');
      R(x + 23, y + 15, 10, 13, K); R(x + 24, y + 16, 8, 11, '#7d8794'); R(x + 24, y + 16, 8, 2, '#9aa3ad'); R(x + 25, y + 18, 1, 8, '#c9d0d6'); R(x + 22, y + 14, 12, 2, K);
      R(x + 25, y + 11, 3, 4, K); R(x + 26, y + 12, 1, 2, '#5b8fd6'); R(x + 28, y + 12, 3, 3, K); R(x + 29, y + 13, 1, 1, '#8fb6ec');
      const jp = (t * 0.4) % 1;
      if (jp < 0.35) { const u = jp / 0.35, fx = x + 13 + Math.round(u * 15), fy = y + 22 - Math.round(Math.sin(u * Math.PI) * 14); R(fx - 3, fy - 2, 7, 4, K); R(fx - 2, fy - 1, 5, 2, '#8fb6ec'); R(fx + 2, fy - 1, 1, 1, K); R(fx - 5, fy - 2, 3, 4, K); R(fx - 4, fy - 1, 1, 2, '#5b8fd6'); }
    } else if (type === 'igloo') {
      // an igloo of snow bricks with a dark doorway; the top course is laid again and again, a brick floats down into place
      for (let dy = 0; dy <= 15; dy++) { const w = Math.round(16 * Math.sqrt(1 - (dy / 16) ** 2)); R(x + 16 - w - 1, y + 29 - dy, w * 2 + 3, 1, K); }
      R(x - 1, y + 29, 35, 2, K);
      const n = Math.floor(t * 1.2) % 4;
      for (let dy = 0; dy <= 14; dy++) {
        if (dy >= 11 && n < 3 && dy >= 11 + n) continue;
        const w = Math.round(15 * Math.sqrt(1 - (dy / 15) ** 2)), yy = y + 29 - dy;
        R(x + 16 - w, yy, w * 2 + 1, 1, dy % 4 === 3 ? '#a9cde0' : '#eef6fb'); R(x + 16 - w, yy, 2, 1, '#ffffff'); R(x + 16 + w - 2, yy, 3, 1, '#cfe4f0');
        if (dy % 4 === 1) for (let k = x + 16 - w + ((dy >> 2) % 2) * 3 + 2; k < x + 16 + w - 1; k += 6) R(k, yy - 1, 1, 3, '#a9cde0');
      }
      if (n < 3) { const fall = (t * 1.2) % 1, ty = y + 2 + Math.round(fall * (11 + n) * 0.6); R(x + 12, ty, 9, 5, K); R(x + 13, ty + 1, 7, 3, '#eef6fb'); R(x + 13, ty + 1, 7, 1, '#ffffff'); }
      R(x + 9, y + 20, 11, 10, K); R(x + 10, y + 22, 9, 8, '#2a3d63'); R(x + 11, y + 21, 7, 1, '#2a3d63'); R(x + 11, y + 23, 2, 6, '#3a5a86');
      R(x + 13, y + 25, 3, 2, Math.floor(t * 3) % 2 ? '#f2c94c' : '#e0a040');
/* ===== ICONS: иконки карточек 16×16 в ICON_DRAW, в карты: m_icesaw: 'icesaw', m_icehole: 'icehole', m_igloo: 'igloo'. Строки: drafts/glacier-icons.js ===== */
/* ===== END ===== */
