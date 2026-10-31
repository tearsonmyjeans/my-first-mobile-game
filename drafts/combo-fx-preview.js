// Превью новых эффектов комбо экипировки (Пара, Тройка): рамка по градации и редкие искры сотрудника. Не вставлено в игру.
// node drafts/combo-fx-preview.js -> drafts/combo-fx-preview.png
const { chromium } = require('playwright');
const html = `<body style="margin:0;background:#1b1624"><canvas id=c width=330 height=190 style="width:1320px;height:760px;image-rendering:pixelated"></canvas><script>
const gx = c.getContext('2d'), K = '#2a2230';
const R = (x, y, w, h, col) => { gx.fillStyle = col; gx.fillRect(Math.round(x), Math.round(y), w, h); };
const border = (x, y, w, h, col) => { R(x - 2, y - 2, w + 4, 2, col); R(x - 2, y + h, w + 4, 2, col); R(x - 2, y, 2, h, col); R(x + w, y, 2, h, col); };
const TIER = { 2: ['#c98a4b', '#e6b27a'], 4: ['#cfd8e3', '#f2f6fb'], 8: ['#ffd54a', '#fff1b0'] };
const T = (sx, k) => TIER[sx >= 8 ? 8 : sx][k];
function slot(x, y, sx, t, i, label, sp) {
  const ww = 72, hh = 74;
  R(x, y, ww, hh, '#4a4256'); R(x + 20, y + 10, 32, 26, '#8a8296'); R(x + 20, y + 10, 32, 3, '#a9a2b6');
  // card icons: tier frame, no blinking
  for (let k = 0; k < 2; k++) { R(x + 4 + k * 5, y + 4, 4, 6, T(sx, 1)); R(x + 5 + k * 5, y + 5, 2, 4, '#8fd0a0'); }
  // calm frame: slow pulse, period about 5 s
  const a = 0.38 + 0.12 * Math.sin(t * 1.2 + i);
  border(x + 2, y + 2, ww - 4, hh - 4, T(sx, 0) + Math.round(a * 255).toString(16).padStart(2, '0'));
  if (sx >= 4) R(x + 4, y + 4, ww - 8, hh - 8, T(sx, 0) + '12');
  // worker (placeholder)
  const wy = y + hh - 34; R(x + 8, wy, 16, 30, '#d9a679'); R(x + 10, wy + 2, 12, 8, '#f3dcc0'); R(x + 9, wy + 14, 14, 14, '#4f8296');
  // sparks from the worker: rare and small, one burst per period
  const per = sx >= 8 ? 2.2 : sx >= 4 ? 3 : 4, n = sx >= 8 ? 3 : sx >= 4 ? 2 : 1, ph = ((t + i * 0.9) % per) / 0.8;
  if (sp && ph < 1) for (let k = 0; k < n; k++) { const q = ph, sxx = x + 26 + k * 3 + Math.round(q * (3 + k * 2)), syy = wy + 8 - Math.round(q * (8 + k * 3)); R(sxx, syy, 1, 1, k % 2 ? T(sx, 1) : T(sx, 0)); }
  gx.font = '6px monospace'; gx.fillStyle = T(sx, 0); gx.fillText('×' + sx, x + 4, y + 17);
  gx.fillStyle = '#c9d3e0'; gx.fillText(label, x + 4, y + hh + 8);
}
[[2, 'бронза ×2'], [4, 'серебро ×4'], [8, 'золото ×8']].forEach(([sx, lb], n) => { slot(8 + n * 106, 8, sx, 0.2, n, lb + ', без искр'); slot(8 + n * 106, 98, sx, 0.5 - n * 0.9 + 4.4, n, lb + ', искры', true); });
</script>`;
(async () => {
  const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1320, height: 760 } });
  await p.setContent(html); await p.screenshot({ path: 'drafts/combo-fx-preview.png' }); await b.close();
})();
