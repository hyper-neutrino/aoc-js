const a = new Set();
const adj = {};

lines.forEach((x) => {
    let [i, _, j, __, k] = x.split(" ");
    k = int(k);
    a.add(i);
    a.add(j);
    (adj[i] ??= {})[j] = (adj[j] ??= {})[i] = k;
});

a.iter()
    .permutations()
    .map((x) =>
        x
            .sliding()
            .map(([x, y]) => adj[x][y])
            .sum()
    )
    .min()
    .print();
