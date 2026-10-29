// Черновик альтернативного цеха 6: ботанический сад (оранжерея). В игру НЕ вставлен, вставка в другой сессии.
// Блоки ниже — готовый код в стиле игры (R, disc, ell, K, t, W, FL, colX, rowY, SW из game/index.html).
// Индекс цеха здесь G: при вставке заменить на настоящий индекс сада.
// Схема игрока: три станка сверху (два дерева и куст), под ними два места, сдвинутые на полклетки:
// каждое нижнее касается двух верхних, нижние касаются друг друга. При открытии случайный из трёх станков
// встаёт на случайное верхнее место. Цена открытия как у пиццы (6e8). Скорости и цены станков не выбраны.

// ===== LOCS =====
//    { name: 'Сад', sign: 'ЦЕХ 6 · БОТАНИЧЕСКИЙ САД', tab: 'Сад', cost: 6e8, wall: '#bfe3ee', mortar: '#eef5f1', floor: '#86bf5e', grid: '#86bf5e', plate: '#7a5236', frame: '#3f2a1a', item: '#8fd16a', board: '#2f6e3a', boardHi: '#57b04f', goods: 'plants', unit: 'Растения', unit1: 'Цена растения', start: 'random', desc: 'x', opened: 'x' },

// ===== LAYOUTS =====
//    // three plants in a row, a pair below shifted by half a slot: each lower slot touches two upper ones
//    [[0, 0], [1, 0], [2, 0], [0.5, 1], [1.5, 1]],
// adjacent(): dy === 1 && dx < 1 уже подходит (dx = 0,5), правок не нужно.

// ===== MACH (заглушки) =====
//    apple: { loc: G, name: 'Яблоня', short: 'ЯБЛОНЯ', rate: 1, value: 1, max: 1, desc: 'x' },
//    palm: { loc: G, name: 'Пальма', short: 'ПАЛЬМА', rate: 1, value: 1, max: 1, desc: 'x' },
//    rosebush: { loc: G, name: 'Розовый куст', short: 'РОЗЫ', rate: 1, value: 1, max: 1, desc: 'x' },

/* ===== WALL: ветка стены в drawWorld (else if (l === G) { ... }) ===== */
      // a greenhouse: sky through glass in white iron frames with arched tops, big tropical leaves inside,
      // a low terracotta brick wall below, hanging baskets with trailing ivy
      R(0, 0, W, 28, '#bfe3ee'); R(0, 0, W, 6, '#a9d6e8'); R(0, 18, W, 10, '#cfeaf0');
      for (const [cx, cy] of [[18, 5], [W - 48, 3], [W / 2 + 60, 8]]) { R(cx, cy, 16, 3, '#f4f8fb'); R(cx + 3, cy - 2, 8, 2, '#f4f8fb'); R(cx + 2, cy + 3, 13, 1, '#dcebf2'); }
      // monstera and banana leaves behind the glass
      const leaf = (lx, ly, s, col, dk) => { for (let k = 0; k < s; k++) { const w = Math.round(Math.sin(k / s * Math.PI) * s * 0.6); R(lx - w, ly - k, w * 2 + 1, 1, col); } R(lx, ly - s + 1, 1, s, dk); for (let k = 2; k < s - 1; k += 3) { R(lx - Math.round(Math.sin(k / s * Math.PI) * s * 0.6), ly - k, 2, 1, '#cfeaf0'); } };
      for (let k = 0; k < 12; k++) { const lx = 6 + k * 21 + (k % 3) * 3, s = 8 + (k * 7) % 6; leaf(lx, 24, s, k % 2 ? '#5e9e7e' : '#4f8e70', '#3f7a5e'); }
      for (let k = 0; k < 8; k++) { const lx = 16 + k * 30, s = 6 + (k * 5) % 4; leaf(lx, 25, s, '#7bb894', '#5e9e7e'); }
      // white frames: posts, a top beam, a transom and an arch over every pane
      for (let xx = 0; xx <= W; xx += 30) { R(xx, 0, 3, 22, '#eef5f1'); R(xx + 2, 0, 1, 22, '#a9c4bc'); }
      R(0, 0, W, 2, '#eef5f1'); R(0, 2, W, 1, '#a9c4bc'); R(0, 11, W, 2, '#eef5f1'); R(0, 13, W, 1, '#a9c4bc');
      for (let xx = 0; xx < W; xx += 30) { R(xx + 3, 3, 4, 1, '#eef5f1'); R(xx + 23, 3, 4, 1, '#eef5f1'); R(xx + 3, 4, 2, 1, '#eef5f1'); R(xx + 25, 4, 2, 1, '#eef5f1'); R(xx + 7, 4, 3, 1, 'rgba(255,255,255,.55)'); R(xx + 6, 5, 1, 4, 'rgba(255,255,255,.4)'); }
      // knee wall of terracotta bricks
      R(0, 21, W, 7, '#b5654c'); R(0, 21, W, 1, '#d98a6a');
      for (let r = 0; r < 2; r++) { R(0, 24 + r * 3, W, 1, '#94523d'); for (let xx = (r % 2) * 6; xx < W; xx += 12) R(xx, 22 + r * 3, 1, 2, '#94523d'); }
      // hanging baskets with ivy, either side of the sign
      for (const hx of [30, W - 30]) {
        R(hx, 2, 1, 6, '#5a5060'); R(hx - 4, 7, 1, 2, '#5a5060'); R(hx + 4, 7, 1, 2, '#5a5060'); R(hx - 4, 7, 9, 1, '#5a5060');
        R(hx - 6, 9, 13, 6, K); R(hx - 5, 10, 11, 4, '#a8693a'); R(hx - 5, 10, 11, 1, '#c98a52'); for (let k = 0; k < 3; k++) R(hx - 4 + k * 4, 11, 1, 3, '#7a4a28');
        R(hx - 7, 7, 15, 3, K); R(hx - 6, 7, 13, 2, '#3f7f3a'); R(hx - 5, 7, 4, 1, '#8fd16a'); R(hx + 2, 7, 3, 1, '#5fa84a'); R(hx - 1, 6, 2, 1, '#f2a7c3'); R(hx + 4, 6, 2, 1, '#f2c94c');
        const sw = Math.round(Math.sin(t * 1.3 + hx) * 1);
        for (const [dx, len] of [[-6, 9], [-2, 12], [3, 7], [6, 11]]) for (let k = 0; k < len; k++) { const vx = hx + dx + (k > len / 2 ? sw : 0); R(vx, 15 + k, 1, 1, '#3f7f3a'); if (k % 3 === 1) R(vx + (k % 2 ? 1 : -1), 15 + k, 1, 1, '#5fa84a'); }
      }

