let x = rl();

for (const i of loop(50)) {
    let o = "";
    let j = 0;

    while (x) {
        while (x[j] == x[0]) j++;
        o += j;
        o += x[0];
        x = x.slice(j);
        j = 0;
    }

    x = o;
}

console.log(x.length);
