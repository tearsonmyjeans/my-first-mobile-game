// Черновик иконок карт кондитерской 16×16 (цех 8, альтернатива манге). Не вставлен в игру.
// '.' прозрачный. node drafts/bakery-icons.js печатает строки для ICON_DRAW в стиле игры (r(x, y, w, h, цвет)).
const PAL = { k: 'K', p: '#f29ab5', P: '#f8c2d3', d: '#d7739a', m: '#e8789a', s: '#c9d0d6', S: '#9aa3ad', w: '#e9eef2', W: '#ffffff', c: '#fff6ea',
  g: '#9fd8c4', G: '#7cc2ac', o: '#f2a64a', e: '#e0533a', t: '#e8c07a', T: '#c98f4a', r: '#d64545', R: '#c8553f', y: '#f2c94c', b: '#8a4a2a', n: '#3a3346' };

const ICONS = {
  // the pink stand mixer over a bowl of cream
  beater: [
    '..kkkkkkkkkkkk..',
    '.kPPPPPPPPPPPpk.',
    '.kppppppppppkWk.',
    '.kddddddddddpkk.',
    '..kkkkSkkkkkppk.',
    '.....kSk...kppk.',
    '..kkWkSkWk.kppk.',
    '.kWcWWcWWcWkppk.',
    'kwkcWWWWWcwkPpk.',
    'kwssssssssskppk.',
    'kwssssssssskppk.',
    '.kwsssssssSkppk.',
    '..kkkkkkkkkkppk.',
    'kkkkkkkkkkkkkkkk',
    'kmmmmmmmmmmmmmmk',
    'kkkkkkkkkkkkkkkk',
  ],
  // the mint oven: dials, a glowing window with cupcakes
  oven: [
    '.kkkkkkkkkkkkkk.',
    '.kgggggggggggGk.',
    '.kgkcgkcgkcgeGk.',
    '.kkkkkkkkkkkkkk.',
    '.kgGGGGGGGGGGGk.',
    '.kGkkkkkkkkkkGk.',
    '.kGkoootttookGk.',
    '.kGkottTtTtokGk.',
    '.kGkoTTTTTTokGk.',
    '.kGkeeeeeeeekGk.',
    '.kGkkkkkkkkkkGk.',
    '.kGGkwwwwwwkGGk.',
    '.kGGGGGGGGGGGGk.',
    '.kkkkkkkkkkkkkk.',
    '..kk........kk..',
    '................',
  ],
  // the cake display: a pink cake with a cherry under glass on a pink base
  cakecase: [
    '.......kk.......',
    '......krrk......',
    '..kkkkkkkkkkkk..',
    '.kwwwwwwwwwwwwk.',
    '.kwkkkkkkkkkwWk.',
    '.kwkWWWWWWWkwwk.',
    '.kwkPPPPPPPkwwk.',
    '.kwkcccccccWwwk.',
    '.kwkmmmmmmmkwwk.',
    '.kssssssssssssk.',
    '.kpppppppppppdk.',
    '.kpWpWpWpWpWpdk.',
    '.kppppkkkkpppdk.',
    '.kppppkcckpppdk.',
    '.kddddkkkkddddk.',
    '.kkkkkkkkkkkkkk.',
  ],
  // the hot dog stand: sausages on the roller grill, a red and mustard striped cart
  hotgrill: [
    '................',
    '.kkkkkkkkkkkkkk.',
    '.kWwwwwwwwwwwwk.',
    '.kkkkkkkkkkkkkk.',
    '.kSSSSSSSSSSSSk.',
    '.kSRRRRSSRRRRSk.',
    '.kSSSSSSSSSSSSk.',
    '.kSSRRRRSSRRRRk.',
    '.kSSSSSSSSSSSSk.',
    'kkkkkkkkkkkkkkkk',
    'kwwwwwwwwwwwwwwk',
    'krrrrrrrrrrrrrrk',
    'kyyyyyyyyyyyyyyk',
    'kssssssssssssssk',
    'kkkkkkkkkkkkkkkk',
    '..knk......knk..',
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
      const col = PAL[ch]; out.push(`r(${x}, ${y}, ${w}, 1, ${col === 'K' ? 'K' : `'${col}'`});`);
      x += w;
    }
  });
  if (require.main === module) console.log(`    ${name}: r => { ${out.join(' ')} },`);
}
module.exports = { PAL, ICONS };
