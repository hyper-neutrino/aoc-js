inf.first(1000)
    .map(() => inf.first(1000).map(() => 0))
    .wrap()
    .concat(...lines)
    .reduce((x, y) => {
        let [x1, y1, x2, y2] = y.ints();
        const f = y.startsWith("turn on")
            ? _._add(1)
            : y.startsWith("turn off")
            ? (x) => Math.max(x - 1, 0)
            : _._add(2);
        return x.vmap((k, [x, y]) =>
            x1 <= x && x <= x2 && y1 <= y && y <= y2 ? f(k) : k
        );
    })
    .map(_.sum())
    .sum()
    .print();
