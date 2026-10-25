// Черновик новых сотрудников: спрайты. В игру ещё не вставлено, статы, перки и скиллы не выбраны.
// Список: Сквонч, Канеки, Макаронный монстр, Подсолнух ГВ2, Живой плющ/мухобойка, Медаедь.
// Спрайты 23×32 (как у остальных), RLE как в game/index.html.
// Статус: Канеки и Сквонч нарисованы, ждут одобрения (превью drafts/kaneki-preview.png, drafts/squanch-preview.png).

// ===== Канеки: обычный (официант Антейку, повязка) и гуль на время скилла (белые волосы, маска, красные кагуне), как Сильвер → WOLF =====
  const KANEKI = ['7.8k8.', '5.2k8h2k6.', '4.k12hk5.', '3.k3h3=8hk4.', '2.k2h2=7h2=3hk3.', '2.k16hk3.', '2.k16hk3.', '2.k3hs6hs5hk3.', '2.k2h2s2hs2h2s2hs2hk3.', '2.kh2s4k2sD4WDhk3.', '2.khskWAWA2sWDWD3Wk3.', '2.khskWAGA2s5Wshk3.', '2.kh2s4k2sWDWDWshk3.', '2.khsc6sD3WDchk3.', '2.kh6s2m6shk3.', '3.2k12s2k4.', '5.4k4s4k6.', '2.k3W2g2W2%2W2g3Wk3.', '2.kDWk2g2Wm%2W2gkWDk3.', '2.kDWk3gW2mW3gkWDk3.', '2.kDWk4gm%4gkWDk3.', '2.kDWk4g%m4gkWDk3.', '2.kDWk4gGk4gkWDk3.', '2.kDWk4gG5gkWDk3.', '2.kDWk4gGk4gkWDk3.', '2.k2sk10Gk2sk3.', '2.k2sk10bk2sk3.', '5.k4b2k4bk6.', '5.k4b2k4bk6.', '5.kbN2b2k2bNbk6.', '4.k5B2k5Bk5.', '4.6k2.6k5.'];
  const KANEKI_GHOUL = ['7.8k3.k4.', '5.2k8W2k2.<k2.', '4.k12Wk2.$k.', '3.k3W3p7Wk2.$%k', '2.k2W2p7W2p3Wk<$k', '2.k5WD7WD2Wk$%k', '2.kWD6WD7Wk<$k', 'k.k3WD3WD2WD3WDWk$%k', '%.kWDsD2WsWD2s2WsDWk<$k', '%.kW6b2s4k2sWk$%k', '$.kW6b2sb<$b2sWk<$k', '%.kW6b2sb$<b2sWk$%k', '<$kW14bWk<$k', '$%kW2bWDWDWDWDWD2bWk.$%', '<$kW2bWDWDWDWDWD2bWk.<$', '$%.2k12b2k2.$%', '<$3.4k4s4k4.<$', '$%k3bN8bN3bk.$%', '<$k2bk10bk2bk.<$', '$%k2sk10bk2sk.$%', '$.ksSk10bkSsk.<$', '%.ksSk4bN5bkSsk.$%', '$.ksSk10bkSsk.<$', '%.ksSkbN6bNbkSsk.$%', '$.k2skbk2bk2bk2bk2sk3.', '2.2kbk10xkb2k3.', '2.k2sk10xk2sk3.', '3.$%k4x2k4xk$%4.', '2.<$2kDxDx2kxDxD2k<$3.', '.$%k.k2sSs2ksS2sk.k$%2.', '<$k.k5s2k5sk.k<$.', 'k3.kbsbsk2.ksbsbk4.k'];

