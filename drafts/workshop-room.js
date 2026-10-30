// Черновик альтернативного цеха 10: Живая комната (вместо калибровки туалетов и аэрогрилей). В игру НЕ вставлен, ботом не проверен, вставка в другой сессии.
// Блоки ниже — готовый код в стиле игры (R, disc, K, t, W, FL, colX, rowY, SW, SH из game/index.html).
// Индекс цеха здесь G: при вставке заменить на настоящий индекс Живой комнаты.
// Схема: одно место 2×2 (SW + 78 на SH + 78) в середине сетки 4×3, на нём Стол из плоти: стол с компьютером, проросший мясом.
// Стол открывается вместе с цехом, его карты нет, переставить его нельзя. Сотрудник на нём не стоит: положенного сотрудника комната поглощает
// до конца забега (run.eaten — список id, не больше 3), стол работает сам. Сила стола — сумма базовых сил поглощённых, скорость 1,
// цена value × n² (n = поглощённых: 1, 4, 9). Без жертв стол спит и просит есть.
// Стиль — мир глазами героя «Песни Сайи»: всё из мяса, жира, вен и кишок, красное на тёмном.
// Превью: node drafts/room-preview.js снимает цех в копии игры, где Живая комната стоит вместо калибровки.

// ===== LOCS =====
//    { name: 'Живая комната', tab: 'Комната', sign: 'ЦЕХ 10 · ЖИВАЯ КОМНАТА', cost: 8e14, wall: '#3a0a0e', mortar: '#5a1a1c', floor: '#6a171b', grid: '#6a171b', plate: '#2e0709', frame: '#1a0204', item: '#e86a6a', board: '#5a1014', boardHi: '#9a2a2a', goods: 'songs', unit: 'Песни', unit1: 'Цена песни', start: 'fleshdesk', startSlot: 0, desc: 'x', opened: 'Комната проснулась. Она голодна' },

// ===== LAYOUTS =====
//    // one big slot (2×2) for the flesh desk in the middle of a 4×3 room, the rest of the floor is decor
//    [[1, 0.7]],
//    BIG[G] = 0 (слот стола 2×2), TALL и WIDE для G не заводить. GRID[G] = [4, 3]: сетка задана явно, чтобы вокруг стола хватило места на декор.

// ===== SIZE: рядом с TALL и WIDE и в gridSize ===== (только описание, код ниже)
//    const BIG = { [G]: 0 }, GRID = { [G]: [4, 3] };   (если цех снов уже вставлен, добавить G в его BIG)
//    const SLOT_W = (l, i) => WIDE[l] === i || BIG[l] === i ? SW + 78 : SW, SLOT_H = (l, i) => TALL[l] === i ? SH + 156 : BIG[l] === i ? SH + 78 : SH;
//    const gridSize = l => GRID[l] || LAYOUTS[l].reduce(...как сейчас...);
//    в местах, где проверяется «слот встроенный» (fixed, drag): добавить BIG[l] === k, как у TALL и WIDE.

// ===== MACH =====
//    fleshdesk: { loc: G, name: 'Стол из плоти', short: 'СТОЛ', rate: 0.5, value: 5e9, max: 1, auto: { power: 0, speed: 1 }, desc: 'Положи на него сотрудника: комната поглотит его до конца забега. Работает сам: сила — сумма сил поглощённых, цена ×1, ×4, ×9 за одного, двух, трёх.' },

/* ===== STATS: в slotStats, рядом с etN (числа черновые) ===== */
    // the flesh desk: its power is the sum of the base powers of the eaten, its price grows with their number squared
    const eaten = s.machine === 'fleshdesk' ? (state.run.eaten || []) : null, eN = eaten ? eaten.length : 0;
    if (eaten) notes.push(eN ? `Поглощено: ${eN} из 3, цена ×${eN * eN}, сила ${fmt(eaten.reduce((a, id) => a + WORKERS[id].power, 0))}` : 'Комната голодна: положи на стол сотрудника');
    // baseV: const baseV = s.machine === 'etalon' ? ... : s.machine === 'fleshdesk' ? M.value * eN * eN : M.value;
    // в ветке auto: B = s.machine === 'fleshdesk' ? eaten.reduce((a, id) => a + WORKERS[id].power, 0) : M.auto.power;
    // notes: s.machine === 'fleshdesk' ? 'Работает сам: в нём поглощённые' : ...

