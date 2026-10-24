// Balance bot: plays whole runs headless through the game's #bot hook and prints pacing stats.
// node tools/balance-bot.js [runs] [unlocks,comma,separated] [BAL overrides as JSON] [workshop costs JSON]
// RATES=1 also prints income at every minute.
const { chromium } = require('playwright');
const RUNS = +process.argv[2] || 8, UNL = process.argv[3] || '', BAL = JSON.parse(process.argv[4] || '{}'), COSTS = JSON.parse(process.argv[5] || 'null');
(async () => {
  const b = await chromium.launch(), p = await b.newPage();
  p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('file://' + require('path').resolve(__dirname, '../game/index.html') + '#bot');
  const res = [];
  for (let r = 0; r < RUNS; r++) {
    res.push(await p.evaluate(([unl, bal, costs]) => {
      const P = window.PF;
      Object.assign(P.BAL, bal); if (costs) costs.forEach((c, l) => { P.LOCS[l].cost = c; });
      P.meta.unlocks = unl ? unl.split(',') : [];
      P.state = P.newRun();
      const clone = o => JSON.parse(JSON.stringify(o));
      const inc = () => P.totalIncome();
      const slotsAll = st => { const out = []; st.locs.forEach((L, l) => { if (L.unlocked) L.slots.forEach((s, i) => out.push({ l, i, s })); }); return out; };
      // move worker w to slot (l,i); whoever stood there goes to w's old place, like in the game
      function moveW(w, l, i) {
        const st = P.state, prev = P.workerPlace(w), s = st.locs[l].slots[i], other = s.worker;
        s.worker = w;
        if (prev && !(prev.l === l && prev.i === i)) st.locs[prev.l].slots[prev.i].worker = other;
      }
      function optimize(rounds) {
        const st = P.state;
        for (let k = 0; k < rounds; k++) {
          let best = inc(), mv = null;
          const ws = Object.keys(st.workers).filter(w => st.workers[w].unlocked && !P.onStrike(w));
          for (const w of ws) for (const { l, i, s } of slotsAll(st)) {
            if (!s.machine || s.machine === 'belt' || s.worker === w) continue;
            const snap = JSON.stringify(st.locs);
            moveW(w, l, i);
            const v = inc();
            if (v > best * 1.001) { best = v; mv = [w, l, i]; }
            st.locs = JSON.parse(snap);
          }
          if (!mv) return;
          moveW(...mv);
        }
      }
      function targets(id) {
        const cd = P.CARDS[id], st = P.state, cl = cd.type === 'machine' ? P.MACH[cd.machine].loc : (cd.loc ?? -1);
        if (cd.type === 'machine') return slotsAll(st).filter(({ l, s }) => !s.machine && (cl < 0 || cl === l) && !(cd.machine === 'belt' && st.locs[l].slots.some(z => z.machine === 'belt'))).map(({ l, i }) => ({ l, i }));
        if (cd.type === 'mupg') return slotsAll(st).filter(({ l, s }) => s.machine && s.machine !== 'belt' && (cl < 0 || cl === l)).map(({ l, i }) => ({ l, i }));
        if (cd.type === 'equip') return Object.keys(st.workers).filter(w => st.workers[w].unlocked);
        return [undefined];
      }
      function pickOffer() {
        const offer = P.state.offers[0], orig = P.state;
        let best = -1, choice = null;
        for (const id of offer.ids) for (const tg of targets(id)) {
          P.state = clone(orig); P.state.offers.shift();
          P.finish(id, tg); optimize(1);
          // next-workshop machines and new workers pay off later: small bonus so they are not always skipped
          const v = inc() * (P.CARDS[id].type === 'worker' ? 1.05 : 1);
          if (v > best) { best = v; choice = [id, tg]; }
        }
        P.state = orig; P.state.offers.shift();
        if (choice) P.finish(...choice);
        optimize(2);
      }
      const log = { opened: [0, null, null, null, null], quotaAt: [], cards: 0, level: 0 };
      let sinceOpt = 0;
      const nextLoc = () => [1, 2, 3, 4].find(l => !P.state.locs[l].unlocked);
      // save up for the next workshop when it is less than a minute of income away
      const saving = () => { const n = nextLoc(); return n && (P.LOCS[n].cost - P.state.money) < inc() * 60; };
      function unlockNext() { const n = nextLoc(); if (n && P.state.money >= P.LOCS[n].cost) { P.unlockLoc(n); log.opened[n] = Math.round(P.state.run.t); optimize(3); } }
      function buySkills() { const s2 = P.state; for (const w in P.SKILLS) { const ws = s2.workers[w]; if (ws.unlocked && !ws.skill && P.workerPlace(w) && s2.money >= P.skillCost(w) * 2) { s2.money -= P.skillCost(w); ws.skill = true; ws.skT = 0; s2.run.skills++; } } }
      // the break: time stands still, so the bot does all its shopping and thinking here
      function breakTurn() {
        while (P.state.offers.length) pickOffer();
        unlockNext();
        // one card per showcase: buy the cheapest, then refresh while a refresh plus a common card still fits in the wallet
        for (let k = 0; k < 4 && !saving(); k++) {
          const i = P.state.run.shop.map((it, i) => [i, P.cardPrice(it.id)]).sort((x, y) => x[1] - y[1]).map(x => x[0]).find(i => P.buyCard(i));
          if (i == null) break;
          pickOffer();
          if (P.state.money < P.shopRollCost() + P.cardPrice('e_helmet') || !P.rollNewShop()) break;
        }
        if (!saving()) buySkills();
        optimize(3);
        P.startShift();
      }
      for (let step = 0; step < 4 * 3600 && !P.state.run.over; step++) {
        if (P.state.run.brk) { breakTurn(); continue; }
        P.tick(0.25);
        const st = P.state;
        if (step % 4) continue;
        if (step % 240 === 0) (log.rateAt = log.rateAt || []).push(Math.round(inc()));
        if (st.run.q - 1 > log.quotaAt.length) log.quotaAt.push(Math.round(st.run.t));
        if (P.crate) P.openCrate();
        unlockNext();
        if (!saving()) buySkills();
        if (++sinceOpt >= 10) { sinceOpt = 0; optimize(2); }
      }
      const st = P.state;
      return { passed: st.run.q - 1, end: Math.round(st.run.t), opened: log.opened, quotaAt: log.quotaAt, cards: st.cards.length, level: st.level, earned: st.earned, rate: st.run.bestRate, rateAt: log.rateAt };
    }, [UNL, BAL, COSTS]));
    const x = res[res.length - 1];
    console.log(`run ${r + 1}: квот ${x.passed}, конец ${Math.floor(x.end / 60)}:${String(x.end % 60).padStart(2, '0')}, цеха ${x.opened.map(v => v == null ? '—' : Math.round(v / 6) / 10).join('/')} мин, карт ${x.cards}, ур ${x.level}, доход ${Math.round(x.rate)}/с, квоты на ${x.quotaAt.map(v => Math.round(v / 6) / 10).join(' ')}`);
    if (process.env.RATES) console.log('  доход по минутам:', x.rateAt.join(' '));
  }
  await b.close();
})();
