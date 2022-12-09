let x = rl().ord().map(_._sub(97));

do {
    x[x.length - 1]++;
    let i = x.length - 1;
    while (x[i] >= 26) {
        x[i] = 0;
        x[--i]++;
    }
} while (
    !x.sliding(3).some(([a, b, c]) => a + 1 == b && c - 1 == b) ||
    [8, 11, 14].some((a) => x.includes(a)) ||
    !x
        .map(_._add(97))
        .chr()
        .match(/(.)\1.*(.)\2/)
);

x.map(_._add(97)).chr().print();
