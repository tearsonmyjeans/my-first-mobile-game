// Черновик цехов 6 (пицца) и 7 (голуби): спрайты и сцены уже вставлены в игру, цены и скорости станков в docs/workshops.md (заглушки ниже устарели).
// Куски вырезаны из рабочей копии game/index.html и вставляются в те же места. Цены и скорости станков не выбраны:
// value: 1 и desc: 'x' — заглушки. Пицца — индекс цеха 5, голуби — 6.

// ===== LOCS: после цеха пуфиков =====
      opened: 'Цех пуфиков открыт! Швейная машинка ждёт в ближайшем выборе карт' },
    { name: 'Пицца', sign: 'ЦЕХ 6 · ПИЦЦА', cost: 2e10, wall: '#f1e3c4', mortar: '#e3d0a8', floor: '#e9dcc0', grid: '#e9dcc0', plate: '#c98a52', frame: '#6a3f22', item: '#f2c94c', board: '#3f9a4f', boardHi: '#5fb86a', goods: 'pizza', unit: 'Пицца', unit1: 'Цена пиццы', start: 'dough', desc: 'x', opened: 'x' },
    { name: 'Голуби', sign: 'ЦЕХ 7 · ГОЛУБИ', cost: 1.5e12, wall: '#8fc4ea', mortar: '#7ab0d8', floor: '#6e6a72', grid: '#6e6a72', plate: '#b08a58', frame: '#5a3f2a', item: '#a9b2c3', board: '#6a4a2c', boardHi: '#8a6a44', goods: 'pigeons', unit: 'Голуби', unit1: 'Цена голубя', start: 'feeder', desc: 'x', opened: 'x' }

// ===== LAYOUTS: после пуфиков =====
    [[0, 0], [1, 0]],
    // two stacked pairs, the lower one shifted right by nine tenths of a slot
    [[0, 0], [0, 1], [0.9, 2], [0.9, 3]],
    // a pigeon with spread wings: head, two wings, body in the middle, tail
    [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]]

// ===== MACH: перед belt =====
    dough: { loc: 5, name: 'Тестомес', short: 'ТЕСТОМЕС', rate: 0.9, value: 1, max: 2, desc: 'x' },
    topping: { loc: 5, name: 'Стол начинки', short: 'НАЧИНКА', rate: 0.5, value: 1, max: 1, desc: 'x' },
    pizzaoven: { loc: 5, name: 'Дровяная печь', short: 'ПЕЧЬ', rate: 0.3, value: 1, max: 1, desc: 'x' },
    feeder: { loc: 6, name: 'Кормушка', short: 'КОРМУШКА', rate: 0.8, value: 1, max: 2, desc: 'x' },
    course: { loc: 6, name: 'Полоса препятствий', short: 'ПОЛОСА', rate: 0.5, value: 1, max: 2, desc: 'x' },
    loft: { loc: 6, name: 'Почтовая голубятня', short: 'ГОЛУБЯТНЯ', rate: 0.3, value: 1, max: 1, desc: 'x' },

