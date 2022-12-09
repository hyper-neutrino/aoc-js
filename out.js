import fs from "fs";
import PriorityQueue from "js-priority-queue";

let data = fs.readFileSync(process.argv[2], "utf-8").trimEnd("\n");
let grid = data.split("\n").map((x) => [...x]);
let groups = data.split(/\n{2,}/);
let lines = data.split("\n");

const rl = () => lines.shift();

const int = (x) => parseInt(x);
const float = (x) => parseFloat(x);
const str = (x) => `${x}`;

const loop = (x) => new Array(x);

const intpart = (x, y, allow_zero = true) => {
    if (x == 0 && !allow_zero) return [];
    if (y == 0) return [];
    if (y == 1) return [[x]];

    return (allow_zero ? inf0.first(x + 1) : inf.first(x))
        .map((i) => intpart(x - i, y - 1, allow_zero).map((k) => [i, ...k]))
        .flat();
};

const dij = (adj, s, e) => {
    const pq = new PriorityQueue({ comparator: ([a], [b]) => a - b });
    pq.queue([0, s]);

    const visited = new Set();

    while (pq.length > 0) {
        const [distance, node] = pq.dequeue();

        if (visited.has(node)) continue;
        visited.add(node);

        for (const next in adj[s]) {
            if (next == e) return distance + adj[s][next];

            if (visited.has(next)) continue;
            pq.queue([distance + adj[s][next], next]);
        }
    }

    return Infinity;
};

const modpow = (b, e, m) => {
    if (m == 1) return 0;
    let r = 1;
    b %= m;
    while (e > 0) {
        if (e % 2 == 1) r = (r * b) % m;
        e >>= 1;
        b = (b * b) % m;
    }
    return r;
};

// Proxies

const _ = new Proxy(
    {},
    {
        get(_, property, __) {
            return function () {
                return (x) => x[property](...arguments);
            };
        },
    }
);

const __ = new Proxy(
    {},
    {
        get(_, property, __) {
            return (x, y) => x[property](y);
        },
    }
);

// String Methods

String.prototype.ints = function (ignore_negatives = false) {
    return this.matchAll(ignore_negatives ? /\d+/g : /-?\d+/g)
        .iter()
        .map(int);
};

String.prototype.nums = function (ignore_negatives = false) {
    return this.matchAll(ignore_negatives ? /\d+(\.\d+)?/g : /-?\d+(\.\d+)?/g)
        .iter()
        .map(float);
};

String.prototype.lines = function () {
    return this.split("\n");
};

// Array Methods

Array.prototype.replace = function (x, g) {
    if (y === undefined) return this.map((k) => x[k]?.(k) ?? k);
    return this.map((k) => (k === x ? g(k) : k));
};

Array.prototype.tl = function (x, y) {
    if (y === undefined) return this.map((k) => x[k] ?? k);
    return this.map((k) => (k === x ? y : k));
};

Array.prototype.sum = function (s = 0) {
    this.forEach((k) => (s = s._add(k)));
    return s;
};

Array.prototype.cumsum = function (s = 0) {
    const o = [];
    this.forEach((k) => o.push((o.length ? o.last() : s)._add(k)));
    return o;
};

Array.prototype.append = function (x) {
    this.push(x);
    return this;
};

Array.prototype.prepend = function (x) {
    this.unshift(x);
    return this;
};

Array.prototype.nsort = function () {
    return this.sort((a, b) => a - b);
};

Array.prototype.rsort = function () {
    return this.sort((a, b) => b - a);
};

Array.prototype._eq = function (x) {
    if (!Array.isArray(x)) return false;
    if (this.length != x.length) return false;

    for (let i = 0; i < this.length; i++) if (!this[i]._eq(x[i])) return false;

    return true;
};

Array.prototype._neq = function (x) {
    return !this._eq(x);
};

Array.prototype.max = function (comparator) {
    if (this.length == 0) return undefined;
    let max = this[0];

    for (let i = 1; i < this.length; i++) {
        const item = this[i];
        if (comparator ? comparator(item, max) > 0 : item > max) max = item;
    }

    return max;
};

