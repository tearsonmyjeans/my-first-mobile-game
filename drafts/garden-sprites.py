# Черновик спрайтов ботанического сада (цех 6, альтернатива пиццерии). Не вставлен в игру.
# Сетка 16×16, '.' прозрачный. Символы: k — контур, g/l/d — зелёный светлый/средний/тёмный,
# t — ствол, r — яблоко, p — розовый цветок, y — жёлтый цветок.
from PIL import Image

PAL = {'k': '#1d1629', 'g': '#5fa84a', 'l': '#8fd16a', 'd': '#3f7f3a', 't': '#8a5a32', 'T': '#c9955f',
       'r': '#d64545', 'p': '#f2a7c3', 'P': '#d96a9a', 'R': '#e0533a', 'D': '#a83232', 'y': '#f2c94c', 'L': '#c4ec8c',
       'c': '#6a4024', 'b': '#3f6fd1', 'B': '#5b8fd6', 'w': '#f4efe6', 's': '#c9d0d6', 'S': '#9aa3ad', 'h': '#a8693a'}

SPRITES = {
    # круглое дерево с яблоками
    'tree_apple': [
        '................',
        '.....kkkkkk.....',
        '...kkllgggkk....',
        '..kllgggrgggk...',
        '.kllgrggggggdk..',
        '.kgggggrgggdgk..',
        'kggggggggggddgk.',
        'kgrggggggggdggdk',
        'kggggggggrgdggdk',
        'kgggggggggggdgdk',
        '.kggggrggggggdk.',
        '..kkgggggddgkk..',
        '....kkkttkkk....',
        '.......tt.......',
        '.......tt.......',
        '......kttk......',
    ],
    # пальма в синем горшке
    'palm': [
        '................',
        '....kkkkkkkk....',
        '..kkLlllllllkk..',
        '.kllggkkkkggllk.',
        'kgggkkcttckkgggk',
        'kgdk.kcTtck.kdgk',
        'kdk...kTtk...kdk',
        '.k....kTtk....k.',
        '......ktTk......',
        '.....kTtk.......',
        '.....ktTk.......',
        '....kTtk........',
        '...kkkkkkkk.....',
        '...kBBBBBBk.....',
        '...kbwbwbbk.....',
        '....kkkkkk......',
    ],
    # розовый куст в каменной вазе
    'bush': [
        '................',
        '.....kkkkkk.....',
        '...kkgglllgkk...',
        '..kgRRRgllPPPk..',
        '.kggRDRggPpPgk..',
        '.kggRRRgglPPPgk.',
        'kgPPPggRRRggggdk',
        'kgPpPggRDRgRRRdk',
        'kgPPPdgRRRgRDRdk',
        '.kgdgggddggRRRk.',
        '..kkddgdddgddkk.',
        '...kkkkkkkkkk...',
        '...ksssssssssk..',
        '....kSSSSSSSk...',
        '.....kksssk.....',
        '......kkkkk.....',
    ],
}

def render(rows):
    im = Image.new('RGBA', (16, 16), (0, 0, 0, 0))
    for y, row in enumerate(rows):
        assert len(row) == 16, (y, len(row), row)
        for x, ch in enumerate(row):
            if ch != '.':
                im.putpixel((x, y), tuple(int(PAL[ch][i:i + 2], 16) for i in (1, 3, 5)) + (255,))
    return im

if __name__ == '__main__':
    import sys, os
    out = sys.argv[1]
    scale = 8
    cell = 16 * scale
    sheet = Image.new('RGBA', (cell * len(SPRITES) + 16 * (len(SPRITES) + 1), cell + 32), (236, 232, 244, 255))
    for k, (name, rows) in enumerate(SPRITES.items()):
        big = render(rows).resize((cell, cell), Image.NEAREST)
        sheet.alpha_composite(big, (16 + k * (cell + 16), 16))
    sheet.save(out)
    print('ok', out)