// ===== machine(): ветки перед 'sew' =====
    } else if (type === 'dough') {
  R(x+4,y+25,24,5,K);R(x+5,y+26,22,3,'#d9535a');R(x+5,y+26,22,1,'#ef8a8a');
  R(x+22,y+6,6,20,K);R(x+23,y+7,4,19,'#e8e2d6');R(x+23,y+7,1,19,'#ffffff');
  R(x+8,y+3,20,7,K);R(x+9,y+4,18,5,'#e8e2d6');R(x+9,y+4,18,1,'#ffffff');R(x+11,y+6,4,1,'#d9535a');
  R(x+15,y+9,3,5,K);R(x+16,y+9,1,5,'#9aa3ad');
  // bowl with dough
  R(x+5,y+13,18,12,K);R(x+6,y+14,16,10,'#c9d0d6');R(x+6,y+14,2,10,'#e9eef2');R(x+19,y+15,2,8,'#9aa3ad');
  disc(x+14,y+15,5,'#f2dca8');R(x+10,y+12,9,2,'#f8ebc6');
  const k=Math.floor(t*6)%3;R(x+12+k*2,y+12,2,2,'#e0c27c');
  R(x+15,y+11,1,4,'#9aa3ad');
    } else if (type === 'topping') {
  R(x+3,y+22,3,8,K);R(x+26,y+22,3,8,K);
  R(x+1,y+18,30,5,K);R(x+2,y+19,28,3,'#a8693a');R(x+2,y+19,28,1,'#c98a52');
  // pizza
  disc(x+14,y+13,8,K);disc(x+14,y+13,7,'#e5a65a');disc(x+14,y+13,6,'#d9452f');disc(x+14,y+13,5,'#f7d36a');
  for(const[a,b]of[[11,10],[16,11],[13,15],[17,15],[10,14]]){R(x+a,y+b,2,2,'#b8322a');}
  R(x+14,y+9,1,1,'#57b04f');R(x+12,y+13,1,1,'#57b04f');R(x+18,y+13,1,1,'#57b04f');
  // jars
  R(x+23,y+10,5,9,K);R(x+24,y+11,3,7,'#d9452f');R(x+24,y+11,3,2,'#e9e2d0');R(x+27,y+13,4,6,K);R(x+28,y+14,2,4,'#f7d36a');R(x+28,y+14,2,1,'#e9e2d0');
  
  R(x+1,y+12,4,6,K);R(x+2,y+13,2,5,'#57b04f');R(x+2,y+11,2,2,'#8fe07a');
    } else if (type === 'pizzaoven') {
  R(x+21,y,5,8,K);R(x+22,y+1,3,7,'#8a5a32');
  disc(x+24,y-2,2,'rgba(200,200,210,.7)');
  // dome
  for(let dy=0;dy<=13;dy++){const w=Math.round(Math.sqrt(169-dy*dy)*1.15);R(x+16-w,y+18-dy,w*2,1,K);}
  for(let dy=0;dy<=12;dy++){const w=Math.round(Math.sqrt(144-dy*dy)*1.15);R(x+16-w+1,y+18-dy,w*2-2,1,'#c4553a');}
  for(let r=0;r<4;r++){const dy=10-r*3,w=Math.round(Math.sqrt(144-dy*dy)*1.15)-2;R(x+16-w,y+8+r*3+2,w*2,1,'#94402c');for(let i=-3;i<=3;i++){const bx=16+i*4+(r%2)*2;if(Math.abs(bx-16)<w)R(x+bx,y+8+r*3,1,2,'#94402c');}}
  R(x+3,y+18,26,12,K);R(x+4,y+18,24,11,'#c4553a');
  for(let r=0;r<3;r++)R(x+4,y+21+r*3,24,1,'#94402c');
  // arch with fire
  R(x+10,y+15,12,13,K);R(x+11,y+14,10,1,K);
  R(x+11,y+16,10,12,'#1d1629');
  const f=Math.floor(t*8)%2;
  R(x+12,y+23-f,3,5+f,'#ff7a2a');R(x+15,y+21+f,3,7-f,'#f7c948');R(x+18,y+23,2,5,'#ff5040');R(x+14,y+25,5,3,'#fff1b0');
  R(x+9,y+28,14,2,K);R(x+10,y+28,12,1,'#d8c8a0');
    } else if (type === 'feeder' || type === 'course' || type === 'loft') {
      // a tiny pigeon: grey body, dark head, green-violet neck, the head bobs while it pecks
      const pig = (px, py, dir, peck) => {
        R(px - 3, py, 7, 4, K); R(px - 2, py + 1, 5, 2, '#a9b2c3'); R(px - 2 * dir - 1, py + 1, 2, 2, '#7f889a');
        const hx = px + dir * 3, hy = py - 2 + (peck ? 2 : 0);
        R(hx - 1, hy, 3, 3, K); R(hx, hy + 1, 1, 1, '#6a7286'); R(px + dir, py, 1, 1, '#6fbf9a'); R(px + dir * 2, py, 1, 1, '#9a6ac2');
        R(hx + dir * 2, hy + 1, 1, 1, '#e8a0a0'); R(hx + (dir > 0 ? 1 : -1), hy, 1, 1, '#ff7a2a');
        R(px - 1, py + 4, 1, 1, '#e8737a'); R(px + 1, py + 4, 1, 1, '#e8737a');
      };
      if (type === 'feeder') {
        R(x + 14, y + 12, 4, 18, K); R(x + 15, y + 12, 2, 18, '#8a5a32');
        R(x + 3, y + 12, 26, 4, K); R(x + 4, y + 13, 24, 2, '#c98a52');
        for (let k = 0; k < 9; k++) R(x + 5 + k * 3 - (k % 2), y + 11 - (k % 2), 1, 1, '#e5c56a');
        for (let dy = 0; dy < 7; dy++) R(x + 6 + dy - 1, y + 4 - dy, 22 - dy * 2 + 2, 1, K);
        for (let dy = 0; dy < 6; dy++) R(x + 7 + dy - 1, y + 4 - dy, 20 - dy * 2 + 2, 1, '#b8423b');
        R(x + 6, y + 4, 1, 8, K); R(x + 25, y + 4, 1, 8, K);
        const p = Math.floor(t * 3) % 2;
        pig(x + 11, y + 8, -1, p); pig(x + 21, y + 8, 1, 1 - p);
        for (const [a, b] of [[4, 29], [9, 30], [24, 29], [27, 30], [20, 31]]) R(x + a, y + b, 1, 1, '#e5c56a');
        pig(x + 6, y + 26, 1, Math.floor(t * 4 + 1) % 2);
      } else if (type === 'course') {
        // a hurdle, two hoops on stands, a pigeon flies through
        R(x + 1, y + 28, 30, 2, K); R(x + 2, y + 28, 28, 1, '#7aa35a');
        R(x + 2, y + 21, 1, 8, K); R(x + 9, y + 21, 1, 8, K); R(x + 2, y + 21, 8, 2, K); for (let k = 0; k < 4; k++) R(x + 2 + k * 2, y + 21, 1, 1, k % 2 ? '#e9e2d0' : '#d9535a');
        for (const [cx, cy] of [[15, 13], [26, 11]]) {
          R(x + cx, y + cy + 6, 1, 28 - cy - 6, K);
          for (let a = 0; a < 40; a++) { const an = a / 40 * Math.PI * 2; R(x + cx + Math.round(Math.cos(an) * 5), y + cy + Math.round(Math.sin(an) * 6), 1, 1, K); }
          for (let a = 0; a < 32; a++) { const an = a / 32 * Math.PI * 2; R(x + cx + Math.round(Math.cos(an) * 4), y + cy + Math.round(Math.sin(an) * 5), 1, 1, a % 8 < 4 ? '#f2c94c' : '#d9535a'); }
        }
        const f = (t * 0.5) % 1, fx = x + 4 + f * 26, fy = y + 14 - Math.round(Math.sin(f * Math.PI) * 4), wing = Math.floor(t * 8) % 2;
        R(fx - 3, fy, 8, 4, K); R(fx - 2, fy + 1, 6, 2, '#a9b2c3'); R(fx + 4, fy - 1, 3, 3, K); R(fx + 5, fy, 1, 1, '#6fbf9a'); R(fx + 7, fy, 1, 1, '#e8a0a0'); R(fx - 5, fy + 1, 2, 2, K);
        R(fx - 2, fy - (wing ? 3 : -2), 4, 2, K); R(fx - 1, fy - (wing ? 2 : -2), 2, 1, '#cfd5e0');
        R(x + 28, y + 19, 1, 9, K); R(x + 29, y + 19, 3, 2, '#57b04f');
      } else {
        // the mail loft: a little house on legs, pigeons peek out, a letter waits on the landing board
        R(x + 6, y + 25, 2, 5, K); R(x + 24, y + 25, 2, 5, K);
        for (let dy = 0; dy < 8; dy++) R(x + 15 - dy * 2, y + 1 + dy, 2 + dy * 4, 1, K);
        for (let dy = 1; dy < 8; dy++) R(x + 16 - dy * 2, y + 1 + dy, dy * 4, 1, '#5b7f8a');
        R(x + 3, y + 9, 26, 17, K); R(x + 4, y + 9, 24, 15, '#e3d6b8'); R(x + 4, y + 9, 24, 1, '#f4ecd8');
        for (const [hx, hy] of [[7, 11], [18, 11], [7, 18], [18, 18]]) { R(hx + x, hy + y, 7, 5, K); R(hx + x + 1, hy + y + 1, 5, 3, '#2a2433'); R(hx + x - 1, hy + y + 5, 9, 1, '#8a5a32'); }
        const pk = Math.floor(t * 2) % 2;
        R(x + 9, y + 12 + pk, 3, 3, '#7f889a'); R(x + 10, y + 13 + pk, 1, 1, '#ff7a2a');
        R(x + 20, y + 19 + (1 - pk), 3, 3, '#7f889a'); R(x + 21, y + 20 + (1 - pk), 1, 1, '#ff7a2a');
        R(x + 25, y + 21, 7, 5, K); R(x + 26, y + 22, 5, 3, '#f4efe6'); R(x + 26, y + 22, 1, 1, '#c9c9d6'); R(x + 30, y + 22, 1, 1, '#c9c9d6'); R(x + 28, y + 23, 1, 1, '#d9535a');
        R(x + 14, y - 1, 3, 3, K); R(x + 15, y, 1, 1, '#f2c94c');
      }

// ===== drawWorld(): стены, ветки перед последним else =====
    else if (l === 6) {
      // rooftop under the open sky: clouds, a TV antenna and a wire full of pigeons
      R(0, 0, W, 29, '#8fc4ea'); R(0, 18, W, 11, '#a9d3f0');
      for (const [cx, cy] of [[24, 8], [W - 40, 5], [W / 2 + 70, 14]]) { R(cx, cy, 18, 4, '#f4f8fb'); R(cx + 4, cy - 3, 9, 3, '#f4f8fb'); R(cx + 2, cy + 3, 15, 1, '#d8e8f4'); }
      R(10, 2, 1, 27, K); R(4, 5, 13, 1, K); R(6, 9, 9, 1, K); R(7, 13, 7, 1, K);
      for (let xx = 0; xx < W; xx++) R(xx, 22 + Math.round(Math.sin(xx / W * Math.PI) * 3), 1, 1, '#3a3346');
      for (let k = 0; k < 7; k++) {
        const px = 16 + k * (W - 32) / 6; if (Math.abs(px - W / 2) < 48) continue;
        const py = 18 + Math.round(Math.sin(px / W * Math.PI) * 3), bob = Math.floor(t * 2 + k) % 2;
        R(px - 2, py, 5, 4, K); R(px - 1, py + 1, 3, 2, '#a9b2c3'); R(px + (k % 2 ? 2 : -3), py - 2 + bob, 3, 3, K); R(px + (k % 2 ? 3 : -2), py - 1 + bob, 1, 1, '#6fbf9a');
      }
    }
    else if (l === 5) {
      // pizzeria: cream plaster, an Italian stripe, a shelf of tomato cans with garlic, a chalk menu
      R(0, 0, W, 29, '#f1e3c4'); R(0, 0, W, 2, '#e3d0a8');
      for (let k = 0; k < 30; k++) R((k * 37) % W, 3 + (k * 13) % 17, 2, 1, '#e6d4ae');
      R(0, 21, W, 2, '#3f9a4f'); R(0, 23, W, 2, '#f4efe6'); R(0, 25, W, 2, '#d0453a');
      const sx = 10; R(sx, 13, 40, 2, K); R(sx + 1, 13, 38, 1, '#a8693a');
      for (let k = 0; k < 4; k++) { R(sx + 2 + k * 7, 6, 6, 7, K); R(sx + 3 + k * 7, 7, 4, 5, '#d64545'); R(sx + 3 + k * 7, 8, 4, 2, '#f4efe6'); R(sx + 4 + k * 7, 8, 2, 1, '#57b04f'); }
      R(sx + 31, 3, 4, 10, K); R(sx + 32, 6, 2, 6, '#b8c24a'); R(sx + 32, 3, 2, 3, '#3f9a4f');
      for (let k = 0; k < 3; k++) { R(sx + 2 + k * 4, 15 + k, 2, 4, '#d64545'); R(sx + 2 + k * 4, 15 + k, 1, 1, '#57b04f'); }
      const mx = W - 52; R(mx, 3, 42, 17, '#8a5a32'); R(mx + 1, 4, 40, 15, '#2f3a34');
      R(mx + 3, 6, 7, 7, '#f4efe6'); R(mx + 4, 7, 5, 5, '#f2c94c'); R(mx + 5, 8, 1, 1, '#d64545'); R(mx + 7, 10, 1, 1, '#d64545');
      for (let k = 0; k < 3; k++) { R(mx + 13, 6 + k * 4, 16 - k * 3, 1, '#d8e0da'); R(mx + 33, 6 + k * 4, 5, 1, '#f2c94c'); }
      R(mx + 3, 15, 25, 1, '#d8e0da');
    }

// ===== drawWorld(): пол и декор, перед 'if (l === 3)' =====
    }
    if (l === 5) {
      // big red and cream checker tiles, soft enough to read the slots over them
      for (let ty = 31; ty < FL; ty += 24) for (let tx = 0; tx < W; tx += 24) { const red = ((tx + ty - 31) / 24) % 2 === 0; R(tx, ty, 24, 24, red ? '#c9796b' : '#efe6d2'); R(tx, ty, 24, 1, red ? '#d48d80' : '#f7f0e2'); R(tx, ty + 23, 24, 1, red ? '#b86a5d' : '#e2d7c0'); }
      const ell = (cx, cy, rx, ry, col) => { for (let dy = -ry; dy <= ry; dy++) { const w = Math.round(rx * Math.sqrt(1 - (dy / ry) ** 2)); R(cx - w, cy + dy, w * 2 + 1, 1, col); } };
      const shadow = (x, y, w) => R(x, y, w, 3, 'rgba(30,20,40,.28)');
      const L0 = colX(0), R0 = colX(0) + SW, B0 = colX(0.9), B1 = colX(0.9) + SW;

      // left of the top pair: a potted olive tree, below it firewood for the oven
      const ox = Math.round(L0 / 2), oy = rowY(0) + 8;
      shadow(ox - 12, oy + 62, 24);
      R(ox - 10, oy + 44, 20, 18, K); R(ox - 9, oy + 45, 18, 16, '#c8643c'); R(ox - 11, oy + 42, 22, 5, K); R(ox - 10, oy + 43, 20, 3, '#d97a50'); R(ox - 7, oy + 48, 2, 10, '#e08a60');
      R(ox - 1, oy + 22, 3, 21, K); R(ox, oy + 22, 1, 21, '#8a5a32'); R(ox - 6, oy + 28, 6, 2, K); R(ox + 2, oy + 25, 6, 2, K);
      const lf = Math.round(Math.sin(t * 1.2));
      for (const [a, b, r] of [[0, 8, 9], [-8, 16, 7], [8, 15, 7], [-4, 4, 6], [5, 2, 6]]) ell(ox + a + lf, oy + b, r, r - 2, K);
      for (const [a, b, r] of [[0, 8, 8], [-8, 16, 6], [8, 15, 6], [-4, 4, 5], [5, 2, 5]]) ell(ox + a + lf, oy + b, r, r - 2, '#6f8a3e');
      for (const [a, b] of [[-3, 6], [4, 10], [-9, 15], [9, 14], [1, 1], [-5, 12]]) R(ox + a + lf, oy + b, 2, 2, a % 2 ? '#3a2a4a' : '#98b15a');
      const fx = ox, fy = rowY(1) + 30;
      shadow(fx - 18, fy + 30, 36);
      for (let r = 0; r < 4; r++) for (let c = 0; c < 4 - r; c++) { const lx = fx - 15 + c * 8 + r * 4, ly = fy + 22 - r * 7; disc(lx + 3, ly + 3, 4, K); disc(lx + 3, ly + 3, 3, '#a8693a'); disc(lx + 3, ly + 3, 1, '#d9a066'); }
      R(fx + 8, fy - 8, 2, 16, K); R(fx + 9, fy - 7, 1, 14, '#a8693a'); R(fx + 5, fy - 10, 7, 5, K); R(fx + 6, fy - 9, 5, 3, '#c9d0d6'); R(fx + 6, fy - 9, 1, 3, '#ffffff');

      // top right: tomato crate, a basket of mushrooms and a tower of boxes
      const cx = R0 + 8, cy = rowY(0) + 14;
      shadow(cx, cy + 22, 32);
      R(cx, cy + 6, 32, 16, K); R(cx + 1, cy + 7, 30, 14, '#c98a52'); R(cx + 1, cy + 12, 30, 1, '#a8693a'); R(cx + 1, cy + 17, 30, 1, '#a8693a');
      for (let k = 0; k < 6; k++) { const tx = cx + 3 + k * 5, ty = cy + 3 - (k % 2); disc(tx + 2, ty + 2, 3, K); disc(tx + 2, ty + 2, 2, '#e04a3a'); R(tx + 1, ty + 1, 1, 1, '#ff9a8a'); R(tx + 2, ty - 1, 1, 1, '#3f9a4f'); }
      const mx = cx + 40, my = cy + 10;
      shadow(mx - 2, my + 13, 24); ell(mx + 10, my + 6, 11, 7, K); ell(mx + 10, my + 6, 10, 6, '#c9a26a'); for (let k = 0; k < 5; k++) R(mx + 2 + k * 4, my + 2, 1, 10, '#a8824f');
      for (const [a, b] of [[4, 0], [10, -2], [16, 0]]) { ell(mx + a, my + b, 4, 3, K); ell(mx + a, my + b, 3, 2, '#f1e3c4'); R(mx + a - 2, my + b - 1, 2, 1, '#ffffff'); }
      const bx = W - 28, by = rowY(0) + 6, sway = Math.sin(t * 1.5);
      shadow(bx, by + 60, 26);
      for (let k = 0; k < 7; k++) { const sx = Math.round(sway * k * k / 30) + (k % 3 === 1 ? 1 : 0), yy = by + 52 - k * 7; R(bx + sx, yy, 24, 8, K); R(bx + sx + 1, yy + 1, 22, 6, '#e3c48c'); R(bx + sx + 1, yy + 1, 22, 1, '#f2dcae'); R(bx + sx + 9, yy + 3, 6, 2, '#d64545'); }
      const tx2 = bx + Math.round(sway * 36 / 30), ty2 = by + 3;
      for (let k = 0; k < 3; k++) { const s = (t * 0.6 + k / 3) % 1; R(tx2 + 7 + k * 4 + Math.round(Math.sin(s * 7 + k) * 2), ty2 - 4 - s * 14, 1, 3, `rgba(255,255,255,${(0.9 * (1 - s)).toFixed(2)})`); }

      // the delivery scooter: a cream and red vespa with chrome, a pennant on the antenna, a pizza box with a logo
      const vx = R0 + 12, vy = rowY(1) + 6, g = W - vx;
      const sx = Math.min(1, g / 100);
      shadow(vx, vy + 62, 92);
      const wheel = (wx, wy) => { disc(wx, wy, 8, K); disc(wx, wy, 6, '#3a3346'); disc(wx, wy, 4, '#c9d0d6'); disc(wx, wy, 2, '#7f8a94'); const a = t * 9; for (let k = 0; k < 3; k++) R(wx + Math.round(Math.cos(a + k * 2.1) * 3), wy + Math.round(Math.sin(a + k * 2.1) * 3), 1, 1, K); };
      wheel(vx + 16, vy + 54); wheel(vx + 78, vy + 54);
      // rear cowl
      ell(vx + 22, vy + 40, 20, 12, K); ell(vx + 22, vy + 40, 19, 11, '#f1e3c4'); ell(vx + 18, vy + 36, 12, 5, '#ffffff');
      R(vx + 6, vy + 46, 34, 3, '#d64545'); R(vx + 4, vy + 44, 4, 3, K); R(vx + 2, vy + 42, 4, 3, '#ff5040');
      R(vx + 10, vy + 38, 3, 2, '#3f9a4f'); R(vx + 13, vy + 38, 3, 2, '#f4efe6'); R(vx + 16, vy + 38, 3, 2, '#d64545');
      // floor board and front shield
      R(vx + 38, vy + 46, 30, 6, K); R(vx + 39, vy + 47, 28, 4, '#3a3346'); R(vx + 39, vy + 47, 28, 1, '#5a5662');
      R(vx + 64, vy + 18, 12, 34, K); R(vx + 65, vy + 19, 10, 32, '#d64545'); R(vx + 65, vy + 19, 2, 32, '#ff8a80');
      for (let dy = -11; dy <= -6; dy++) { const w = Math.round(11 * Math.sqrt(1 - (dy / 11.5) ** 2)); R(vx + 78 - w, vy + 54 + dy, w * 2 + 1, 1, K); if (dy > -11) R(vx + 79 - w, vy + 54 + dy, w * 2 - 1, 1, dy === -10 ? '#ff8a80' : '#d64545'); } R(vx + 67, vy + 48, 3, 4, K); R(vx + 87, vy + 48, 3, 4, K);
      // handlebar, headlight that blinks, mirror
      R(vx + 66, vy + 6, 3, 13, K); R(vx + 58, vy + 6, 18, 3, K); R(vx + 59, vy + 7, 16, 1, '#c9d0d6');
      R(vx + 72, vy + 10, 7, 7, K); const hl = Math.floor(t * 1.5) % 4 ? '#fff1b0' : '#ffffff'; R(vx + 73, vy + 11, 5, 5, hl); R(vx + 74, vy + 12, 2, 2, '#ffffff');
      if (hl === '#ffffff') { R(vx + 80, vy + 12, 4, 1, '#fff1b0'); R(vx + 80, vy + 15, 3, 1, '#fff1b0'); }
      R(vx + 61, vy + 1, 1, 5, K); R(vx + 59, vy - 2, 5, 4, K); R(vx + 60, vy - 1, 3, 2, '#bfe3f4');
      // seat
      R(vx + 10, vy + 25, 26, 5, K); R(vx + 11, vy + 26, 24, 3, '#5a3a2c'); R(vx + 11, vy + 26, 24, 1, '#7a5a44');
      // rack and the pizza box with a logo, an antenna with a little flag
      R(vx + 2, vy + 24, 12, 2, K);
      R(vx - 2, vy + 2, 20, 23, K); R(vx - 1, vy + 3, 18, 21, '#d64545'); R(vx - 1, vy + 3, 18, 2, '#ff8a80');
      disc(vx + 8, vy + 13, 6, K); disc(vx + 8, vy + 13, 5, '#f4efe6'); for (const [a, b] of [[0, -3], [-2, 1], [3, 1]]) R(vx + 8 + a, vy + 13 + b, 2, 2, '#e5a65a'); R(vx + 7, vy + 12, 2, 2, '#d64545'); R(vx + 9, vy + 15, 1, 1, '#d64545');
      R(vx + 14, vy - 16, 1, 18, K);
      const wv = Math.floor(t * 6) % 2; R(vx + 15, vy - 16, 3, 5, '#3f9a4f'); R(vx + 18, vy - 16 + wv, 3, 5, '#f4efe6'); R(vx + 21, vy - 16, 3, 5, '#d64545');
      for (let k = 0; k < 3; k++) { const s = (t * 0.8 + k / 3) % 1; ell(vx - 2 - s * 12, vy + 44 - s * 5, 1 + Math.round(s * 3), 1 + Math.round(s * 2), `rgba(210,205,215,${(0.7 * (1 - s)).toFixed(2)})`); }

      // bottom left: a bistro table with a Chianti candle, a chef cat drags a slice off the plate, the cheese stretches
      const qx = 4, qy = rowY(2) + 32;
      shadow(qx + 4, qy + 50, 72);
      R(qx + 34, qy + 22, 4, 28, K); R(qx + 24, qy + 48, 24, 3, K);
      R(qx + 2, qy + 8, 66, 16, K); for (let i = 0; i < 16; i++) for (let j = 0; j < 4; j++) R(qx + 3 + i * 4, qy + 9 + j * 4 - (j === 3 ? 1 : 0), 4, 4, (i + j) % 2 ? '#f4efe6' : '#d0453a');
      R(qx + 3, qy + 9, 64, 1, 'rgba(255,255,255,.4)');
      R(qx + 8, qy - 10, 9, 18, K); ell(qx + 12, qy + 3, 5, 5, K); ell(qx + 12, qy + 3, 4, 4, '#c9a26a'); for (let k = -3; k <= 3; k += 2) R(qx + 12 + k, qy, 1, 6, '#a8824f');
      R(qx + 9, qy - 9, 7, 9, '#3f6a3a'); R(qx + 10, qy - 9, 1, 8, '#6a9a5a'); R(qx + 10, qy - 16, 5, 7, K); R(qx + 11, qy - 15, 3, 6, '#f4efe6'); R(qx + 10, qy - 10, 5, 2, '#f4efe6');
      const fl = Math.floor(t * 9) % 3; R(qx + 12, qy - 19 - (fl === 1 ? 1 : 0), 1, 3, '#ff7a2a'); R(qx + 12 + (fl === 2 ? 1 : 0), qy - 21 - (fl === 1 ? 1 : 0), 1, 2, '#f7c948');
      ell(qx + 36, qy + 4, 13, 5, K); ell(qx + 36, qy + 4, 12, 4, '#f4f8fb'); ell(qx + 36, qy + 3, 9, 3, '#e5a65a'); ell(qx + 36, qy + 3, 8, 2, '#f7d36a');
      R(qx + 32, qy + 2, 2, 1, '#b8322a'); R(qx + 38, qy + 3, 2, 1, '#b8322a'); R(qx + 35, qy + 4, 1, 1, '#57b04f'); R(qx + 40, qy + 1, 6, 4, '#f4f8fb');
      // the cat: a fat ginger tabby with a white chest and a crooked chef hat, sits on a stool
      const pull = (Math.sin(t * 1.4) + 1) / 2, kx = qx + 74 + Math.round(pull * 2), ky = qy + 6;
      R(qx + 62, qy + 32, 24, 4, K); R(qx + 63, qy + 33, 22, 2, '#a8693a'); R(qx + 65, qy + 36, 2, 16, K); R(qx + 80, qy + 36, 2, 16, K); R(qx + 66, qy + 44, 15, 2, K);
      const tl = Math.sin(t * 2.2); for (let k = 0; k < 8; k++) R(kx + 10 + k, ky + 22 - Math.round(Math.sin(k / 3 + tl) * 3) - k, 3, 3, K);
      for (let k = 0; k < 8; k++) R(kx + 11 + k, ky + 23 - Math.round(Math.sin(k / 3 + tl) * 3) - k, 1, 1, k % 3 ? '#e8954a' : '#b8622a');
      ell(kx + 2, ky + 18, 11, 10, K); ell(kx + 2, ky + 18, 10, 9, '#e8954a'); ell(kx, ky + 19, 5, 7, '#fbf3e4');
      for (let k = 0; k < 3; k++) { R(kx + 8, ky + 13 + k * 4, 4, 1, '#b8622a'); R(kx - 8, ky + 14 + k * 4, 3, 1, '#b8622a'); }
      R(kx - 4, ky + 26, 4, 3, K); R(kx - 3, ky + 27, 2, 1, '#fbf3e4'); R(kx + 3, ky + 26, 4, 3, K); R(kx + 4, ky + 27, 2, 1, '#fbf3e4');
      ell(kx, ky + 4, 8, 6, K); ell(kx, ky + 4, 7, 5, '#e8954a'); ell(kx - 1, ky + 7, 4, 2, '#fbf3e4');
      R(kx - 7, ky - 4, 4, 5, K); R(kx - 6, ky - 3, 2, 3, '#f2a0a8'); R(kx + 4, ky - 4, 4, 5, K); R(kx + 5, ky - 3, 2, 3, '#f2a0a8');
      R(kx - 1, ky - 1, 2, 3, '#b8622a'); R(kx - 5, ky + 1, 1, 1, '#b8622a'); R(kx + 4, ky + 1, 1, 1, '#b8622a');
      R(kx - 5, ky + 3, 3, 1, K); R(kx + 2, ky + 3, 3, 1, K); R(kx - 1, ky + 5, 2, 1, '#e8737a'); R(kx - 2, ky + 7, 1, 1, K); R(kx + 1, ky + 7, 1, 1, K);
      R(kx - 9, ky + 5, 3, 1, '#fbf3e4'); R(kx + 7, ky + 5, 3, 1, '#fbf3e4');
      // chef hat, tilted
      R(kx - 6, ky - 2, 10, 3, K); R(kx - 5, ky - 1, 8, 1, '#ffffff');
      ell(kx - 1, ky - 6, 6, 4, K); ell(kx - 1, ky - 6, 5, 3, '#ffffff'); ell(kx - 4, ky - 7, 2, 2, '#e9eef2');
      // paw holding the slice, cheese strings back to the plate
      const sx2 = kx - 16 + Math.round(pull * 2), sy2 = ky + 4;
      R(qx + 44, sy2 + 3, sx2 - qx - 44, 1, '#f7e08a'); if (pull > 0.4) R(qx + 45, sy2 + 5, sx2 - qx - 47, 1, '#f7e08a');
      R(sx2, sy2, 9, 6, K); R(sx2 + 1, sy2 + 1, 7, 4, '#f7d36a'); R(sx2 + 1, sy2 + 1, 7, 1, '#e5a65a'); R(sx2 + 3, sy2 + 2, 2, 2, '#b8322a'); R(sx2 + 6, sy2 + 3, 1, 1, '#57b04f');
      R(sx2 + 7, sy2 + 1, kx - sx2 - 11, 4, K); R(sx2 + 7, sy2 + 2, kx - sx2 - 12, 2, '#e8954a'); R(sx2 + 7, sy2 + 2, 2, 2, '#fbf3e4');
      // flour sacks and a fallen slice
      for (const [ax, ay] of [[2, 0], [20, 5]]) { R(qx + ax, qy + 62 + ay, 18, 22, K); R(qx + ax + 1, qy + 63 + ay, 16, 20, '#f4efe6'); R(qx + ax + 1, qy + 63 + ay, 16, 3, '#d8cfc0'); R(qx + ax + 5, qy + 72 + ay, 8, 5, '#3f9a4f'); R(qx + ax + 7, qy + 73 + ay, 4, 3, '#f4efe6'); }
      for (let k = 0; k < 8; k++) R(qx + 40 + k * 4, qy + 84 + (k % 3), 2, 1, '#f4efe6');

      // right of the bottom pair: a jukebox plays, notes float up; below, a mop bucket and a wet floor sign
      const jx = B1 + Math.round((W - B1 - 34) / 2), jy = rowY(2) + 6;
      shadow(jx, jy + 58, 34);
      R(jx, jy + 12, 34, 46, K); ell(jx + 17, jy + 12, 17, 12, K);
      ell(jx + 17, jy + 12, 16, 11, '#a8471f'); R(jx + 1, jy + 12, 32, 45, '#a8471f');
      ell(jx + 17, jy + 14, 12, 8, K); const glow = ['#f7c948', '#ff7a2a', '#d64545', '#9a6ac2'][Math.floor(t * 3) % 4];
      ell(jx + 17, jy + 14, 11, 7, glow); ell(jx + 17, jy + 15, 8, 5, '#3a2a1a'); disc(jx + 17, jy + 16, 3, '#1a1622'); R(jx + 17 + (Math.floor(t * 8) % 2 ? 1 : -1), jy + 15, 1, 1, '#f4efe6');
      R(jx + 4, jy + 26, 26, 14, K); R(jx + 5, jy + 27, 24, 12, '#f4efe6'); for (let k = 0; k < 4; k++) R(jx + 7, jy + 29 + k * 3, 20 - (k % 2) * 6, 1, '#9aa3ad');
      for (let k = 0; k < 4; k++) R(jx + 4 + k * 7, jy + 44, 5, 12, k % 2 ? glow : '#f2c94c');
      R(jx + 2, jy + 42, 30, 1, K);
      for (let k = 0; k < 3; k++) { const s = (t * 0.5 + k / 3) % 1, nx = jx + 6 + k * 10 + Math.round(Math.sin(s * 6 + k) * 3), ny = jy - 2 - s * 26; const c = `rgba(43,33,53,${(1 - s).toFixed(2)})`; R(nx, ny, 3, 2, c); R(nx + 2, ny - 6, 1, 6, c); R(nx + 3, ny - 6, 2, 1, c); }
      const wx = jx - 4, wy = rowY(3) + 14;
      shadow(wx, wy + 42, 40);
      R(wx + 2, wy + 22, 20, 18, K); R(wx + 3, wy + 23, 18, 16, '#5b8fd6'); R(wx + 3, wy + 23, 18, 2, '#8fb8ea'); R(wx + 4, wy + 25, 16, 2, '#9cd4f2');
      R(wx + 14, wy - 4, 2, 28, K); R(wx + 15, wy - 3, 1, 26, '#c98a52'); ell(wx + 14, wy + 25, 4, 2, '#e9e2d0');
      R(wx + 24, wy + 8, 1, 32, K); R(wx + 38, wy + 8, 1, 32, K); for (let dy = 0; dy < 26; dy++) R(wx + 31 - Math.floor(dy / 4), wy + 8 + dy, 1 + Math.floor(dy / 4) * 2, 1, K);
      for (let dy = 1; dy < 25; dy++) R(wx + 32 - Math.floor(dy / 4), wy + 8 + dy, Math.floor(dy / 4) * 2 - 1, 1, '#f7c948');
      R(wx + 30, wy + 18, 2, 6, K); R(wx + 30, wy + 26, 2, 2, K);
      ell(wx + 10, wy + 44, 10, 2, 'rgba(156,212,242,.6)'); R(wx + 8, wy + 43, 3, 1, '#ffffff');
    }
    if (l === 6) {
      // tar roof with gravel, feathers drift, seeds lie about, a water trough and seed sacks fill the empty corners
      for (let k = 0; k < 160; k++) R((k * 53) % W, 32 + (k * 37) % (FL - 33), 1, 1, k % 3 ? '#8a8590' : '#5a5560');
      const ell = (cx, cy, rx, ry, col) => { for (let dy = -ry; dy <= ry; dy++) { const w = Math.round(rx * Math.sqrt(1 - (dy / ry) ** 2)); R(cx - w, cy + dy, w * 2 + 1, 1, col); } };
      // corners: top left trough, top right chimney, bottom left sacks, bottom right nest
      // top left: an old clawfoot bathtub turned pigeon bath, one pigeon splashes, a rubber duck floats, the tap drips
      const tx = colX(0) + 10, ty = rowY(0) + 30;
      R(tx + 2, ty + 24, 50, 3, 'rgba(30,20,40,.3)');
      for (const fx of [5, 43]) { R(tx + fx, ty + 19, 5, 6, K); R(tx + fx + 1, ty + 20, 3, 3, '#e9c046'); R(tx + fx - 1, ty + 23, 3, 2, K); R(tx + fx + 3, ty + 23, 3, 2, K); }
      ell(tx + 26, ty + 10, 27, 11, K); ell(tx + 26, ty + 10, 26, 10, '#f4f1ec'); R(tx - 1, ty, 55, 10, '#2a2135');
      R(tx, ty + 1, 53, 9, '#f4f1ec'); R(tx, ty + 1, 53, 2, '#ffffff'); ell(tx + 26, ty + 14, 22, 5, '#d8d2c8');
      R(tx + 3, ty + 3, 47, 5, '#5fa8d8'); R(tx + 3, ty + 3, 47, 1, '#9cd4f2');
      for (let k = 0; k < 5; k++) R(tx + 6 + ((k * 11 + Math.floor(t * 8)) % 42), ty + 5 + (k % 2), 3, 1, '#bfe6f8');
      // the tap and its drip
      R(tx + 46, ty - 9, 3, 10, K); R(tx + 47, ty - 8, 1, 9, '#c9d0d6'); R(tx + 41, ty - 10, 8, 3, K); R(tx + 42, ty - 9, 6, 1, '#e9eef2'); R(tx + 46, ty - 13, 3, 3, K); R(tx + 47, ty - 12, 1, 1, '#d64545');
      const dr = (t * 1.2) % 1; R(tx + 42, ty - 7 + Math.floor(dr * 10), 1, 2, '#9cd4f2');
      // a rubber duck drifts
      const dx = tx + 30 + Math.round(Math.sin(t * 0.8) * 8);
      R(dx - 3, ty + 1, 7, 4, K); R(dx - 2, ty + 2, 5, 2, '#f7d84a'); R(dx + 1, ty - 3, 4, 4, K); R(dx + 2, ty - 2, 2, 2, '#f7d84a'); R(dx + 3, ty - 2, 1, 1, K); R(dx + 5, ty - 1, 2, 1, '#ff7a2a');
      // the bather flaps and throws drops
      const sp = Math.floor(t * 6) % 2, bx2 = tx + 13;
      R(bx2 - 6, ty - 3, 13, 7, K); R(bx2 - 5, ty - 2, 11, 5, '#a9b2c3'); R(bx2 - 4, ty - 1, 6, 2, '#7f889a'); R(bx2 - 9, ty - 4, 4, 3, K);
      R(bx2 + 4, ty - 6, 4, 4, K); R(bx2 + 5, ty - 5, 2, 2, '#6fbf9a'); R(bx2 + 5, ty - 11, 6, 6, K); R(bx2 + 6, ty - 10, 4, 4, '#7f889a'); R(bx2 + 8, ty - 9, 1, 1, '#ff7a2a'); R(bx2 + 11, ty - 9, 2, 2, K); R(bx2 + 11, ty - 8, 1, 1, '#e8a0a0');
      if (sp) { R(bx2 - 7, ty - 9, 8, 6, K); R(bx2 - 6, ty - 8, 6, 4, '#cfd5e0'); } else { R(bx2 - 8, ty - 3, 9, 3, K); R(bx2 - 7, ty - 2, 7, 1, '#cfd5e0'); }
      R(tx + 3, ty + 3, 22, 1, '#9cd4f2');
      for (let k = 0; k < 6; k++) { const ph = (t * 1.5 + k / 6) % 1, ox = (k % 2 ? 1 : -1) * (4 + Math.round(ph * 11)), oy = Math.round(-14 * ph + 18 * ph * ph); R(bx2 + ox, ty - 2 + oy, 1, 2, '#9cd4f2'); }
      // top right: a chimney with a soot-black pigeon popping out, a satellite dish with a sitter, grass in a crack
      const cx = colX(2) + 20, cy = rowY(0) + 16;
      R(cx - 2, cy + 46, 40, 3, 'rgba(30,20,40,.3)');
      R(cx, cy, 34, 46, K); R(cx + 1, cy + 1, 32, 44, '#b0654c');
      for (let yy = cy + 6; yy < cy + 45; yy += 6) { R(cx + 1, yy, 32, 1, '#94523d'); for (let xx = cx + ((yy - cy) / 6 % 2) * 6 + 6; xx < cx + 33; xx += 12) R(xx, yy - 5, 1, 5, '#94523d'); }
      R(cx + 1, cy + 1, 3, 44, '#c9785c');
      R(cx + 21, cy + 25, 6, 5, '#7a3a2a'); R(cx + 22, cy + 26, 4, 3, '#4a2a22'); R(cx + 21, cy + 24, 1, 1, '#57b04f'); R(cx + 23, cy + 22, 1, 3, '#57b04f'); R(cx + 25, cy + 23, 1, 2, '#8fe07a'); R(cx + 26, cy + 21, 2, 1, '#f2c94c');
      R(cx - 3, cy - 4, 40, 6, K); R(cx - 2, cy - 3, 38, 4, '#7d7f88'); R(cx - 2, cy - 3, 38, 1, '#a9abb4');
      // a soot pigeon pops out every few seconds
      const up = Math.max(0, Math.min(1, Math.sin(t * 1.3) * 3 - 1.5)), ph2 = cy - 4 - Math.round(up * 7);
      if (up > 0) {
        R(cx + 8, ph2 - 2, 12, 10, K); R(cx + 9, ph2 - 1, 10, 8, '#3a3346'); R(cx + 10, ph2 + 1, 3, 3, '#ffffff'); R(cx + 15, ph2 + 1, 3, 3, '#ffffff'); R(cx + 11, ph2 + 2, 1, 1, K); R(cx + 16, ph2 + 2, 1, 1, K);
        R(cx + 13, ph2 + 4, 2, 2, '#e8a0a0'); R(cx + 12, ph2 - 3, 1, 2, K); R(cx + 15, ph2 - 4, 1, 3, K);
        for (let k = 0; k < 5; k++) R(cx + 6 + k * 5, ph2 - 6 - (k % 2) * 3 + Math.round(up * 2), 2, 2, 'rgba(40,34,50,.55)');
      }
      // the smoke comes in puffs, darker after the soot pigeon
      for (let k = 0; k < 3; k++) { const s = (t * 0.4 + k / 3) % 1; ell(cx + 24 + Math.round(Math.sin(s * 6) * 3), cy - 8 - s * 22, 3 + Math.round(s * 3), 2 + Math.round(s * 2), `rgba(200,200,210,${(0.75 * (1 - s)).toFixed(2)})`); }
      // a satellite dish bolted on the side, a pigeon rides it
      R(cx - 5, cy + 14, 6, 3, K); R(cx - 4, cy + 15, 4, 1, '#9aa3ad');
      ell(cx - 10, cy + 15, 5, 10, K); ell(cx - 10, cy + 15, 4, 9, '#e9eef2'); ell(cx - 9, cy + 16, 2, 6, '#c9d0d6'); R(cx - 12, cy + 7, 2, 4, '#ffffff');
      R(cx - 22, cy + 15, 12, 1, K); R(cx - 25, cy + 13, 4, 5, K); R(cx - 24, cy + 14, 2, 3, '#7d7f88');
      // a white paint heart on the bricks and grass in a crack
      R(cx + 6, cy + 10, 2, 1, '#f4f1ec'); R(cx + 10, cy + 10, 2, 1, '#f4f1ec'); R(cx + 5, cy + 11, 8, 2, '#f4f1ec'); R(cx + 6, cy + 13, 6, 1, '#f4f1ec'); R(cx + 7, cy + 14, 4, 1, '#f4f1ec'); R(cx + 8, cy + 15, 2, 1, '#f4f1ec');
      const hb = Math.floor(t * 1.7) % 2;
      const rx2 = cx - 13, ry2 = cy - 1; R(rx2 - 3, ry2, 8, 5, K); R(rx2 - 2, ry2 + 1, 6, 3, '#a9b2c3'); R(rx2 + 4, ry2 + 1, 3, 2, K); R(rx2 - 5, ry2 - 3 + hb, 4, 4, K); R(rx2 - 4, ry2 - 2 + hb, 2, 2, '#7f889a'); R(rx2 - 4, ry2 - 2 + hb, 1, 1, '#ff7a2a'); R(rx2 - 6, ry2 - 1 + hb, 1, 1, '#e8a0a0'); R(rx2 - 2, ry2, 1, 1, '#6fbf9a'); R(rx2, ry2 + 5, 1, 1, '#e8737a'); R(rx2 + 2, ry2 + 5, 1, 1, '#e8737a');
      const bx = colX(0) + 10, by = rowY(2) + 18;
      for (const [ox, oy] of [[0, 8], [22, 10], [10, 0]]) { R(bx + ox, by + oy + 34, 26, 2, 'rgba(30,20,40,.3)'); R(bx + ox, by + oy, 24, 34, K); R(bx + ox + 1, by + oy + 1, 22, 32, '#d8c8a0'); R(bx + ox + 1, by + oy + 1, 22, 5, '#b5a47a'); R(bx + ox + 7, by + oy + 14, 10, 8, '#b8423b'); R(bx + ox + 10, by + oy + 16, 4, 4, '#f4efe6'); }
      for (let k = 0; k < 8; k++) R(bx + 30 + k * 3, by + 46 + (k % 3), 1, 1, '#e5c56a');
      // the nest: a mother pigeon broods, one egg hatches and the chick peeps, the treasures she dragged in lie around
      const nx = colX(2) + 36, ny = rowY(2) + 48;
      const half = (cx, cy, rx, ry, col, from) => { for (let dy = from; dy <= ry; dy++) { const w = Math.round(rx * Math.sqrt(1 - (dy / ry) ** 2)); R(cx - w, cy + dy, w * 2 + 1, 1, col); } };
      R(nx - 27, ny + 9, 54, 3, 'rgba(30,20,40,.3)');
      ell(nx, ny - 2, 26, 9, K); ell(nx, ny - 2, 25, 8, '#a8824f'); ell(nx, ny - 2, 20, 5, '#4a321c');
      // mother pigeon sits in the hollow, turns her head and blinks
      const mx = nx - 8, my = ny - 8, look = Math.floor(t * 0.7) % 2, blink = (t % 3) < 0.15;
      R(mx - 17, my - 5, 6, 5, K); R(mx - 16, my - 4, 4, 3, '#5f6878'); R(mx - 16, my - 2, 4, 1, '#3a3346');
      ell(mx, my, 13, 8, K); ell(mx, my, 12, 7, '#b3bccb'); ell(mx - 3, my + 1, 8, 5, '#8a93a6');
      for (let k = 0; k < 3; k++) R(mx - 9 + k * 4, my + 2 - (k % 2), 4, 1, '#5f6878');
      const hx = mx + 9 + look;
      R(hx - 2, my - 7, 7, 7, K); R(hx - 1, my - 5, 5, 4, '#6fbf9a'); R(hx, my - 3, 3, 2, '#9a6ac2');
      R(hx - 1, my - 14, 9, 8, K); R(hx, my - 13, 7, 6, '#7f889a'); R(hx, my - 13, 7, 1, '#9aa3b5');
      if (blink) R(hx + 3, my - 11, 3, 1, K); else { R(hx + 3, my - 12, 3, 3, '#ffb35a'); R(hx + 4, my - 11, 1, 1, K); }
      R(hx + 7, my - 11, 3, 2, K); R(hx + 7, my - 11, 1, 1, '#f4efe6'); R(hx + 8, my - 10, 2, 1, '#e8a0a0');
      // eggs: one whole, one hatched with a peeping chick
      ell(nx + 9, ny - 5, 4, 5, K); ell(nx + 9, ny - 5, 3, 4, '#f4efe6'); R(nx + 8, ny - 8, 1, 2, '#ffffff'); R(nx + 10, ny - 4, 1, 1, '#d8cfc0');
      const kx = nx + 18, pop = Math.floor(t * 2.5) % 3 === 0 ? 0 : 3, open = Math.floor(t * 5) % 2;
      ell(kx, ny - 9 + pop, 5, 5, K); ell(kx, ny - 9 + pop, 4, 4, '#f7d84a'); R(kx - 3, ny - 12 + pop, 2, 1, '#fff1a0'); R(kx - 1, ny - 15 + pop, 1, 2, K); R(kx + 1, ny - 16 + pop, 1, 3, K);
      R(kx - 3, ny - 10 + pop, 1, 2, K); R(kx + 2, ny - 10 + pop, 1, 2, K); R(kx - 1, ny - 8 + pop, 3, 1 + open, '#ff7a2a'); if (open) R(kx, ny - 8 + pop, 1, 1, '#b8423b');
      ell(kx, ny - 3, 5, 4, K); ell(kx, ny - 3, 4, 3, '#f4efe6'); for (let k = -4; k <= 4; k += 2) R(kx + k, ny - 7 + (k & 2 ? 2 : 0), 1, 2, K);
      if (!pop && open) for (const [a, b] of [[7, 20], [11, 23]]) { R(kx + a, ny - b, 1, 4, '#f4f8fb'); R(kx + a, ny - b + 5, 1, 1, '#f4f8fb'); }
      // the front rim of twigs hides everyone's lower half
      half(nx, ny - 2, 26, 9, K, 1); half(nx, ny - 2, 25, 8, '#a8824f', 1); half(nx, ny - 1, 22, 6, '#c9a26a', 3);
      for (let k = 0; k < 12; k++) { const a = Math.PI * (0.06 + k * 0.08), rx = nx + Math.round(Math.cos(a) * 22), ry = ny + 1 + Math.round(Math.sin(a) * 5); R(rx - 3, ry, 7, 1, k % 2 ? '#7a5a34' : '#8a6438'); R(rx + (k % 3) - 1, ry - 1, 1, 3, '#5a3f22'); }
      R(nx - 32, ny - 1, 9, 1, '#a8824f'); R(nx + 24, ny + 3, 9, 1, '#c9a26a'); R(nx + 26, ny - 8, 1, 6, '#a8824f'); R(nx - 25, ny - 9, 1, 5, '#7a5a34');
      // treasures she dragged in: a bottle cap, a lost key, a shiny button
      R(nx - 30, ny + 6, 6, 3, K); R(nx - 29, ny + 6, 4, 2, '#d64545'); R(nx - 29, ny + 6, 1, 1, '#ff9a9a');
      R(nx + 20, ny + 7, 6, 2, K); R(nx + 21, ny + 7, 4, 1, '#f2c94c'); R(nx + 25, ny + 6, 4, 4, K); R(nx + 26, ny + 7, 2, 2, '#f2c94c'); R(nx + 27, ny + 8, 1, 1, K);
      const sh = Math.floor(t * 1.5) % 4 === 0; R(nx - 3, ny + 8, 4, 3, K); R(nx - 2, ny + 9, 2, 1, sh ? '#ffffff' : '#8fd3f0'); if (sh) { R(nx - 1, ny + 4, 1, 3, '#ffffff'); R(nx + 2, ny + 9, 3, 1, '#ffffff'); }
      for (let k = 0; k < 4; k++) { const fx = (k * 71 + t * 9 * (k % 2 ? 1 : -1)) % W, fy = 40 + ((k * 97 + t * 6) % (FL - 50)); const xx = fx < 0 ? fx + W : fx; R(xx, fy, 4, 1, '#f4f8fb'); R(xx + 1, fy + 1, 2, 1, '#cfd5e0'); }

// ===== drawWorld(): прочие правки =====
// окна:        if (l !== 3 && l !== 4 && l !== 5 && l !== 6) for (const wx of [14, W - 54]) ...
// сетка пола:  if (l !== 5 && l !== 6) for (let yy = 31; yy < FL; yy += 20) R(0, yy, W, 1, LT.grid);
