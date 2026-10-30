# Черновик спрайтов кондитерской (цех 8, альтернатива манге). Не вставлен в игру.
# Сетка 16×16, '.' прозрачный. python3 drafts/bakery-sprites.py out.png рисует иконки и две раскладки цеха.
from PIL import Image, ImageDraw

PAL = {'k': '#1d1629', 'w': '#f4efe6', 'W': '#ffffff', 's': '#c9d0d6', 'S': '#9aa3ad', 'p': '#f2a7c3', 'P': '#d96a9a',
       'b': '#8a5a32', 'B': '#5a3a1f', 'y': '#f2c94c', 'o': '#e0a040', 'r': '#d64545', 'R': '#a83232', 'g': '#5fa84a',
       'f': '#f08a30', 't': '#e8c07a', 'T': '#c98f4a', 'c': '#fff3c4', 'n': '#6a4024'}

SPRITES = {
    # миксер: головка с венчиком над миской теста
    'mixer': [
        '................',
        '..kkkkkkkk......',
        '.kSsssssSSk.....',
        '.kSsssssSSkk....',
        '.kkkkkSSkkSSk...',
        '.....kSSk.kSk...',
        '....kkSSkkkSk...',
        '...kkwwSSwwkk...',
        '..kwwwkSSkwwwk..',
        '..kwcwwwwwwcwk..',
        '..kwwwwwwwwwwk..',
        '...kwwcwwwwwk...',
        '...kkwwwwwwkk...',
        '....kkkkkkkk....',
        '...kSSSSSSSSk...',
        '...kkkkkkkkkk...',
    ],
    # духовка: дверца с окошком, внутри румяный пирожок
    'oven': [
        '................',
        '.kkkkkkkkkkkkk..',
        '.kSsssssssssSk..',
        '.kSkyokrokkkSk..',
        '.kSkkkkkkkkkSk..',
        '.kSkkffffffkSk..',
        '.kSkfyyffyfkSk..',
        '.kSkkTtttTkkSk..',
        '.kSkkTttttTkSk..',
        '.kSkkkkkkkkkSk..',
        '.kSssssssssSSk..',
        '.kkkkkkkkkkkkk..',
        '..kk........kk..',
        '..kSk......kSk..',
        '..kkk......kkk..',
        '................',
    ],
    # витрина тортов: розовый торт с вишней под стеклом
    'cakecase': [
        '................',
        '.......kk.......',
        '......krrk......',
        '.....kkrkkk.....',
        '....kwwwwwwk....',
        '....kppPppPk....',
        '...kwwwwwwwwk...',
        '...kpPppPppPk...',
        '..kkkkkkkkkkkk..',
        '.kWWsssssssssWk.',
        '.kWk.kppPpk.kWk.',
        '.kWk.kwwwwk.kWk.',
        '.kWWsssssssssWk.',
        '.kbbbbbbbbbbbbk.',
        '.kkkkkkkkkkkkkk.',
        '................',
    ],
    # гриль хотдогов: сосиска в булке над огнём
    'hotgrill': [
        '................',
        '...kkkkkkkkkk...',
        '..kttttttttttk..',
        '.kTtkrrrrrrktTk.',
        '.kTkrRrRrRrrkTk.',
        '.kTkRrrrrrrRkTk.',
        '..kkkttttttkk...',
        '...kkkkkkkkk....',
        '.kkkkkkkkkkkkk..',
        '.kSSSSSSSSSSSk..',
        '.kskSkSkSkSkSk..',
        '.kSSSSSSSSSSSk..',
        '.kkkkkkkkkkkkk..',
        '..kfyfkfyfkfyk..',
        '..kkfkkkfkkkfk..',
        '................',
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

def layout(variant, size=(420, 300)):
    # variant 'cake': широкое место сверху, два места под ним; 'hot': два места сверху, широкое снизу (как в наброске)
    im = Image.new('RGBA', size, (30, 24, 40, 255))
    d = ImageDraw.Draw(im)
    W, H = size
    wide_h, cell_h, gap = 96, 96, 14
    pad = 20
    wide = (pad, pad, W - pad, pad + wide_h)
    cells = [(pad, pad + wide_h + gap, W // 2 - gap // 2, pad + wide_h + gap + cell_h),
             (W // 2 + gap // 2, pad + wide_h + gap, W - pad, pad + wide_h + gap + cell_h)]
    if variant == 'hot':
        cells = [(a, H - b_, c, H - b) for a, b, c, d_ in cells for b_, b in [(d_ + 0, b)]]
        cells = [(c[0], pad, c[2], pad + cell_h) for c in cells]
        wide = (pad, pad + cell_h + gap, W - pad, pad + cell_h + gap + wide_h)
    accent = '#f2a7c3' if variant == 'cake' else '#f2c94c'
    d.rectangle(wide, fill=(60, 44, 70, 255), outline=accent, width=4)
    for c in cells:
        d.rectangle(c, fill=(44, 36, 58, 255), outline='#d64545', width=4)
    big = lambda n: render(SPRITES[n]).resize((64, 64), Image.NEAREST)
    spot = 'cakecase' if variant == 'cake' else 'hotgrill'
    im.alpha_composite(big(spot), ((wide[0] + wide[2]) // 2 - 32, (wide[1] + wide[3]) // 2 - 32))
    im.alpha_composite(big('mixer'), ((cells[0][0] + cells[0][2]) // 2 - 32, (cells[0][1] + cells[0][3]) // 2 - 32))
    im.alpha_composite(big('oven'), ((cells[1][0] + cells[1][2]) // 2 - 32, (cells[1][1] + cells[1][3]) // 2 - 32))
    return im

if __name__ == '__main__':
    import sys
    out = sys.argv[1]
    scale, cell = 6, 96
    sheet = Image.new('RGBA', (900, 16 + cell + 16 + 300 + 16), (236, 232, 244, 255))
    for k, name in enumerate(SPRITES):
        sheet.alpha_composite(render(SPRITES[name]).resize((cell, cell), Image.NEAREST), (16 + k * (cell + 16), 16))
    sheet.alpha_composite(layout('cake'), (16, cell + 32))
    sheet.alpha_composite(layout('hot'), (16 + 420 + 16, cell + 32))
    sheet.save(out)
    print('ok', out)