// ===== Сквонч: работник с бумажным пакетом и голым хвостом. Скилл «Пьяный уже не мастер» =====
  const SQUANCH = ['.k10.k2.k4.k2.', '.2k8.kZ2kZk2.2k2.', '.kQk6.kZQZQZk.kQk2.', '.k2Qk.2kQZ3QZ2k.k2Qk2.', '.kQi14QiQk2.', '.kQ2i12Q2iQk2.', '2.k16Qk3.', '2.k2Q4k4Q4k2Qk3.', '2.kQk4yk2Qk4ykQk3.', '2.kQkyk2yk2Qk2ykykQk3.', '2.kQk4yk2Qk4ykQk3.', '2.k2Q4kQ2_Q4k2Qk3.', '2.kX2Q10x2QXk3.', '2.kXQxkWk4WkWkxQXk3.', '3.kQxk8rkxQk4.', '4.kxkW6kWkxk5.', '5.2k3x2X3x2k6.', '2.k5.kX4QXk7.', '.kCk3.k2Q4x2Qk6.', "kC'Ck.k3Q5x2Qk5.", "kC2'C2kQkQ5xQkQk4.", "kC2'CkQk.kQ3xQk.kQk3.", "kC2'CQk2.kQ3xQk2.kQk2.", "k2C'Ck3.k2Qx2Qk2.kXk2.", '.k2Ck4.k5QkIk5.', '2.2k4.k2Q3k2QkIk4.', '8.kQk3.kQk.kik2.', '8.kQk3.kQk2.kIk.', '8.kQk3.kQk3.kik', '7.k2Qk3.k2Qk.kQXk', '6.kQkQk2.kQkQk2.2k.', '6.5k2.5k5.'];
  // сидит за столиком в пиццерии вместо кота, 26 в ширину
  const SQUANCH_SIT = ['.k10.k2.k4.k5.', '.2k8.kZ2kZk2.2k5.', '.kQk6.kZQZQZk.kQk5.', '.k2Qk.2kQZ3QZ2k.k2Qk5.', '.kQi14QiQk5.', '.kQ2i12Q2iQk5.', '2.k16Qk6.', '2.k2Q4k4Q4k2Qk6.', '2.kQk4yk2Qk4ykQk6.', '2.kQkyk2yk2Qk2ykykQk6.', '2.kQk4yk2Qk4ykQk2.2k2.', '2.k2Q4kQ2_Q4k2Qk.k2:k.', '2.kX2Q10x2QXk.k2Ck.', "2.kXQxkWk4WkWkxQX2kC2'Ck", "3.kQxk8rkxQk.kC2'Ck", "4.kxkW6kWkxk2.kC2'Ck", "5.2k3x2X3x2k3.kC2'Ck", "8.kX4QX3k2.kC2'Ck", "7.k2Q4x5Q2k2C'Ck", '6.k2Q6xQ4k.k2Ck.', '6.kQ7xQk5.2k2.', '6.kQ7xQk9.', '6.k2Q5x2Qk9.', '5.k11Qk8.', '5.k3Q5k3Qk8.', '6.kQk4.kQk10.', '6.kQk4.kQk10.', '6.kQk4.kQk10.', '6.kQk4.kQk10.', '6.kQk4.kQk10.', '6.kQk4.kQk10.', '6.kQk4.kQk10.', '5.k2Qk3.k2Qk10.', '4.kQkQk3.kQkQk9.', '4.5k3.5k9.', '26.'];

// ===== drafts/workshops-6-7.js, сцена пиццы: заменяет блок кота (от "// the cat:" до "// flour sacks") =====
// Пока карта Сквонча не взята, он сидит за столиком; когда он на заводе, стул пустой.
// SQUANCH_SIT рисуется по пикселям, PAL из игры.
      // Squanchy sits on a bar stool, drags the slice with one paw and holds his paper bag with the other; once hired he leaves the stool
      const pull = (Math.sin(t * 1.4) + 1) / 2, kx = qx + 74 + Math.round(pull * 2), ky = qy + 6;
      R(qx + 62, qy + 18, 24, 4, K); R(qx + 63, qy + 19, 22, 2, '#a8693a'); R(qx + 65, qy + 22, 2, 30, K); R(qx + 80, qy + 22, 2, 30, K); R(qx + 66, qy + 40, 15, 2, K);
      if (!state.workers.squanch.unlocked) {
        const x0 = kx - 10, y0 = qy - 7, tl = Math.sin(t * 2.2);
        // pink rat tail with rings and an orange tuft, swishes behind the stool
        const tail = k => [x0 + 15 + k, y0 + 22 + Math.round(k * 1.3) + Math.round(Math.sin(k / 3 + tl) * 2)];
        for (let k = 0; k < 10; k++) { const [tx, ty] = tail(k); R(tx - 1, ty - 1, 4, 4, K); }
        for (let k = 0; k < 10; k++) { const [tx, ty] = tail(k); R(tx, ty, 2, 2, k % 3 ? '#ecd3d0' : '#d9aeb0'); }
        const [ex, ey] = tail(10); R(ex - 1, ey - 2, 5, 6, K); R(ex, ey - 1, 3, 4, '#e0a040'); R(ex, ey + 1, 3, 2, '#d9971f'); R(ex + 3, ey - 3, 1, 2, K);
        SQUANCH_SIT.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') R(x0 + i, y0 + j, 1, 1, PAL[ch]); }));
        // paw holding the slice, cheese strings back to the plate
        const sx2 = kx - 18 + Math.round(pull * 2), sy2 = ky + 4;
        R(qx + 44, sy2 + 3, sx2 - qx - 44, 1, '#f7e08a'); if (pull > 0.4) R(qx + 45, sy2 + 5, sx2 - qx - 47, 1, '#f7e08a');
        R(sx2, sy2, 9, 6, K); R(sx2 + 1, sy2 + 1, 7, 4, '#f7d36a'); R(sx2 + 1, sy2 + 1, 7, 1, '#e5a65a'); R(sx2 + 3, sy2 + 2, 2, 2, '#b8322a'); R(sx2 + 6, sy2 + 3, 1, 1, '#57b04f');
        R(sx2 + 7, sy2 + 1, x0 + 7 - sx2 - 7, 4, K); R(sx2 + 7, sy2 + 2, x0 + 7 - sx2 - 8, 2, '#e0a040'); R(sx2 + 7, sy2 + 2, 2, 2, '#d9971f');
      }
