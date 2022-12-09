const [bhp, batk] = data.ints();

const pq = new PriorityQueue({ comparator: ([a], [b]) => a - b });

pq.queue([
    0,
    {
        mana: 500,
        php: 50,
        bhp,
        batk,
        shield: 0,
        poison: 0,
        recharge: 0,
        hist: [],
    },
]);

const f = (x) => JSON.parse(JSON.stringify(x));

while (pq.length > 0) {
    const [c, s] = pq.dequeue();

    --s.php;

    if (s.shield) {
        --s.shield;
    }

    if (s.poison) {
        --s.poison;
        s.bhp -= 3;
    }

    if (s.recharge) {
        --s.recharge;
        s.mana += 101;
    }

    const ss = [];

    if (s.mana >= 53) {
        const n = f(s);
        n.bhp -= 4;
        n.hist.push("mm");
        ss.push([53, n]);
    }

    if (s.mana >= 73) {
        const n = f(s);
        n.php += 2;
        n.bhp -= 2;
        n.hist.push("drain");
        ss.push([73, n]);
    }

    if (s.mana >= 113 && !s.shield) {
        const n = f(s);
        n.shield = 6;
        n.hist.push("shield");
        ss.push([113, n]);
    }

    if (s.mana >= 173 && !s.poison) {
        const n = f(s);
        n.poison = 6;
        n.hist.push("poison");
        ss.push([173, n]);
    }

    if (s.mana >= 229 && !s.recharge) {
        const n = f(s);
        n.recharge = 5;
        n.hist.push("recharge");
        ss.push([229, n]);
    }

    for (const [cost, n] of ss) {
        if (n.poison) {
            --n.poison;
            n.bhp -= 3;
        }

        if (n.recharge) {
            --n.recharge;
            n.mana += 101;
        }

        if (n.bhp <= 0) {
            console.log(c + cost);
            process.exit(0);
        }

        n.php -= n.shield ? Math.max(n.batk - 7, 1) : n.batk;
        if (n.shield) --n.shield;

        if (n.php > 0) {
            n.mana -= cost;
            pq.queue([c + cost, n]);
        }
    }
}