/* ===== EAT: в обработчике нажатия, в ветке if (selWorker), перед проверкой belt/etalon ===== */
      // the living room: a worker laid on the flesh desk is eaten until the end of the run; a second tap confirms
      if (s.machine === 'fleshdesk') {
        const ea = state.run.eaten || (state.run.eaten = []);
        if (ea.length >= 3) { toast('Комната сыта: в ней уже трое'); return; }
        if (eatAsk !== selWorker) { eatAsk = selWorker; toast(`Нажми ещё раз: комната поглотит ${WORKERS[selWorker].name} до конца забега`); return; }
        const prev = workerPlace(selWorker); if (prev) slotsOf(prev.l)[prev.i].worker = null;
        state.lockers = state.lockers.filter(id => id !== selWorker); ea.push(selWorker); state.run.eatAt = t;
        toast(ea.length < 3 ? `${WORKERS[selWorker].name} растворяется в столе. Комната хочет ещё` : `${WORKERS[selWorker].name} растворяется в столе. Комната сыта`);
        eatAsk = null; selWorker = null; selSlot = i; save(); renderSheet(); return;
      }
//    let eatAsk = null; — рядом с selWorker; сбрасывать при выборе другого сотрудника.
//    В конце забега: поглощённые возвращаются в раздевалку (state.lockers.push(...state.run.eaten)), run.eaten обнуляется вместе с run.
//    Перки и скиллы поглощённых не действуют; карты сотрудника (снаряжение) пропадают вместе с ним до конца забега.

/* ===== LABEL: в drawText, перед веткой «НЕТ РАБОТНИКА» ===== */
      else if (s.machine === 'fleshdesk' && !(st && st.income > 0)) T('ПОКОРМИ МЕНЯ', x + ww - 4, y + 11, 6, '#ff6a6a', 'right');

/* ===== WALL: ветка стены в drawWorld (else if (l === G) { ... }) ===== */
      // the world as the hero sees it: a wall of raw meat, swollen tumours breathe, purple veins pulse,
      // a garland of gut sags along the top, eyes open in the flesh and look around
      R(0, 0, W, 29, '#3a0a0e'); R(0, 0, W, 6, '#240407'); R(0, 22, W, 7, '#4e1014');
      for (let k = 0; k < 4; k++) {
        const vy = 8 + k * 5, ph = t * (1.2 + k * 0.3);
        for (let xx = 0; xx < W; xx++) R(xx, vy + Math.round(Math.sin(xx / (7 + k * 2) + k * 2) * 2), 1, 1, k % 2 ? '#5a1030' : '#6e1838');
        const px = ((ph * 18 + k * 90) % (W + 20)) - 10; R(px, vy + Math.round(Math.sin(px / (7 + k * 2) + k * 2) * 2) - 1, 2, 2, '#b04a7a');
      }
      for (let k = 0; k < 17; k++) {
        const cx = (k * 53 + 17) % W, cy = 7 + (k * 37) % 17, r = 3 + (k * 7) % 4 + Math.round(Math.sin(t * 1.6 + k) * 0.6);
        disc(cx, cy, r + 1, '#240407'); disc(cx, cy, r, '#8a2226'); disc(cx - 1, cy - 1, r - 1, '#a8363a'); R(cx - Math.round(r / 2), cy - Math.round(r / 2), 2, 1, '#e58a80');
        if (k % 3 === 0) R(cx + 1, cy + 1, 1, r - 1, '#6e1838');
      }
      // eyes in the wall: they blink out of step and their pupils drift toward the desk
      for (const [ex, ey, k] of [[22, 15, 0], [W - 64, 12, 1], [Math.round(W * 0.36), 20, 2]]) {
        if (Math.floor(t * 0.7 + k * 1.3) % 6 === 0 && (t * 0.7 + k * 1.3) % 1 < 0.25) { R(ex - 4, ey, 9, 1, '#240407'); R(ex - 3, ey + 1, 7, 1, '#e58a80'); continue; }
        disc(ex, ey, 4, '#240407'); disc(ex, ey, 3, '#f0d8c8'); R(ex - 3, ey, 1, 1, '#d9726a'); R(ex + 3, ey - 1, 1, 1, '#d9726a');
        const lx = Math.round(Math.sin(t * 0.5 + k) * 1.5); R(ex - 1 + lx, ey - 1, 3, 3, '#c01a22'); R(ex + lx, ey - 1, 1, 3, K); R(ex - 1 + lx, ey - 1, 1, 1, '#ffb0a8');
      }
      // a garland of gut sags along the top and sways
      for (let xx = 0; xx < W; xx++) { const gy = 1 + Math.round(Math.abs(Math.sin(xx / 13 + Math.sin(t * 0.8) * 0.15)) * 5); R(xx, gy, 1, 3, '#c06a70'); R(xx, gy, 1, 1, '#f0a59a'); R(xx, gy + 3, 1, 1, '#5a1014'); }
      R(0, 27, W, 2, '#2a0608'); R(0, 28, W, 1, K);
      // drops of blood gather on the wall's lower edge and fall
      for (let k = 0; k < 5; k++) { const dx = (k * 71 + 30) % W, f = (t * 0.4 + k * 0.27) % 1; R(dx, 26, 2, 2, '#b01018'); if (f > 0.5) R(dx, 26 + Math.round((f - 0.5) * 10), 1, 2, '#e8303a'); }