/* ===== FLOOR: блок пола и декора (if (l === G) { ... }), после R(0, 31, W, FL - 31, LT.floor) ===== */
      // grass with tufts and a stepping stone path between the beds
      for (let k = 0; k < 90; k++) { const gx2 = (k * 53 + (k % 7) * 11) % W, gy = 33 + (k * 37) % (FL - 36); R(gx2, gy, 1, 2, '#6fa84c'); R(gx2 + 1, gy - 1, 1, 3, '#9fd174'); R(gx2 + 2, gy, 1, 2, '#6fa84c'); }
      for (let k = 0; k < 30; k++) R((k * 71 + 9) % W, 34 + (k * 43) % (FL - 38), 2, 1, '#a6d47a');
      const ell = (cx, cy, rx, ry, col) => { for (let dy = -ry; dy <= ry; dy++) { const w = Math.round(rx * Math.sqrt(1 - (dy / ry) ** 2)); R(cx - w, cy + dy, w * 2 + 1, 1, col); } };
      const shadow = (x, y, w) => R(x, y, w, 3, 'rgba(30,20,40,.28)');
      const stone = (sx, sy, rx, ry) => { ell(sx, sy + 1, rx, ry, '#5f7a4a'); ell(sx, sy, rx, ry, '#b9b3a6'); ell(sx - 1, sy - 1, rx - 2, ry - 1, '#d3cdbf'); R(sx + rx - 3, sy + 1, 2, 1, '#9a9488'); };
      for (const [sx, sy] of [[20, FL - 10], [W - 20, FL - 10], [120, 112], [42, 111], [198, 111]]) stone(sx, sy, 7, 3);
      // a flowerbed border of tulips under the lower pair
      const B0 = colX(0.5), B1 = colX(1.5) + SW;
      R(B0, FL - 14, B1 - B0, 12, '#6b4a2f'); R(B0, FL - 14, B1 - B0, 1, '#8a6040'); R(B0, FL - 3, B1 - B0, 1, '#4f3420');
      for (let k = 0; k < 14; k++) {
        const fx = B0 + 6 + k * 11, fy = FL - 12, bob = Math.round(Math.sin(t * 2 + k) * 0.6), col = ['#e0533a', '#f2c94c', '#f2a7c3', '#f4efe6'][k % 4];
        R(fx + 1, fy + 2, 1, 6, '#3f7f3a'); R(fx - 1, fy + 5, 2, 2, '#5fa84a'); R(fx + 2, fy + 4, 2, 2, '#5fa84a');
        R(fx - 1 + bob, fy - 2, 5, 5, K); R(fx + bob, fy - 1, 3, 3, col); R(fx + bob, fy - 2, 1, 1, col); R(fx + 2 + bob, fy - 2, 1, 1, col); R(fx + bob, fy - 1, 1, 1, 'rgba(255,255,255,.5)');
      }
      // bottom left: a garden gnome with a fishing rod on a stack of terracotta pots and a sack of soil
      const gx = 22, gy = rowY(1) + 6;
      shadow(gx - 18, FL - 22, 36);
      for (const [px, py] of [[gx - 16, FL - 36], [gx - 4, FL - 36], [gx - 10, FL - 46]]) { R(px, py, 13, 11, K); R(px + 1, py + 1, 11, 9, '#c8643c'); R(px - 1, py, 15, 3, K); R(px, py + 1, 13, 1, '#d97a50'); R(px + 2, py + 3, 2, 6, '#e08a60'); R(px + 4, py + 4, 7, 2, '#5a3a22'); }
      // the gnome: red cap, white beard, blue coat, a rod with a bobbing float
      const nx = gx - 6, ny = gy + 2, nb = Math.floor(t * 1.5) % 2;
      R(nx + 2, ny - 2, 9, 3, K); R(nx + 3, ny - 1, 7, 1, '#d64545');
      for (let k = 0; k < 7; k++) { const h = Math.floor((6 - k) / 2); R(nx + 6 - h - 1, ny - 3 - k, h * 2 + 3, 1, K); }
      for (let k = 0; k < 6; k++) { const h = Math.floor((6 - k) / 2); R(nx + 6 - h, ny - 3 - k, h * 2 + 1, 1, '#d64545'); }
      R(nx + 5, ny - 6, 1, 2, '#ff8a7a');
      R(nx + 2, ny + 1, 9, 5, K); R(nx + 3, ny + 1, 7, 3, '#f2c8a0'); R(nx + 4, ny + 2, 1, 1, K); R(nx + 8, ny + 2, 1, 1, K); R(nx + 5, ny + 3, 3, 1, '#e8968a');
      R(nx + 1, ny + 4, 11, 8, K); R(nx + 3, ny + 4, 7, 7, '#f4efe6'); R(nx + 2, ny + 6, 1, 4, '#3f6fd1'); R(nx + 10, ny + 6, 1, 4, '#3f6fd1'); R(nx + 4, ny + 10, 5, 1, '#e3dccd');
      R(nx + 2, ny + 12, 9, 6, K); R(nx + 3, ny + 12, 7, 4, '#3f6fd1'); R(nx + 3, ny + 12, 7, 1, '#5b8fd6'); R(nx + 3, ny + 15, 7, 1, '#8a5a32'); R(nx + 6, ny + 15, 1, 1, '#f2c94c');
      R(nx + 3, ny + 17, 3, 2, '#5a3a22'); R(nx + 7, ny + 17, 3, 2, '#5a3a22');
      R(nx + 11, ny + 9, 2, 2, '#f2c8a0'); for (let k = 0; k < 10; k++) R(nx + 12 + k, ny + 9 - k, 1, 1, '#8a5a32');
      R(nx + 22, ny - 1, 1, 9 + nb, 'rgba(240,240,240,.7)'); R(nx + 21, ny + 8 + nb, 3, 3, K); R(nx + 22, ny + 8 + nb, 1, 1, '#d64545'); R(nx + 22, ny + 9 + nb, 1, 1, '#f4efe6');
      // sack of soil
      const sx2 = 4, sy2 = FL - 34; R(sx2, sy2, 12, 14, K); R(sx2 + 1, sy2 + 2, 10, 11, '#c9a26a'); R(sx2 + 1, sy2 + 2, 2, 11, '#dcbb85'); R(sx2 + 3, sy2 - 1, 6, 3, K); R(sx2 + 4, sy2, 4, 1, '#c9a26a'); R(sx2 + 3, sy2 + 6, 6, 4, '#6b4a2f'); R(sx2 + 4, sy2 + 7, 4, 1, '#8fd16a');
      // bottom right: a wheelbarrow of soil with seedlings, a rake leaning, a watering can, a butterfly
      const wx = W - 40, wy = FL - 34;
      shadow(wx, FL - 20, 38);
      R(wx + 26, wy - 30, 2, 40, K); R(wx + 26, wy - 29, 1, 38, '#a8693a'); R(wx + 21, wy - 33, 12, 3, K); R(wx + 22, wy - 32, 10, 1, '#9aa3ad'); for (let k = 0; k < 5; k++) R(wx + 22 + k * 2, wy - 30, 1, 3, '#7d8794');
      R(wx + 2, wy + 2, 30, 12, K); R(wx + 3, wy + 3, 28, 9, '#3f8a5a'); R(wx + 3, wy + 3, 28, 1, '#5faa78'); R(wx + 3, wy + 9, 28, 1, '#2f6e48');
      R(wx + 4, wy, 26, 4, K); R(wx + 5, wy + 1, 24, 2, '#6b4a2f'); R(wx + 7, wy + 1, 3, 1, '#8a6040'); R(wx + 18, wy + 1, 4, 1, '#8a6040');
      for (const [a, c] of [[9, '#5fa84a'], [16, '#8fd16a'], [24, '#5fa84a']]) { R(wx + a, wy - 4, 1, 4, '#3f7f3a'); R(wx + a - 2, wy - 5, 2, 2, c); R(wx + a + 1, wy - 6, 2, 2, c); }
      R(wx - 1, wy + 6, 4, 2, K); R(wx - 4, wy + 7, 4, 1, '#8a5a32');
      disc(wx + 26, wy + 16, 4, K); disc(wx + 26, wy + 16, 3, '#3a3346'); R(wx + 26, wy + 16, 1, 1, '#9aa3ad'); R(wx + 6, wy + 13, 2, 7, K);
      // watering can
      const cx = W - 22, cy = rowY(1) + 4;
      shadow(cx - 2, cy + 16, 22);
      R(cx, cy + 4, 14, 12, K); R(cx + 1, cy + 5, 12, 10, '#4f9550'); R(cx + 1, cy + 5, 12, 2, '#6fbf6a'); R(cx + 2, cy + 7, 1, 6, '#8fe07a');
      R(cx + 3, cy, 8, 5, K); R(cx + 4, cy + 1, 6, 1, '#4f9550'); R(cx - 6, cy + 6, 7, 2, K); R(cx - 8, cy + 4, 3, 4, K); R(cx - 7, cy + 5, 1, 2, '#9aa3ad');
      R(cx + 14, cy + 6, 3, 6, K); R(cx + 13, cy + 7, 2, 4, '#4f9550');
      // a butterfly flutters over the beds
      const bx = Math.round(W / 2 + Math.sin(t * 0.7) * 100), by = Math.round(rowY(1) - 6 + Math.sin(t * 2.3) * 5), wf = Math.floor(t * 10) % 2;
      R(bx, by, 1, 4, K); R(bx - 3 + wf, by - 1, 3, 3, '#f2a7c3'); R(bx + 1, by - 1, 3 - wf, 3, '#f2a7c3'); R(bx - 2 + wf, by + 2, 2, 2, '#f2c94c'); R(bx + 1, by + 2, 2 - wf, 2, '#f2c94c');