Array.prototype.min = function (comparator) {
    if (this.length == 0) return undefined;
    let min = this[0];

    for (let i = 1; i < this.length; i++) {
        const item = this[i];
        if (comparator ? comparator(item, min) < 0 : item < min) min = item;
    }

    return min;
};

Array.prototype.maxKey = function (key = (x) => x) {
    if (this.length == 0) return undefined;
    let max = this[0];
    let maxKeyed = key(this[0]);

    for (let i = 1; i < this.length; i++) {
        const item = this[i];
        const itemKeyed = key(item);

        if (itemKeyed > maxKeyed) {
            max = item;
            maxKeyed = itemKeyed;
        }
    }

    return max;
};

Array.prototype.minKey = function (key = (x) => x) {
    if (this.length == 0) return undefined;
    let min = this[0];
    let minKeyed = key(this[0]);

    for (let i = 1; i < this.length; i++) {
        const item = this[i];
        const itemKeyed = key(item);

        if (itemKeyed < minKeyed) {
            min = item;
            minKeyed = itemKeyed;
        }
    }

    return min;
};

Array.prototype.filterOut = function (f) {
    return this.filter((x, i, a) => !f(x, i, a));
};

Array.prototype.cumReduce = function (f) {
    if (this.length == 0) return [];

    const o = [this[0]];

    for (let i = 1; i < this.length; i++) {
        o.push(f(o.last(), this[i]));
    }

    return o;
};

Array.prototype.cumReduceRight = function (f) {
    if (this.length == 0) return [];

    const o = [this.last()];

    for (let i = this.length - 2; i >= 0; i--) {
        o.push(f(o.last(), this[i]));
    }

    return o;
};

Array.prototype.bifurcate = Array.prototype.nfurcate = function (x = 2) {
    const o = new Array(x).fill(0).map(() => []);
    this.forEach((k, i) => o[i % x].push(k));
    return o;
};

Array.prototype.dynLoop = function (f, bypass = false) {
    const o = [];

    for (let i = 0; i < this.length; ++i) {
        const v = f(this[i], i, this);
        if (!bypass) o.push(v);
    }

    if (!bypass) return o;
};

Array.prototype.cart = function (x) {
    x = iter(x);

    return this.map((a) => x.map((b) => [a, b]));
};

Array.prototype.nflat = function (t = Infinity) {
    let l = this.length;
    let x = this;

    while (t-- > 0) {
        x = x.flat();
        if (l == x.length) break;
        l = x.length;
    }

    return x;
};

Array.prototype.powerset = function () {
    return inf
        .first(this.length)
        .prepend(0)
        .map((x) => this.combinations(x))
        .flat();
};

Array.prototype.permutations = function () {
    const result = [this.slice()];
    const c = new Array(this.length).fill(0);
    let i = 1,
        k,
        p;

    while (i < this.length) {
        if (c[i] < i) {
            k = i % 2 && c[i];
            [this[i], this[k]] = [this[k], this[i]];
            ++c[i];
            i = 1;
            result.push(this.slice());
        } else c[i++] = 0;
    }

    return result;
};

Array.prototype.combinations = function (x) {
    if (x > this.length || x < 0) return [];
    if (x == this.length) return [[...this]];

    return [
        ...this.slice(1)
            .combinations(x - 1)
            .map((k) => [this[0], ...k]),
        ...this.slice(1).combinations(x),
    ];
};

Array.prototype.chunks = function (x = 2) {
    const o = [];
    for (let i = 0; i < this.length; i += x) {
        o.push(this.slice(i, i + x));
    }
    return o;
};

Array.prototype.sliding = function (x = 2, loop = false) {
    if (loop) {
        const k = this.concat(...this.slice(0, x - 1));
        return inf0.first(this.length).map((i) => k.slice(i, i + x));
    } else {
        return inf0.first(this.length - x + 1).map((i) => this.slice(i, i + x));
    }
};

Array.prototype.chr = function () {
    return String.fromCharCode(...this);
};

Array.prototype.zip = function () {
    return zip(...this);
};

Array.prototype.first = function () {
    return this[0];
};

