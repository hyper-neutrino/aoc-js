const a = new Set();
const adj = {};

lines.forEach((x) => {
    const s = x.split(" ");

    const i = s.shift();
    s.shift();
    let g = s.shift() == "gain" ? 1 : -1;
    g *= int(s.shift());
    const j = s.last().slice(0, -1);

    a.add(i);
    a.add(j);
    (adj[i] ??= {})[j] = g;
});

a.iter()
    .permutations()
    .map((x) =>
        x
            .sliding(2, true)
            .map(([x, y]) => adj[x][y] + adj[y][x])
            .sum()
    )
    .max()
    .print();
