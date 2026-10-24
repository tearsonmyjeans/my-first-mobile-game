# Спрайты и дизайн для плана (согласованы, ещё не в игре)

Строки без сжатия: каждый символ — цвет из `PAL`, `.` прозрачный. При вставке в игру сжать в RLE, как остальные спрайты.

## Новые цвета `PAL`

| Символ | Цвет | Где |
|---|---|---|
| `?` | `#8fd3f0` | Тот: голова ибиса |
| `_` | `#4f9fd6` | Тот: тень на голове |
| `` ` `` | `#d99a62` | Тот: кожа |
| `'` | `#b0743f` | Тот: тень кожи, мышцы |

## Ворона (новая, заменяет `GIRL`)

Чёрные волосы волчьим хвостом с чёлкой, хвостик справа, пирсинг в носу. Оливковый жилет нараспашку, чёрный купальный верх, открытый живот, тактический ремень, чёрные рваные колготки, оливковый подсумок на левом бедре, чёрные ботинки. Ширина 22 из-за хвостика.

```
......kkkkkkkk........
....kkhhhhhhhhkk......
...khhhhhhhhhhhhk.....
..khhhhhhhhhhhhhhkk...
..khhhhhhhhhhhhhhkhhk.
.khhhhhhhhhhhhhhhhkkhk
.khhhhhhhhhhhhhhhhkhhk
.khhhhhhhhhhhhhhhhkhhk
.khhhhhhhhhhhhhhhhkhhk
.khhhhshhhhshhhhshkhhk
.khssskksssskkssshkhk.
.khssswesssswessshkhk.
.khssseesssseessshkhk.
.khscsssspssssscshkhk.
.khsssssmmssssssshkk..
..kssssssssssssssk....
....kkkksssskkkk......
..koooossssssooook..
.ksoooOsbssbsOooosk.
.ksoookbbbbbbkooosk.
.ksoooOsbbbbsOooosk.
.ksoooOssssssOooosk.
.ksoooOssssssOooosk.
.ksOOOOOOqqOOOOOOsk.
.kVVVbbbbbbbbbbVVVk.
..kVssVVbbbbVVssVk..
..kOoOVVVkkVVssVVk..
..kOOOVsskkssVVVVk..
...kOOOVskkVVssVk...
...kVssVVkkVVVsVk...
..kbbbbbbkkbbbbbbk..
..kkkkkkk..kkkkkkk..
```

## Тот (новый сотрудник)

```
.........kkkkkk........
.......kk??????kk......
......k??????????kk....
.....k???????????@#k...
.....k??????????@#@#k..
....k??????????@#@#@#k.
....k??kw??????@#@#@#k.
....k??kk?????_@#@#@#k.
...kk????????_@#@#@#@k.
.kkgg????????_@#@#@#@k.
kgaggk??????_@#@#@#@#k.
kggkkk?????_@#@#@#@#@k.
kgk...k????_@#@#@#@#@k.
kgk...k???__@#@#@#@#@k.
kgk....k?__@#@#@#@#@#k.
kk....kZZXZXZXZXZ#@#@k.
...kkkk`ZXZXZXZXZX`kkk.
..k```k``ZZZZZZZZ``k``k
..k```k```'```'```k``k.
.k````k````'''````k```k
kZXZ``k```'```'```k```k
kfffkk`k``'''''``k``k..
kfXfk``k```'`'```k``k..
kfffk``kwwwwwwwwwk`k...
kfXfkkkkwwwwZwwwwkk....
kfffk..kwwwDwDwwwk.....
kZXZk..kwwwDkDwwwk.....
.kkk...k```k.k```k.....
.......k```k.k```k.....
.......k``'k.k``'k.....
......kXXXXk.kXXXXk....
......kkkkkk.kkkkkk....
```

## Кастомка в скилле

Новый спрайт не нужен: на время скилла белые оттенки `W`, `D`, `^` подменяются по выпавшему эффекту.

| Эффект | `W` | `D` | `^` |
|---|---|---|---|
| сила | `#e8574a` | `#b8363a` | `#8a2a30` |
| скорость | `#7fd0f0` | `#4a9ac8` | `#2f6e9a` |
| цена | `#f7c948` | `#d9971f` | `#a86a1a` |


