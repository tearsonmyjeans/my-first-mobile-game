// Черновик альтернативного цеха 8: кондитерская. В игру НЕ вставлен, ботом не проверен, вставка в другой сессии.
// Блоки ниже — готовый код в стиле игры (R, disc, K, t, W, FL, colX, rowY, SW, SH из game/index.html).
// Индекс цеха здесь G: при вставке заменить на настоящий индекс кондитерской.
// Схема игрока: два обычных места рядом и широкий прилавок через обе колонки, он касается обоих (как Эталон, WIDE).
// Сразу после покупки цеха игрок выбирает прилавок, run.counter = 'cake' или 'hot', второй закрыт до конца забега.
// Торты: прилавок сверху, обычные места под ним. Хотдоги: обычные места сверху, прилавок снизу.
// В начале каждой смены приходит заказ run.order = { kind, need, have, done }, его талон висит на стене справа (docs/workshops.md).
// Превью: node drafts/bakery-preview.js снимает цех в копии игры, где кондитерская стоит вместо манги.

// ===== LOCS =====
//    { name: 'Кондитерская', tab: 'Кондит.', sign: 'ЦЕХ 8 · КОНДИТЕРСКАЯ', cost: 6e11, wall: '#fbeee6', mortar: '#f6c9d6', floor: '#cdeee0', grid: '#cdeee0', plate: '#fff6ea', frame: '#b0587a', item: '#f8c2d3', board: '#c2456e', boardHi: '#e8789a', goods: 'sweets', unit: 'Сладости', unit1: 'Цена сладости', start: 'beater', desc: 'x', opened: 'x' },

// ===== LAYOUTS =====
//    // the counter across both columns (anchored at column 0) and a pair of slots; the run's choice puts the counter on top or below
//    cake: [[0, 1], [1, 1], [0, 0]], hot: [[0, 0], [1, 0], [0, 1]]; WIDE[G] = 2 в обоих вариантах.
//    Индексы мест одни и те же, меняются только строки, поэтому сохранение не ломается.

// ===== MACH =====
//    beater: { loc: G, name: 'Миксер', short: 'МИКСЕР', rate: 0.8, value: 1.5e7, max: 1, desc: 'Взбивает тесто и крем.' },
//    oven: { loc: G, name: 'Духовка', short: 'ДУХОВКА', rate: 0.5, value: 3.5e7, max: 1, desc: 'Печёт капкейки и булки.' },
//    cakecase: { loc: G, name: 'Витрина тортов', short: 'ТОРТЫ', rate: 0.3, value: 8e7, max: 1, counter: 'cake', desc: 'Только на прилавке. Сотрудник на ней: удача +20.' },
//    hotgrill: { loc: G, name: 'Гриль хотдогов', short: 'ХОТДОГИ', rate: 0.3, value: 8e7, max: 1, counter: 'hot', desc: 'Только на прилавке. Сотрудник на нём: сила +25%, скилл действует на 50% дольше.' },

