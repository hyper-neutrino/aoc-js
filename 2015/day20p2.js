inf.nfind(
    (x) =>
        inf
            .first(Math.floor(x ** 0.5))
            .filter((y) => x % y == 0)
            .map((y) => [y, x / y])
            .flat()
            .filter((y) => y * 50 >= x)
            .to_set()
            .iter()
            .map((x) => x * 11)
            .sum() >= int(data)
).print();
