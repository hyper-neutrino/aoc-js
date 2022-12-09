inf.nfind(
    (x) =>
        inf
            .first(Math.floor(x ** 0.5))
            .filter((y) => x % y == 0)
            .map((y) => [y, x / y])
            .flat()
            .to_set()
            .iter()
            .map((x) => x * 10)
            .sum() >= int(data)
).print();