/* ===== FLOOR: блок пола и декора (if (l === G) { ... }), после R(0, 31, W, FL - 31, LT.floor) ===== */
      // a floor of raw meat: a packed mass of swollen lumps, dark wet gaps between them, streaks of fat; the lumps breathe slowly
      const ell = (cx, cy, rx, ry, col) => { for (let dy = -ry; dy <= ry; dy++) { const w = Math.round(rx * Math.sqrt(1 - (dy / ry) ** 2)); R(cx - w, cy + dy, w * 2 + 1, 1, col); } };
      R(0, 31, W, FL - 31, '#3a080b');
      const LC = [['#6a171b', '#8a2226', '#b8433f'], ['#74191e', '#9a2a2a', '#c4544c'], ['#5e1418', '#7a1a1e', '#a8363a'], ['#7c1d22', '#a8363a', '#d9726a']];
      for (let r = 0, ty = 34; ty < FL + 6; ty += 11, r++) for (let k = 0, tx = (r % 2) * 8 - 4; tx < W + 8; tx += 16, k++) {
        const h = (k * 7 + r * 13) % 11, lx = tx + h % 5 - 2, ly = ty + (h % 3) - 1, rx = 8 + h % 3, ry = 5 + h % 2 + (Math.sin(t * 0.9 + k * 0.7 + r) > 0.6 ? 1 : 0), C = LC[(k + r * 3 + h) % 4];
        ell(lx, ly, rx, ry, C[0]); ell(lx - 1, ly - 1, rx - 2, ry - 2, C[1]); ell(lx - 3, ly - 2, Math.max(1, rx - 6), 1, C[2]);
        if (h % 4 === 0) for (let q = 0; q < rx; q++) R(lx - rx / 2 + q, ly + 1 + Math.round(Math.sin(q * 0.8 + k) * 1), 1, 1, 'rgba(240,200,170,.45)');
        if (h % 5 === 1) R(lx + 2, ly - 2, 1, ry + 1, '#5a1030');
      }
      const shadow = (x, y, w) => R(x, y, w, 3, 'rgba(20,0,4,.4)');
      const eN = (state.run.eaten || []).length, dx0 = colX(LAYOUTS[G][0][0]), dy0 = rowY(LAYOUTS[G][0][1]), dw = SW + 78, dh = SH + 78;

      // veins run over the floor from every corner of the room into the desk; when it has eaten, blood beats along them toward it, faster the more it ate
      const VE = [[4, 34, dx0, dy0 + 30], [W - 4, 34, dx0 + dw, dy0 + 30], [6, FL - 4, dx0 + 20, dy0 + dh], [W - 6, FL - 4, dx0 + dw - 20, dy0 + dh], [Math.round(W / 2) + 6, FL - 2, dx0 + dw / 2 + 6, dy0 + dh]];
      VE.forEach(([ax, ay, bx, by], v) => {
        const len = Math.hypot(bx - ax, by - ay), n = Math.ceil(len / 1.5);
        for (let k = 0; k <= n; k++) { const f = k / n, wv = Math.sin(f * 9 + v) * 3, px = ax + (bx - ax) * f + wv * (ay - by) / len, py = ay + (by - ay) * f + wv * (bx - ax) / len; R(px - 1, py, 3, 2, '#3a0a24'); R(px, py, 1, 1, '#7a2050'); }
        if (eN) for (let m = 0; m < eN; m++) { const f = (t * (0.25 + eN * 0.12) + v * 0.21 + m / eN) % 1, wv = Math.sin(f * 9 + v) * 3, px = ax + (bx - ax) * f + wv * (ay - by) / len, py = ay + (by - ay) * f + wv * (bx - ax) / len; R(px - 1, py - 1, 3, 3, '#e8303a'); R(px, py - 1, 1, 1, '#ffb0a8'); }
      });

      // lumps of meat swell out of the floor and breathe
      for (const [lx, ly, lr, k] of [[48, 140, 6, 0], [260, 100, 5, 1], [32, 232, 4, 2], [290, 210, 7, 3], [150, FL - 14, 5, 4], [214, 66, 4, 5]]) {
        const r = lr + Math.round(Math.sin(t * 1.3 + k * 2) * 0.7); ell(lx, ly + 2, r + 2, Math.round(r / 2) + 1, 'rgba(20,0,4,.35)'); ell(lx, ly, r + 1, Math.round(r * 0.7) + 1, '#2a0608'); ell(lx, ly, r, Math.round(r * 0.7), '#9a2a2a'); ell(lx - 1, ly - 1, r - 2, Math.max(1, Math.round(r * 0.4)), '#b8433f'); R(lx - Math.round(r / 2), ly - Math.round(r / 2), 2, 1, '#f0a59a');
      }

      // guts hang from the wall above the desk and sway, a drop of blood runs down each loop
      for (let k = 0; k < 4; k++) {
        const gx = dx0 + 18 + k * 38, len = 22 + (k % 2) * 14, sw = Math.sin(t * 1.1 + k * 1.7) * 3;
        for (let yy = 0; yy < len; yy++) { const f = yy / len, px = gx + Math.round(Math.sin(f * 7 + k) * 3 + sw * f), py = 30 + yy; R(px - 2, py, 6, 1, '#5a1014'); R(px - 1, py, 4, 1, '#c06a70'); R(px - 1, py, 1, 1, '#f0a59a'); }
        const ex = gx + Math.round(Math.sin(7 + k) * 3 + sw), ey = 30 + len; disc(ex, ey, 3, '#5a1014'); disc(ex, ey, 2, '#c06a70'); R(ex - 1, ey - 1, 1, 1, '#f0a59a');
        const f = (t * 0.5 + k * 0.31) % 1; if (f < 0.6) R(ex, ey + 3 + Math.round(f * 12), 1, 2, '#e8303a');
      }

      // top left: a bed grown over with flesh, the blanket rises and falls, a mouth opens in the pillow now and then
      const bx = 6, by = rowY(0) + 34;
      shadow(bx, by + 46, 72);
      R(bx, by, 6, 44, K); R(bx + 1, by + 1, 4, 42, '#e6dcc8'); R(bx + 3, by + 1, 2, 42, '#b8a888'); disc(bx + 3, by + 2, 3, '#e6dcc8');
      R(bx + 66, by + 16, 5, 28, K); R(bx + 67, by + 17, 3, 26, '#e6dcc8'); R(bx + 69, by + 17, 1, 26, '#b8a888');
      R(bx + 4, by + 22, 64, 14, K); R(bx + 5, by + 23, 62, 12, '#7a1a1e'); R(bx + 5, by + 23, 62, 2, '#9a2a2a');
      const bb = Math.round(Math.sin(t * 1.4) * 1.5);
      for (let k = 0; k < 6; k++) { const cx = bx + 20 + k * 8, r = 5 + (k % 2) + (k > 1 && k < 5 ? bb : 0); disc(cx, by + 22, r + 1, K); disc(cx, by + 22, r, '#b8433f'); disc(cx - 1, by + 21, r - 2, '#d9726a'); R(cx - 2, by + 19 - (k % 2), 2, 1, '#f0a59a'); }
      for (let k = 0; k < 5; k++) R(bx + 22 + k * 9, by + 25 + (k % 2), 4, 1, '#5a1030');
      ell(bx + 13, by + 16, 8, 5, K); ell(bx + 13, by + 16, 7, 4, '#e8c9a0'); ell(bx + 12, by + 15, 5, 2, '#f6e2c4');
      const mo = Math.floor(t * 0.5) % 4 === 0 ? 1 + Math.floor(t * 4) % 2 : 0;
      R(bx + 9, by + 17, 8, 1 + mo, '#5a1014'); if (mo) { R(bx + 10, by + 17, 1, 1, '#ffffff'); R(bx + 13, by + 17, 1, 1, '#ffffff'); R(bx + 15, by + 17, 1, 1, '#ffffff'); }
      R(bx + 8, by + 36, 3, 8, K); R(bx + 60, by + 36, 3, 8, K);
      for (let k = 0; k < 3; k++) { const s = Math.sin(t * 2 + k * 2); R(bx + 18 + k * 18 + Math.round(s), by + 36, 2, 6 + k % 2, '#9a2a2a'); R(bx + 17 + k * 18 + Math.round(s * 2), by + 41 + k % 2, 3, 2, '#9a2a2a'); }

      // bottom left: a fridge of meat; its door swings open now and then, red light spills out and a tongue licks the air
      const fx = 14, fy = rowY(2) + 20;
      shadow(fx - 2, fy + 66, 46);
      R(fx, fy, 38, 66, K); R(fx + 1, fy + 1, 36, 64, '#8a2226'); R(fx + 1, fy + 1, 36, 3, '#a8363a'); R(fx + 1, fy + 22, 36, 1, K);
      for (let k = 0; k < 6; k++) { const cy = fy + 6 + k * 10, cx = fx + 1 + (k % 2) * 34; disc(cx, cy, 3, '#2a0608'); disc(cx, cy, 2, '#b8433f'); }
      for (let k = 0; k < 3; k++) R(fx + 6 + k * 10, fy + 26 + (k % 2) * 8, 1, 28, '#5a1030');
      const dOpen = Math.max(0, Math.sin(t * 0.6)) ** 3;
      if (dOpen > 0.15) {
        const dwid = Math.round(dOpen * 14);
        R(fx + 37 - dwid, fy + 23, dwid + 1, 41, '#ff4a3a'); R(fx + 37 - dwid, fy + 23, dwid + 1, 41, 'rgba(255,200,160,.35)');
        R(fx + 38, fy + 22, 2 + Math.round(dOpen * 12), 43, K); R(fx + 39, fy + 23, Math.round(dOpen * 12), 41, '#6e1838');
        const tg = Math.round(Math.sin(t * 6) * 2); R(fx + 34 - dwid / 2, fy + 44, 6, 3, '#e8789a'); R(fx + 38 - dwid / 2 + tg, fy + 45, 5 + Math.round(dOpen * 6), 3, '#e8789a'); R(fx + 38 - dwid / 2 + tg, fy + 45, 5, 1, '#f8c2d3');
      }
      R(fx + 32, fy + 6, 3, 12, K); R(fx + 33, fy + 7, 1, 10, '#e6dcc8'); R(fx + 32, fy + 28, 3, 14, K); R(fx + 33, fy + 29, 1, 12, '#e6dcc8');
      // a heart on the floor beside it, beating faster the more the room has eaten
      const hb = (t * (0.9 + eN * 0.5)) % 1 < 0.15 ? 1 : 0, hx = fx + 54, hy = fy + 58;
      disc(hx - 3, hy - 2, 4 + hb, K); disc(hx + 3, hy - 2, 4 + hb, K); disc(hx - 3, hy - 2, 3 + hb, '#c01a22'); disc(hx + 3, hy - 2, 3 + hb, '#c01a22');
      for (let k = 0; k < 6 + hb; k++) R(hx - 6 - hb + k, hy - 1 + k, 13 + hb * 2 - k * 2, 1, '#c01a22');
      R(hx - 4, hy - 4, 2, 1, '#ff8a80'); R(hx + 1, hy - 9, 2, 4, '#5a1030'); R(hx + 4, hy - 8, 2, 3, '#e6dcc8');

      // top right: a mound of meat full of eyes; they all follow the desk and blink together when it eats
      const mx = W - 40, my = rowY(0) + 60;
      shadow(mx - 30, my + 18, 62);
      ell(mx, my + 6, 30, 14, K); ell(mx, my + 6, 29, 13, '#8a2226'); ell(mx - 4, my + 2, 22, 8, '#a8363a'); ell(mx - 8, my - 1, 10, 3, '#b8433f');
      const fresh = state.run.eatAt != null && t - state.run.eatAt < 1.2;
      for (const [ox, oy, r] of [[-16, 4, 4], [-4, -2, 5], [10, 2, 4], [20, 9, 3], [2, 11, 3], [-20, 12, 3]]) {
        const ex = mx + ox, ey = my + oy;
        if (fresh || Math.floor(t * 0.4) % 7 === 0 && (t * 0.4) % 1 < 0.15) { R(ex - r, ey, r * 2 + 1, 1, '#2a0608'); continue; }
        disc(ex, ey, r + 1, '#2a0608'); disc(ex, ey, r, '#f0d8c8'); R(ex - r + 1, ey + 1, 1, 1, '#d9726a');
        const lx = -Math.max(1, r - 2); R(ex + lx - 1, ey - 1, 3, 3, '#c01a22'); R(ex + lx, ey - 1, 1, 3, K);
      }

      // bottom right: a pool of blood under a dripping ceiling; tendrils sway up out of it and drops ring it
      const ppx = W - 42, ppy = rowY(2) + 64;
      ell(ppx, ppy, 32, 9, '#4a0408'); ell(ppx, ppy, 30, 8, '#8a0a12'); ell(ppx - 4, ppy - 2, 20, 4, '#b01018'); R(ppx - 18, ppy - 4, 8, 1, '#e8303a');
      for (let k = 0; k < 3; k++) { const f = (t * 0.45 + k * 0.33) % 1, rr = Math.round(f * 10); if (f < 0.7) { const rx = ppx - 12 + k * 12; R(rx - rr, ppy + 1 - Math.round(rr / 3), rr * 2 + 1, 1, `rgba(255,120,120,${(0.6 * (1 - f)).toFixed(2)})`); } }
      for (let k = 0; k < 4; k++) {
        const tx0 = ppx - 20 + k * 13, hgt = 22 + (k % 2) * 12 + Math.round(Math.sin(t * 1.5 + k) * 3);
        for (let yy = 0; yy < hgt; yy++) { const f = yy / hgt, px = tx0 + Math.round(Math.sin(t * 2.2 + k + f * 4) * 5 * f), wd = Math.max(1, Math.round(4 * (1 - f))); R(px - wd, ppy - yy, wd * 2 + 1, 1, '#2a0608'); R(px - wd + 1, ppy - yy, Math.max(1, wd * 2 - 1), 1, k % 2 ? '#9a2a2a' : '#b8433f'); if (yy % 4 === 1 && wd > 1) R(px - wd + 1, ppy - yy, 1, 1, '#f0a59a'); }
      }

