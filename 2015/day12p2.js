function s(x) {
    if (Array.isArray(x)) return x.map(s).sum();
    if (typeof x === "number" || x instanceof Number) return x;
    if (typeof x === "string" || x instanceof String) return 0;
    const v = [...Object.values(x)];
    return v.includes("red") ? 0 : v.map(s).sum();
}

console.log(s(JSON.parse(data)));
