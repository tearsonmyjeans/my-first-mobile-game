// Превью кондитерской: вставляет блоки drafts/workshop-bakery.js в копию игры на место манги (индекс 7) и снимает обе раскладки.
// node drafts/bakery-preview.js out.png [папка для копии]
const fs = require('fs'), path = require('path'), { chromium } = require('playwright');
const root = path.resolve(__dirname, '..'), out = process.argv[2] || path.join(root, 'drafts/bakery-preview.png'), tmp = process.argv[3] || require('os').tmpdir();
const draft = fs.readFileSync(path.join(__dirname, 'workshop-bakery.js'), 'utf8');
const block = name => { const a = draft.indexOf(`/* ===== ${name}`), b = draft.indexOf('\n', a), e = draft.indexOf('\n/* ', b); return draft.slice(b + 1, e); };
let src = fs.readFileSync(path.join(root, 'game/index.html'), 'utf8');
const rep = (a, b) => { if (!src.includes(a)) throw new Error('no ' + a); src = src.replace(a, b); };
rep('WIDE = { 9: 2 }', 'WIDE = { 9: 2, 7: 2 }');
rep('    else if (l === 7) {\n', `    else if (l === 7) {\n${block('WALL')}\n    }\n    else if (false) {\n`);
rep('    if (l === 7) {\n', `    if (l === 7) {\n${block('FLOOR')}\n    }\n    if (false) {\n`);
rep('  function machine(type, x, y) {\n', block('COUNTER') + '\n  function machine(type, x, y) {\n');
rep("    } else if (type === 'dough') {\n", block('MACHINES') + "\n    } else if (type === 'dough') {\n");
rep("else if (s.machine === 'etalon' && ww !== SW)", "else if ((s.machine === 'cakecase' || s.machine === 'hotgrill') && ww !== SW) counter(x, y, ww, hh, s.machine);\n        else if (s.machine === 'etalon' && ww !== SW)");
rep('  if (BOT) window.PF', '  window.PF'); rep('  else requestAnimationFrame(loop);', '  requestAnimationFrame(loop);');
const file = path.join(tmp, 'bakery-game.html'); fs.writeFileSync(file, src);
(async () => {
  const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 480, height: 900 }, deviceScaleFactor: 2 });
  p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('file://' + file);
  const shots = [];
  for (const kind of ['cake', 'hot']) {
    await p.evaluate(kind => {
      const P = window.PF, G = 7;
      Object.assign(P.LOCS[G], { name: 'Кондитерская', tab: 'Кондит.', sign: 'ЦЕХ 8 · КОНДИТЕРСКАЯ', wall: '#fbeee6', mortar: '#f6c9d6', floor: '#cdeee0', grid: '#cdeee0', plate: '#fff6ea', frame: '#b0587a', item: '#f8c2d3', board: '#c2456e', boardHi: '#e8789a', unit: 'Сладости', unit1: 'Цена сладости' });
      Object.assign(P.MACH, {
        beater: { loc: G, name: 'Миксер', short: 'МИКСЕР', rate: 0.8, value: 1.5e7, max: 1, desc: '' },
        oven: { loc: G, name: 'Духовка', short: 'ДУХОВКА', rate: 0.5, value: 3.5e7, max: 1, desc: '' },
        cakecase: { loc: G, name: 'Витрина тортов', short: 'ТОРТЫ', rate: 0.3, value: 8e7, max: 1, desc: '' },
        hotgrill: { loc: G, name: 'Гриль хотдогов', short: 'ХОТДОГИ', rate: 0.3, value: 8e7, max: 1, desc: '' } });
      P.LAYOUTS[G].splice(0, P.LAYOUTS[G].length, ...(kind === 'cake' ? [[0, 1], [1, 1], [0, 0]] : [[0, 0], [1, 0], [0, 1]]));
      const s = P.newRun(), ws = ['crow', 'tramp', 'pink'];
      ws.forEach(w => { s.workers[w].unlocked = true; s.workers[w].skill = true; });
      s.locs[0].slots.forEach(z => { z.worker = null; });
      s.locs[G].unlocked = true;
      s.locs[G].slots = ['beater', 'oven', kind === 'cake' ? 'cakecase' : 'hotgrill'].map((m, i) => ({ machine: m, worker: ws[i], upg: [], acc: 0, kiss: 0 }));
      s.run.counter = kind; s.run.order = kind === 'cake' ? { kind: 'batch', need: 40, have: 26, done: false } : { kind: 'batch', need: 40, have: 40, done: true };
      s.cur = G; P.state = s;
    }, kind);
    await p.waitForTimeout(1500);
    const cv = await p.$('canvas');
    shots.push(await cv.screenshot());
  }
  // side by side
  // only the workshop scene, without the locker room: 3 screen pixels per game pixel
  const html = `<body style="margin:0;background:#16141c;display:flex;flex-wrap:wrap;gap:10px;padding:10px">${shots.map(s => `<div style="width:720px;height:${Math.round(720 * 204 / 240)}px;overflow:hidden"><img style="width:720px;image-rendering:pixelated" src="data:image/png;base64,${s.toString('base64')}"></div>`).join('')}</body>`;
  const { PAL, ICONS } = require('./bakery-icons.js');
  const icons = `<div style="display:flex;gap:10px;padding:0 10px 10px">${Object.values(ICONS).map(rows => `<svg width="136" height="136" viewBox="-0.5 -0.5 17 17" style="background:#262230;shape-rendering:crispEdges">${rows.map((row, y) => [...row].map((ch, x) => ch === '.' ? '' : `<rect x="${x}" y="${y}" width="1" height="1" fill="${PAL[ch] === 'K' ? '#2b2135' : PAL[ch]}"/>`).join('')).join('')}</svg>`).join('')}</div>`;
  const q = await b.newPage({ viewport: { width: 1470, height: 400 } }); await q.setContent(html.replace('</body>', '') + icons + '</body>'); await q.waitForTimeout(200);
  await q.screenshot({ path: out, fullPage: true }); await b.close(); console.log('ok', out);
})();
