const e = eval(
    `({${`children: 3
cats: 7
samoyeds: 2
pomeranians: 3
akitas: 0
vizslas: 0
goldfish: 5
trees: 3
cars: 2
perfumes: 1
`
        .split("\n")
        .join(",")}})`
);

lines
    .map((x) => ({
        n: x.ints()[0],
        d: eval(`({${x.match(/:.+/)[0].slice(2)}})`),
    }))
    .filter(({ d }) =>
        Object.keys(d).every((x) =>
            x == "cats" || x == "trees"
                ? d[x] > e[x]
                : x == "pomeranians" || x == "goldfish"
                ? d[x] < e[x]
                : d[x] == e[x]
        )
    )
    .first()
    .n.print();