/* ===== MACHINES: ветки machine(type, x, y), коробка около 32×30, вставлять перед } else if (type === 'dough') ===== */
    } else if (type === 'apple') {
      const ell = (cx, cy, rx, ry, col) => { for (let dy = -ry; dy <= ry; dy++) { const w = Math.round(rx * Math.sqrt(1 - (dy / ry) ** 2)); R(cx - w, cy + dy, w * 2 + 1, 1, col); } };
      // a wooden planter box with iron bands, a gnarled trunk and a big crown full of apples
      R(x + 4, y + 21, 24, 10, K); R(x + 5, y + 22, 22, 8, '#a8693a'); R(x + 5, y + 22, 22, 1, '#c98a52'); R(x + 5, y + 26, 22, 1, '#8a5a32');
      R(x + 5, y + 23, 1, 7, '#5a5060'); R(x + 26, y + 23, 1, 7, '#5a5060'); R(x + 10, y + 23, 1, 7, '#8a5a32'); R(x + 16, y + 23, 1, 7, '#8a5a32'); R(x + 21, y + 23, 1, 7, '#8a5a32');
      R(x + 5, y + 21, 22, 1, '#5a3a22');
      R(x + 13, y + 13, 6, 9, K); R(x + 14, y + 13, 4, 9, '#8a5a32'); R(x + 14, y + 14, 1, 7, '#a8744a'); R(x + 16, y + 16, 1, 2, '#6a4024'); R(x + 11, y + 19, 3, 2, K); R(x + 18, y + 19, 3, 2, K);
      R(x + 10, y + 12, 4, 2, K); R(x + 19, y + 11, 4, 2, K);
      const sw = Math.round(Math.sin(t * 1.4) * 0.6);
      for (const [a, b, rx, ry] of [[16, 8, 11, 8], [7, 11, 6, 5], [25, 11, 6, 5], [11, 4, 6, 4], [21, 4, 6, 4]]) ell(x + a + sw, y + b, rx + 1, ry + 1, K);
      for (const [a, b, rx, ry] of [[16, 8, 11, 8], [7, 11, 6, 5], [25, 11, 6, 5], [11, 4, 6, 4], [21, 4, 6, 4]]) ell(x + a + sw, y + b, rx, ry, '#3f7f3a');
      for (const [a, b, rx, ry] of [[15, 7, 9, 6], [7, 10, 4, 3], [24, 10, 4, 3], [11, 3, 5, 3], [21, 3, 4, 2]]) ell(x + a + sw, y + b, rx, ry, '#5fa84a');
      for (const [a, b, rx, ry] of [[12, 4, 4, 2], [6, 9, 2, 1], [20, 2, 2, 1]]) ell(x + a + sw, y + b, rx, ry, '#8fd16a');
      for (const [a, b] of [[9, 2], [17, 1], [4, 9], [14, 6], [22, 7], [27, 11], [10, 13]]) R(x + a + sw, y + b, 1, 1, '#c4ec8c');
      for (const [a, b] of [[18, 10], [6, 13], [26, 14], [12, 15], [22, 14], [16, 5]]) R(x + a + sw, y + b, 2, 1, '#2f6e3a');
      for (const [a, b] of [[8, 6], [19, 4], [24, 9], [12, 11], [20, 13], [4, 12], [28, 12]]) { R(x + a + sw, y + b, 3, 3, K); R(x + a + sw + 1, y + b + 1, 2, 2, '#d64545'); R(x + a + sw + 1, y + b + 1, 1, 1, '#ff9a8a'); R(x + a + sw + 1, y + b - 1, 1, 1, '#6a4024'); }
      // one ripe apple drops into the box now and then
      const f = (t * 0.5) % 1; if (f < 0.7) { const ay = y + 15 + Math.round(f / 0.7 * 6); R(x + 23, ay, 3, 3, K); R(x + 24, ay + 1, 2, 2, '#d64545'); }
      R(x + 22, y + 21, 3, 1, '#d64545');
    } else if (type === 'palm') {
      // a glazed blue pot with a pattern, a tall ringed trunk leaning a little, coconuts and arching fronds
      R(x + 9, y + 22, 14, 9, K); R(x + 10, y + 23, 12, 7, '#3f6fd1'); R(x + 10, y + 23, 12, 1, '#5b8fd6'); R(x + 11, y + 24, 1, 5, '#8fb6ec');
      for (let k = 0; k < 3; k++) { R(x + 12 + k * 3, y + 26, 2, 2, '#f4efe6'); R(x + 13 + k * 3, y + 25, 1, 1, '#f2c94c'); }
      R(x + 8, y + 20, 16, 3, K); R(x + 9, y + 21, 14, 1, '#5b8fd6'); R(x + 10, y + 20, 12, 1, '#5a3a22');
      const sw = Math.sin(t * 1.2);
      const tr = k => x + 15 + Math.round(Math.sin(k / 14 * 1.8) * 3);
      for (let k = 0; k < 15; k++) { const tx = tr(k), ty = y + 20 - k; R(tx - 1, ty, 5, 1, K); R(tx, ty, 3, 1, k % 3 === 0 ? '#8a5a32' : '#c9955f'); R(tx, ty, 1, 1, k % 3 === 0 ? '#6a4024' : '#e0b07a'); }
      const cx = tr(14) + 1, cy = y + 6;
      // fronds: an arching rib with short leaflets on both sides; an outline pass, then a fill pass
      const fronds = [[-1, 13, 0.4, 13], [1, 13, 0.4, 13], [-0.6, 9, 0.9, 8], [0.7, 9, 0.9, 8], [0.1, 5, 1, 4]];
      for (const pass of [0, 1]) for (const [dir, len, rise, droop] of fronds) for (let s = 1; s <= len; s++) {
        const u = s / len, px = Math.round(cx + dir * s + (u > 0.5 ? sw * Math.sign(dir) * (u - 0.5) * 2 : 0)), py = Math.round(cy - rise * s + droop * u * u);
        const ll = s < len ? 2 : 0;
        if (!pass) R(px - 1, py - 2, 3, 3 + ll + 1, K);
        else { R(px, py - 1, 1, 1, '#8fd16a'); R(px, py, 1, 1, '#c4ec8c'); if (ll) { R(px, py + 1, 1, 1, '#5fa84a'); R(px, py + 2, 1, 1, '#3f7f3a'); } }
      }
      for (const [a, b] of [[-2, 2], [1, 3], [-1, 4]]) { R(cx + a - 1, cy + b - 1, 4, 4, K); R(cx + a, cy + b, 2, 2, '#6a4024'); R(cx + a, cy + b, 1, 1, '#a8744a'); }
    } else if (type === 'rosebush') {
      const ell = (cx, cy, rx, ry, col) => { for (let dy = -ry; dy <= ry; dy++) { const w = Math.round(rx * Math.sqrt(1 - (dy / ry) ** 2)); R(cx - w, cy + dy, w * 2 + 1, 1, col); } };
      // a stone urn, a round bush with thorny stems and red and pink roses, a butterfly visits
      R(x + 9, y + 26, 14, 5, K); R(x + 10, y + 27, 12, 3, '#9aa3ad'); R(x + 12, y + 23, 8, 4, K); R(x + 13, y + 23, 6, 3, '#b8c0c8');
      R(x + 5, y + 18, 22, 6, K); R(x + 6, y + 19, 20, 4, '#c9d0d6'); R(x + 6, y + 19, 20, 1, '#e9eef2'); R(x + 6, y + 22, 20, 1, '#9aa3ad'); for (let k = 0; k < 5; k++) R(x + 8 + k * 4, y + 20, 2, 1, '#aab4bd');
      const sw = Math.round(Math.sin(t * 1.6) * 0.5);
      ell(x + 16, y + 11, 14, 9, K); ell(x + 16, y + 11, 13, 8, '#2f6e3a'); ell(x + 14, y + 10, 11, 6, '#3f7f3a'); ell(x + 12, y + 8, 7, 4, '#5fa84a'); ell(x + 10, y + 7, 3, 2, '#8fd16a');
      for (const [a, b] of [[5, 13], [9, 16], [22, 15], [26, 11], [19, 4], [7, 9]]) R(x + a, y + b, 2, 1, '#5fa84a');
      for (const [a, b] of [[8, 17], [14, 18], [20, 17], [25, 16]]) { R(x + a, y + b, 1, 2, '#2f6e3a'); R(x + a + 1, y + b, 1, 1, '#c4ec8c'); }
      // a rose: dark centre swirl, petals around it, a pale highlight
      const rose = (rx, ry, c1, c2, c3) => { R(rx - 1, ry - 1, 6, 6, K); R(rx, ry, 4, 4, c1); R(rx + 1, ry + 1, 2, 2, c2); R(rx + 2, ry + 1, 1, 1, c3); R(rx, ry, 1, 1, 'rgba(255,255,255,.5)'); };
      for (const [a, b, red] of [[6, 7, 1], [13, 3, 0], [20, 6, 1], [24, 11, 0], [10, 12, 0], [17, 11, 1], [4, 13, 1]]) rose(x + a + sw, y + b, red ? '#e0533a' : '#f2a7c3', red ? '#a83232' : '#d96a9a', red ? '#7a1f2a' : '#a8477a');
      const bx = x + 16 + Math.round(Math.cos(t * 1.9) * 14), by = y - 2 + Math.round(Math.sin(t * 2.7) * 3), wf = Math.floor(t * 10) % 2;
      R(bx, by, 1, 4, K); R(bx - 3 + wf, by - 1, 3, 3, '#f2c94c'); R(bx + 1, by - 1, 3 - wf, 3, '#f2c94c'); R(bx - 2 + wf, by + 2, 2, 2, '#ff8fc8'); R(bx + 1, by + 2, 2 - wf, 2, '#ff8fc8');
/* ===== ICONS: иконки карточек 16×16 в ICON_DRAW, в карты: m_apple: 'apple', m_palm: 'palm', m_rosebush: 'rosebush' ===== */
    apple: r => { r(5, 1, 6, 1, K); r(3, 2, 2, 1, K); r(5, 2, 2, 1, '#8fd16a'); r(7, 2, 3, 1, '#5fa84a'); r(10, 2, 2, 1, K); r(2, 3, 1, 1, K); r(3, 3, 2, 1, '#8fd16a'); r(5, 3, 3, 1, '#5fa84a'); r(8, 3, 1, 1, '#d64545'); r(9, 3, 3, 1, '#5fa84a'); r(12, 3, 1, 1, K); r(1, 4, 1, 1, K); r(2, 4, 2, 1, '#8fd16a'); r(4, 4, 1, 1, '#5fa84a'); r(5, 4, 1, 1, '#d64545'); r(6, 4, 6, 1, '#5fa84a'); r(12, 4, 1, 1, '#3f7f3a'); r(13, 4, 1, 1, K); r(1, 5, 1, 1, K); r(2, 5, 5, 1, '#5fa84a'); r(7, 5, 1, 1, '#d64545'); r(8, 5, 3, 1, '#5fa84a'); r(11, 5, 1, 1, '#3f7f3a'); r(12, 5, 1, 1, '#5fa84a'); r(13, 5, 1, 1, K); r(0, 6, 1, 1, K); r(1, 6, 10, 1, '#5fa84a'); r(11, 6, 2, 1, '#3f7f3a'); r(13, 6, 1, 1, '#5fa84a'); r(14, 6, 1, 1, K); r(0, 7, 1, 1, K); r(1, 7, 1, 1, '#5fa84a'); r(2, 7, 1, 1, '#d64545'); r(3, 7, 8, 1, '#5fa84a'); r(11, 7, 1, 1, '#3f7f3a'); r(12, 7, 2, 1, '#5fa84a'); r(14, 7, 1, 1, '#3f7f3a'); r(15, 7, 1, 1, K); r(0, 8, 1, 1, K); r(1, 8, 8, 1, '#5fa84a'); r(9, 8, 1, 1, '#d64545'); r(10, 8, 1, 1, '#5fa84a'); r(11, 8, 1, 1, '#3f7f3a'); r(12, 8, 2, 1, '#5fa84a'); r(14, 8, 1, 1, '#3f7f3a'); r(15, 8, 1, 1, K); r(0, 9, 1, 1, K); r(1, 9, 11, 1, '#5fa84a'); r(12, 9, 1, 1, '#3f7f3a'); r(13, 9, 1, 1, '#5fa84a'); r(14, 9, 1, 1, '#3f7f3a'); r(15, 9, 1, 1, K); r(1, 10, 1, 1, K); r(2, 10, 4, 1, '#5fa84a'); r(6, 10, 1, 1, '#d64545'); r(7, 10, 6, 1, '#5fa84a'); r(13, 10, 1, 1, '#3f7f3a'); r(14, 10, 1, 1, K); r(2, 11, 2, 1, K); r(4, 11, 5, 1, '#5fa84a'); r(9, 11, 2, 1, '#3f7f3a'); r(11, 11, 1, 1, '#5fa84a'); r(12, 11, 2, 1, K); r(4, 12, 3, 1, K); r(7, 12, 2, 1, '#8a5a32'); r(9, 12, 3, 1, K); r(7, 13, 2, 1, '#8a5a32'); r(7, 14, 2, 1, '#8a5a32'); r(6, 15, 1, 1, K); r(7, 15, 2, 1, '#8a5a32'); r(9, 15, 1, 1, K); },
    palm: r => { r(4, 1, 8, 1, K); r(2, 2, 2, 1, K); r(4, 2, 1, 1, '#c4ec8c'); r(5, 2, 7, 1, '#8fd16a'); r(12, 2, 2, 1, K); r(1, 3, 1, 1, K); r(2, 3, 2, 1, '#8fd16a'); r(4, 3, 2, 1, '#5fa84a'); r(6, 3, 4, 1, K); r(10, 3, 2, 1, '#5fa84a'); r(12, 3, 2, 1, '#8fd16a'); r(14, 3, 1, 1, K); r(0, 4, 1, 1, K); r(1, 4, 3, 1, '#5fa84a'); r(4, 4, 2, 1, K); r(6, 4, 1, 1, '#6a4024'); r(7, 4, 2, 1, '#8a5a32'); r(9, 4, 1, 1, '#6a4024'); r(10, 4, 2, 1, K); r(12, 4, 3, 1, '#5fa84a'); r(15, 4, 1, 1, K); r(0, 5, 1, 1, K); r(1, 5, 1, 1, '#5fa84a'); r(2, 5, 1, 1, '#3f7f3a'); r(3, 5, 1, 1, K); r(5, 5, 1, 1, K); r(6, 5, 1, 1, '#6a4024'); r(7, 5, 1, 1, '#c9955f'); r(8, 5, 1, 1, '#8a5a32'); r(9, 5, 1, 1, '#6a4024'); r(10, 5, 1, 1, K); r(12, 5, 1, 1, K); r(13, 5, 1, 1, '#3f7f3a'); r(14, 5, 1, 1, '#5fa84a'); r(15, 5, 1, 1, K); r(0, 6, 1, 1, K); r(1, 6, 1, 1, '#3f7f3a'); r(2, 6, 1, 1, K); r(6, 6, 1, 1, K); r(7, 6, 1, 1, '#c9955f'); r(8, 6, 1, 1, '#8a5a32'); r(9, 6, 1, 1, K); r(13, 6, 1, 1, K); r(14, 6, 1, 1, '#3f7f3a'); r(15, 6, 1, 1, K); r(1, 7, 1, 1, K); r(6, 7, 1, 1, K); r(7, 7, 1, 1, '#c9955f'); r(8, 7, 1, 1, '#8a5a32'); r(9, 7, 1, 1, K); r(14, 7, 1, 1, K); r(6, 8, 1, 1, K); r(7, 8, 1, 1, '#8a5a32'); r(8, 8, 1, 1, '#c9955f'); r(9, 8, 1, 1, K); r(5, 9, 1, 1, K); r(6, 9, 1, 1, '#c9955f'); r(7, 9, 1, 1, '#8a5a32'); r(8, 9, 1, 1, K); r(5, 10, 1, 1, K); r(6, 10, 1, 1, '#8a5a32'); r(7, 10, 1, 1, '#c9955f'); r(8, 10, 1, 1, K); r(4, 11, 1, 1, K); r(5, 11, 1, 1, '#c9955f'); r(6, 11, 1, 1, '#8a5a32'); r(7, 11, 1, 1, K); r(3, 12, 8, 1, K); r(3, 13, 1, 1, K); r(4, 13, 6, 1, '#5b8fd6'); r(10, 13, 1, 1, K); r(3, 14, 1, 1, K); r(4, 14, 1, 1, '#3f6fd1'); r(5, 14, 1, 1, '#f4efe6'); r(6, 14, 1, 1, '#3f6fd1'); r(7, 14, 1, 1, '#f4efe6'); r(8, 14, 2, 1, '#3f6fd1'); r(10, 14, 1, 1, K); r(4, 15, 6, 1, K); },
    rosebush: r => { r(5, 1, 6, 1, K); r(3, 2, 2, 1, K); r(5, 2, 2, 1, '#5fa84a'); r(7, 2, 3, 1, '#8fd16a'); r(10, 2, 1, 1, '#5fa84a'); r(11, 2, 2, 1, K); r(2, 3, 1, 1, K); r(3, 3, 1, 1, '#5fa84a'); r(4, 3, 3, 1, '#e0533a'); r(7, 3, 1, 1, '#5fa84a'); r(8, 3, 2, 1, '#8fd16a'); r(10, 3, 3, 1, '#d96a9a'); r(13, 3, 1, 1, K); r(1, 4, 1, 1, K); r(2, 4, 2, 1, '#5fa84a'); r(4, 4, 1, 1, '#e0533a'); r(5, 4, 1, 1, '#a83232'); r(6, 4, 1, 1, '#e0533a'); r(7, 4, 2, 1, '#5fa84a'); r(9, 4, 1, 1, '#d96a9a'); r(10, 4, 1, 1, '#f2a7c3'); r(11, 4, 1, 1, '#d96a9a'); r(12, 4, 1, 1, '#5fa84a'); r(13, 4, 1, 1, K); r(1, 5, 1, 1, K); r(2, 5, 2, 1, '#5fa84a'); r(4, 5, 3, 1, '#e0533a'); r(7, 5, 2, 1, '#5fa84a'); r(9, 5, 1, 1, '#8fd16a'); r(10, 5, 3, 1, '#d96a9a'); r(13, 5, 1, 1, '#5fa84a'); r(14, 5, 1, 1, K); r(0, 6, 1, 1, K); r(1, 6, 1, 1, '#5fa84a'); r(2, 6, 3, 1, '#d96a9a'); r(5, 6, 2, 1, '#5fa84a'); r(7, 6, 3, 1, '#e0533a'); r(10, 6, 4, 1, '#5fa84a'); r(14, 6, 1, 1, '#3f7f3a'); r(15, 6, 1, 1, K); r(0, 7, 1, 1, K); r(1, 7, 1, 1, '#5fa84a'); r(2, 7, 1, 1, '#d96a9a'); r(3, 7, 1, 1, '#f2a7c3'); r(4, 7, 1, 1, '#d96a9a'); r(5, 7, 2, 1, '#5fa84a'); r(7, 7, 1, 1, '#e0533a'); r(8, 7, 1, 1, '#a83232'); r(9, 7, 1, 1, '#e0533a'); r(10, 7, 1, 1, '#5fa84a'); r(11, 7, 3, 1, '#e0533a'); r(14, 7, 1, 1, '#3f7f3a'); r(15, 7, 1, 1, K); r(0, 8, 1, 1, K); r(1, 8, 1, 1, '#5fa84a'); r(2, 8, 3, 1, '#d96a9a'); r(5, 8, 1, 1, '#3f7f3a'); r(6, 8, 1, 1, '#5fa84a'); r(7, 8, 3, 1, '#e0533a'); r(10, 8, 1, 1, '#5fa84a'); r(11, 8, 1, 1, '#e0533a'); r(12, 8, 1, 1, '#a83232'); r(13, 8, 1, 1, '#e0533a'); r(14, 8, 1, 1, '#3f7f3a'); r(15, 8, 1, 1, K); r(1, 9, 1, 1, K); r(2, 9, 1, 1, '#5fa84a'); r(3, 9, 1, 1, '#3f7f3a'); r(4, 9, 3, 1, '#5fa84a'); r(7, 9, 2, 1, '#3f7f3a'); r(9, 9, 2, 1, '#5fa84a'); r(11, 9, 3, 1, '#e0533a'); r(14, 9, 1, 1, K); r(2, 10, 2, 1, K); r(4, 10, 2, 1, '#3f7f3a'); r(6, 10, 1, 1, '#5fa84a'); r(7, 10, 3, 1, '#3f7f3a'); r(10, 10, 1, 1, '#5fa84a'); r(11, 10, 2, 1, '#3f7f3a'); r(13, 10, 2, 1, K); r(3, 11, 10, 1, K); r(3, 12, 1, 1, K); r(4, 12, 9, 1, '#c9d0d6'); r(13, 12, 1, 1, K); r(4, 13, 1, 1, K); r(5, 13, 7, 1, '#9aa3ad'); r(12, 13, 1, 1, K); r(5, 14, 2, 1, K); r(7, 14, 3, 1, '#c9d0d6'); r(10, 14, 1, 1, K); r(6, 15, 5, 1, K); },
/* ===== END ===== */
