// Черновик иконок 16×16 Живой комнаты (цех 10, альтернатива калибровке). Не вставлен в игру.
// '.' прозрачный. node drafts/room-icons.js печатает строки для ICON_DRAW в стиле игры (r(x, y, w, h, цвет)).
const PAL = { k: 'K', m: '#7a1a1e', M: '#a8363a', f: '#b8433f', F: '#d9726a', p: '#f0a59a', d: '#5a1014', n: '#1a0204', w: '#f0d8c8', r: '#c01a22', R: '#ff5050',
  b: '#e6dcc8', B: '#b8a888', t: '#efe6d2', e: '#e8c9a0', v: '#5a1030', y: '#ffd54a' };

const ICONS = {
  // the flesh desk: a lumpy monitor with an eye for a screen, a stalk, a meat top with a keyboard of teeth, bone legs
  fleshdesk: [
    '..kkkkkkkkkkkk..',
    '.kFFFFFFFFFFFfk.',
    'kfMkkkkkkkkkkMfk',
    'kMMknnwwwwnnkMMk',
    '.kMkwwrrrrwwkMk.',
    '.kMkwrrkkrrwkMk.',
    '.kMknwwrrwwnkMk.',
    '.kMknnRnnRnnkMk.',
    '.kmmkkkkkkkkmmk.',
    '..kkkkkMMkkkkk..',
    'kkkkkkkfMkkkkkkk',
    'kfffttttttttfffk',
    'kmeeeeeeeeeeeemk',
    'kkkkkkkkkkkkkkkk',
    '.kbBk......kbBk.',
    '.kkkk......kkkk.',
  ],
  // a pod on a vein with a sleeper inside: the mark of one eaten
  pod: [
    '......kkkk......',
    '....kkffffkk....',
    '...kfFppFfffk...',
    '..kfFpFffffffk..',
    '..kfffddddfffk..',
    '.kfffdddddfffffk',
    '.kffdydyddfffvfk',
    '.kfffddddffffvfk',
    '.kffddddddddfffk',
    '.kfdddddddddfffk',
    '..kfffffffffffk.',
    '..kmffffffffmk..',
    '...kkmmmmmmkk...',
    '.....kkvvkk.....',
    '.......vv.......',
    '.......vv.......',
  ],
};

for (const [name, rows] of Object.entries(ICONS)) {
  const out = [];
  rows.forEach((row, y) => {
    if (row.length !== 16) throw new Error(`${name} row ${y}: ${row.length}`);
    for (let x = 0; x < 16;) {
      const ch = row[x] || '.';
      if (ch === '.') { x++; continue; }
      let w = 1; while (row[x + w] === ch) w++;
      const col = PAL[ch]; if (!col) throw new Error(`${name} row ${y}: no colour ${ch}`);
      out.push(`r(${x}, ${y}, ${w}, 1, ${col === 'K' ? 'K' : `'${col}'`});`);
      x += w;
    }
  });
  if (require.main === module) console.log(`    ${name}: r => { ${out.join(' ')} },`);
}
module.exports = { PAL, ICONS };