## Цех 5: пуфики (дизайн согласован)

По фото школьного класса: голубые крашеные стены с тёмной полосой внизу, окна с голубыми вертикальными жалюзи и белыми батареями, вывеска цеха — зелёная школьная доска в серой раме, пол — паркет со звёздами (светлые полосы складываются в восьмиугольники, на стыках тёмные деревянные звёзды). Слева на полу чёрный кресло-мешок, справа школьная парта. Места под станки — светлое дерево в тёмной раме.

Код из превью (вставлять в `drawWorld()` и `machine()`):

```js
// LOCS
    { name: 'Пуфики', sign: 'ЦЕХ 5 · ПУФИКИ', cost: 300000000, wall: '#6aa2dc', mortar: '#5a90cc', floor: '#94643a', grid: '#94643a', plate: '#a8763f', item: '#f08cb4',
      glass: '#cfe8f2', board: '#2f5e46', boardHi: '#3f7a5a', goods: 'poufs', unit: 'Пуфики', unit1: 'Цена пуфика',
      desc: 'Пятая ветка завода.', opened: 'Цех пуфиков открыт!' }
// LAYOUTS: [[0, 0], [1, 0]]

// стена, ветка l === 4 рядом с другими цехами
    else if (l === 4) {
      // classroom: light blue paint, a darker painted band below
      R(0, 0, W, 3, '#8cbcea'); R(0, 19, W, 9, '#4f86c4'); R(0, 19, W, 1, '#3f6fa8');
    }

// жалюзи, батареи и рама доски, перед рисованием вывески
    if (l === 4) for (const wx of [14, W - 54]) {
      R(wx, 3, 40, 2, '#c9d0d6'); for (let i = 0; i < 10; i++) { R(wx + 1 + i * 4, 5, 3, 15, '#a8dcf4'); R(wx + 4 + i * 4, 5, 1, 15, '#6fb4dc'); }
      R(wx + 4, 21, 32, 7, K); R(wx + 5, 22, 30, 5, '#e9eef2'); for (let i = 0; i < 7; i++) R(wx + 7 + i * 4, 22, 1, 5, '#b8c0c8');
    }
    if (l === 4) R(W / 2 - 46, 3, 92, 19, '#b8c0c8');

// паркет, кресло-мешок и парта, после сетки пола
    if (l === 4) {
      // star parquet: light strips make octagons, dark wooden stars sit where they meet
      const TS = 24, LS = '#d9bc84', LD = '#bf9f68';
      for (let ty = 31; ty < FL; ty += TS) for (let tx = -12; tx < W; tx += TS) {
        R(tx + 3, ty + 3, 9, 9, '#a3713f'); R(tx + 12, ty + 12, 9, 9, '#a3713f'); R(tx + 12, ty + 3, 9, 9, '#8a5a30'); R(tx + 3, ty + 12, 9, 9, '#8a5a30');
        R(tx + 7, ty + 1, 10, 2, LS); R(tx + 7, ty + 21, 10, 2, LD); R(tx + 1, ty + 7, 2, 10, LS); R(tx + 21, ty + 7, 2, 10, LD);
        for (let k = 0; k < 5; k++) { R(tx + 16 + k, ty + 2 + k, 2, 2, LS); R(tx + 21 - k, ty + 16 + k, 2, 2, LD); R(tx + 2 + k, ty + 16 + k, 2, 2, LD); R(tx + 7 - k, ty + 2 + k, 2, 2, LS); }
        const cx = tx + TS, cy = ty + TS; R(cx - 2, cy - 2, 4, 4, '#5a3420'); R(cx - 1, cy - 4, 2, 8, '#5a3420'); R(cx - 4, cy - 1, 8, 2, '#5a3420');
      }
      R(0, FL - 1, W, 1, '#5a3420');
      // a black bean bag and a school desk
      const ell = (cx, cy, rx, ry, col) => { for (let dy = -ry; dy <= ry; dy++) { const w = Math.round(rx * Math.sqrt(1 - (dy / ry) ** 2)); R(cx - w, cy + dy, w * 2 + 1, 1, col); } };
      const bx = 4, by = FL - 26; R(bx + 2, by + 22, 28, 2, 'rgba(30,20,40,.3)');
      ell(bx + 15, by + 15, 14, 8, K); ell(bx + 12, by + 8, 9, 7, K); ell(bx + 15, by + 15, 13, 7, '#3a3a44'); ell(bx + 12, by + 8, 8, 6, '#3a3a44');
      ell(bx + 10, by + 6, 4, 3, '#4c4c58'); R(bx + 6, by + 13, 12, 1, '#2a2a32'); R(bx + 18, by + 9, 1, 5, '#2a2a32'); R(bx + 21, by + 15, 6, 1, '#2a2a32'); R(bx + 4, by + 17, 5, 1, '#4c4c58');
      const dx = W - 36, dy = FL - 34; R(dx + 2, dy + 28, 28, 2, 'rgba(30,20,40,.3)'); R(dx, dy, 30, 5, K); R(dx + 1, dy + 1, 28, 3, '#d9a66a'); R(dx + 1, dy + 1, 28, 1, '#ecc48f'); R(dx + 6, dy + 5, 18, 5, K); R(dx + 7, dy + 5, 16, 4, '#c98a52');
      R(dx + 3, dy + 5, 2, 22, '#c9d0d6'); R(dx + 25, dy + 5, 2, 22, '#c9d0d6'); R(dx + 1, dy + 26, 6, 2, '#9aa3ad'); R(dx + 23, dy + 26, 6, 2, '#9aa3ad');
    }

// станки, в machine()
    } else if (type === 'sew') {
      R(x + 1, y + 20, 30, 4, K); R(x + 2, y + 21, 28, 2, '#a8693a'); R(x + 2, y + 21, 28, 1, '#c98a52');
      R(x + 3, y + 24, 3, 6, K); R(x + 26, y + 24, 3, 6, K);
      const off = Math.floor(t * 6) % 4;
      R(x + 3, y + 18, 16, 3, K); R(x + 4, y + 19, 14, 1, '#f08cb4'); for (let i = 0; i < 4; i++) R(x + 4 + (i * 4 + off) % 14, y + 19, 2, 1, '#fff1f6');
      R(x + 6, y + 15, 22, 4, K); R(x + 7, y + 16, 20, 2, '#7fc8b4');
      R(x + 20, y + 4, 8, 12, K); R(x + 21, y + 5, 6, 11, '#7fc8b4');
      R(x + 5, y + 3, 23, 6, K); R(x + 6, y + 4, 21, 4, '#7fc8b4'); R(x + 6, y + 4, 21, 1, '#b8eedd'); R(x + 12, y + 6, 7, 1, '#f2c14e');
      R(x + 5, y + 8, 6, 5, K); R(x + 6, y + 8, 4, 4, '#7fc8b4');
      const ny = Math.floor(t * 10) % 2; R(x + 8, y + 12, 1, 4 + ny, '#e9eef2');
      disc(x + 28, y + 9, 3, K); disc(x + 28, y + 9, 2, '#c9d0d6'); R(x + 28 + (Math.floor(t * 6) % 2), y + 8, 1, 1, K);
      R(x + 14, y, 4, 4, K); R(x + 15, y + 1, 2, 2, '#ff6fa8'); R(x + 16, y + 3, 1, 1, '#ff6fa8');
      for (let k = 0; k < 6; k++) R(x + 9 + k, y + 2 + Math.round(k * 0.3), 1, 1, '#ff6fa8');
    } else if (type === 'stuff') {
      R(x + 3, y + 23, 26, 7, K); R(x + 4, y + 24, 24, 5, '#9b6bd6'); R(x + 4, y + 24, 24, 1, '#c09af0');
      for (let i = 0; i < 3; i++) R(x + 7 + i * 8, y + 26, 3, 2, '#7a4fb3');
      R(x + 6, y + 3, 20, 8, K); R(x + 7, y + 4, 18, 6, '#c9d0d6'); R(x + 7, y + 4, 18, 1, '#e9eef2');
      R(x + 9, y + 9, 14, 3, K); R(x + 10, y + 10, 12, 1, '#9aa3ad');
      for (const [cx, cy, r] of [[11, 3, 3], [17, 2, 3], [22, 3, 2]]) { const b = Math.round(Math.sin(t * 3 + cx) * 0.6); disc(x + cx, y + cy + b, r + 1, K); disc(x + cx, y + cy + b, r, '#ffffff'); }
      R(x + 14, y + 12, 4, 3, K); R(x + 15, y + 12, 2, 3, '#9aa3ad');
      const rr = 3 + Math.floor(((t * 0.6) % 1) * 4), cy = y + 22 - rr;
      disc(x + 16, cy, rr + 1, K); disc(x + 16, cy, rr, '#f08cb4'); R(x + 14, cy - rr + 1, 2, 1, '#ffd0e4'); R(x + 16, cy - 1, 1, 1, '#c94f7c');
      R(x + 26, y + 12, 5, 9, K); R(x + 27, y + 13, 3, 7, '#f2c14e'); R(x + 28, y + 14, 1, 1, Math.floor(t * 3) % 2 ? '#7ee081' : '#3d7a4a');
```