/* ===== WALL: ветка стены в drawWorld (else if (l === G) { ... }) ===== */
      // a sweet shop: pink and cream candy stripes, a mint band with a scalloped edge, bunting, a shelf of sweet jars;
      // on the right a steel rail with the shift's order ticket, it fills up as the order is made and gets a stamp when done
      R(0, 0, W, 29, '#fbeee6');
      for (let xx = 0; xx < W; xx += 8) { R(xx, 0, 4, 22, '#f6c9d6'); R(xx + 4, 0, 1, 22, '#f9dbe3'); }
      R(0, 22, W, 6, '#9fd8c4'); R(0, 22, W, 1, '#c4ecdc'); R(0, 27, W, 1, '#7cc2ac');
      for (let xx = 0; xx < W; xx += 6) { R(xx + 1, 21, 4, 1, '#9fd8c4'); R(xx + 2, 20, 2, 1, '#9fd8c4'); R(xx + 3, 24, 1, 1, '#ffffff'); }
      const BUNT = ['#e8789a', '#f2c94c', '#7cc2ac', '#ffffff'];
      for (let xx = 0; xx < W; xx++) R(xx, 1 + Math.round(Math.sin(xx / W * Math.PI) * 3), 1, 1, '#b0587a');
      for (let k = 0; k * 10 + 4 < W; k++) {
        const bx = k * 10 + 3, by = 2 + Math.round(Math.sin((bx + 3) / W * Math.PI) * 3), fl = Math.floor(t * 2 + k) % 3 === 0 ? 1 : 0, c = BUNT[k % 4];
        R(bx, by, 7, 1, K); R(bx + 1, by + 1, 5, 1, K); R(bx + 1, by, 5, 1, c); R(bx + 2, by + 1, 3, 1, c); R(bx + 2 + fl, by + 2, 2, 1, K); R(bx + 3, by + 1, 1, 1, c);
      }
      // the jar shelf: pink, lemon and mint candies, the middle jar's lid wobbles
      const sx = 6;
      R(sx, 17, 42, 3, K); R(sx + 1, 17, 40, 1, '#d99a62'); R(sx + 1, 18, 40, 1, '#a8693a');
      for (let k = 0; k < 4; k++) {
        const jx = sx + 2 + k * 10, lid = k === 1 && Math.floor(t * 3) % 4 === 0 ? 1 : 0, c1 = ['#e8789a', '#f2c94c', '#7cc2ac', '#c98ae0'][k], c2 = ['#ffffff', '#e0a040', '#ffffff', '#f2c94c'][k];
        R(jx, 8, 9, 9, K); R(jx + 1, 9, 7, 7, '#e9f5f7'); R(jx + 1, 11, 7, 5, c1);
        for (let q = 0; q < 4; q++) R(jx + 2 + (q * 3) % 6, 12 + (q % 2) * 2, 1, 1, c2);
        R(jx + 1, 9, 1, 6, '#ffffff'); R(jx + 1, 6 - lid, 7, 3, K); R(jx + 2, 7 - lid, 5, 1, ['#b0587a', '#e0a040', '#3f9a7a', '#8a5ab0'][k]);
      }
      // the order ticket on its rail, swaying a little
      const o = state.run.order, ox = W - 46, sw = Math.round(Math.sin(t * 1.6));
      R(ox - 4, 3, 44, 2, K); R(ox - 3, 3, 42, 1, '#c9d0d6');
      if (o) {
        const tx = ox + 6 + sw, f = Math.min(1, o.have / o.need);
        R(tx + 6, 4, 4, 3, K); R(tx + 7, 4, 2, 2, '#9aa3ad');
        R(tx, 6, 26, 15, K); R(tx + 1, 7, 24, 13, '#ffffff'); for (let k = 0; k < 6; k++) R(tx + 1 + k * 4, 19, 2, 1, '#e9eef2');
        // what is ordered: a cake slice or a hot dog, then two chalk lines of the order text
        if (state.run.counter === 'hot') { R(tx + 3, 10, 7, 3, K); R(tx + 4, 10, 5, 1, '#e8c07a'); R(tx + 4, 11, 5, 1, '#c8553f'); R(tx + 5, 10, 1, 1, '#f2c94c'); R(tx + 7, 10, 1, 1, '#f2c94c'); }
        else { R(tx + 3, 9, 7, 5, K); R(tx + 4, 10, 5, 1, '#f8c2d3'); R(tx + 4, 11, 5, 1, '#fff6ea'); R(tx + 4, 12, 5, 1, '#e8789a'); R(tx + 6, 8, 2, 1, '#d64545'); }
        R(tx + 12, 9, 10, 1, '#9aa3ad'); R(tx + 12, 12, 7, 1, '#9aa3ad');
        R(tx + 3, 16, 20, 2, '#e9eef2'); R(tx + 3, 16, Math.round(20 * f), 2, o.done ? '#57b04f' : '#e8789a');
        if (o.done) { R(tx + 15, 8, 8, 6, '#57b04f'); R(tx + 16, 9, 6, 4, '#ffffff'); R(tx + 17, 11, 1, 1, '#57b04f'); R(tx + 18, 12, 1, 1, '#57b04f'); R(tx + 19, 10, 1, 2, '#57b04f'); R(tx + 20, 9, 1, 1, '#57b04f'); }
      }

