// Превью цеха снов: вставляет блоки drafts/workshop-dreams.js в копию игры на место пепси (индекс 8) и снимает цех в двух состояниях.
// node drafts/dream-preview.js out.png [папка для копии]
const fs = require('fs'), path = require('path'), { chromium } = require('playwright');
const root = path.resolve(__dirname, '..'), out = process.argv[2] || path.join(root, 'drafts/dream-preview.png'), tmp = process.argv[3] || require('os').tmpdir();
const draft = fs.readFileSync(path.join(__dirname, 'workshop-dreams.js'), 'utf8');
const block = name => { const a = draft.indexOf(`/* ===== ${name}`), b = draft.indexOf('\n', a), e = draft.indexOf('\n/* ', b); return draft.slice(b + 1, e); };
let src = fs.readFileSync(path.join(root, 'game/index.html'), 'utf8');
const rep = (a, b) => { if (!src.includes(a)) throw new Error('no ' + a); src = src.replace(a, b); };
rep('const TALL = { 8: 3 }, WIDE = { 9: 2 };', 'const TALL = {}, WIDE = { 9: 2 }, BIG = { 8: 5 };');
rep('const SLOT_W = (l, i) => WIDE[l] === i ? SW + 78 : SW, SLOT_H = (l, i) => TALL[l] === i ? SH + 156 : SH;', 'const SLOT_W = (l, i) => WIDE[l] === i || BIG[l] === i ? SW + 78 : SW, SLOT_H = (l, i) => TALL[l] === i ? SH + 156 : BIG[l] === i ? SH + 78 : SH;');
rep('    if (i === j) return false;\n', `    if (i === j) return false;\n${block('ADJ').replace(/l === G/g, 'l === 8')}`);
rep('    else if (l === 8) {\n', `    else if (l === 8) {\n${block('WALL').replace(/\bG\b/g, '8')}\n    }\n    else if (false) {\n`);
rep('    if (l === 8) {\n', `    if (l === 8) {\n${block('FLOOR').replace(/\bG\b/g, '8')}\n    }\n    if (false) {\n`);
rep('  function machine(type, x, y) {\n', block('TOWER') + '\n  function machine(type, x, y) {\n');
rep("    } else if (type === 'dough') {\n", block('MACHINES') + "\n    } else if (type === 'dough') {\n");
rep("if (s.machine === 'extract' && hh !== SH) extractor(x, y, hh);", "if (s.machine === 'dreamtower' && big) { const ok = j => !!(sl[j].machine && sl[j].worker); tower(x, y, ww, hh, [ok(0) && ok(1) && ok(3) && ok(4), ok(4), ok(3), ok(1), ok(0)], state.run.beamCd ?? 1); }\n        else if (s.machine === 'extract' && hh !== SH) extractor(x, y, hh);");
rep('      if (!s.machine) { const pc', `${block('MARK')}\n      if (!s.machine) { const pc`);
rep('    if (l === ICE && state.run.storm) {\n', `${block('BEAM').replace(/l === G/g, 'l === 8').replace(/LAYOUTS\[G\]/g, 'LAYOUTS[8]').replace(/\bG\)/g,'8)')}\n    if (l === ICE && state.run.storm) {\n`);
rep('  if (BOT) window.PF', '  window.PF'); rep('  else requestAnimationFrame(loop);', '  requestAnimationFrame(loop);');
const file = path.join(tmp, 'dream-game.html'); fs.writeFileSync(file, src);
(async () => {
  const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 480, height: 1000 }, deviceScaleFactor: 2 });
  p.on('pageerror', e => console.log('ERR', e.message)); p.on('console', m => { if (m.type() === 'error') console.log('CONSOLE', m.text()); });
  await p.goto('file://' + file);
  const shots = []; let frac = 1;
  for (const mode of ['full', 'part']) {
    await p.evaluate(mode => {
      const P = window.PF, G = 8;
      Object.assign(P.LOCS[G], { name: 'Цех снов', tab: 'Сны', sign: 'ЦЕХ 9 · ЦЕХ СНОВ', wall: '#1b2160', mortar: '#2a2f7c', floor: '#6c6ab4', grid: '#6c6ab4', plate: '#e7defa', frame: '#5b3f93', item: '#cfc6ff', board: '#4b3b9a', boardHi: '#7b6bd0', unit: 'Сны', unit1: 'Цена сна' });
      Object.assign(P.MACH, {
        fluffer: { loc: G, name: 'Взбивалка подушек', short: 'ПОДУШКИ', rate: 0.9, value: 3e8, max: 1, desc: '' },
        sheep: { loc: G, name: 'Овцесчётчик', short: 'ОВЦЫ', rate: 0.7, value: 5e8, max: 1, desc: '' },
        dreamcatcher: { loc: G, name: 'Ловец снов', short: 'ЛОВЕЦ', rate: 0.5, value: 8e8, max: 1, desc: '' },
        lullaby: { loc: G, name: 'Шарманка колыбельных', short: 'ШАРМАНКА', rate: 0.4, value: 1.2e9, max: 1, desc: '' },
        nightmare: { loc: G, name: 'Кошмароварка', short: 'КОШМАРЫ', rate: 0.25, value: 2e9, max: 1, desc: '' },
        dreamtower: { loc: G, name: 'Башня снов', short: 'БАШНЯ', rate: 0, value: 0, max: 1, desc: '' } });
      P.LAYOUTS[G].splice(0, P.LAYOUTS[G].length, [0, 1.35], [0.2, 3], [2.4, 3.6], [3.55, 2], [2.6, 0], [1.3, 1.3]);
      const s = P.newRun(), ws = Object.keys(P.WORKERS).slice(0, 6);
      ws.forEach(w => { s.workers[w].unlocked = true; s.workers[w].skill = true; });
      s.locs[0].slots.forEach(z => { z.worker = null; });
      s.locs[G].unlocked = true;
      const ms = ['sheep', 'lullaby', 'nightmare', 'fluffer', 'dreamcatcher'];
      s.locs[G].slots = ms.map((m, i) => ({ machine: m, worker: mode === 'part' && i % 2 ? null : ws[i], upg: [], acc: 0, kiss: 0 })).concat([{ machine: 'dreamtower', worker: null, upg: [], acc: 0, kiss: 0 }]);
      s.run.beam = mode === 'full' ? 3 : 0; s.run.beamCd = mode === 'full' ? 1 : 0.55;
      s.cur = G; P.state = s;
    }, mode);
    await p.waitForTimeout(1800);
    frac = await p.evaluate(() => { const P = window.PF, rows = Math.max(...P.LAYOUTS[8].map(a => a[1])) + 1, fl = 36 + Math.round(rows * 78) + 12; return fl / (fl + 144); });
    shots.push(await (await p.$('canvas')).screenshot());
  }
  const html = `<body style="margin:0;background:#16141c;display:flex;gap:10px;padding:10px;align-items:flex-start">${shots.map(s => `<div style="flex:none;width:640px;overflow:hidden;height:${Math.round(640 * s.readUInt32BE(20) / s.readUInt32BE(16) * frac)}px"><img style="width:640px;image-rendering:pixelated" src="data:image/png;base64,${s.toString('base64')}"></div>`).join('')}</body>`;
  const { PAL, ICONS } = require('./dream-icons.js');
  const icons = `<div style="display:flex;gap:10px;padding:0 10px 10px">${Object.values(ICONS).map(rows => `<svg width="136" height="136" viewBox="-0.5 -0.5 17 17" style="background:#262230;shape-rendering:crispEdges">${rows.map((row, y) => [...row].map((ch, x) => ch === '.' ? '' : `<rect x="${x}" y="${y}" width="1" height="1" fill="${PAL[ch] === 'K' ? '#2b2135' : PAL[ch]}"/>`).join('')).join('')}</svg>`).join('')}</div>`;
  const q = await b.newPage({ viewport: { width: 1330, height: 400 } }); await q.setContent(html.replace('</body>', '') + icons + '</body>'); await q.waitForTimeout(300);
  await q.screenshot({ path: out, fullPage: true }); await b.close(); console.log('ok', out);
})();
