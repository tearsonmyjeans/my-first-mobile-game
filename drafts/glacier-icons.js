// Черновик иконок карт ледников 16×16 (цех 7, альтернатива голубям). Не вставлен в игру.
// '.' прозрачный. node drafts/glacier-icons.js печатает строки для ICON_DRAW в стиле игры (r(x, y, w, h, цвет)).
const PAL = { k: 'K', S: '#9aa3ad', s: '#c9d0d6', w: '#e9eef2', y: '#f2c94c', i: '#dff3fb', b: '#9fd3ee', B: '#5a9cc4', h: '#a8693a', t: '#8a5a32',
  W: '#f4f4f4', d: '#1f3d66', D: '#3f6e9c', c: '#cfe6f2', r: '#d64545', f: '#8fb6ec', F: '#5b8fd6', e: '#eef6fb', E: '#a9cde0', n: '#2a3d63', o: '#e0a040' };

const ICONS = {
  // a circular saw cutting a block of ice
  icesaw: [
    '.....kkkkkk.....',
    '....kSssssSk....',
    '...kSsswwssSk...',
    '..kSswwkkwwsSk..',
    '..kSswkSSkwsSk..',
    '..kSswwkkwwsSk..',
    '...kSsswwssSk...',
    '.kkkkSssssSkkkk.',
    '.kiibkkkkkkbbbk.',
    '.kiibbbBBbbbbbk.',
    '.kibbbbBBbbbEbk.',
    '.kibbbbBBbbbbbk.',
    '.kbbbbbBBbbEbbk.',
    '.kkkkkkkkkkkkkk.',
    '.khhhhhhhhhhhhk.',
    'kkkkkkkkkkkkkkkk',
  ],
  // an ice hole, a rod, the float bobs, a fish jumps out
  icehole: [
    '.............t..',
    '............tW..',
    '.kk........t.W..',
    'kffk......t..W..',
    'kfFfk....t...W..',
    '.kfk....t....W..',
    'kk.....t.....W..',
    '......t......W..',
    '.....t.......W..',
    '....t...kkkkkkk.',
    '...t..kkcccckrkk',
    '..kt.kcddddkWkck',
    '.krk.kcdDdddddck',
    '..k..kccddddddck',
    '......kkcccccckk',
    '........kkkkkk..',
  ],
  // an igloo of snow bricks with a warm doorway
  igloo: [
    '................',
    '.....kkkkkk.....',
    '....keeeeeeWk...',
    '...keeEeeeEeek..',
    '..kEEEEEEEEEEEk.',
    '..keeEeeeEeeeek.',
    '.keeeeEeeeEeeeek',
    '.kEEEEEEEEEEEEEk',
    '.keEeekkkkkeEeek',
    'keeeeknnnnnkeeek',
    'kEEEknnnnnnnkEEk',
    'keEekDnnoonnkEek',
    'keeekDnooonnkeek',
    'kEEEknnnnnnnkEEk',
    'keeeknnnnnnnkeek',
    'kkkkkkkkkkkkkkkk',
  ],
};

if (require.main === module) for (const [name, rows] of Object.entries(ICONS)) {
  const out = [];
  rows.forEach((row, y) => {
    for (let x = 0; x < 16;) {
      const ch = row[x] || '.';
      if (ch === '.') { x++; continue; }
      let w = 1; while (row[x + w] === ch) w++;
      const col = PAL[ch]; out.push(`r(${x}, ${y}, ${w}, 1, ${col === 'K' ? 'K' : `'${col}'`});`);
      x += w;
    }
  });
  console.log(`    ${name}: r => { ${out.join(' ')} },`);
}
module.exports = { PAL, ICONS };