Array.prototype.last = function () {
    return this[this.length - 1];
};

Array.prototype.nth = function (n) {
    return this[n];
};

Array.prototype.dp = function (x) {
    return this._mul(x).sum();
};

Array.prototype.count = function (x) {
    return this.filter((a) => a._eq(x)).length;
};

Array.prototype.fcount = function (f) {
    return this.filter(f).length;
};

Array.prototype.minimal = function (f = (x) => x) {
    let o = [];
    let min;

    for (const x of this) {
        const q = f(x);

        if (min === undefined || q < min) {
            o = [x];
            min = q;
        } else if (q <= min) {
            o.push(x);
        }
    }

    return o;
};

Array.prototype.maximal = function (f = (x) => x) {
    let o = [];
    let max;

    for (const x of this) {
        const q = f(x);

        if (max === undefined || q > max) {
            o = [x];
            max = q;
        } else if (q >= max) {
            o.push(x);
        }
    }

    return o;
};

// Set Methods

Set.prototype.i = function (x, str = true) {
    x = new Set(iter(x, str));
    return new Set([...this].filter((k) => x.has(k)));
};

Set.prototype.u = function (x, str = true) {
    x = new Set(iter(x, str));
    return new Set([...this, ...x]);
};

Set.prototype.d = function (x, str = true) {
    x = new Set(iter(x, str));
    return new Set([...this].filterOut((k) => x.has(k)));
};

Set.prototype.s = function (x, str = true) {
    x = new Set(iter(x, str));
    return new Set([...this.d(x), ...x.d(this)]);
};

// Object Methods

Object.prototype.print = function () {
    console.log(this);
    return this;
};

Object.prototype.apply = function (f) {
    return f(this);
};

function is_iter(x, str = false) {
    return x instanceof String || typeof x === "string"
        ? str
        : typeof x[Symbol.iterator] === "function";
}

function iter(x, str = false) {
    return is_iter(x, str) ? [...x] : [x];
}

function zip() {
    const rows = [...arguments].map((x) => (is_iter(x) ? [...x] : [x]));

    const cap = rows.map((x) => x.length).min();

    const output = [];

    for (let i = 0; i < cap; i++) {
        output.push(rows.map((x) => x[i]));
    }

    return output;
}

function vec1(f) {
    return function _f(x) {
        return is_iter(x) ? [...x].map(_f) : f(x);
    };
}

function vec2(f) {
    return function _f(x, y) {
        if (x instanceof Sequence) {
            if (y instanceof Sequence) {
                return new Sequence((i) => _f(x.f(i), y.f(i)));
            } else if (is_iter(y)) {
                const _y = [...y];
                return new Sequence((i) =>
                    i < _y.length ? _f(x.f(i), _y[i]) : x.f(i)
                );
            } else {
                return new Sequence((i) => _f(x.f(i), y));
            }
        } else if (is_iter(x)) {
            if (y instanceof Sequence) {
                const _x = [...x];
                return new Sequence((i) =>
                    i < _x.length ? _f(_x[i], y.f(i)) : y.f(i)
                );
            } else if (is_iter(y)) {
                const _x = [...x];
                const _y = [...y];
                const len = Math.min(_x.length, _y.length);

                return zip(_x, _y)
                    .map(([a, b]) => _f(a, b))
                    .concat(..._x.slice(len))
                    .concat(..._y.slice(len));
            } else {
                return [...x].map((a) => _f(a, y));
            }
        } else if (y instanceof Sequence) {
            return new Sequence((i) => _f(x, y.f(i)));
        } else if (is_iter(y)) {
            return [...y].map((a) => _f(x, a));
        } else {
            return f(x, y);
        }
    };
}