/* ===== DESK: функция рядом с extractor/etalon, рисует Стол из плоти на слоте 2×2; n — сколько сотрудников поглощено (0..3), eatAt — время последнего поглощения ===== */
  function desk(x, y, w, h, n, eatAt) {
    const cx = x + Math.round(w / 2), ell = (ex, ey, rx, ry, col) => { for (let dy = -ry; dy <= ry; dy++) { const ww = Math.round(rx * Math.sqrt(1 - (dy / ry) ** 2)); R(ex - ww, ey + dy, ww * 2 + 1, 1, col); } };
    const fresh = eatAt != null && t - eatAt < 1.5, br = Math.round(Math.sin(t * (1 + n * 0.6)) * 1);
    // the room inside the slot: a back wall of meat with lumps, a wet floor
    R(x + 1, y + 1, w - 2, h - 2, '#3a0a0e'); R(x + 1, y + 96, w - 2, h - 97, '#4e1014'); R(x + 1, y + 96, w - 2, 1, '#2a0608');
    for (let k = 0; k < 9; k++) { const lx = x + 8 + (k * 41) % (w - 16), ly = y + 40 + (k * 23) % 50, r = 3 + k % 3; disc(lx, ly, r, '#4a0e12'); R(lx - 1, ly - r + 1, 2, 1, '#6a171b'); }
    if (n) { const g = 0.12 + 0.08 * Math.sin(t * 2.5) + n * 0.05; disc(cx, y + 60, 46, `rgba(232,48,58,${g.toFixed(2)})`); }
    if (fresh) R(x + 1, y + 1, w - 2, h - 2, `rgba(255,60,60,${(0.4 * (1 - (t - eatAt) / 1.5)).toFixed(2)})`);
    // three pods on the wall, one for each of the eaten: an empty one is a shut slit, a full one swells with a sleeper inside
    for (let k = 0; k < 3; k++) {
      const px = cx + (k - 1) * 40, py = y + 19, full = k < n, r = full ? 11 + Math.round(Math.sin(t * 1.8 + k * 1.3) * 1) : 8;
      R(px, py + r, 2, 30 - r, '#5a1030'); R(px + 1, py + r, 1, 30 - r, '#7a2050');
      ell(px, py, r - 1, r + 1, K);
      if (full) {
        ell(px, py, r - 2, r, '#b8433f'); ell(px - 2, py - 2, r - 5, r - 4, '#d9726a'); R(px - 4, py - r + 3, 3, 1, '#f6c2b8');
        disc(px, py - 1, 3, '#5a1014'); R(px - 4, py + 2, 9, 5, '#5a1014'); R(px - 3, py + 1, 7, 1, '#5a1014');
        if (Math.floor(t * 0.8 + k) % 5) { R(px - 2, py - 2, 1, 1, '#ffd54a'); R(px + 1, py - 2, 1, 1, '#ffd54a'); }
        R(px + r - 4, py - 3, 1, 6, '#6e1838'); R(px - r + 3, py + 1, 1, 5, '#6e1838');
      } else {
        ell(px, py, r - 2, r, '#6a171b'); R(px, py - r + 3, 1, r * 2 - 5, '#1a0204'); R(px - 1, py - 2, 1, 5, '#1a0204'); R(px + 1, py - 1, 1, 3, '#9a2a2a');
      }
    }
    // the desk top: a slab of raw meat marbled with fat, its edge drips
    const tx = x + 12, ty = y + 92, tw = w - 24;
    R(tx - 1, ty - 1, tw + 2, 11, K); R(tx, ty, tw, 9, '#8a2226'); R(tx, ty, tw, 2, '#b8433f'); R(tx, ty + 7, tw, 2, '#5a1014');
    for (let k = 0; k < tw - 6; k++) R(tx + 3 + k, ty + 4 + Math.round(Math.sin(k * 0.3) * 1.2), 1, 1, '#e8c9a0');
    for (let k = 0; k < 4; k++) { const dxp = tx + 10 + k * 34, f = (t * 0.6 + k * 0.29) % 1; R(dxp, ty + 9, 2, 2 + (k % 2), '#b01018'); if (f > 0.4) R(dxp, ty + 11 + Math.round((f - 0.4) * 30), 1, 2, '#e8303a'); }
    // legs: bones wrapped in tendon, roots spread over the floor
    for (const lx of [tx + 6, tx + tw - 10]) {
      R(lx - 1, ty + 9, 6, 36, K); R(lx, ty + 9, 4, 36, '#e6dcc8'); R(lx + 2, ty + 9, 2, 36, '#b8a888');
      for (let k = 0; k < 6; k++) R(lx - 1, ty + 12 + k * 6 + (k % 2), 6, 2, '#9a2a2a');
      for (let k = -1; k <= 1; k++) for (let s = 0; s < 8; s++) R(lx + 2 + k * s, ty + 44 + Math.round(s * 0.4), 2, 1, '#7a1a1e');
    }
    // the drawer under the top is a mouth: it chews slowly, drools when hungry and smiles after a meal
    const mx = tx + 22, my = ty + 13, mw = 44, open = n ? 1 + Math.floor(t * 3) % 2 : 2 + Math.round(Math.sin(t * 1.3) * 2);
    R(mx - 1, my - 1, mw + 2, 18, K); R(mx, my, mw, 16, '#7a1a1e'); R(mx, my, mw, 2, '#9a2a2a');
    R(mx + 4, my + 7 - open, mw - 8, open * 2 + 1, '#1a0204'); R(mx + 4, my + 6 - open, mw - 8, 1, '#d9726a'); R(mx + 4, my + 8 + open, mw - 8, 1, '#d9726a');
    for (let k = 0; k < 7; k++) { R(mx + 6 + k * 5, my + 7 - open, 3, 2, '#efe6d2'); R(mx + 6 + k * 5, my + 6 + open, 3, 2, '#efe6d2'); }
    if (!n) { const f = (t * 0.5) % 1; R(mx + mw - 10, my + 8 + open, 2, 3 + Math.round(f * 10), 'rgba(240,200,190,.7)'); }
    if (n) { R(mx + 2, my + 6 - open, 2, 1, '#d9726a'); R(mx + mw - 4, my + 6 - open, 2, 1, '#d9726a'); }
    // a heart beats between the legs, faster with every one eaten
    const hb = n && (t * (0.8 + n * 0.5)) % 1 < 0.15 ? 1 : 0, hx = tx + tw - 26, hy = ty + 36;
    disc(hx - 3, hy - 2, 4 + hb, K); disc(hx + 3, hy - 2, 4 + hb, K); disc(hx - 3, hy - 2, 3 + hb, n ? '#c01a22' : '#6e1838'); disc(hx + 3, hy - 2, 3 + hb, n ? '#c01a22' : '#6e1838');
    for (let k = 0; k < 6 + hb; k++) R(hx - 6 - hb + k, hy - 1 + k, 13 + hb * 2 - k * 2, 1, n ? '#c01a22' : '#6e1838');
    R(hx - 4, hy - 4, 2, 1, '#ff8a80'); R(hx - 1, hy - 12, 2, 6, '#5a1030');
    // the monitor: a lumpy box of flesh on a fleshy stalk, the screen is an eye that opens wider with every one eaten
    const sx = cx - 28, sy = y + 36 + br;
    R(cx - 6, sy + 44, 12, ty - sy - 44, K); R(cx - 5, sy + 44, 10, ty - sy - 44, '#9a2a2a'); R(cx - 5, sy + 44, 3, ty - sy - 44, '#b8433f');
    R(sx - 1, sy - 1, 58, 48, K); R(sx, sy, 56, 46, '#a8363a'); R(sx, sy, 56, 3, '#d9726a'); R(sx, sy + 42, 56, 4, '#7a1a1e');
    for (const [bx2, by2, r] of [[sx + 2, sy + 8, 4], [sx + 54, sy + 14, 4], [sx + 4, sy + 38, 3], [sx + 52, sy + 36, 5], [sx + 28, sy - 1, 4]]) { disc(bx2, by2, r + 1, K); disc(bx2, by2, r, '#b8433f'); R(bx2 - 1, by2 - r + 1, 2, 1, '#f0a59a'); }
    for (let k = 0; k < 3; k++) R(sx + 3 + k * 2, sy + 12 + k * 9, 1, 8, '#5a1030');
    const scx = sx + 8, scy = sy + 6, scw = 40, sch = 30;
    R(scx - 1, scy - 1, scw + 2, sch + 2, K); R(scx, scy, scw, sch, '#1a0204');
    const ec = [scx + scw / 2, scy + 13], op = [0.12, 0.45, 0.75, 1][Math.min(3, n)] * (fresh ? 1.15 : 1), eh = Math.max(1, Math.round(9 * Math.min(1, op))), ex = 15;
    const look = n ? Math.round(Math.sin(t * 0.9) * 4) : 0, lookY = n ? Math.round(Math.sin(t * 0.6 + 1) * 1) : 0;
    for (let dy = -eh; dy <= eh; dy++) {
      const ww = Math.round(ex * Math.sqrt(1 - (dy / (eh + 0.5)) ** 2));
      for (let dx = -ww; dx <= ww; dx++) {
        const ix = dx - look, iy = dy - lookY, d = Math.hypot(ix, iy);
        let col = Math.abs(dx) > ww - 1 || Math.abs(dy) === eh ? '#d9a090' : '#f0d8c8';
        if ((dx * 7 + dy * 3) % 11 === 0 && d > 6) col = '#d9726a';
        if (d < 7) col = d < 6 ? (n >= 3 ? '#ff2a30' : '#c01a22') : '#7a0a10';
        if (d < 6 && Math.abs(ix) < (n >= 3 ? 1.5 : 1) && Math.abs(iy) < 5) col = K;
        if (ix === -2 && iy === -3) col = '#ffb0a8';
        R(ec[0] + dx, ec[1] + dy, 1, 1, col);
      }
    }
    R(ec[0] - ex, ec[1] - eh - 1, ex * 2 + 1, 1, '#5a1014'); for (let k = 0; k < 5; k++) R(ec[0] - 10 + k * 5, ec[1] - eh - 3, 1, 2, '#5a1014');
    // a heartbeat line runs along the bottom of the screen: flat while it sleeps, quick spikes when fed
    for (let k = 0; k < scw; k++) {
      const p = (k + Math.floor(t * (12 + n * 10))) % 20, amp = n ? 1 + n : 0;
      const yy = scy + sch - 4 + (p === 9 ? -amp * 2 : p === 10 ? amp : p === 8 ? -1 * (n ? 1 : 0) : 0);
      R(scx + k, yy, 1, p === 9 && n ? amp * 2 + 1 : 1, n ? '#ff5050' : '#6e1838');
    }
    for (let k = 0; k < sch; k += 2) R(scx, scy + k, scw, 1, 'rgba(0,0,0,.25)');
    R(scx + 1, scy + 1, 6, 1, 'rgba(255,200,200,.25)');
    // a keyboard of teeth in gums lies on the top, the keys chatter while the desk works; a mouse-kidney on a gut cord
    const kx = cx - 26, ky = ty - 6;
    R(kx - 1, ky - 1, 38, 8, K); R(kx, ky, 36, 6, '#d9726a'); R(kx, ky + 5, 36, 1, '#9a2a2a');
    for (let k = 0; k < 8; k++) for (let r = 0; r < 2; r++) { const up = n && (k * 3 + r + Math.floor(t * 8)) % 5 === 0 ? 1 : 0; R(kx + 1 + k * 4 + r * 2, ky + 1 + r * 2 - up, 3, 2, '#efe6d2'); R(kx + 1 + k * 4 + r * 2, ky + 2 + r * 2 - up, 3, 1, '#c9bfa8'); }
    const ms = n ? Math.round(Math.sin(t * 2) * 1) : 0;
    ell(kx + 50 + ms, ky + 2, 5, 3, K); ell(kx + 50 + ms, ky + 2, 4, 2, '#8a2226'); R(kx + 48 + ms, ky + 1, 2, 1, '#d9726a');
    for (let k = 0; k < 10; k++) R(kx + 50 + ms + Math.round(Math.sin(k * 0.6) * 2) - (k > 6 ? k - 6 : 0), ky - 2 - k, 2, 1, '#c06a70');
    // what is left of the eaten lies on the floor of the slot: a sneaker, a cap, glasses
    const LEFT = [[x + 10, y + h - 14, 'shoe'], [x + w - 30, y + h - 14, 'cap'], [x + Math.round(w / 2) + 20, y + h - 9, 'glasses']];
    for (let k = 0; k < n && k < 3; k++) {
      const [lx, ly, kind] = LEFT[k];
      if (kind === 'shoe') { R(lx, ly, 16, 7, K); R(lx + 1, ly + 1, 9, 5, '#e05a3a'); R(lx + 10, ly + 3, 5, 3, '#e05a3a'); R(lx + 1, ly + 5, 14, 1, '#ffffff'); R(lx + 3, ly + 2, 1, 1, '#ffffff'); R(lx + 6, ly + 2, 1, 1, '#ffffff'); }
      else if (kind === 'cap') { R(lx + 3, ly, 12, 6, K); R(lx + 4, ly + 1, 10, 4, '#3a6ad0'); R(lx + 4, ly + 1, 10, 1, '#6a9af0'); R(lx, ly + 5, 18, 2, K); R(lx + 1, ly + 5, 16, 1, '#2a4aa0'); }
      else { R(lx, ly, 6, 4, K); R(lx + 1, ly + 1, 4, 2, '#9fd0f0'); R(lx + 8, ly, 6, 4, K); R(lx + 9, ly + 1, 4, 2, '#9fd0f0'); R(lx + 6, ly + 1, 2, 1, K); }
      R(lx - 2, ly + 7, 22, 1, 'rgba(176,16,24,.6)');
    }
    // the moment it eats: tendrils lash out of the top and the screen flashes red
    if (fresh) {
      const f = (t - eatAt) / 1.5;
      for (let k = 0; k < 6; k++) { const a = -Math.PI / 2 + (k - 2.5) * 0.45, L = Math.round(40 * Math.sin(f * Math.PI)); for (let s = 0; s < L; s++) R(cx + Math.round(Math.cos(a + Math.sin(s * 0.2 + t * 6) * 0.2) * s), ty - Math.round(Math.sin(-a) * s * 0.7), 2, 2, s % 3 ? '#b8433f' : '#f0a59a'); }
      R(scx, scy, scw, sch, `rgba(255,40,40,${(0.5 * (1 - f)).toFixed(2)})`);
    }
  }
/* в цикле по местам, перед веткой extractor: if (s.machine === 'fleshdesk' && big) desk(x, y, ww, hh, (state.run.eaten || []).length, state.run.eatAt); else */
