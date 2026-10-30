// Превью Живой комнаты: вставляет блоки drafts/workshop-room.js в копию игры на место калибровки (индекс 9) и снимает цех: голодный, после одного и после трёх поглощённых,
// а ниже — кадры поедания третьего (фаза анимации заморожена через run.eatPh).
// node drafts/room-preview.js out.png [папка для копии]
const fs = require('fs'), path = require('path'), { chromium } = require('playwright');
const root = path.resolve(__dirname, '..'), out = process.argv[2] || path.join(root, 'drafts/room-preview.png'), tmp = process.argv[3] || require('os').tmpdir();
const draft = fs.readFileSync(path.join(__dirname, 'workshop-room.js'), 'utf8');
const block = name => { const a = draft.indexOf(`/* ===== ${name}`), b = draft.indexOf('\n', a), e = draft.indexOf('\n/* ', b); return draft.slice(b + 1, e); };
let src = fs.readFileSync(path.join(root, 'game/index.html'), 'utf8');
const rep = (a, b) => { if (!src.includes(a)) throw new Error('no ' + a); src = src.replace(a, b); };
rep('const TALL = { 8: 3 }, WIDE = { 9: 2 };', 'const TALL = { 8: 3 }, WIDE = {}, BIG = { 9: 0 };');
rep('const SLOT_W = (l, i) => WIDE[l] === i ? SW + 78 : SW, SLOT_H = (l, i) => TALL[l] === i ? SH + 156 : SH;', 'const SLOT_W = (l, i) => WIDE[l] === i || BIG[l] === i ? SW + 78 : SW, SLOT_H = (l, i) => TALL[l] === i ? SH + 156 : BIG[l] === i ? SH + 78 : SH;');
rep('const gridSize = l => LAYOUTS', 'const gridSize = l => l === 9 ? [4, 3] : LAYOUTS');
rep('    else if (l === 9) {\n', `    else if (l === 9) {\n${block('WALL').replace(/\bG\b/g, '9')}\n    }\n    else if (false) {\n`);
rep('    if (l === 9) {\n', `    if (l === 9) {\n${block('FLOOR').replace(/\bG\b/g, '9')}\n    }\n    if (false) {\n`);
rep('  function machine(type, x, y) {\n', block('DESK') + '\n  function machine(type, x, y) {\n');
rep("if (s.machine === 'extract' && hh !== SH) extractor(x, y, hh);", "if (s.machine === 'fleshdesk' && big) { const ea = state.run.eaten || []; desk(x, y, ww, hh, ea.length, state.run.eatPh != null ? t - state.run.eatPh * 2.6 : state.run.eatAt, ea[ea.length - 1]); }\n        else if (s.machine === 'extract' && hh !== SH) extractor(x, y, hh);");
rep("      else if (!s.worker && !(st && st.income > 0)) T('НЕТ РАБОТНИКА'", `${block('LABEL')}\n      else if (!s.worker && !(st && st.income > 0)) T('НЕТ РАБОТНИКА'`);
rep('  if (BOT) window.PF', '  window.PF'); rep('  else requestAnimationFrame(loop);', '  requestAnimationFrame(loop);');
const file = path.join(tmp, 'room-game.html'); fs.writeFileSync(file, src);
(async () => {
  const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 480, height: 1000 }, deviceScaleFactor: 2 });
  p.on('pageerror', e => console.log('ERR', e.message)); p.on('console', m => { if (m.type() === 'error') console.log('CONSOLE', m.text()); });
  await p.goto('file://' + file);
  const shots = []; let frac = 1;
  const PH = [0.1, 0.3, 0.42, 0.62, 0.72, 0.86], frames = [];
  for (const [n, ph] of [[0], [1], [3], ...PH.map(ph => [3, ph])]) {
    await p.evaluate(([n, ph]) => {
      const P = window.PF, G = 9;
      Object.assign(P.LOCS[G], { name: 'Живая комната', tab: 'Комната', sign: 'ЦЕХ 10 · ЖИВАЯ КОМНАТА', wall: '#3a0a0e', mortar: '#5a1a1c', floor: '#6a171b', grid: '#6a171b', plate: '#2e0709', frame: '#1a0204', item: '#e86a6a', board: '#5a1014', boardHi: '#9a2a2a', unit: 'Песни', unit1: 'Цена песни' });
      const s = P.newRun(), ws = Object.keys(P.WORKERS).slice(0, 8), eaten = ws.slice(0, n);
      ws.forEach(w => { s.workers[w].unlocked = true; });
      s.locs[0].slots.forEach(z => { z.worker = null; });
      s.lockers = s.lockers.filter(id => !eaten.includes(id));
      P.MACH.fleshdesk = { loc: G, name: 'Стол из плоти', short: 'СТОЛ', rate: 0.5, value: 5e9 * n * n, max: 1, auto: { power: eaten.reduce((a, id) => a + P.WORKERS[id].power, 0), speed: 1 }, desc: '' };
      s.locs[G].unlocked = true;
      s.locs[G].slots = [{ machine: 'fleshdesk', worker: null, upg: [], acc: 0, kiss: 0 }];
      P.LAYOUTS[G].splice(0, P.LAYOUTS[G].length, [1, 0.7]);
      s.run.eaten = eaten; s.run.eatPh = ph; s.cur = G; P.state = s;
    }, [n, ph]);
    await p.waitForTimeout(1800);
    frac = await p.evaluate(() => { const fl = 36 + 3 * 78 + 12; return fl / (fl + 144); });
    (ph == null ? shots : frames).push(await (await p.$('canvas')).screenshot());
  }
  const html = `<body style="margin:0;background:#16141c;display:flex;gap:10px;padding:10px;align-items:flex-start">${shots.map(s => `<div style="flex:none;width:520px;overflow:hidden;height:${Math.round(520 * s.readUInt32BE(20) / s.readUInt32BE(16) * frac)}px"><img style="width:520px;image-rendering:pixelated" src="data:image/png;base64,${s.toString('base64')}"></div>`).join('')}</body>`;
  // the meal frames: the desk part of the canvas (logical x 78..240, y 70..250 of a 318-wide room), each frame 2× wide
  const crop = s => { const k = 2 * 318 / 318; return `<div style="flex:none;width:${162 * 2}px;height:${180 * 2}px;overflow:hidden;position:relative"><img style="position:absolute;left:${-78 * 2}px;top:${-70 * 2}px;width:${318 * 2}px;image-rendering:pixelated" src="data:image/png;base64,${s.toString('base64')}"></div>`; };
  const strip = `<div style="display:flex;gap:10px;padding:0 10px 10px">${frames.map(crop).join('')}</div>`;
  const { PAL, ICONS } = require('./room-icons.js');
  const icons = `<div style="display:flex;gap:10px;padding:0 10px 10px">${Object.values(ICONS).map(rows => `<svg width="136" height="136" viewBox="-0.5 -0.5 17 17" style="background:#262230;shape-rendering:crispEdges">${rows.map((row, y) => [...row].map((ch, x) => ch === '.' ? '' : `<rect x="${x}" y="${y}" width="1" height="1" fill="${PAL[ch] === 'K' ? '#2b2135' : PAL[ch]}"/>`).join('')).join('')}</svg>`).join('')}</div>`;
  const q = await b.newPage({ viewport: { width: 2080, height: 400 } }); await q.setContent(html.replace('</body>', '') + strip + icons + '</body>'); await q.waitForTimeout(300);
  await q.screenshot({ path: out, fullPage: true }); await b.close(); console.log('ok', out);
})();
