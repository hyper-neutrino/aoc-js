const [row, col] = rl().ints();

const pos = inf.first(row + col - 2).sum() + col;

const m = 33554393;

console.log((modpow(252533, pos - 1, m) * 20151125) % m);
