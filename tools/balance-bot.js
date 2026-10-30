// Balance bot: plays whole runs headless through the game's #bot hook and prints pacing stats.
// node tools/balance-bot.js [runs] [unlocks,comma,separated] [BAL overrides as JSON] [workshop costs JSON]
// RATES=1 also prints income at every minute. STRAT=random picks cards, targets and shop cards at random, like a player who does not think;
// STRAT=semi picks a random card but puts it where it earns most, and buys random shop cards;
// STRAT=smart is the usual bot that also collects pairs towards a Triple (3 same cards on one worker or machine).
// SHOP=n caps showcase purchases per break (default 30, i.e. until the money runs out, like a player who keeps refreshing).
// ROUTE=10,11,12,13,14 opens these alternative workshops instead of the main ones on their tabs (garden, glaciers, bakery, dreams, living room);
// Every run also prints the share of workshops 1–5 in the income summed over the run (sampled every 10 s); shut workshops are never opened again.
// COUNTER=cake|hot is the bakery's counter (default cake), DEBUG=1 prints the bakery's slots and its orders given and done. The bot aims the dream tower's beam and feeds the living room when it pays.
const { chromium } = require('playwright');
const RUNS = +process.argv[2] || 8, UNL = process.argv[3] || '', BAL = JSON.parse(process.argv[4] || '{}'), COSTS = JSON.parse(process.argv[5] || 'null');
(async () => {
  const b = await chromium.launch(), p = await b.newPage();
  p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('file://' + require('path').resolve(__dirname, '../game/index.html') + '#bot');
  const res = [];
  for (let r = 0; r < RUNS; r++) {
    res.push(await p.evaluate(([unl, bal, costs, rnd, semi, smart, shopMax, route, counter]) => {
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
        if (cd.type === 'machine') return slotsAll(st).filter(({ l, i, s }) => !s.machine && (cl < 0 || cl === l) && P.slotOk(l, i, cd.machine) && !(cd.machine === 'belt' && st.locs[l].slots.some(z => z.machine === 'belt'))).map(({ l, i }) => ({ l, i }));
        if (cd.type === 'mupg') return slotsAll(st).filter(({ l, s }) => P.upgOk(s) && (cl < 0 || cl === l)).map(({ l, i }) => ({ l, i }));
        if (cd.type === 'equip') return Object.keys(st.workers).filter(w => st.workers[w].unlocked);
        if (cd.type === 'skill') return Object.keys(st.workers).filter(w => st.workers[w].unlocked && !st.workers[w].skill && P.workerPlace(w));
        return [undefined];
      }
      const any = a => a[Math.floor(Math.random() * a.length)];
      function pickOffer() {
        const offer = P.state.offers[0], orig = P.state;
        if (rnd) {
          const opts = offer.ids.flatMap(id => targets(id).map(tg => [id, tg]));
          P.state.offers.shift();
          if (opts.length) { const [id, tg] = any(opts); P.finish(id, tg, P.isFull(id, tg) ? any([...P.holder(id, tg).keys()]) : undefined); }
          optimize(2); return;
        }
        let best = -1, choice = null;
        // a full locker or machine (BAL.cap cards) takes a new card only in place of an old one: every drop is tried
        // semi: any card that fits somewhere, but put where it earns most, like a player who grabs a card without planning
        const ids = semi ? [any(offer.ids.filter(id => targets(id).length))].filter(Boolean) : offer.ids;
        for (const id of ids) for (const tg of targets(id)) for (const d of P.isFull(id, tg) ? [...P.holder(id, tg).keys()] : [undefined]) {
          P.state = clone(orig); P.state.offers.shift();
          const v0 = P.avgIncome();
          P.finish(id, tg, d); optimize(1);
          // cards are judged by the mean income of a shift, since some of them change during it;
          // next-workshop machines and new workers pay off later: small bonus so they are not always skipped;
          // a skill works only part of its cycle, so its gain is averaged
          let v1 = P.avgIncome(), v = P.CARDS[id].type === 'skill' ? v0 + (v1 - v0) * P.skillShare(tg) : v1 * (P.CARDS[id].type === 'worker' ? 1.05 : 1);
          // smart: a second copy on one worker or machine is half of a Triple, worth a little now
          const h = smart && P.holder(id, tg);
          if (h && h.length < 3 && h.filter(c => c === id).length === 2 && (P.CARDS[id].type === 'mupg' || P.workerPlace(tg))) v *= 1.15;
          if (v > best) { best = v; choice = [id, tg, d]; }
        }
        P.state = orig; P.state.offers.shift();
        if (choice) P.finish(...choice);
        optimize(2);
      }
      const log = { opened: [0, null, null, null, null, null, null, null, null, null], quotaAt: [], cards: 0, level: 0, crate: 0, orders: 0, ordersDone: 0 };
      let sinceOpt = 0;
      // the workshop of every tab: an alternative from ROUTE replaces the main one on its tab
      const locOf = k => route.find(l => P.ALTS[k] && P.ALTS[k].includes(l)) ?? k;
      const nextLoc = () => [1, 2, 3, 4, 5, 6, 7, 8, 9].map(locOf).find(l => !P.state.locs[l].unlocked && !P.state.locs[l].closed);
      const tabOfLoc = l => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].find(k => locOf(k) === l);
      // the dream tower: aim the beam where the income is highest (in a break moving it costs nothing)
      function aimBeam() {
        const st = P.state; if (!st.locs[13].unlocked) return;
        let best = -1, bi = st.run.beam;
        for (const i of [0, 1, 3, 4]) { if (!st.locs[13].slots[i].machine) continue; st.run.beam = i; const v = inc(); if (v > best) { best = v; bi = i; } }
        st.run.beam = bi; st.run.beamCd = 1;
      }
      // the living room: feed it a worker when the factory earns more without them, three at most
      function feedRoom() {
        const orig = P.state; if (!orig.locs[14].unlocked) return;
        while ((P.state.run.eaten || []).length < 3) {
          let best = inc() * 1.02, pick = null;
          for (const w of Object.keys(P.state.workers).filter(w => P.state.workers[w].unlocked)) {
            const keep = P.state; P.state = clone(keep); P.eatWorker(w); optimize(1); const v = inc(); P.state = keep;
            if (v > best) { best = v; pick = w; }
          }
          if (!pick) return;
          P.eatWorker(pick); optimize(2);
        }
      }
      // save up for the next workshop when it is less than a minute of income away
      const saving = () => { const n = nextLoc(); return n && (P.LOCS[n].cost - P.state.money) < inc() * 60; };
      function unlockNext() { const n = nextLoc(); if (n && P.state.money >= P.LOCS[n].cost) { P.unlockLoc(n); if (n === 12) P.state.run.counter = counter; log.opened[tabOfLoc(n)] = Math.round(P.state.run.t); optimize(3); } }
      function buySkills() { const s2 = P.state; if (P.skillLocked()) return; for (const w in P.SKILLS) { const ws = s2.workers[w]; if (ws.unlocked && !ws.skill && P.workerPlace(w) && s2.money >= P.skillCost(w) * 2) { s2.money -= P.skillCost(w); ws.skill = true; ws.skT = 0; s2.run.skills++; } } }
      // the break: time stands still, so the bot does all its shopping and thinking here
      function breakTurn() {
        while (P.state.offers.length) pickOffer();
        unlockNext();
        // one card per showcase: buy the cheapest, then refresh while a refresh plus a common card still fits in the wallet
        for (let k = 0; k < shopMax && !saving(); k++) {
          const i = P.state.run.shop.map((it, i) => [i, rnd || semi ? Math.random() : P.cardPrice(it.id)]).sort((x, y) => x[1] - y[1]).map(x => x[0]).find(i => P.buyCard(i));
          if (i == null) break;
          pickOffer();
          if (P.state.money < P.shopRollCost() + P.cardPrice('e_helmet') || !P.rollNewShop()) break;
        }
        if (!saving()) buySkills();
        optimize(3); feedRoom(); aimBeam();
        P.startShift();
        if (P.state.run.order) { log.orders++; (log.kinds = log.kinds || {})[P.state.run.order.kind] = (log.kinds[P.state.run.order.kind] || 0) + 1; }
      }
      for (let step = 0; step < 4 * 3600 && !P.state.run.over; step++) {
        if (P.state.run.brk) { breakTurn(); continue; }
        P.tick(0.25);
        const st = P.state;
        if (step % 4) continue;
        if (step % 240 === 0) (log.rateAt = log.rateAt || []).push(Math.round(inc()));
        // every 10 s: how much of the income comes from workshops 1–5, summed over the run
        if (step % 40 === 0) { const g = P.globals(); st.locs.forEach((L, l) => { if (L.unlocked) L.slots.forEach((z, i) => { const x = P.slotStats(l, i, g); if (x) { log.incAll = (log.incAll || 0) + x.income; if (l < 5) log.incOld = (log.incOld || 0) + x.income; } }); }); }
        if (st.run.q - 1 > log.quotaAt.length) log.quotaAt.push(Math.round(st.run.t));
        const o = st.run.order; if (o && o.done && !o.seen) { o.seen = true; log.ordersDone++; (log.done = log.done || {})[o.kind] = (log.done[o.kind] || 0) + 1; }
        if (P.crate) { const r = P.openCrate(); if (!r.card) log.crate += r.gain; }
        unlockNext();
        if (!saving()) buySkills();
        if (++sinceOpt >= 10) { sinceOpt = 0; optimize(2); }
      }
      const st = P.state;
      // the share of the income each of the workshops 6–10 (by tab) brings at the end of the run
      const g = P.globals(), byLoc = st.locs.map((L, l) => L.unlocked ? L.slots.reduce((a, z, i) => { const x = P.slotStats(l, i, g); return a + (x ? x.income : 0); }, 0) : 0), all = byLoc.reduce((a, b) => a + b, 0) || 1;
      const share = [5, 6, 7, 8, 9].map(k => st.locs[locOf(k)].unlocked ? Math.round(byLoc[locOf(k)] / all * 100) : null);
      return { oldShare: (log.incOld || 0) / (log.incAll || 1), debug: [st.locs[12].slots.map(z => z.machine + ':' + z.worker), log.kinds, log.done], share, orders: log.orders, ordersDone: log.ordersDone, eaten: (st.run.eaten || []).length, passed: st.run.q - 1, end: Math.round(st.run.t), opened: log.opened, quotaAt: log.quotaAt, cards: st.cards.length, level: st.level, earned: st.earned, rate: st.run.bestRate, rateAt: log.rateAt, crateShare: log.crate / st.earned, skills: st.run.skills, maxEq: Math.max(...Object.values(st.workers).map(w => w.equip.length)), maxUpg: Math.max(...st.locs.flatMap(L => L.slots.map(z => z.upg.length))),
        trios: [...Object.values(st.workers).map(w => w.equip), ...st.locs.flatMap(L => L.slots.map(z => z.upg))].filter(a => a.some(c => a.filter(x => x === c).length >= 3)).length };
    }, [UNL, BAL, COSTS, process.env.STRAT === 'random', process.env.STRAT === 'semi', process.env.STRAT === 'smart', +process.env.SHOP || 30, (process.env.ROUTE || '').split(',').filter(Boolean).map(Number), process.env.COUNTER || 'cake']));
    const x = res[res.length - 1];
    console.log(`run ${r + 1}: квот ${x.passed}, конец ${Math.floor(x.end / 60)}:${String(x.end % 60).padStart(2, '0')}, цеха ${x.opened.map(v => v == null ? '—' : Math.round(v / 6) / 10).join('/')} мин, карт ${x.cards}, ур ${x.level}, доход ${Math.round(x.rate)}/с, скиллов ${x.skills}, max карт на сотруднике/станке ${x.maxEq}/${x.maxUpg}, троек ${x.trios},${x.orders ? ` заказов ${x.ordersDone}/${x.orders},` : ''}${x.eaten ? ` съедено ${x.eaten},` : ''} доля цехов 6–10 ${x.share.map(v => v == null ? '—' : v + '%').join('/')}, посылки ${Math.round(x.crateShare * 100)}% денег, цеха 1–5 ${Math.round(x.oldShare * 100)}% дохода, квоты на ${x.quotaAt.map(v => Math.round(v / 6) / 10).join(' ')}`);
    if (process.env.DEBUG) console.log('  ', JSON.stringify(x.debug));
    if (process.env.RATES) console.log('  доход по минутам:', x.rateAt.join(' '));
  }
  await b.close();
})();
