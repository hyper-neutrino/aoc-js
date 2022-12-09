const out = new Set();

const C = groups[1];

groups[0].lines().map((x) => {
    const [a, b] = x.split(" => ");
    C.matchAll(a)
        .iter()
        .forEach(({ index: i }) =>
            out.add(C.slice(0, i) + b + C.slice(i + a.length))
        );
});

out.size.print();