/* ===== FLOOR: блок пола и декора (if (l === G) { ... }), после R(0, 31, W, FL - 31, LT.floor) ===== */
      // mint and cream diner tiles; sprinkles lie about
      for (let ty = 31; ty < FL; ty += 16) for (let tx = 0; tx < W; tx += 16) { const m = ((tx + ty - 31) / 16) % 2 === 0; R(tx, ty, 16, 16, m ? '#cdeee0' : '#fff6ea'); R(tx, ty, 16, 1, m ? '#dcf4ea' : '#ffffff'); R(tx, ty + 15, 16, 1, m ? '#b8e2d2' : '#f1e3d4'); }
      for (let k = 0; k < 26; k++) R((k * 53 + 7) % W, 34 + (k * 37) % (FL - 40), k % 2 ? 2 : 1, k % 2 ? 1 : 2, ['#e8789a', '#f2c94c', '#7cc2ac', '#c98ae0'][k % 4]);
      const ell = (cx, cy, rx, ry, col) => { for (let dy = -ry; dy <= ry; dy++) { const w = Math.round(rx * Math.sqrt(1 - (dy / ry) ** 2)); R(cx - w, cy + dy, w * 2 + 1, 1, col); } };
      const shadow = (x, y, w) => R(x, y, w, 3, 'rgba(30,20,40,.2)');
      const lx = Math.round(colX(0) / 2), rx = W - Math.round((W - colX(1) - SW) / 2), hot = state.run.counter === 'hot';

      // top left: a gumball machine, now and then a gumball rolls down the chute into the tray
      const gx0 = lx, gy0 = rowY(0) + 10;
      shadow(gx0 - 11, gy0 + 60, 22);
      R(gx0 - 9, gy0 + 34, 18, 26, K); R(gx0 - 8, gy0 + 35, 16, 24, '#d64545'); R(gx0 - 8, gy0 + 35, 3, 24, '#e86a6a'); R(gx0 - 8, gy0 + 35, 16, 2, '#e86a6a');
      R(gx0 - 4, gy0 + 40, 8, 8, K); R(gx0 - 3, gy0 + 41, 6, 6, '#c9d0d6'); R(gx0 - 1, gy0 + 42, 2, 4, '#7d8794');
      R(gx0 - 5, gy0 + 51, 10, 5, K); R(gx0 - 4, gy0 + 52, 8, 3, '#3a3346');
      disc(gx0, gy0 + 18, 15, K); disc(gx0, gy0 + 18, 14, '#e9f5f7');
      const GUM = ['#e8789a', '#f2c94c', '#7cc2ac', '#5b8fd6', '#ffffff', '#c98ae0'];
      for (let k = 0; k < 26; k++) { const a = k * 2.4, r = 3 + (k * 7) % 10; if (Math.sin(a) * r < -6) continue; disc(gx0 + Math.round(Math.cos(a) * r), gy0 + 21 + Math.round(Math.sin(a) * r * 0.7), 2, GUM[k % 6]); }
      R(gx0 - 9, gy0 + 9, 3, 6, '#ffffff'); R(gx0 - 7, gy0 + 7, 3, 2, '#ffffff');
      R(gx0 - 6, gy0 + 32, 12, 3, K); R(gx0 - 2, gy0 + 1, 4, 3, K); R(gx0 - 1, gy0 + 2, 2, 1, '#d64545');
      const gp = (t * 0.35) % 1;
      if (gp < 0.3) disc(gx0, gy0 + 47 + Math.round(gp / 0.3 * 7), 2, GUM[Math.floor(t * 0.35) % 6]);
      else disc(gx0 - 1, gy0 + 54, 2, GUM[Math.floor(t * 0.35) % 6]);

      // bottom left: flour sacks, a mouse peeks out and nibbles, flour dust drifts up
      const fx = lx, fy = rowY(1) + 28;
      shadow(fx - 18, fy + 40, 36);
      const sack = (sx0, sy0, w, h) => { R(sx0, sy0 + 3, w, h - 3, K); R(sx0 + 1, sy0 + 4, w - 2, h - 5, '#f1e7d6'); R(sx0 + 1, sy0 + 4, 3, h - 5, '#ffffff'); R(sx0 + 3, sy0, w - 6, 4, K); R(sx0 + 4, sy0 + 1, w - 8, 2, '#e6d8c0'); R(sx0 + 4, sy0 + 10, w - 8, 5, '#9fd8c4'); R(sx0 + 6, sy0 + 12, w - 12, 1, '#3f9a7a'); };
      sack(fx - 19, fy + 14, 20, 26); sack(fx + 1, fy + 16, 18, 24); sack(fx - 10, fy - 6, 20, 24);
      const mp = (t * 0.3) % 1, peek = mp < 0.55 ? Math.round(Math.min(1, mp * 6) * 4) : Math.max(0, Math.round((0.75 - mp) * 20));
      if (peek > 0) {
        const mx = fx + 9, my = fy + 18 - peek;
        R(mx - 3, my, 9, 7, K); R(mx - 2, my + 1, 7, 6, '#a9a3b0'); R(mx - 4, my - 2, 4, 4, K); R(mx - 3, my - 1, 2, 2, '#f2a7c3'); R(mx + 3, my - 2, 4, 4, K); R(mx + 4, my - 1, 2, 2, '#f2a7c3');
        R(mx - 1, my + 3, 1, 1, K); R(mx + 3, my + 3, 1, 1, K); R(mx + 1, my + 5, 1, 1, '#e8789a');
        if (peek >= 4) { const nib = Math.floor(t * 6) % 2; R(mx + 6, my + 4 + nib, 3, 2, '#e8c07a'); }
      }
      for (let k = 0; k < 5; k++) { const s = (t * 0.4 + k / 5) % 1; R(fx - 12 + k * 6 + Math.round(Math.sin(s * 5 + k) * 3), fy - 4 - Math.round(s * 22), 2, 2, `rgba(255,255,255,${(0.75 * (1 - s)).toFixed(2)})`); }

      // top right, by the counter's choice: a three-tier wedding cake on a trolley with a flickering candle,
      // or a dachshund dressed as a hot dog, wagging and sniffing
      if (!hot) {
        const cx = rx, cy = rowY(0) + 8;
        shadow(cx - 15, cy + 62, 30);
        R(cx - 15, cy + 50, 30, 4, K); R(cx - 14, cy + 51, 28, 2, '#c9d0d6'); R(cx - 13, cy + 54, 2, 7, K); R(cx + 11, cy + 54, 2, 7, K);
        disc(cx - 12, cy + 61, 2, K); disc(cx + 12, cy + 61, 2, K);
        const tier = (w, ty, h) => { R(cx - w / 2 - 1, ty - 1, w + 2, h + 2, K); R(cx - w / 2, ty, w, h, '#fff6ea'); R(cx - w / 2, ty, w, 2, '#ffffff'); R(cx - w / 2, ty + h - 3, w, 2, '#f8c2d3'); for (let q = 0; q < w; q += 4) { R(cx - w / 2 + q, ty + 2, 2, 2, '#f8c2d3'); R(cx - w / 2 + q + 1, ty + h - 4, 1, 1, '#e8789a'); } };
        tier(26, cy + 38, 11); tier(20, cy + 27, 11); tier(14, cy + 17, 10);
        for (const [a, b] of [[-9, 36], [8, 25], [-5, 25], [3, 15]]) { R(cx + a, cy + b, 3, 3, K); R(cx + a + 1, cy + b + 1, 1, 1, '#d64545'); }
        R(cx - 1, cy + 8, 3, 9, K); R(cx, cy + 9, 1, 8, '#f2a7c3'); const fl = Math.floor(t * 8) % 3;
        R(cx - 1 + (fl === 1 ? 1 : 0), cy + 3, 3, 4, K); R(cx, cy + 4, 1, 3 - (fl === 2 ? 1 : 0), '#f2c94c'); R(cx, cy + 6, 1, 1, '#e0533a');
        if (fl === 0) { R(cx - 4, cy + 3, 1, 1, '#fff1b0'); R(cx + 4, cy + 5, 1, 1, '#fff1b0'); }
      } else {
        const dx = rx, dy = rowY(0) + 44, wag = Math.floor(t * 6) % 2, sniff = Math.floor(t * 1.5) % 3 === 0 ? 1 : 0;
        shadow(dx - 18, dy + 18, 36);
        R(dx - 15, dy + 3, 4, 14, K); R(dx + 8, dy + 3, 4, 14, K); R(dx - 14, dy + 4, 2, 12, '#8a4a2a'); R(dx + 9, dy + 4, 2, 12, '#8a4a2a');
        R(dx - 18, dy - 4, 32, 12, K); R(dx - 17, dy - 3, 30, 10, '#a85a32'); R(dx - 17, dy - 3, 30, 2, '#c4744a');
        R(dx - 16, dy - 8, 28, 6, K); R(dx - 15, dy - 7, 26, 4, '#e8c07a'); R(dx - 15, dy - 7, 26, 1, '#f6d9a0');
        for (let q = 0; q < 6; q++) R(dx - 13 + q * 4, dy - 9 + (q % 2), 3, 1, q % 2 ? '#d64545' : '#f2c94c');
        R(dx - 16, dy + 6, 28, 4, K); R(dx - 15, dy + 6, 26, 2, '#e8c07a');
        R(dx - 22 - wag, dy - 2 + wag, 6, 2, K); R(dx - 21 - wag, dy - 2 + wag, 4, 1, '#8a4a2a');
        R(dx + 12, dy - 10 + sniff, 12, 10, K); R(dx + 13, dy - 9 + sniff, 10, 8, '#a85a32'); R(dx + 21, dy - 6 + sniff, 5, 4, K); R(dx + 22, dy - 5 + sniff, 3, 2, '#c4744a'); R(dx + 25, dy - 6 + sniff, 2, 2, K);
        R(dx + 17, dy - 7 + sniff, 2, 2, K); R(dx + 17, dy - 7 + sniff, 1, 1, '#ffffff'); R(dx + 11, dy - 8 + sniff, 5, 10, K); R(dx + 12, dy - 7 + sniff, 3, 8, '#6a3a1f');
        if (sniff) { R(dx + 28, dy - 8, 1, 1, '#ffffff'); R(dx + 29, dy - 5, 1, 1, '#ffffff'); }
      }

      // bottom right: a stack of pink pastry boxes tied with ribbon, a rolling pin leans on it
      const bx = rx - 13, by = rowY(1) + 22;
      shadow(bx - 2, by + 46, 30);
      for (let k = 0; k < 4; k++) {
        const yy = by + 34 - k * 11, ww = 26 - (k % 2) * 4, xx = bx + (k % 2) * 2;
        R(xx, yy, ww, 12, K); R(xx + 1, yy + 1, ww - 2, 10, k % 2 ? '#fff6ea' : '#f8c2d3'); R(xx + 1, yy + 1, ww - 2, 2, k % 2 ? '#ffffff' : '#fbd9e3');
        R(xx + ww / 2 - 1, yy + 1, 2, 10, '#b0587a'); R(xx + 1, yy + 6, ww - 2, 1, '#b0587a');
      }
      const rb = Math.floor(t * 1.5) % 2; R(bx + 7 - rb, by - 6, 4, 4, K); R(bx + 13 + rb, by - 6, 4, 4, K); R(bx + 8 - rb, by - 5, 2, 2, '#e8789a'); R(bx + 14 + rb, by - 5, 2, 2, '#e8789a'); R(bx + 11, by - 4, 2, 2, K);
      for (let k = 0; k < 20; k++) R(bx + 26 + Math.round(k * 0.35), by + 6 + k * 2, 3, 2, K);
      for (let k = 0; k < 20; k++) R(bx + 27 + Math.round(k * 0.35), by + 6 + k * 2, 1, 2, k < 3 || k > 16 ? '#a8693a' : '#e3b47c');