const v = {
    "+": vec2((x, y) => x + y),
    "-": vec2((x, y) => x - y),
    "*": vec2((x, y) => x * y),
    "**": vec2((x, y) => x ** y),
    "/": vec2((x, y) => x / y),
    "//": vec2((x, y) => Math.floor(x / y)),
    "%": vec2((x, y) => x % y),
    "%%": vec2((x, y) => ((x % y) + y) % y),
    "==": vec2((x, y) => x == y),
    "===": vec2((x, y) => x === y),
    "!=": vec2((x, y) => x != y),
    "!==": vec2((x, y) => x !== y),
    ">": vec2((x, y) => x > y),
    "<": vec2((x, y) => x < y),
    ">=": vec2((x, y) => x >= y),
    "<=": vec2((x, y) => x <= y),
    "&&": vec2((x, y) => x && y),
    "||": vec2((x, y) => x || y),
    "!": vec1((x) => !x),
    "&": vec2((x, y) => x & y),
    "|": vec2((x, y) => x | y),
    "~": vec1((x) => ~x),
    "^": vec2((x, y) => x ^ y),
    "<<": vec2((x, y) => x << y),
    ">>": vec2((x, y) => x >> y),
    ">>>": vec2((x, y) => x >>> y),
};

Object.prototype._add = function (x) {
    return v["+"](this, x);
};

Object.prototype._radd = function (x) {
    return v["+"](x, this);
};

Object.prototype._sub = function (x) {
    return v["-"](this, x);
};

Object.prototype._rsub = function (x) {
    return v["-"](x, this);
};

Object.prototype._mul = function (x) {
    return v["*"](this, x);
};

Object.prototype._rmul = function (x) {
    return v["*"](x, this);
};

Object.prototype._exp = function (x) {
    return v["**"](this, x);
};

Object.prototype._rexp = function (x) {
    return v["**"](x, this);
};

Object.prototype._div = function (x) {
    return v["/"](this, x);
};

Object.prototype._rdiv = function (x) {
    return v["/"](x, this);
};

Object.prototype._fdiv = function (x) {
    return v["//"](this, x);
};

Object.prototype._rfdiv = function (x) {
    return v["//"](x, this);
};

Object.prototype._rem = function (x) {
    return v["%"](this, x);
};

Object.prototype._rrem = function (x) {
    return v["%"](x, this);
};

Object.prototype._mod = function (x) {
    return v["%%"](this, x);
};

Object.prototype._rmod = function (x) {
    return v["%%"](x, this);
};

Object.prototype._eq = function (x) {
    return this == x;
};

Object.prototype._veq = function (x) {
    return v["=="](this, x);
};

Object.prototype._eqq = function (x) {
    return this === x;
};

Object.prototype._veqq = function (x) {
    return v["==="](this, x);
};

Object.prototype._neq = function (x) {
    return this != x;
};

Object.prototype._vneq = function (x) {
    return v["!="](this, x);
};

Object.prototype._neqq = function (x) {
    return this !== x;
};

Object.prototype._vneqq = function (x) {
    return v["!=="](this, x);
};

Object.prototype._gt = function (x) {
    return v[">"](this, x);
};

Object.prototype._lt = function (x) {
    return v["<"](this, x);
};

Object.prototype._geq = function (x) {
    return v[">="](this, x);
};

Object.prototype._leq = function (x) {
    return v["<="](this, x);
};

Object.prototype._if = function (x, y) {
    return this ? x : y;
};

Object.prototype._cond = function (x, y) {
    return x ? this : y;
};

Object.prototype._and = function (x) {
    return this && x;
};

Object.prototype._vand = function (x) {
    return v["&&"](this, x);
};

Object.prototype._rand = function (x) {
    return x && this;
};

Object.prototype._vrand = function (x) {
    return v["&&"](x, this);
};

Object.prototype._or = function (x) {
    return this || x;
};

Object.prototype._vor = function (x) {
    return v["||"](this, x);
};

Object.prototype._ror = function (x) {
    return x || this;
};

Object.prototype._vror = function (x) {
    return v["||"](x, this);
};

Object.prototype._not = function () {
    return !this;
};

Object.prototype._vnot = function () {
    return v["!"](this);
};

Object.prototype._band = function (x) {
    return v["&"](this, x);
};

Object.prototype._rband = function (x) {
    return v["&"](x, this);
};

Object.prototype._bor = function (x) {
    return v["|"](this, x);
};

Object.prototype._rbor = function (x) {
    return v["|"](x, this);
};

