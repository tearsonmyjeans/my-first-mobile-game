# Спрайты для плана (согласованы, ещё не в игре)

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