/* ===== COUNTER: функция рядом с extractor/etalon, рисует широкий прилавок через обе колонки; слева на нём стоит сотрудник ===== */
  function counter(x, y, ww, hh, type) {
    const cx = x + 34, cw = ww - 40;
    if (type === 'cakecase') {
      // a glass cake display on a pink base: a cake turns on a stand on top, two shelves of cakes, slices and eclairs,
      // a glint runs across the glass; the worker here is lucky, a clover glows on the plate
      R(cx, y + 50, cw, 22, K); R(cx + 1, y + 51, cw - 2, 20, '#f29ab5'); R(cx + 1, y + 51, cw - 2, 2, '#f8c2d3'); R(cx + 1, y + 69, cw - 2, 2, '#d7739a');
      for (let k = 0; k < cw - 6; k += 6) { R(cx + 3 + k, y + 56, 4, 1, '#ffffff'); R(cx + 4 + k, y + 57, 2, 1, '#ffffff'); }
      R(cx + cw / 2 - 8, y + 60, 16, 7, K); R(cx + cw / 2 - 7, y + 61, 14, 5, '#fff6ea'); R(cx + cw / 2 - 5, y + 63, 10, 1, '#b0587a');
      R(cx, y + 18, cw, 33, K); R(cx + 1, y + 19, cw - 2, 31, '#eaf6f8'); R(cx + 1, y + 34, cw - 2, 2, '#c9d0d6'); R(cx + 1, y + 19, cw - 2, 1, '#ffffff');
      const cake = (px, py, w, h, body, cream, berry) => {
        R(px - 1, py - 1, w + 2, h + 2, K); R(px, py, w, h, body); R(px, py, w, 2, cream); R(px, py + Math.floor(h / 2), w, 1, cream);
        for (let q = 1; q < w - 1; q += 3) R(px + q, py + 2, 1, 1, cream);
        if (berry) { R(px + Math.floor(w / 2) - 1, py - 3, 3, 3, K); R(px + Math.floor(w / 2), py - 2, 1, 1, '#d64545'); }
      };
      cake(cx + 5, y + 26, 16, 8, '#8a4a2a', '#fff6ea', true); cake(cx + 27, y + 27, 14, 7, '#f8c2d3', '#ffffff', true); cake(cx + 47, y + 26, 16, 8, '#f2c94c', '#fff6ea', false);
      cake(cx + 69, y + 27, 14, 7, '#9fd8c4', '#ffffff', true); cake(cx + 89, y + 26, 14, 8, '#c98ae0', '#fff6ea', true);
      for (let k = 0; k < 5; k++) {
        const px = cx + 5 + k * 20, py = y + 41;
        if (k % 2) { R(px - 1, py, 14, 6, K); R(px, py + 1, 12, 4, '#e3b47c'); R(px, py + 1, 12, 1, '#5a3a1f'); R(px + 2, py + 1, 1, 1, '#ffffff'); }
        else { R(px - 1, py - 1, 10, 9, K); R(px, py + 4, 8, 3, '#e8789a'); R(px, py, 8, 4, '#fff6ea'); R(px + 3, py - 3, 3, 3, K); R(px + 4, py - 2, 1, 1, '#d64545'); }
        R(px + 2, py + 7, 6, 2, '#ffffff');
      }
      const gl = ((t * 18) % (cw + 30)) - 15;
      for (let yy = y + 19; yy < y + 50; yy++) { const gx2 = Math.round(cx + gl + (yy - y) * 0.4); if (gx2 > cx && gx2 < cx + cw - 3) R(gx2, yy, 2, 1, 'rgba(255,255,255,.55)'); }
      // the turning cake on its stand above the case
      const sx = cx + cw / 2;
      R(sx - 2, y + 15, 5, 4, K); R(sx - 1, y + 16, 3, 3, '#e9eef2'); R(sx - 9, y + 14, 19, 2, K); R(sx - 8, y + 14, 17, 1, '#ffffff');
      R(sx - 8, y + 6, 17, 8, K); R(sx - 7, y + 7, 15, 6, '#fff6ea'); R(sx - 7, y + 7, 15, 2, '#ffffff');
      for (let q = 0; q < 15; q++) if ((q + Math.floor(t * 5)) % 5 === 0) { R(sx - 7 + q, y + 9, 1, 4, '#f8c2d3'); R(sx - 7 + q, y + 7, 1, 1, '#d64545'); }
      R(sx, y + 3, 1, 3, '#7cc2ac'); R(sx, y + 1 - Math.floor(t * 8) % 2, 1, 2, '#f2c94c');
      const clv = 0.5 + 0.5 * Math.sin(t * 3);
      R(x + 4, y + 14, 3, 3, '#57b04f'); R(x + 7, y + 14, 3, 3, '#57b04f'); R(x + 4, y + 17, 3, 3, '#57b04f'); R(x + 7, y + 17, 3, 3, '#57b04f'); R(x + 6, y + 20, 1, 3, '#3f7a4a');
      R(x + 5, y + 15, 1, 1, `rgba(255,255,255,${clv.toFixed(2)})`);
    } else {
      // a hot dog stand: a steel cart in red and mustard stripes, sausages turn on a roller grill under a glass hood,
      // a bun warmer, ketchup and mustard; a hot dog at the front gets its ketchup zigzag; the worker here is strong, a bolt glows
      R(cx, y + 44, cw, 26, K); R(cx + 1, y + 45, cw - 2, 24, '#c9d0d6'); R(cx + 1, y + 45, cw - 2, 2, '#e9eef2');
      R(cx + 1, y + 52, cw - 2, 5, '#d64545'); R(cx + 1, y + 57, cw - 2, 3, '#f2c94c'); for (let k = 0; k < cw - 4; k += 10) R(cx + 4 + k, y + 62, 6, 1, '#9aa3ad');
      disc(cx + 12, y + 70, 3, K); disc(cx + 12, y + 70, 2, '#5a5060'); disc(cx + cw - 12, y + 70, 3, K); disc(cx + cw - 12, y + 70, 2, '#5a5060');
      // the roller grill
      const gx2 = cx + 4, gw = 62;
      R(gx2, y + 22, gw, 22, K); R(gx2 + 1, y + 23, gw - 2, 20, '#7d8794'); R(gx2 + 1, y + 41, gw - 2, 2, '#5a5060');
      for (let r = 0; r < 3; r++) for (let k = 0; k < 4; k++) {
        const px = gx2 + 4 + k * 14 + (r % 2) * 3, py = y + 26 + r * 5, sp = (Math.floor(t * 6) + k + r) % 10;
        R(px, py, 12, 4, K); R(px + 1, py + 1, 10, 2, '#c8553f'); R(px + 1 + sp, py + 1, 1, 1, '#f08a70'); R(px + 1 + (sp + 5) % 10, py + 2, 1, 1, '#8a3328');
      }
      R(gx2 - 1, y + 16, gw + 2, 7, K); R(gx2, y + 17, gw, 5, 'rgba(220,240,250,.7)'); R(gx2 + 3, y + 17, 20, 1, '#ffffff');
      for (let k = 0; k < 4; k++) { const s = (t * 0.6 + k / 4) % 1; R(gx2 + 8 + k * 14 + Math.round(Math.sin(s * 6 + k) * 2), y + 14 - Math.round(s * 14), 2, 2, `rgba(255,255,255,${(0.75 * (1 - s)).toFixed(2)})`); }
      // the bun warmer with ketchup and mustard on top
      // the bun warmer, ketchup and mustard stand on the cart beside it, below the machine's label
      const wx = cx + 70, wwm = cw - 88;
      R(wx, y + 24, wwm, 20, K); R(wx + 1, y + 25, wwm - 2, 18, '#e9eef2'); R(wx + 3, y + 27, wwm - 6, 11, '#3a3346');
      for (let k = 0; k < 2; k++) { R(wx + 4 + k * 8, y + 30, 7, 5, '#e8c07a'); R(wx + 4 + k * 8, y + 30, 7, 1, '#f6d9a0'); R(wx + 4 + k * 8, y + 34, 7, 1, '#c98f4a'); }
      R(wx + 4, y + 40, wwm - 8, 1, '#9aa3ad');
      for (const [bx2, col, hi] of [[wx + wwm + 1, '#d64545', '#f08a70'], [wx + wwm + 8, '#f2c94c', '#fff1b0']]) { R(bx2, y + 31, 7, 13, K); R(bx2 + 1, y + 32, 5, 12, col); R(bx2 + 1, y + 32, 1, 12, hi); R(bx2 + 2, y + 27, 3, 4, K); R(bx2 + 3, y + 28, 1, 2, col); }
      // the hot dog on its paper tray gets a ketchup zigzag, then starts again
      const hx = wx - 2, hy = y + 46 - 4, n = Math.floor((t * 2.5) % 9);
      R(hx - 18, hy - 1, 22, 7, K); R(hx - 17, hy, 20, 5, '#e8c07a'); R(hx - 17, hy + 4, 20, 1, '#c98f4a'); R(hx - 19, hy + 1, 24, 2, K); R(hx - 18, hy + 1, 22, 1, '#c8553f');
      for (let k = 0; k < Math.min(n, 7); k++) R(hx - 16 + k * 3, hy + (k % 2), 2, 1, '#d64545');
      const bolt = 0.5 + 0.5 * Math.sin(t * 3);
      R(x + 7, y + 13, 3, 4, '#f2c94c'); R(x + 5, y + 16, 5, 2, '#f2c94c'); R(x + 5, y + 18, 3, 4, '#f2c94c'); R(x + 6, y + 13, 1, 1, `rgba(255,255,255,${bolt.toFixed(2)})`);
    }
  }