Object.prototype._bnot = function () {
    return v["~"](this);
};

Object.prototype._xor = function (x) {
    return v["^"](this, x);
};

Object.prototype._rxor = function (x) {
    return v["^"](x, this);
};

Object.prototype._ls = function (x) {
    return v["<<"](this, x);
};

Object.prototype._rls = function (x) {
    return v["<<"](x, this);
};

Object.prototype._rs = function (x) {
    return v[">>"](this, x);
};

Object.prototype._rrs = function (x) {
    return v[">>"](x, this);
};

Object.prototype._urs = function (x) {
    return v[">>>"](this, x);
};

Object.prototype._rurs = function (x) {
    return v[">>>"](x, this);
};

Object.prototype.iter = function (str = true) {
    return iter(this, str);
};

Object.prototype.to_set = function (str = true) {
    return new Set(iter(this, str));
};

Object.prototype.wrap = function () {
    return [this];
};

Object.prototype.to_seq = function (pad) {
    const x = this.iter();
    return new Sequence((i) => (i < x.length ? x[i] : pad));
};

Object.prototype.vmap = function (f, c = [], a = undefined) {
    return is_iter(this)
        ? iter(this).map((x, i) => x.vmap(f, [...c, i], a ?? this))
        : f(this, c, a ?? this);
};

Object.prototype.vfilter = function (f, c = [], a = undefined) {
    const o = [];
    iter(this).forEach((x, i) => {
        if (is_iter(x)) {
            o.push(x.vfilter(f, [...c, i], a ?? this));
        } else if (f(x, [...c, i], a ?? this)) {
            o.push(x);
        }
    });
    return o;
};

Object.prototype.ord = function () {
    if (
        (this instanceof String || typeof this === "string") &&
        this.length == 1
    ) {
        return this.codePointAt(0);
    }

    return this.toString()
        .iter()
        .map((x) => x.codePointAt(0));
};

Object.prototype.minWith = function (x) {
    return vec2((x, y) => (x > y ? y : x))(this, x);
};

Object.prototype.maxWith = function (x) {
    return vec2((x, y) => (x < y ? y : x))(this, x);
};

Object.prototype.selfie = function (f) {
    return f(this, this);
};

Object.prototype.in = function (x) {
    return x.iter().includes(this);
};

// Number Methods

Number.prototype.chr = function () {
    return String.fromCharCode(this);
};

// Sequences

class Sequence {
    constructor(f, c = true) {
        this._f = f;
        this.c = c;
        this.cache = {};
    }

    f(i) {
        if (this.c && i in this.cache) return this.cache[i];
        const v = this._f(i);
        if (this.c) this.cache[i] = v;
        return v;
    }

    first(n) {
        if (n === undefined) {
            return this.f(0);
        }

        return new Array(n).fill(0).map((_, i) => this.f(i));
    }

    skip(n = 1) {
        return new Sequence((i) => this.f(i - n), this.c);
    }

    nfind(f, n) {
        const o = [];
        let i = 0;
        while (o.length < (n ?? 1)) {
            const v = this.f(i++);
            if (f(v)) o.push(v);
        }
        return n === undefined ? o[0] : o;
    }

    map(f) {
        return new Sequence((i) => f(this.f(i)), this.c);
    }
}

const seq = (f) => new Sequence(f);

const gseq = (init, f, n = 1) =>
    new Sequence(function (i) {
        this._cache ??= n > 1 ? iter(init) : init;

        let vector;

        if (this._cache.length <= i) {
            vector = this._cache.slice(this._cache.length - n);
        }

        while (this._cache.length <= i) {
            let x;
            this._cache.push((x = f(...vector)));
            vector.shift();
            vector.push(x);
        }

        return this._cache[i];
    });

const inf = new Sequence((x) => x + 1);
const inf0 = new Sequence((x) => x);
const fib = gseq([1, 1], __._add, 2);

const [row, col] = rl().ints();

const pos = inf.first(row + col - 2).sum() + col;

const m = 33554393;

console.log((modpow(252533, pos - 1, m) * 20151125) % m);