При вставке: в `globals()` у `locX` пятый элемент, в `newRun()` пятый цех `emptySlots(2)`, вкладка `tab4`. В `layout()` `OX` надо считать до раннего выхода: у пуфиков ширина и высота пола те же, что у цеха досок, и без этого места прижимаются влево. Рама места для `l === 4` цвета `#5a3420`.


## Главная мразь цеха

Худи `A` с бликами `a` и тенями `g`, лицо — пустота `b`, шнурки капюшона `p`, штаны `G`. Новых цветов не нужно.

```
......kkkkkkkk......
....kkAAAAAAAAkk....
...kAAaAAAAAAaAAk...
..kAAaAAAAAAAAaAAk..
..kAaAAAAAAAAAAaAk..
.kAAaAAkkkkkkAAaAAk.
.kAaAAkbbbbbbkAAaAk.
.kAaAkbbbbbbbbkAaAk.
.kAAAkbbbbbbbbkAAAk.
.kAAkbbbbbbbbbbkAAk.
.kAAkbbbbbbbbbbkAAk.
.kAAkbbbbbbbbbbkAAk.
.kgAkbbbbbbbbbbkAgk.
.kgAAkbbbbbbbbkAAgk.
..kgAAkbbbbbbkAAgk..
..kgAAAkkkkkkAAAgk..
.kgAAAAAAggAAAAAAgk.
.kAAAAApAggApAAAAAk.
kAAAAAApAggApAAAAAAk
kAgAAAApAggApAAAAgAk
kAgAAAAAAggAAAAAAgAk
kAgAkggggggggggkAgAk
kAgAkAAAAggAAAAkAgAk
kAAAkAAAAggAAAAkAAAk
.kggggggggggggggggk.
..kGGGGGGGGGGGGGGk..
..kGGGGGGkkGGGGGGk..
...kGGGGGkkGGGGGk...
...kGGGGGkkGGGGGk...
...kGGGGGkkGGGGGk...
..kbbbbbbkkbbbbbbk..
..kkkkkkk..kkkkkkk..
```