/* в цикле по местам: else if ((s.machine === 'cakecase' || s.machine === 'hotgrill') && ww !== SW) counter(x, y, ww, hh, s.machine); — перед веткой etalon */

/* ===== MACHINES: ветки machine(type, x, y), коробка около 32×30, вставлять перед } else if (type === 'dough') ===== */
    } else if (type === 'beater') {
      // a pink stand mixer: the head hums, the whisk spins through peaks of cream, a puff of flour now and then
      const hum = Math.floor(t * 8) % 2;
      R(x + 1, y + 26, 30, 4, K); R(x + 2, y + 27, 28, 2, '#e8789a'); R(x + 2, y + 27, 28, 1, '#f6b8cb');
      R(x + 22, y + 6, 9, 21, K); R(x + 23, y + 7, 7, 19, '#f29ab5'); R(x + 23, y + 7, 2, 19, '#f8c2d3');
      R(x + 5, y + 1 + hum, 27, 11, K); R(x + 6, y + 2 + hum, 25, 9, '#f29ab5'); R(x + 6, y + 2 + hum, 25, 2, '#f8c2d3'); R(x + 6, y + 9 + hum, 25, 1, '#d7739a');
      R(x + 26, y + 4 + hum, 3, 3, K); R(x + 27, y + 5 + hum, 1, 1, '#ffffff'); R(x + 8, y + 5 + hum, 12, 1, '#ffffff');
      R(x + 11, y + 12 + hum, 3, 4, K); R(x + 12, y + 12 + hum, 1, 4, '#c9d0d6');
      R(x + 3, y + 15, 20, 12, K); R(x + 4, y + 16, 18, 10, '#c9d0d6'); R(x + 4, y + 16, 18, 1, '#e9eef2'); R(x + 5, y + 18, 2, 7, '#e9eef2'); R(x + 18, y + 18, 2, 7, '#9aa3ad');
      for (let k = 0; k < 6; k++) { const a = t * 6 + k * 1.05; R(x + 11 + Math.round(Math.cos(a) * 6), y + 15 - Math.round(Math.abs(Math.sin(a)) * 2), 3, 2, k % 2 ? '#fff6ea' : '#ffffff'); }
      for (let k = 0; k < 3; k++) { const a = t * 14 + k * 2.1; R(x + 12 + Math.round(Math.cos(a) * 3), y + 15, 1, 3, '#7d8794'); }
      const pf = (t * 0.5) % 1;
      if (pf < 0.45) for (let k = 0; k < 4; k++) R(x + 6 + k * 4 + Math.round(Math.sin(k * 2 + pf * 9) * 2), y + 13 - Math.round(pf * 22), 2, 2, `rgba(255,255,255,${(0.9 * (1 - pf * 2)).toFixed(2)})`);
    } else if (type === 'oven') {
      // a mint retro oven: dials, a blinking lamp, cupcakes rise behind a glowing window, steam from the vent, a ding when they are done
      R(x + 1, y + 3, 30, 27, K); R(x + 2, y + 4, 28, 25, '#9fd8c4'); R(x + 2, y + 4, 28, 1, '#c4ecdc'); R(x + 2, y + 4, 1, 25, '#c4ecdc'); R(x + 29, y + 5, 1, 24, '#7cc2ac');
      R(x + 2, y + 9, 28, 1, K);
      for (let k = 0; k < 3; k++) { R(x + 5 + k * 6, y + 5, 4, 3, K); R(x + 6 + k * 6, y + 6, 2, 1, '#fff6ea'); }
      R(x + 25, y + 6, 3, 2, Math.floor(t * 2) % 2 ? '#e0533a' : '#7a2a2a');
      R(x + 4, y + 11, 24, 16, K); R(x + 5, y + 12, 22, 14, '#7cc2ac'); R(x + 5, y + 12, 22, 1, '#9fd8c4');
      const gl = Math.floor(t * 3) % 3;
      R(x + 7, y + 13, 18, 9, K); R(x + 8, y + 14, 16, 7, gl ? '#f2a64a' : '#f6b860'); R(x + 8, y + 20, 16, 1, '#e0533a');
      const rise = Math.round(((t * 0.4) % 1) * 2);
      for (let k = 0; k < 3; k++) { const px = x + 9 + k * 5; R(px, y + 18, 4, 2, '#b0587a'); R(px, y + 16 - rise, 4, 2 + rise, '#e8c07a'); R(px + 1, y + 16 - rise, 2, 1, '#f6d9a0'); }
      R(x + 9, y + 14, 3, 1, 'rgba(255,255,255,.6)');
      R(x + 8, y + 23, 16, 2, K); R(x + 9, y + 23, 14, 1, '#e9eef2');
      R(x + 3, y + 29, 4, 2, K); R(x + 25, y + 29, 4, 2, K);
      for (let k = 0; k < 3; k++) { const s = (t * 0.7 + k / 3) % 1; R(x + 8 + k * 7 + Math.round(Math.sin(s * 6 + k) * 2), y + 1 - Math.round(s * 12), 2, 2, `rgba(255,255,255,${(0.8 * (1 - s)).toFixed(2)})`); }
      if ((t * 0.25) % 1 < 0.12) { R(x + 29, y - 5, 1, 5, '#ffd54a'); R(x + 27, y - 3, 5, 1, '#ffd54a'); R(x + 29, y - 3, 1, 1, '#ffffff'); }
/* ===== ICONS: иконки карточек 16×16 в ICON_DRAW, в карты: m_beater: 'beater', m_oven: 'oven', m_cakecase: 'cakecase', m_hotgrill: 'hotgrill'. Строки: drafts/bakery-icons.js ===== */
/* ===== END ===== */
