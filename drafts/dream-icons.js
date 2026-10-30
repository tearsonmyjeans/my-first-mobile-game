// Черновик иконок карт цеха снов 16×16 (цех 9, альтернатива пепси). Не вставлен в игру.
// '.' прозрачный. node drafts/dream-icons.js печатает строки для ICON_DRAW в стиле игры (r(x, y, w, h, цвет)).
const PAL = { k: 'K', l: '#b9a6f0', L: '#d8ccff', v: '#8f7ccf', V: '#5b3f93', n: '#2f2a5a', N: '#1f2461', W: '#ffffff', c: '#fff6ea', p: '#f29ab5', P: '#f8c2d3', m: '#e8789a',
  y: '#ffd54a', Y: '#fff1a8', b: '#5ee6e6', B: '#9fb0ff', s: '#c9d0d6', S: '#9aa3ad', G: '#57b04f', g: '#7ee081', t: '#e8c07a', T: '#c98f4a', h: '#a8693a', H: '#7a4a2a',
  u: '#8a3fd0', U: '#c28af0', e: '#e0533a', o: '#f2a64a', r: '#d64545', D: '#3a3346', d: '#5a5060' };

const ICONS = {
  // the drum with a round window, a pillow on the belt, feathers over the funnel
  fluffer: [
    '..W...WW........',
    '.WWWkkkkkk......',
    '.kLLLLLLLLk.....',
    '..kkkkkkkkk.....',
    '.kllllllllllk...',
    '.klkkkkkkklvk...',
    '.klknnnnnklvkkkk',
    '.klknWnWnklkPPck',
    '.klknnWnnklkPcck',
    '.klknWnWnklkPmPk',
    '.klkkkkkkklkPPPk',
    '.kllllllllvkkkkk',
    '.kvvvvvvvvvkddkk',
    'kkkkkkkkkkkkkkkk',
    'kVVVVVVVVVVVVVVk',
    'kkkkkkkkkkkkkkkk',
  ],
  // a night-sky screen: a sheep over the fence, the counter below
  sheep: [
    '..kkkkkkkkkkkk..',
    '.kvvvvvvvvvvvvk.',
    '.kvkNNNNNNNNkvk.',
    '.kvkNBNNNNYNkvk.',
    '.kvkNNNWWNNNkvk.',
    '.kvkNNWWWWkNkvk.',
    '.kvkNNWWWWkkkvk.',
    '.kvkNhNhNWNNkvk.',
    '.kvkGGhhGGGGkvk.',
    '.kvkkkkkkkkkkvk.',
    '.kvvvvvvvvvvvvk.',
    '.kkkkkkkkkkkkkk.',
    '.kVkbbbNbbbNkVk.',
    '.kVkbNbNbNbNkVk.',
    '.kVkbbbNbbbNkVk.',
    '..kkkkkkkkkkkk..',
  ],
  // a ring with a web, a glowing dream in the middle, feathers and beads below
  dreamcatcher: [
    '.....kkkkkk.....',
    '...kkmmmmmmkk...',
    '..kmmkkkkkkmmk..',
    '.kmmkNBNBNBkmmk.',
    '.kmkNBNNyNBNkmk.',
    '.kmkBNBPPBNBkmk.',
    '.kmkNNPPWPNNkmk.',
    '.kmkBNBPPBNBkmk.',
    '.kmkNBNBNBNNkmk.',
    '..kmmkkkkkkmmk..',
    '...kkmmmmmmkk...',
    '.....kkkkkk.....',
    '...ks..ks..ks...',
    '...kp..kb..kW...',
    '...kk..kk..kk...',
    '................',
  ],
  // a wooden music box with a golden star and a crank, a note above
  lullaby: [
    '.........kk.....',
    '.........kYk....',
    '.........kYkkk..',
    '.....kkk..kkYk..',
    '..kkkkkkkkkk.k..',
    '.kssssssssssk...',
    '.ksmsmsmsmsmk...',
    'kkkkkkkkkkkkkkk.',
    'khhhhhhhhhhhhhhk',
    'khkkkkkkkkkkhykk',
    'khkHHHyHHHHkhkyk',
    'khkHHyYyHHHkhykk',
    'khkHHHyHHHHkhhhk',
    'khkkkkkkkkkkhhhk',
    'kHHHHHHHHHHHHHHk',
    'kkkkkkkkkkkkkkkk',
  ],
  // a black cauldron over a flame: purple brew, yellow eyes in it, vapour
  nightmare: [
    '....g...g...kk..',
    '...g...g...khk..',
    '....g...g..khk..',
    '.kkkkkkkkkkkhkk.',
    'kdddddddddddhddk',
    'kdUuuuuuuuuuuUdk',
    'kdukkyuuuyuukudk',
    'kdUuuuuuuuuuuUdk',
    '.kkkkkkkkkkkkkk.',
    '.kDDDDDDDDDDDDk.',
    '.kDddDDDDDDDDDk.',
    '.kDDDDDDDDDDDDk.',
    '..kDDDDDDDDDDk..',
    '..kkkeooooekkk..',
    '..kk.eoyyoe.kk..',
    '.....kkkkkk.....',
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
